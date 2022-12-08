<template>
  <p>
    If you're working on a project and need to backport changes from one branch
    to another, you might get errors if the files modified in the original
    branch have been renamed in the target branch (this can happen regardless of
    whether you're trying to merge or cherry-pick your changes). Git might not
    automatically apply the changes to the equivalent (renamed) files.
  </p>

  <p>
    One way to deal with this issue is by setting the value of Git's
    <code
      ><a
        href="https://git-scm.com/docs/merge-config#Documentation/merge-config.txt-mergerenameLimit"
        >merge.renameLimit</a
      ></code
    >
    option to a very large number with the following command:
  </p>

  <CodeBlock code="git config merge.renameLimit 99999999" />

  <p>
    This boosts Git's ability to recognize renamed files, which it does by
    default in a very limited fashion as the process can consume lots of memory
    and become very slow due to excessive paging.
  </p>

  <p>
    After you're done with the backporting, you can revert the modification done
    to <code>merge.renameLimit</code> by running:
  </p>

  <CodeBlock code="git config --unset merge.renameLimit" />

  <p>
    If this approach fails, or if you only have a few commits which account for
    all the changes you need to backport, you can also try patching each file
    individually in the target branch. On Linux, you can do that by executing
    the following command for each commit you need to backport (and each
    modified file):
  </p>

  <CodeBlock
    code="git show <commit-sha1> --no-color -- path/to/old_filename | patch path/to/new_filename"
  />

  <p>
    This command works by passing all modifications done to
    <code>old_filename</code> as input to the <code>patch</code> command to have
    them applied to <code>new_filename</code>. You can omit the
    <code>--no-color</code> flag if you have not configured Git to use colors in
    its output.
  </p>

  <p>
    This second approach may not be feasible for projects which have lots of
    equivalent files with different names across two (or more) branches, but for
    backporting small changes, it can save lots of development time if
    increasing the rename detection limit does not get the job done.
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
