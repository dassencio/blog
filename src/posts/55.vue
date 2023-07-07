<template>
  <p>
    Before we delve into the
    <a href="http://manpages.ubuntu.com/manpages/saucy/man1/lscpu.1.html"
      ><code>lscpu</code></a
    >
    command, it's important to understand a key concept: each thread of
    execution in a
    <a href="https://en.wikipedia.org/wiki/Multi-core_processor"
      >physical core</a
    >
    that is capable of
    <a href="https://en.wikipedia.org/wiki/Simultaneous_multithreading"
      >simultaneous multithreading</a
    >
    is recognized by the operating system as an independent
    <a href="https://en.wikipedia.org/wiki/Central_processing_unit"
      >processing unit</a
    >. As such, a physical core with two threads of execution appears to the
    operating system as two logical cores.
  </p>

  <p>
    In Linux terminology, a CPU is the smallest hardware unit capable of
    executing a thread, so in the discussion below, the term CPU will be used
    interchangeably with hardware thread when the context permits.
  </p>

  <p>
    Let's now start with the basics: <code>lscpu</code> is a very useful command
    that shows a lot of important information regarding the CPU architecture of
    a system. Below is the output of <code>lscpu</code> for
    <a
      href="http://ark.intel.com/products/49022/Intel-Core-i5-450M-Processor-3M-cache-2_40-GHz"
      >my laptop's CPU package</a
    >. Let's examine what it reveals:
  </p>

  <CodeBlock
    code="
    Architecture:          x86_64
    CPU op-mode(s):        32-bit, 64-bit
    Byte Order:            Little Endian
    **CPU(s):                4**
    On-line CPU(s) list:   0-3
    **Thread(s) per core:    2**
    **Core(s) per socket:    2**
    **Socket(s):             1**
    **NUMA node(s):          1**
    Vendor ID:             GenuineIntel
    CPU family:            6
    Model:                 37
    Stepping:              5
    CPU MHz:               1199.000
    BogoMIPS:              4787.75
    Virtualization:        VT-x
    L1d cache:             32K
    L1i cache:             32K
    L2 cache:              256K
    L3 cache:              3072K
    **NUMA node0 CPU(s):     0-3**
    "
  />

  <p>
    Most of the information above is relatively easy to interpret. My laptop
    has:
  </p>

  <ListBlock>
    <ListBlockItem>
      Two physical cores, since it has one
      <a href="https://en.wikipedia.org/wiki/CPU_socket">socket</a> and two
      cores per socket.
    </ListBlockItem>
    <ListBlockItem>
      Four threads of execution, since it has two threads per core.
    </ListBlockItem>
    <ListBlockItem>
      Four CPUs, since Linux recognizes each thread as a CPU.
    </ListBlockItem>
    <ListBlockItem>
      One
      <a href="https://en.wikipedia.org/wiki/Non-uniform_memory_access"
        >NUMA node</a
      >, to which all threads (CPUs) are associated.
    </ListBlockItem>
  </ListBlock>

  <p>
    Having a single NUMA node means that all CPUs are equally distant from the
    <a href="https://en.wikipedia.org/wiki/Random-access_memory"
      >physical memory</a
    >, so the memory access time is the same for every CPU.
  </p>

  <p>
    The output above states that my CPU architecture is Intel
    <a href="https://en.wikipedia.org/wiki/X86-64">x86-64</a> and also shows the
    sizes of all the
    <a href="https://en.wikipedia.org/wiki/CPU_cache">caches</a>. One important
    piece of information that it does not show is the cache-to-CPU association,
    i.e., how the different cache types are associated with each CPU. This
    information can however be retrieved by passing the <code>-p</code> flag
    (or, equivalently, <code>--parse</code>) to <code>lscpu</code>:
  </p>

  <CodeBlock code="lscpu -p" />

  <p>
    The output is now a bit more interesting but requires more effort to
    interpret:
  </p>

  <CodeBlock
    code="
    # The following is the parsable format, which can be fed to other
    # programs. Each different item in every column has an unique ID
    # starting from zero.
    # CPU,Core,Socket,Node,,L1d,L1i,L2,L3
    0,0,0,0,,0,0,0,0
    1,1,0,0,,1,1,1,0
    2,0,0,0,,0,0,0,0
    3,1,0,0,,1,1,1,0
    "
  />

  <p>
    As the comment at the top indicates, each line corresponds to a CPU,
    starting with CPU <code>0</code>. The values in each line represent the
    following (see also <FigureLink id="cache-hierarchy" />):
  </p>

  <MapBlock>
    <b>CPU core</b>
    <span>
      The CPU index, i.e., the index of a thread of execution. Since my laptop
      has four CPUs in total, these values range from <code>0</code> to
      <code>3</code>.
    </span>

    <b>Physical core</b>
    <span>
      Index of the physical core to which the CPU belongs. Since my laptop has
      only two physical cores, we see that CPUs <code>0</code> and
      <code>2</code> are threads from core <code>0</code>, while CPUs
      <code>1</code> and <code>3</code> are threads from core <code>1</code>.
    </span>

    <b>Socket number</b>
    <span>
      Index of the physical socket to which the CPU belongs. Laptops technically
      don't have sockets, as their CPU packages are
      <a href="https://en.wikipedia.org/wiki/Surface_mount">surface-mounted</a>,
      but Linux treats these as a single socket. This is why all CPUs are listed
      under socket <code>0</code>.
    </span>

    <b>NUMA node</b>
    <span>
      Index of the NUMA socket node to which the CPU belongs. Since my laptop
      does not have separate NUMA nodes, all CPUs belong to NUMA node
      <code>0</code>.
    </span>

    <b>Book number</b>
    <span>
      Logical book number of the CPU.
      <a href="http://en.wikipedia.org/wiki/Processor_book">Processor books</a>
      exist in
      <a href="http://marc.info/?l=util-linux-ng&amp;m=130986537002859&amp;w=2"
        >very few</a
      >
      architectures. My laptop has no books, so this field is empty for all
      CPUs.
    </span>

    <b>L1 data cache (L1d)</b>
    <span>
      Index of the L1 data cache associated with the CPU. My laptop has two L1d
      caches, one for each physical core, so threads from the same core share a
      single L1d cache.
    </span>

    <b>L1 instruction cache (L1i)</b>
    <span>
      Index of the L1 instruction cache associated with the CPU. My laptop has
      two L1i caches, one for each physical core, so threads from the same core
      share a single L1i cache.
    </span>

    <b>L2 cache</b>
    <span>
      Index of the L2 cache associated with the CPU. My laptop has two L2
      caches, one for each physical core, so threads from the same core share a
      single L2 cache.
    </span>

    <b>L3 cache</b>
    <span>
      Index of the L3 cache associated with the CPU. My laptop has a single L3
      cache, which is shared by all CPUs, therefore the L3 cache index is
      <code>0</code> for all of them.
    </span>
  </MapBlock>

  <FigureBlock
    id="cache-hierarchy"
    caption="CPU architecture information obtained with the <code>lscpu</code>
             command."
  >
    <ResponsiveImage alt="Cache hierarchy" :src="cacheHierarchy" />
  </FigureBlock>

  <p>
    Finally, to obtain only the bits of architectural information you're
    interested in, you can pass a list of parameters to
    <code>-p</code> to specify exactly what you want. These parameters can be:
    <code>cpu</code>, <code>core</code>, <code>socket</code>, <code>node</code>,
    <code>book</code>, and <code>cache</code>. For example, to get the index of
    the physical socket to which each CPU belongs, run the following command:
  </p>

  <CodeBlock code="lscpu -p=cpu,node | grep -v ^#" />

  <p>
    The <code>grep</code> part of the command removes the comment lines that
    appear at the top of the output from <code>lscpu</code>. The resulting
    output will contain only the columns you requested:
  </p>

  <CodeBlock
    code="
    0,0
    1,0
    2,0
    3,0
    "
  />

  <p>
    Above, the parameter <code>cpu</code> was passed to make the output easier
    to interpret, but it can be omitted if you do not want the CPU index to be
    printed.
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";
import cacheHierarchy from "@/assets/images/cache-hierarchy-intel-i5-m450.svg";

onMounted(() => onViewMounted());
</script>
