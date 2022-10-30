<template>
  <p>
    On Linux, you can concatenate PDF files using a CLI tool called
    <a href="http://linux.die.net/man/1/pdfjam"><code>pdfjam</code></a
    >. To install it on Ubuntu/Debian, open a terminal and run:
  </p>

  <CodeBlock>sudo apt-get install pdfjam</CodeBlock>

  <p>You can now concatenate as many PDF files as you wish by running:</p>

  <CodeBlock
    >pdfjam file1.pdf file2.pdf ... fileN.pdf --outfile output-file.pdf
  </CodeBlock>

  <p>
    This will generate a file called <code>output-file.pdf</code> which will be
    the result of joining together the input files <code>file1.pdf</code>,
    <code>file2.pdf</code>, ..., <code>fileN.pdf</code>.
  </p>

  <p>
    If you do not get the desired page orientation in the generated file, you
    can set it by hand by adding
    <code>--landscape</code> or <code>--no-landscape</code> to the end of the
    command above.
  </p>

  <p>
    If you have problems with the page orientations when concatenating lots of
    files together, try concatenating only a few of them at a time and then
    concatenating the intermediate files you generated into a final document.
  </p>
</template>
