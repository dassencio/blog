<template>
  <p>
    Suppose you need to generate all possible bitmasks of length $n$ with $m$
    bits set, i.e., all bitmasks of length $n$ having $m$ bits equal to $1$ and
    $(n - m)$ bits equal to $0$. For small values of $n$, the desired bitmasks
    can be easily hard-coded, but for general values of $n$ and $m$, this
    becomes impractical since the total number $N$ of bitmasks that need to be
    generated is equal to the number of possible combinations of $m$ elements
    out of a set of $n$ elements, a quantity that grows very fast with $n$ and
    is given by the following
    <a href="https://en.wikipedia.org/wiki/Binomial_coefficient"
      >binomial coefficient</a
    >:
  </p>

  <EquationBlock> N = \binom{n}{m} = \frac{n!}{m! (n - m)!} </EquationBlock>

  <p>
    In Python, a convenient way to solve this problem is by using a
    <a href="https://wiki.python.org/moin/Generators">generator function</a>.
    This special kind of function behaves like an iterator, dynamically
    generating sequences of elements for iterative loops. Consider for instance
    the implementation below. It provides a solution under the assumption that
    the values of $m$ and $n$ satisfy $0 \leq m \leq n$:
  </p>

  <CodeBlock
    language="python"
    code="
    from bitarray import bitarray

    def bitmasks(n, m):
      if m < n:
        if m > 0:
          for x in bitmasks(n - 1, m - 1):
            yield bitarray('1') + x
          for x in bitmasks(n - 1, m):
            yield bitarray('0') + x
        else:
          yield n * bitarray('0')
      else:
        yield n * bitarray('1')

    for b in bitmasks(4, 2):
      print(b)
    "
  />

  <p>The output of the code above is:</p>

  <CodeBlock
    code="
    bitarray('1100')
    bitarray('1010')
    bitarray('1001')
    bitarray('0110')
    bitarray('0101')
    bitarray('0011')
    "
  />

  <p>
    Above, each generated bitmask is stored in a special data structure called
    <a href="https://pypi.python.org/pypi/bitarray/"><code>bitarray</code></a
    >. This structure is appropriate for bitmasks, as it offers many methods
    typically used with bit arrays, such as bitwise operations, encoding,
    decoding, etc. Before running the code above, you may need to install the
    <code>bitarray</code> package by running the following command in your
    terminal:
  </p>

  <CodeBlock code="pip install bitarray" />

  <p>
    If you wish to print the bitmasks in a cleaner way, apply the following
    change to the code above:
  </p>

  <CodeBlock
    language="python"
    code="
    for b in bitmasks(4, 2):
      print(b.to01())
    "
  />

  <p>The output now becomes easier to read:</p>

  <CodeBlock
    code="
    1100
    1010
    1001
    0110
    0101
    0011
    "
  />

  <p>
    The <code>bitmasks</code> function is a generator function. Note that
    instead of returning a value, it yields a generator. Indeed, if you execute:
  </p>

  <CodeBlock language="python" code="print(bitmasks(4, 2))" />

  <p>the output you will get will be similar to this:</p>

  <CodeBlock code="<generator object bitmasks at 0x7fa2a0c99f78>" />

  <p>
    As mentioned earlier, this generator can be used in loops to iterate over a
    set of values. In broad terms, the generator yields each value for the loop
    as needed by executing the contents of <code>bitmasks</code> until a
    <a href="https://docs.python.org/release/2.5.2/ref/yield.html"
      ><code>yield</code></a
    >
    statement is reached. At this point, the value from the
    <code>yield</code> statement is assigned to the loop variable and the
    function's execution is suspended until the next iteration of the loop. In
    the example above, the bitmasks of length $n$ are built one by one at each
    iteration of the <code>for</code> loop and assigned to the loop variable
    <code>b</code>.
  </p>

  <p>
    Note that <code>yield</code> differs significantly from <code>return</code>:
    <code>yield</code> produces the next value in the sequence and suspends the
    execution of the function, while <code>return</code> provides the specified
    value and terminates the function's execution immediately.
  </p>

  <p>
    Because generator functions generate values one by one, they are said to
    execute "lazily". This approach requires less memory compared to generating
    all elements at once and returning them in a list.
  </p>

  <SectionTitle>Solution without <code>bitarray</code></SectionTitle>

  <p>
    If you prefer not to store the generated bitmasks using
    <code>bitarray</code>, you can store them directly as integers. The solution
    below implements this approach:
  </p>

  <CodeBlock
    language="python"
    code="
    def bitmasks(n, m):
      if m < n:
        if m > 0:
          for x in bitmasks(n - 1, m - 1):
            yield (1 << (n - 1)) + x
          for x in bitmasks(n - 1, m):
            yield x
        else:
          yield 0
      else:
        yield (1 << n) - 1

    # Print each value as a 4-bit binary number.
    for b in bitmasks(4, 2):
      print('{:04b}'.format(b))
    "
  />

  <p>
    This implementation generates the bitmasks in the same order as the previous
    one. Here is its output:
  </p>

  <CodeBlock
    code="
    1100
    1010
    1001
    0110
    0101
    0011
    "
  />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
