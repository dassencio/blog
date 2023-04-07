<template>
  <p>
    Suppose you wish to generate a list containing all songs in a directory
    (including its subdirectories), and that the songs are stored in the MP3,
    FLAC and Ogg Vorbis formats. How can you generate this song list using the
    command line?
  </p>

  <p>
    One way to achieve this is by using the
    <a href="http://man7.org/linux/man-pages/man1/find.1.html">find</a>
    tool through the following command:
  </p>

  <CodeBlock
    code='
    find <dir> -type f -iname "*.mp3" -o -iname "*.flac" -o -iname "*.ogg"
    '
  />

  <p>
    where <code>dir</code> is the name of the directory where the file search
    will be performed. If the target directory for the file search is the
    current working directory, <code>dir</code> can be replaced by the dot
    character (or omitted entirely):
  </p>

  <CodeBlock
    code='
    find . -type f -iname "*.mp3" -o -iname "*.flac" -o -iname *.ogg
    '
  />

  <p>
    Now let's go over each part of the original command to understand what it
    does:
  </p>

  <MapBlock>
    <code>-type f</code>
    <span>
      Matches only regular files. Directories and other file types such as
      sockets, pipes, devices etc. are ignored.
    </span>

    <code>-iname &lt;pattern&gt;</code>
    <span>
      Ignores case distinctions when searching for files whose names match the
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
    This will recursively list all files in the current working directory and
    use this file list (with one filename per line) as input to grep, which will
    then output only the lines matching one of the specified patterns. As for
    the flags:
  </p>

  <MapBlock>
    <code>-e &lt;pattern&gt;</code>
    <span>
      Matches the given pattern (a regular expression). As shown above, you can
      specify multiple patterns to be matched by grep.
    </span>

    <code>-i</code>
    <span>
      Ignores case distinctions when searching for strings which match the given
      pattern, i.e., uppercase is not distinguished from lowercase.
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
    grep -i -e "\.mp3$" -e "\.flac$" -e "\.ogg$" &lt;(find -type f)
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
    to receive the output of <code>command</code> and then replace
    <code>&lt;(command)</code>
    with the name of that pipe. You can see what the name of these temporary
    named pipes look like by running:
  </p>

  <CodeBlock code="echo &lt;(ls)" />

  <p>The output will be similar to this:</p>

  <CodeBlock code="/dev/fd/63" />
</template>
