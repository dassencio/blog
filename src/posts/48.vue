<template>
  <p>
    When writing programs, developers often rely on
    <a href="https://en.wikipedia.org/wiki/Library_%28computing%29"
      >libraries</a
    >
    to provide necessary functionalities. Although theoretically possible,
    writing programs without using functions from external libraries would lead
    to a significant increase in the volume of source code, even for the
    simplest programs. Additionally, such programs would be much harder to
    maintain and would take longer to compile. For these reasons, developers
    prefer to utilize readily available libraries provided by their operating
    systems or by third-party sources.
  </p>

  <p>
    When a program is compiled, it can leverage functions from a specific
    library by directly linking to it, either
    <a href="https://en.wikipedia.org/wiki/Static_library">statically</a> or
    <a href="https://en.wikipedia.org/wiki/Shared_libraries#Dynamic_linking"
      >dynamically</a
    >. When a library is statically linked to a program, its binary contents are
    incorporated into the program during compilation. In other words, the
    library becomes part of the binary version of the program (the
    "executable"). This linking process is performed by a program known as a "<a
      href="https://en.wikipedia.org/wiki/Linker_%28computing%29"
      >linker</a
    >". On Linux, this program is typically
    <a href="http://linux.die.net/man/1/ld"><code>ld</code></a
    >.
  </p>

  <p>
    This post focuses on the scenario where a library is dynamically linked to a
    program. In this case, the contents of the linked library do not become part
    of the program. Instead, when the program is compiled, a table containing
    the necessary symbols (e.g., function names) required for execution is
    created and stored in the compiled version of the program. This table is
    known as the program's "dynamic symbol table". During program execution, a
    <a href="https://en.wikipedia.org/wiki/Dynamic_linker">dynamic linker</a> is
    invoked to link the program with the dynamic (or "shared") libraries that
    contain the definitions of the symbols listed in its dynamic symbol table.
    On Linux, the dynamic linker responsible for this task is
    <a href="http://man7.org/linux/man-pages/man8/ld.so.8.html"
      ><code>ld-linux.so</code></a
    >. When a program is executed, <code>ld-linux.so</code> is first loaded into
    the
    <a href="https://en.wikipedia.org/wiki/Virtual_address_space"
      >address space</a
    >
    of the process and then loads all the necessary dynamic libraries (I won't
    delve into the details of this process, but curious readers can find ample
    information on how it happens
    <a
      href="https://web.archive.org/web/20140502182531/https://www.iecc.com/linker/linker10.html"
      >here</a
    >). The program only starts running after the required dynamic libraries
    have been loaded.
  </p>

  <p>
    During the compilation of a program, the path to the dynamic linker that the
    program needs to run is added to a special
    <a
      href="http://refspecs.linuxfoundation.org/LSB_1.1.0/gLSB/specialsections.html"
      >section</a
    >
    of the program's binary called <code>.interp</code>. To illustrate, let's
    consider this simple C program:
  </p>

  <CodeBlock
    language="c"
    code='
    #include <stdio.h>
    int main () {
      printf("Hello, world!\n");
      return 0;
    }
    '
  />

  <p>
    You can compile this program into an executable file named
    <code>main</code> using the following command:
  </p>

  <CodeBlock code="gcc main.c -o main" />

  <p>
    Now get the contents of the <code>.interp</code> section of
    <code>main</code>:
  </p>

  <CodeBlock code="readelf -p .interp main" />

  <p>The output should be similar to this:</p>

  <CodeBlock
    code="
    String dump of section '.interp':
      [     0]  /lib64/ld-linux-x86-64.so.2
    "
  />
  <p>
    On my system, <code>/lib64/ld-linux-x86-64.so.2</code>
    is a symbolic link to the executable file
    <code>/lib/x86_64-linux-gnu/ld-2.19.so</code>. In case you're wondering,
    <code>.so</code> stands for "shared object" and is the extension used for
    dynamically linked libraries on Linux.
  </p>

  <p>
    Now that we understand how dynamic libraries are loaded, the next question
    that arises is: how can we determine the symbols that a program requires
    from dynamically linked libraries in order to run? There are several ways to
    obtain that information, and one common approach is to use the
    <a href="http://linux.die.net/man/1/objdump"><code>objdump</code></a>
    command:
  </p>

  <CodeBlock code="objdump -T <program-name>" />

  <p>
    For the mentioned executable <code>main</code>, the output should resemble
    the following:
  </p>

  <CodeBlock
    code="
    main:     file format elf64-x86-64

    DYNAMIC SYMBOL TABLE:
    0000000000000000      DF *UND*  0000000000000000  GLIBC_2.2.5 puts
    0000000000000000      DF *UND*  0000000000000000  GLIBC_2.2.5 __libc_start_main
    0000000000000000  w   D  *UND*  0000000000000000              __gmon_start__
    "
  />

  <p>
    The output above highlights an intriguing fact: even to print a simple
    string such as "<code>Hello, world!</code>", a dynamic library is required.
    Specifically, the
    <a href="https://www.gnu.org/software/libc/libc.html">GNU C Library</a>
    (glibc) is needed because it contains the definitions of the functions
    <a href="http://man7.org/linux/man-pages/man3/puts.3.html"
      ><code>puts</code></a
    >
    and
    <a
      href="http://refspecs.linuxbase.org/LSB_3.1.1/LSB-Core-generic/LSB-Core-generic/baselib---libc-start-main-.html"
      ><code>__libc_start_main</code></a
    >, both of which are required for the program to run. And even if you
    comment out the <code>printf</code> line, the program will still require a
    definition of <code>__libc_start_main</code> from glibc.
  </p>

  <NoteBlock>
    The command <code>nm -D main</code> is equivalent to
    <code>objdump -T main</code>. Refer to the manual of <code>nm</code> for
    more details.
  </NoteBlock>

  <p>
    One way to generate a list of the dynamic libraries that a program requires
    to run is to use
    <a href="http://linux.die.net/man/1/ldd"><code>ldd</code></a
    >:
  </p>

  <CodeBlock code="ldd -v <program-name>" />

  <p>For the program above, this is what the output should look like:</p>

  <CodeBlock
    code="
    linux-vdso.so.1 =>  (0x00007fffcfdfe000)
    libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007f264e47d000)
    /lib64/ld-linux-x86-64.so.2 (0x00007f264e85f000)

    Version information:
    ./main:
    	libc.so.6 (GLIBC_2.2.5) => /lib/x86_64-linux-gnu/libc.so.6
    /lib/x86_64-linux-gnu/libc.so.6:
    	ld-linux-x86-64.so.2 (GLIBC_2.3) => /lib64/ld-linux-x86-64.so.2
    	ld-linux-x86-64.so.2 (GLIBC_PRIVATE) => /lib64/ld-linux-x86-64.so.2
    "
  />

  <p>
    This output is very informative: it tells us that <code>main</code> needs
    <code>libc.so.6</code> (glibc) to run, and <code>libc.so.6</code> requires
    <code>ld-linux-x86-64.so.2</code> (the dynamic linker) to be loaded.
  </p>

  <SectionTitle>Determining library locations</SectionTitle>

  <p>
    So far, we know that <code>ld-linux.so</code> is responsible for loading the
    dynamic libraries a program needs to run, but how does it know where to find
    them?
  </p>

  <p>
    This is where
    <a href="http://linux.die.net/man/8/ldconfig"><code>ldconfig</code></a>
    comes into play. The <code>ldconfig</code> utility scans directories
    commonly associated with dynamic libraries (<code>/lib</code> and
    <code>/usr/lib</code>), as well as those specified in
    <code>/etc/ld.so.conf</code>. It creates symbolic links to the detected
    libraries and also a cache (stored in <code>/etc/ld.so.cache</code>) that
    contains their locations, allowing <code>ld-linux.so</code> to find them
    quickly when needed. This process is initiated when you run
    <code>ldconfig</code> without any arguments (you can also add the
    <code>-v</code> option to see the scanned directories and the created
    symbolic links):
  </p>

  <CodeBlock code="sudo ldconfig" />

  <p>
    You can view the contents of the created cache with the
    <code>-p</code> option:
  </p>

  <CodeBlock code="ldconfig -p" />

  <p>
    The command above provides a comprehensive list of all the dynamic libraries
    found in the scanned directories. You can also use this command to check the
    version of a specific dynamic library on your system. For instance, to
    discover the installed version of the
    <a href="https://en.wikipedia.org/wiki/X_Window_System">X11</a> library, you
    can run:
  </p>

  <CodeBlock code="ldconfig -p | grep libX11" />

  <p>
    Here is the output I get on my laptop (running Xubuntu 14.04; note that
    dynamic library names typically follow the format
    <code>&lt;library-name&gt;.so.&lt;version&gt;</code>):
  </p>

  <CodeBlock
    code="
    libX11.so.6 (libc6,x86-64) => /usr/lib/x86_64-linux-gnu/libX11.so.6
    **libX11.so (libc6,x86-64) => /usr/lib/x86_64-linux-gnu/libX11.so**
    libX11-xcb.so.1 (libc6,x86-64) => /usr/lib/x86_64-linux-gnu/libX11-xcb.so.1
    libX11-xcb.so (libc6,x86-64) => /usr/lib/x86_64-linux-gnu/libX11-xcb.so
    "
  />

  <p>
    The highlighted line states that the symbols required from
    <code>libX11.so</code> can be found in
    <code>/usr/lib/x86_64-linux-gnu/libX11.so</code>. This file is likely a
    symbolic link to the dynamic library whose name specifies the version number
    we're seeking. You can determine the location of that file using the
    <a href="http://linux.die.net/man/2/readlink"><code>readlink</code></a>
    command:
  </p>

  <CodeBlock code="readlink -f /usr/lib/x86_64-linux-gnu/libX11.so" />

  <p>On my system, the output gives us the desired version number:</p>

  <CodeBlock code="/usr/lib/x86_64-linux-gnu/libX11.so.**6.3.0**" />

  <p>
    Symbolic links like the one just seen are also created by
    <code>ldconfig</code>. If you prefer to only create the symbolic links and
    not the cache, execute <code>ldconfig</code> with the
    <code>-N</code> option. To create only the cache without the symbolic links,
    use the <code>-X</code> option.
  </p>

  <p>
    Finally, it's worth noting that on Ubuntu/Debian systems,
    <code>ldconfig</code> is automatically executed after installing a dynamic
    library using <code>apt-get</code>. This ensures that the dynamic library
    cache is always up-to-date. You can verify this by installing a library that
    is not already present on your system and checking the output of
    <code>ldconfig -p</code>.
  </p>

  <SectionTitle>Observing <code>ld-linux.so</code> in action</SectionTitle>

  <p>
    You can visualize the dynamic libraries being loaded when a program is
    executed by using the
    <a href="http://linux.die.net/man/1/strace"><code>strace</code></a> command:
  </p>

  <CodeBlock code="strace ./main" />

  <p>
    The output should resemble the one shown below (the most relevant lines are
    highlighted for emphasis, and parts of the output were omitted for brevity):
  </p>

  <CodeBlock
    code='
    execve("./main", ["./main"], [/* 68 vars */]) = 0
    brk(0)                                  = 0x1d9b000
    access("/etc/ld.so.nohwcap", F_OK)      = -1 ENOENT (No such file or directory)
    mmap(NULL, 8192, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0) = 0x7f3bf95c7000
    access("/etc/ld.so.preload", R_OK)      = -1 ENOENT (No such file or directory)
    **open("/etc/ld.so.cache", O_RDONLY|O_CLOEXEC) = 3**
    fstat(3, {st_mode=S_IFREG|0644, st_size=103686, ...}) = 0
    mmap(NULL, 103686, PROT_READ, MAP_PRIVATE, 3, 0) = 0x7f3bf95ad000
    close(3)                                = 0
    access("/etc/ld.so.nohwcap", F_OK)      = -1 ENOENT (No such file or directory)
    **open("/lib/x86_64-linux-gnu/libc.so.6", O_RDONLY|O_CLOEXEC) = 3**
    read(3, "\177ELF\2\1\1\0\0\0\0\0\0\0\0\0\3\0>\0\1\0\0\0\320\37\2\0\0\0\0\0"..., 832) = 832
    fstat(3, {st_mode=S_IFREG|0755, st_size=1845024, ...}) = 0
    mmap(NULL, 3953344, PROT_READ|PROT_EXEC, MAP_PRIVATE|MAP_DENYWRITE, 3, 0) = 0x7f3bf8fe1000
    mprotect(0x7f3bf919d000, 2093056, PROT_NONE) = 0
    mmap(0x7f3bf939c000, 24576, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_FIXED|MAP_DENYWRITE, 3, 0x1bb000) = 0x7f3bf939c000
    mmap(0x7f3bf93a2000, 17088, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_FIXED|MAP_ANONYMOUS, -1, 0) = 0x7f3bf93a2000
    close(3)                                = 0
    ...
    exit_group(0)                           = ?
    +++ exited with 0 +++
    '
  />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
