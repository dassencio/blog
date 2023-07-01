<template>
  <p>
    Linux contains a nifty CLI tool called
    <a href="http://linux.die.net/man/1/pv"><code>pv</code></a> that monitors
    the progress of data transfers through pipes. This post shows a few
    interesting applications of <code>pv</code>.
  </p>

  <p>
    Before going through the examples, though, we first need a bit of theory to
    understand how <code>pv</code> works. In a nutshell, <code>pv</code> takes
    input from a pipe and outputs that input to its standard output stream while
    showing the data transfer progress on its standard error stream. To clarify,
    if you run:
  </p>

  <CodeBlock code="cat input.txt | pv > output.txt" />

  <p>
    the contents of <code>input.txt</code> will be piped to <code>pv</code>,
    which will then write them to <code>output.txt</code> as they are read from
    the pipe. During this process, <code>pv</code> displays the data transfer
    progress on the terminal (the default standard error stream). This is what
    it looks like:
  </p>

  <CodeBlock
    code="
    1.11GB 0:00:10 [88.9MB/s] [         <=>                                  ]
    "
  />

  <p>
    The output shows the amount of data already transferred, the time elapsed,
    the current data transfer rate through the pipe, and, if possible to
    determine, the progress of the transfer through the
    <code>&lt;=&gt;</code> marker (it moves to the right as the data is
    transferred to represent the current progress, but will bounce right and
    left when the progress cannot be determined). Okay, now it's fun time!
  </p>

  <SectionTitle>
    1) Measure the maximum sequential reading speed of a hard disk
  </SectionTitle>

  <p>
    If the
    <a href="https://en.wikipedia.org/wiki/Device_file">device node</a> through
    which your hard disk is accessible is <code>/dev/sda</code>, you can measure
    its maximum sequential reading speed with the following command:
  </p>

  <CodeBlock code="sudo cat /dev/sda | pv > /dev/null" />

  <p>On my laptop, the maximum sequential reading speed is about 100 MB/s:</p>

  <CodeBlock
    code="
    961MB 0:00:10 [ 102MB/s] [            <=>                               ]
    "
  />

  <SectionTitle>
    2) Measure how fast data can be transferred through a pipe
  </SectionTitle>

  <p>
    On Linux, the file
    <a href="https://en.wikipedia.org/wiki//dev/zero"><code>/dev/zero</code></a>
    is a device that constantly outputs the ASCII null character
    (<code>0x00</code>). This device is commonly used to completely erase the
    data on a disk by writing zeros over its entire extent with the following
    command or similar (<b>do not</b> run this in your terminal!):
  </p>

  <CodeBlock code="sudo dd if=/dev/zero of=/dev/sda" />

  <p>
    Because <code>/dev/zero</code> outputs null characters extremely fast, it
    can be used to measure the maximum speed at which data can be transferred
    through a pipe. The command below shows how this can be done (you will need
    to press <code>Ctrl + C</code> eventually to stop it since
    <code>/dev/zero</code> will never stop generating input for
    <code>pv</code>):
  </p>

  <CodeBlock code="cat /dev/zero | pv > /dev/null" />

  <p>The output I get on my laptop is similar to this:</p>

  <CodeBlock
    code="
    22.1GB 0:00:08 [2.85GB/s] [         <=>                                  ]
    "
  />

  <p>
    In other words, data can be piped at a rate of 2.85 GB/s (it actually
    oscillates between 2.5 GB/s and 3 GB/s on my system). That's pretty fast,
    but I have seen even faster speeds: 3.95 GB/s on my desktop computer.
  </p>

  <p>
    As a side note, the maximum speed at which <code>/dev/zero</code> can
    produce null characters can be estimated with the following command:
  </p>

  <CodeBlock code="dd if=/dev/zero of=/dev/null bs=1M status=progress" />

  <p>
    The transfer speed shown will take a few seconds to stabilize. Here is what
    the output typically looks like:
  </p>

  <CodeBlock
    code="
    106460872704 bytes (106 GB, 99 GiB) copied, 10 s **10.6 GB/s**
    "
  />

  <p>
    As the output shows, <code>/dev/zero</code> can indeed generate null
    characters really fast. The speed observed with the command above will
    however vary depending on the value passed to the <code>bs</code> parameter
    (which specifies how many bytes are transferred from
    <code>/dev/zero</code> to <code>/dev/null</code> at a time), so you might
    want to increase or decrease it to get a better estimate of the actual
    maximum speed of <code>/dev/zero</code>.
  </p>

  <SectionTitle>3) Measure the rate at which entropy is produced</SectionTitle>

  <p>
    Linux has an entropy pool that stores collected environmental noise from
    several devices (e.g., the hard disk, the keyboard, etc.). The kernel keeps
    an estimate of the number of bits of gathered noise in this entropy pool.
  </p>

  <p>
    The gathered entropy is used by the kernel to generate random numbers. For
    instance, if you run:
  </p>

  <CodeBlock code="cat /dev/random" />

  <p>
    you should see a bunch of characters on the screen, which are formed from
    random bits taken out of the entropy pool. By outputting random characters
    (bytes), the entropy pool loses bits of gathered noise. When it's depleted,
    the output will stop until more entropy is gathered.
  </p>

  <p>
    Using <code>pv</code>, you can see the rate at which entropy is produced on
    your computer by running the following command:
  </p>

  <CodeBlock code="cat /dev/random | pv > /dev/null" />

  <p>
    When my laptop is idle, no entropy is generated. However, as soon as I start
    typing, the entropy generation jumps to approximately 8 B/s. Moving my mouse
    erratically also causes the entropy generation rate to oscillate between 8
    B/s and 16 B/s. To generate entropy without having to act like a maniac, I
    ran the following command to recursively list all system files and
    directories, thereby generating a lot of hard disk activity:
  </p>

  <CodeBlock code="ls -R /" />

  <p>
    On my laptop, this gets the entropy generation rate to oscillate between 8
    B/s and 16 B/s.
  </p>

  <p>
    Readers who would like to learn more about entropy generation on Linux
    should take a look at the man page for <code>/dev/random</code>, which can
    be opened with the following command:
  </p>

  <CodeBlock code="man 4 /dev/random" />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
