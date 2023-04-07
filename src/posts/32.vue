<template>
  <p>
    Suppose you wish to generate a list of all songs in a directory (including
    its subdirectories), and that the songs are stored in the MP3, FLAC and Ogg
    Vorbis formats. How can this song list be obtained via CLI?
  </p>

  <p>
    One possible way is by using the
    <a href="http://man7.org/linux/man-pages/man1/find.1.html">find</a>
    tool with the following command:
  </p>

  <CodeBlock
    code='
    find <dir> -type f -iname "*.mp3" -o -iname "*.flac" -o -iname "*.ogg"
    '
  />

  <p>
    where <code>dir</code> is the path to the directory where the file search
    will be performed (either an absolute path or a relative path with respect
    to the current working directory). Let's go over each part of this command
    to understand what it does:
  </p>

  <MapBlock>
    <code>-type f</code>
    <span>
      Match only regular files. Directories and other file types such as
      sockets, pipes, devices etc. are ignored.
    </span>

    <code>-iname &lt;pattern&gt;</code>
    <span>
      Ignore case distinctions when searching for files whose names match the
      given pattern, i.e., uppercase is not distinguished from lowercase.
    </span>

    <code>... -o ...</code>
    <span><code>OR</code> operator for matching multiple patterns.</span>
  </MapBlock>

  <SectionTitle>Alternative #1</SectionTitle>

  <p>
    It's also possible to use
    <a href="https://linux.die.net/man/1/grep">grep</a> to do the pattern
    matching work:
  </p>

  <CodeBlock
    code='
    find <dir> -type f | grep -i -e "\.mp3$" -e "\.flac$" -e "\.ogg$"
    '
  />

  <p>
    This will recursively list all files in <code>dir</code> and use this file
    list (with one filename per line) as input to grep, which will then output
    only the lines matching at least one of the specified patterns. As for the
    grep parameters:
  </p>

  <MapBlock>
    <code>-e &lt;pattern&gt;</code>
    <span>
      Specify a pattern to be matched by grep. As shown above, grep can match
      multiple patterns.
    </span>

    <code>-i</code>
    <span>
      Ignore case distinctions when searching for strings which match any of the
      given patterns, i.e., uppercase is not distinguished from lowercase.
    </span>
  </MapBlock>

  <p>
    Regular expressions such as <code>\.mp3$</code> match the string
    "<code>.mp3</code>" at the end of a line, and similar for
    <code>\.flac$</code> and <code>\.ogg$</code>. The <code>$</code> symbol
    matches the end of a line, and <code>\.</code> matches a literal dot
    character.
  </p>

  <SectionTitle>Alternative #2</SectionTitle>

  <p>Another command which achieves the exact same result is:</p>

  <CodeBlock
    code='
    grep -i -e "\.mp3$" -e "\.flac$" -e "\.ogg$" <(find -type f)
    '
  />

  <p>
    To understand how it works, notice first that grep can take a file as input,
    so:
  </p>

  <CodeBlock code='grep "string" file.txt' />

  <p>
    will output all lines in <code>file.txt</code> containing
    <code>string</code>. In the solution presented here, a temporary file
    containing the output of the <code>find</code> command is automatically
    created and the name of this file is passed as an argument to the
    <code>grep</code> command.
  </p>

  <p>
    In more detail, whenever a command is surrounded by parentheses, it's
    executed in a subshell, i.e., the active (parent) shell clones itself and
    runs the command within this cloned (child) shell. The syntax
    <code>&lt;(command)</code> directs the parent shell to also generate a
    temporary
    <a href="http://www.linuxjournal.com/article/2156?page=0,1">named pipe</a>
    to receive the output of <code>command</code> and to replace
    <code>&lt;(command)</code>
    with the name of that pipe. You can see what the name of a temporary named
    pipe looks like by running:
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
