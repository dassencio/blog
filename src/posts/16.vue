<template>
  <p>
    To resize images on Linux via command line, you can use a tool called
    <a href="http://linux.die.net/man/1/convert">convert</a> which is part of
    the
    <a href="http://linux.die.net/man/1/imagemagick">ImageMagick</a> package. If
    you're using Ubuntu/Debian, you can install it by opening a terminal and
    running the following command:
  </p>

  <CodeBlock>sudo apt-get install imagemagick</CodeBlock>

  <p>
    Here is an example of how to resize a JPEG file to
    <code>640x480</code> pixels:
  </p>

  <CodeBlock
    >convert -resize 640x480 &lt;input-file.jpg&gt;
    &lt;output-file.jpg&gt;</CodeBlock
  >

  <p>
    The command above takes an image called
    <code>input-file.jpg</code>, resizes it to <code>640x480</code> pixels and
    outputs the result to <code>output-file.jpg</code>.
  </p>

  <p>
    You can also use a percentage value to resize an image. For instance, to
    shrink an image to 50% of its original size, run:
  </p>

  <CodeBlock
    >convert -resize 50% &lt;input-file.jpg&gt;
    &lt;output-file.jpg&gt;</CodeBlock
  >
</template>
