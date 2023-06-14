<template>
  <p>
    Linux provides the capability to specify the logical cores on which a
    process is allowed to run. The term "logical cores" is used instead of
    "physical cores" because a single physical core can often execute
    <a href="https://en.wikipedia.org/wiki/Simultaneous_multithreading"
      >multiple threads simultaneously</a
    >. In this scenario, each thread of execution is seen by the operating
    system as an independent
    <a href="https://en.wikipedia.org/wiki/Central_processing_unit"
      >processing unit</a
    >, which is referred to as a logical core. For example, a physical core that
    supports two threads of execution is recognized by the operating system as
    two logical cores. This allows for processes to be
    <a href="https://en.wikipedia.org/wiki/Scheduling_%28computing%29"
      >scheduled</a
    >
    on specific logical cores, without excluding other processes from utilizing
    them as needed.
  </p>

  <p>
    In Linux terminology, a CPU refers to the smallest hardware unit capable of
    executing a thread. Hence, the term CPU is used interchangeably with logical
    core in the following discussion.
  </p>

  <p>
    The set of CPUs on which a process is allowed to run is called its
    <a href="https://en.wikipedia.org/wiki/Processor_affinity">CPU affinity</a>.
    One tool that controls the CPU affinity of processes on Linux is
    <a href="https://man7.org/linux/man-pages/man1/taskset.1.html"
      ><code>taskset</code></a
    >.
  </p>

  <p>
    Using <code>taskset</code>, one can start a new process on a specified set
    of CPUs as well as modify the CPU affinity of a running process. To
    understand how it works, first open a terminal and get the
    <a href="https://en.wikipedia.org/wiki/Process_identifier">PID</a> of some
    running process on your system (e.g., your web browser):
  </p>

  <CodeBlock code="pidof firefox" />

  <p>
    Assuming there is a single running instance of <code>firefox</code>, you
    should get a single PID. Now you can use <code>taskset</code> to retrieve
    the sets of CPUs on which every thread created by the
    <code>firefox</code> process is currently allowed to run:
  </p>

  <CodeBlock code="taskset -a -p -c <pid>" />

  <p>
    The output of the command above should be similar to this (you might see
    many more threads than shown below):
  </p>

  <CodeBlock
    code="
    pid **14367**'s current affinity list: 0-3
    pid 14388's current affinity list: 0-3
    pid 14389's current affinity list: 0-3
    pid 14390's current affinity list: 0-3
    pid 14391's current affinity list: 0-3
    pid 14392's current affinity list: 0-3
    "
  />

  <p>
    In my case, the PID of <code>firefox</code> is <code>14367</code>. All other
    processes shown above are actually threads belonging to the original
    <code>firefox</code> process (<code>14367</code>). Given that
    <a
      href="http://ark.intel.com/products/49022/Intel-Core-i5-450M-Processor-3M-cache-2_40-GHz"
      >my laptop's CPU package</a
    >
    has four logical cores (two physical cores with
    <a href="https://en.wikipedia.org/wiki/Hyper-threading">Hyper-Threading</a
    >), the list <code>0-3</code> means the process is allowed to run on every
    logical core available. You can find the total number of logical cores on
    your device by running
    <a href="https://linux.die.net/man/1/lscpu"><code>lscpu</code></a
    >; if your processor supports simultaneous multithreading (SMT), the value
    of "thread(s) per core" will be larger than <code>1</code>.
  </p>

  <p>
    By default, a process is allowed to run on every CPU. To change the allowed
    set of CPUs for all threads of an already running process, do as shown
    below:
  </p>

  <CodeBlock code="sudo taskset -a -p -c <cpu-list> <pid>" />

  <p>
    If you omit <code>-a</code>, only the CPU affinity of the thread with PID
    <code>&lt;pid&gt;</code> will be changed. Above,
    <code>&lt;cpu-list&gt;</code> can be specified with commas, ranges, or
    combinations of both. For instance, <code>0,3-5,7</code> is equivalent to
    <code>0,3,4,5,7</code>.
  </p>

  <p>
    As indicated by the command above, you need administrative privileges to
    change the CPU affinity of a running process. Technically, a program
    requires only the
    <a href="http://man7.org/linux/man-pages/man7/capabilities.7.html"
      ><code>CAP_SYS_NICE</code> capability</a
    >
    to change the CPU affinities of other processes, but this is outside the
    scope of this post.
  </p>

  <p>
    To start a process and specify its CPU affinity right away (as well as the
    CPU affinity of all threads created by this process), run:
  </p>

  <CodeBlock code="taskset -c <cpu-list> <command>" />

  <SectionTitle>CPU affinity bitmasks</SectionTitle>

  <p>
    For convenience, bitmasks can also be used instead of lists when specifying
    CPU affinities. By omitting the <code>-c</code> option and using hexadecimal
    notation, with the least significant bit representing the first logical
    core, you can achieve this. Note that this will also display outputs as
    bitmasks. Here is an example:
  </p>

  <CodeBlock code="taskset -a -p 0x6 <pid>" />

  <p>
    This sets the CPU affinity of all threads of a process whose PID is
    <code>&lt;pid&gt;</code> to <code>1,2</code> (<code>0x6</code> is
    <code>110</code> in binary representation).
  </p>

  <SectionTitle>Linux kernel threads</SectionTitle>

  <p>
    You can visualize the CPU affinities of all threads from all processes
    running in the system with the following command:
  </p>

  <CodeBlock
    code="
    for pid in $(ps -eLf | awk '{print $2}'); do taskset -a -c -p $pid; done
    "
  />

  <p>
    It's very likely that the threads that are not allowed to run on all logical
    cores of your system (excluding those whose CPU affinities you have set
    yourself) are
    <a href="http://www.tldp.org/FAQ/Threads-FAQ/Types.html">kernel threads</a>.
    To verify that, use the list of PIDs from the output of the command above
    and look at the output of the following command for some process that is not
    allowed to run on all CPUs:
  </p>

  <CodeBlock code="ps -up <pid>" />

  <p>
    If the process name (which appears under the column <code>COMMAND</code>) is
    shown inside square brackets (e.g. <code>[kdmflush]</code>), it's a kernel
    thread.
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
