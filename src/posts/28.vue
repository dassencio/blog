<template>
  <p>
    Linux contains a nifty CLI tool called
    <a href="http://linux.die.net/man/1/pv">pv</a> which monitors the progress
    of data transfers through pipes. This post shows a few interesting
    applications of pv.
  </p>

  <p>
    Before going through examples, though, we need a first bit of theory to
    understand how pv works. In a nutshell, pv takes input from a pipe and
    outputs that input to its standard output stream while showing the data
    transfer progress on its standard error stream. To clarify, if you run:
  </p>

  <CodeBlock code="cat input.txt | pv > output.txt" />

  <p>
    the contents of <code>input.txt</code> will be sent to pv, which will then
    output this data to its standard output stream (<code>output.txt</code>).
    The screen output will show the data transfer progress through pv's standard
    error stream (the terminal):
  </p>

  <CodeBlock
    code="
    1.11GB 0:00:10 [88.9MB/s] [         <=>                                  ]
    "
  />

  <p>
    The output shows the amount of data already transferred, the time elapsed,
    the current data transfer rate through the pipe and, if possible to
    determine, the progress of the transfer (the <code>&lt;=&gt;</code> marker
    moves to the right as the file is transferred to indicate the current
    progress; it will bounce right and left if the progress cannot be
    determined). OK, now it's fun time!
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

  <p>On my laptop, the maximum sequential reading speed is about 100MB/s:</p>

  <CodeBlock
    code="
    961MB 0:00:10 [ 102MB/s] [            <=>                               ]
    "
  />

  <p>
    The command above was tested on Ubuntu/Debian and may have to be adapted if
    you're using another Linux distribution.
  </p>

  <SectionTitle>
    2) Measure how fast data can be transferred through a pipe
  </SectionTitle>

  <p>
    On Linux, the file
    <a href="https://en.wikipedia.org/wiki//dev/zero"><code>/dev/zero</code></a>
    is a device which constantly outputs the ASCII null character
    (<code>0x00</code>). This device is commonly used to completely erase the
    data on a disk by writing zeros over its entire extension (<b>do not</b>
    run the command below unless you know what you're doing):
  </p>

  <CodeBlock code="sudo dd if=/dev/zero of=/dev/sda" />

  <p>
    Because <code>/dev/zero</code> outputs null characters extremely fast, it
    can be used to measure the maximum speed at which data can be transferred
    through a pipe. The command below shows how this can be done (you will
    eventually need to press Ctrl+C to stop it since <code>/dev/zero</code> will
    never stop generating input for pv):
  </p>

  <CodeBlock code="cat /dev/zero | pv > /dev/null" />

  <p>The output I get on my laptop is similar to this:</p>

  <CodeBlock
    code="
    22.1GB 0:00:08 [2.85GB/s] [         <=>                                  ]
    "
  />

  <p>
    In other words, data can be piped at a rate of 2.85GB/s (it actually
    oscillates between 2.5GB/s and 3GB/s on my system). That's pretty fast, but
    I have seen even faster speeds: 3.95GB/s on my desktop computer.
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
    <code>/dev/zero</code> to <code>/dev/null</code> at a time), so you may want
    to increase it or decrease it to get a better estimate of the actual maximum
    speed of <code>/dev/zero</code>.
  </p>

  <SectionTitle>3) Measure the rate at which entropy is produced</SectionTitle>

  <p>
    Linux has an entropy pool which stores collected environmental noise from
    several devices (e.g. the hard disk, the keyboard etc.). The kernel keeps an
    estimate of the number of bits of gathered noise in this entropy pool.
  </p>

  <p>
    The gathered entropy is used by the kernel to generate random numbers. For
    instance, if you run:
  </p>

  <CodeBlock code="cat /dev/random" />

  <p>
    you should see a bunch of characters on the screen which are formed from
    random bits taken out of the entropy pool. By outputting random characters
    (bytes), the entropy pool loses bits of gathered noise. When it's depleted,
    the output will stop until more entropy is gathered.
  </p>

  <p>
    Now, back to pv: to see the rate at which entropy is produced in your
    computer, run:
  </p>

  <CodeBlock code="cat /dev/random | pv > /dev/null" />

  <p>
    When my laptop is idle, no entropy is generated. However, as soon as I start
    typing, the entropy generation jumps to approximately 8B/s. Moving my mouse
    erratically also causes the entropy generation to oscillate between 8B/s and
    16B/s. To generate entropy without having to act like a maniac, I ran the
    following command:
  </p>

  <CodeBlock code="ls -R /" />

  <p>
    The command above will recursively list all system files and therefore
    generate lots of hard disk activity. On my laptop, this gets the entropy
    generation rate to oscillate between 8B/s and 16B/s.
  </p>

  <p>
    <b>NOTE</b>: Readers who would like to learn more about this topic should
    take a look at the man page of <code>/dev/random</code> with the following
    command:
  </p>

  <CodeBlock code="man 4 /dev/random" />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
