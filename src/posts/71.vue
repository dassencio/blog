<template>
  <p>
    Writing to binary files in Python is straightforward. One way to do it is by
    opening a file for writing in
    <a
      href="https://docs.python.org/3.3/tutorial/inputoutput.html#reading-and-writing-files"
      >binary mode</a
    >
    and then writing data to it using hexadecimal strings:
  </p>

  <CodeBlock
    language="python"
    code="
    output_file = open('myfile.bin', 'wb')

    output_file.write(b'\x0a\x1b\x2c')
    output_file.write(b'\x3d\x4e\x5f')

    output_file.close()
    "
  />

  <p>
    If you're using Linux, you can directly inspect the contents of
    <code>myfile.bin</code> using a CLI tool called
    <a href="http://linux.die.net/man/1/hexdump"><code>hexdump</code></a
    >. To do this, open a terminal and execute the following command:
  </p>

  <CodeBlock code="hexdump -C myfile.bin" />

  <p>
    The <code>-C</code> option instructs <code>hexdump</code> to display the
    contents of the file in hexadecimal form (and also as an ASCII string on the
    right side). The output of the command above is:
  </p>

  <CodeBlock
    code="
    00000000  0a 1b 2c 3d 4e 5f                                 |..,=N_|
    00000006
    "
  />

  <p>
    A dot on the right side represents either a byte that holds the ASCII code
    for the dot character (<code>'.'</code>) or a byte that does not correspond
    to a printable ASCII character.
  </p>

  <p>
    While the approach above suffices for simple data, it can become cumbersome
    for more complex data structures. Think about the challenges of writing a
    variety of objects, like integer values, strings, and lists, to the binary
    file. In order to be able to read the file's contents later, we would need
    to either embed metadata outlining the file's structure or consistently
    adhere to a predefined structure when writing the file. The task of
    translating each object into a byte sequence and ensuring its correct order
    in the file would further complicate matters. This process would be
    especially challenging for objects with variable lengths, such as strings
    and lists.
  </p>

  <p>
    Fortunately, Python offers a convenient module for object serialization and
    deserialization:
    <a href="https://docs.python.org/3/library/pickle.html"
      ><code>pickle</code></a
    >. It provides two main functions: <code>dump</code> and <code>load</code>.
    The <code>dump</code> function
    <a href="https://en.wikipedia.org/wiki/Serialization">serializes</a> an
    object (i.e., converts it into a
    <a href="https://en.wikipedia.org/wiki/Bitstream">bitstream</a>) and writes
    it to a file, while the <code>load</code> function reads a serialized object
    from a file and reconstructs it in memory, allowing it to be assigned to a
    variable. Although there are certain data types that
    <code>pickle</code> cannot process, it effectively serializes most objects
    commonly used in Python programs. The example below illustrates this. A
    detailed list of data types supported by <code>pickle</code> can be found
    <a
      href="https://docs.python.org/3/library/pickle.html#what-can-be-pickled-and-unpickled"
      >here</a
    >.
  </p>

  <CodeBlock
    language="python"
    code="
    import pickle

    output_file = open('myfile.bin', 'wb')

    var_int = 42
    var_str = 'Hello, world!'
    var_list = ['dog', 'cat', 'lizard']
    var_dict = {'name': 'Bob', 'job': 'Astronaut'}

    pickle.dump(var_int, output_file)
    pickle.dump(var_str, output_file)
    pickle.dump(var_list, output_file)
    pickle.dump(var_dict, output_file)

    output_file.close()
    "
  />

  <p>
    The contents of the generated binary file will differ between Python 2.x and
    3.x because the default
    <a href="https://docs.python.org/3.4/library/pickle.html#data-stream-format"
      >serialization protocol</a
    >
    that <code>pickle</code> uses has evolved over time. I recommend always
    using Python 3.x with <code>pickle</code> to sidestep potential
    compatibility issues. For those curious, here are the contents of
    <code>myfile.bin</code> obtained using <code>hexdump</code>, assuming the
    script above runs on Python 3.4.0:
  </p>

  <CodeBlock
    code="
    00000000  80 03 4b 2a 2e 80 03 58  0d 00 00 00 48 65 6c 6c  |..K*...X....Hell|
    00000010  6f 2c 20 77 6f 72 6c 64  21 71 00 2e 80 03 5d 71  |o, world!q....]q|
    00000020  00 28 58 03 00 00 00 64  6f 67 71 01 58 03 00 00  |.(X....dogq.X...|
    00000030  00 63 61 74 71 02 58 06  00 00 00 6c 69 7a 61 72  |.catq.X....lizar|
    00000040  64 71 03 65 2e 80 03 7d  71 00 28 58 04 00 00 00  |dq.e...}q.(X....|
    00000050  6e 61 6d 65 71 01 58 03  00 00 00 42 6f 62 71 02  |nameq.X....Bobq.|
    00000060  58 03 00 00 00 6a 6f 62  71 03 58 09 00 00 00 41  |X....jobq.X....A|
    00000070  73 74 72 6f 6e 61 75 74  71 04 75 2e              |stronautq.u.|
    0000007c
    "
  />

  <p>
    Now, the original objects can be retrieved ("loaded") from
    <code>myfile.bin</code> in the same order as they were "dumped" into it:
  </p>

  <CodeBlock
    language="python"
    code="
    import pickle

    input_file = open('myfile.bin', 'rb')

    var_int = pickle.load(input_file)
    var_str = pickle.load(input_file)
    var_list = pickle.load(input_file)
    var_dict = pickle.load(input_file)

    print('var_int = %s' % var_int)
    print('var_str = %s' % var_str)
    print('var_list = %s' % var_list)
    print('var_dict = %s' % var_dict)

    input_file.close()
    "
  />

  <p>
    The output of the program above shows that the original objects have been
    properly retrieved from the binary file:
  </p>

  <CodeBlock
    code="
    var_int = 42
    var_str = Hello, world!
    var_list = ['dog', 'cat', 'lizard']
    var_dict = {'name': 'Bob', 'job': 'Astronaut'}
    "
  />

  <p>
    You can dump objects directly into
    <a
      href="https://en.wikipedia.org/wiki/Standard_streams#Standard_output_.28stdout.29"
      ><code>stdout</code></a
    >
    or
    <a
      href="https://en.wikipedia.org/wiki/Standard_streams#Standard_error_.28stderr.29"
      ><code>stderr</code></a
    >
    if you wish. All you need to do is replace the file object
    <code>output_file</code> above with <code>sys.stdout.buffer</code> as shown
    in the example below:
  </p>

  <CodeBlock
    language="python"
    code="
    import pickle
    import sys

    pickle.dump(42, sys.stdout.buffer)
    pickle.dump('Hello, world!', sys.stdout.buffer)
    pickle.dump(['dog', 'cat', 'lizard'], sys.stdout.buffer)
    pickle.dump({'name': 'Bob', 'job': 'Astronaut'}, sys.stdout.buffer)

    # Flush the stdout buffer.
    sys.stdout.flush()
    "
  />

  <p>
    The code just shown works with Python 3.x but not Python 2.x (everything
    else presented so far in this post works with both versions of Python). This
    is the version of the code above that works with Python 2.x:
  </p>

  <CodeBlock
    language="python"
    code="
    import pickle
    import sys

    pickle.dump(42, sys.stdout)
    pickle.dump('Hello, world!', sys.stdout)
    pickle.dump(['dog', 'cat', 'lizard'], sys.stdout)
    pickle.dump({'name': 'Bob', 'job': 'Astronaut'}, sys.stdout)

    # Flush the stdout buffer.
    sys.stdout.flush()
    "
  />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
