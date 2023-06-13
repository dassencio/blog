<template>
  <p>
    Linux allows one to specify the logical cores on which a given process is
    allowed to run. The reason for referring to logical instead of physical
    cores is due to the fact that each thread of execution of a physical core,
    capable of
    <a href="https://en.wikipedia.org/wiki/Simultaneous_multithreading"
      >simultaneous multithreading</a
    >, is presented to the operating system as an independent
    <a href="https://en.wikipedia.org/wiki/Central_processing_unit"
      >processing unit</a
    >. Therefore, a physical core with two threads of execution is seen by the
    operating system as two (logical) cores, meaning processes can be
    <a href="https://en.wikipedia.org/wiki/Scheduling_%28computing%29"
      >scheduled</a
    >
    to run on a single logical core or on an arbitrary combination of them.
  </p>

  <p>
    In Linux terminology, a CPU is the smallest hardware unit capable of
    executing a thread, so the term CPU will be used below as a synonym for
    logical core whenever the context permits.
  </p>

  <p>
    The set of CPUs on which a process is allowed to run is called its
    <a href="https://en.wikipedia.org/wiki/Processor_affinity"
      >processor affinity</a
    >. One tool that controls the processor affinity of processes on Linux is
    <a href="http://linuxcommand.org/man_pages/taskset1.html"
      ><code>taskset</code></a
    >.
  </p>

  <p>
    Using <code>taskset</code>, one can run a given command on a single CPU or
    on a specified set of CPUs; a user with sufficient privileges can also use
    <code>taskset</code> to change the CPU affinity of a running process. To
    understand how <code>taskset</code> works, open a terminal and get the PID
    of some running process on your system (e.g., your web browser):
  </p>

  <CodeBlock code="pidof firefox" />

  <p>
    Assuming you have a single instance of <code>firefox</code>
    running on your system, you should get a single PID. Now you can use
    <code>taskset</code> to retrieve the sets of CPUs on which every thread
    created by the <code>firefox</code> process is currently allowed to run:
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
    <a href="http://www.unix.com/man-page/linux/1/lscpu/"><code>lscpu</code></a
    >; if your processor supports simultaneous multithreading (SMT), the value
    of "thread(s) per core" will be larger than <code>1</code>.
  </p>

  <p>
    By default, a process is allowed to run on every CPU. To change the allowed
    set of CPUs for all threads of an already running process, do as shown
    below:
  </p>

  <CodeBlock code="taskset -a -p -c <cpu-list> <pid>" />

  <p>
    If you omit <code>-a</code>, only the CPU affinity of the thread whose PID
    is <code>&lt;pid&gt;</code> will be changed (for processes which have a
    single thread, using <code>-a</code> or not yields the same result). If you
    only wish to change the CPU affinity of a single thread of a process, all
    you have to do then is to omit <code>-a</code> and specify the thread's PID
    directly. Above, <code>&lt;cpu-list&gt;</code> can be specified with commas,
    ranges, or combinations of both: <code>1,3-5,7</code> is equivalent to
    <code>1,3,4,5,7</code>.
  </p>

  <p>
    You need to have administrative privileges to change the CPU affinity of a
    running process (technically, a program needs only the
    <code>CAP_SYS_NICE</code>
    <a href="http://man7.org/linux/man-pages/man7/capabilities.7.html"
      >capability</a
    >
    to change CPU affinities of other processes, but this is outside the scope
    of this post).
  </p>

  <p>
    To start a process and specify its CPU affinity right away (as well as the
    CPU affinity of all threads created by this process), use:
  </p>

  <CodeBlock code="taskset -c <cpu-list> <command>" />

  <SectionTitle>CPU affinity bitmasks</SectionTitle>

  <p>
    In some applications, using bitmasks might be more convenient than using
    lists. <code>taskset</code> also takes bitmasks as input, with the least
    significant bit representing the first logical core. If you wish to specify
    CPU affinities using bitmasks, just omit the <code>-c</code> option in the
    commands above and specify the desired CPUs in hexadecimal notation
    (omitting <code>-c</code> also means outputs will be shown as bitmasks
    instead of lists). As an example:
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
    It is very likely that the threads which are not allowed to run on all
    logical cores of your system (excluding those whose CPU affinities you have
    set yourself) are
    <a href="http://www.tldp.org/FAQ/Threads-FAQ/Types.html">kernel threads</a>.
    To verify that, use the list of PIDs from the output of the command above
    and look at the output of the following
    <a href="http://linux.die.net/man/1/ps"><code>ps</code></a>
    command for some process which is not allowed to run on all CPUs:
  </p>

  <CodeBlock code="ps -up <pid>" />

  <p>
    If the process name (which appears under the column <code>COMMAND</code>) is
    shown inside square brackets (e.g. <code>[kdmflush]</code>), it is a kernel
    thread.
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
