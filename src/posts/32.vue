<template>
  <p>
    Suppose you want to generate a list of all songs in a directory (including
    its subdirectories), and that the songs are stored in MP3, FLAC, and Ogg
    Vorbis formats. How can you obtain this song list via CLI?
  </p>

  <p>
    One possible way is by using the
    <a href="http://man7.org/linux/man-pages/man1/find.1.html"
      ><code>find</code></a
    >
    tool with the following command:
  </p>

  <CodeBlock
    code='
    find <dir> -type f -iname "*.mp3" -o -iname "*.flac" -o -iname "*.ogg"
    '
  />

  <p>
    where <code>&lt;dir&gt;</code> represents the path to the directory where
    the file search will be conducted. This can be either an absolute path or a
    relative path with respect to the current working directory. Let's analyze
    each part of this command to understand its purpose:
  </p>

  <MapBlock>
    <code>-type f</code>
    <span>
      Specifies that only regular files should be matched. Directories and other
      file types, such as sockets, pipes, devices, etc., are ignored.
    </span>

    <code>-iname &lt;pattern&gt;</code>
    <span>
      Sets the filename pattern to be matched and instructs the command to
      ignore case distinctions, i.e., to not distinguish between uppercase and
      lowercase.
    </span>

    <code>... -o ...</code>
    <span>
      <code>OR</code> operator, used for matching multiple patterns.
    </span>
  </MapBlock>

  <SectionTitle>Alternative #1</SectionTitle>

  <p>
    An alternative approach involves using the
    <a href="https://linux.die.net/man/1/grep"><code>grep</code></a> tool for
    pattern matching:
  </p>

  <CodeBlock
    code='find <dir> -type f | grep -i -e "\.mp3$" -e "\.flac$" -e "\.ogg$"'
  />

  <p>
    This command recursively lists all files in <code>&lt;dir&gt;</code> and
    pipes this list (with one filename per line) to <code>grep</code>. The
    latter then outputs only the lines that match at least one of the specified
    patterns. Let's dissect each part of the command:
  </p>

  <MapBlock>
    <code>-e &lt;pattern&gt;</code>
    <span>
      Specifies a pattern for <code>grep</code> to match. As shown above,
      <code>grep</code> can match multiple patterns.
    </span>

    <code>-i</code>
    <span>
      Directs <code>grep</code> to ignore case distinctions when searching for
      strings that match any of the given patterns, i.e., uppercase is not
      distinguished from lowercase.
    </span>
  </MapBlock>

  <p>
    The regular expressions <code>\.mp3$</code>, <code>\.flac$</code>, and
    <code>\.ogg$</code> are used to match the strings "<code>.mp3</code>",
    "<code>.flac</code>", and "<code>.ogg</code>", respectively, at the end of a
    line. In these expressions, the <code>$</code> symbol specifies the end of a
    line, while <code>\.</code> is used to match a literal dot character.
  </p>

  <SectionTitle>Alternative #2</SectionTitle>

  <p>Another command that achieves the exact same result is:</p>

  <CodeBlock
    code='grep -i -e "\.mp3$" -e "\.flac$" -e "\.ogg$" <(find -type f)'
  />

  <p>
    To understand how this works, note first that <code>grep</code> can take a
    file as input. For instance:
  </p>

  <CodeBlock code='grep "string" file.txt' />

  <p>
    will output all lines in <code>file.txt</code> containing
    <code>string</code>. In the solution presented here, a temporary file
    containing the output of the <code>find</code> command is automatically
    created, and the name of this file is passed as an argument to the
    <code>grep</code> command.
  </p>

  <p>
    In more detail, whenever a command is surrounded by parentheses, it is
    executed in a subshell, i.e., the active (parent) shell clones itself and
    runs the command within this cloned (child) shell. The syntax
    <code>&lt;(command)</code> directs the parent shell to also generate a
    temporary
    <a href="http://www.linuxjournal.com/article/2156?page=0,1">named pipe</a>
    to receive the output of <code>command</code> and to replace
    <code>&lt;(command)</code> with the name of that pipe. You can see what the
    name of a temporary named pipe looks like by running:
  </p>

  <CodeBlock code="echo <(ls)" />

  <p>The output will be similar to this:</p>

  <CodeBlock code="/dev/fd/63" />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
