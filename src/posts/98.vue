<template>
  <p>
    Suppose you have an array of floating-point numbers and you want to count
    how many times each unique number occurs in the array. As an expert
    programmer, you might do as shown below (Python is used throughout this
    post, but everything mentioned here applies to
    <a href="https://en.wikipedia.org/wiki/Associative_array"
      >associative arrays</a
    >
    implemented as
    <a href="https://en.wikipedia.org/wiki/Hash_table">hash tables</a>
    in virtually every programming language):
  </p>

  <CodeBlock
    language="python"
    code='
    numbers = [1.4142, 2.7182, 2.7182, 3.1415, 2.7182, 1.4142]

    # counters is a dictionary that maps each number in the numbers
    # array to its number of occurrences.
    counters = {}
    for x in numbers:
      counters[x] = counters.get(x, 0) + 1

    for x in counters:
      print("%f: %d" % (x, counters[x]))
    '
  />

  <p>
    The output of this program will not surprise you. The order of the lines
    below may be different on your system, but the overall results will be the
    same:
  </p>

  <CodeBlock
    code="
    1.414200: 2
    2.718200: 3
    3.141500: 1
    "
  />

  <p>
    Everything seems fine, right? Unfortunately, no. A Python dictionary is
    <a
      href="https://mail.python.org/pipermail/python-list/2000-March/048085.html"
      >implemented as a hash table</a
    >. Hash tables work as follows: to insert a pair <code>(k, v)</code> into
    the table, where <code>k</code> is a key and <code>v</code> is its
    associated value, we first hash <code>k</code> to find a bucket into which
    <code>(k, v)</code> should be inserted. Then, we insert
    <code>(k, v)</code> into this bucket; if a pair with key
    <code>k</code> already exists in the bucket, it is replaced by the new pair.
    But why is this problematic? The following example will illustrate it for
    you:
  </p>

  <CodeBlock
    language="python"
    code='
    a = 0.123456
    b = 0.567890

    # Is this the same as [a, b, a, b]?
    numbers = [a, b, (a / b) * b, (b / a) * a]

    counters = {}
    for x in numbers:
      counters[x] = counters.get(x, 0) + 1

    for x in counters:
      print("%f: %d" % (x, counters[x]))
    '
  />

  <p>The output now is not what we expect:</p>

  <CodeBlock
    code="
    0.123456: 1
    0.567890: 2
    0.123456: 1
    "
  />

  <p>
    What went wrong here? To find out, let's modify the code above to gain
    additional information on what is happening:
  </p>

  <CodeBlock
    language="python"
    code='
    a = 0.123456
    b = 0.567890

    # Is this the same as [a, b, a, b]?
    numbers = [a, b, (a / b) * b, (b / a) * a]
    print("numbers = %s\n" % numbers)

    counters = {}
    for x in numbers:
      counters[x] = counters.get(x, 0) + 1

    for x in counters:
      print("%f: %d" % (x, counters[x]))
    '
  />

  <p>The output of the program now indicates what the problem is:</p>

  <CodeBlock
    language="python"
    code="
    numbers = [0.123456, 0.56789, 0.12345599999999998, 0.56789]

    0.123456: 1
    0.567890: 2
    0.123456: 1
    "
  />

  <p>
    Aha! It is
    <a href="https://en.wikipedia.org/wiki/Floating_point"
      >floating-point arithmetic</a
    >
    that has tripped us up. Naively checking whether floating-point numbers are
    equal, i.e., comparing them as
    <code>a == b</code>, is a
    <a
      href="https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/"
      >dangerous idea</a
    >
    because such numbers are stored with finite precision. Additionally,
    arithmetic operations involving floating-point numbers are also carried out
    with finite precision. Therefore, given two nonzero floating-point numbers
    <code>a</code> and <code>b</code>, there is no guarantee that
    <code>a == (a / b) * b</code>. In general, when you hash two different
    floating-point numbers, you will, with very high probability, obtain two
    different hash values even if these numbers are very close to each other. If
    that happens, the numbers will, again with high probability, be placed into
    different buckets of a hash table.
  </p>

  <p>
    In the example above, we were fortunate to have
    <code>(b / a) * a</code> equal to <code>b</code>, but not so fortunate with
    <code>(a / b) * b</code> and <code>a</code>: these two are not equal to each
    other and are therefore treated as distinct numbers by the dictionary (i.e.,
    by its hash table implementation).
  </p>

  <p>
    At this point, it should be clear that hashing floating-point numbers is as
    dangerous as directly checking for their equality using the
    <code>==</code> operator. Even tiny differences in their values can lead
    them to be placed into different buckets of a hash table.
  </p>

  <p>
    If you really need to use floating-point numbers as keys for a hash table,
    and depending on the numbers you will be hashing, you might be able to
    alleviate the problems described above with a special trick. For example, if
    all numbers fall within the interval $[0, 1)$, and if two
    <a href="https://en.wikipedia.org/wiki/Significant_figures"
      >significant figures</a
    >
    are sufficient to represent these numbers accurately, we can truncate each
    number to its first two decimal digits before passing it to the hash
    function: this will effectively divide the interval $[0, 1)$ into $100$
    intervals of length $0.01$, with all numbers in the same interval being
    considered equal. Here is the code that implements this idea:
  </p>

  <CodeBlock
    language="python"
    code='
    # Keep only the first two decimal digits of x.
    def truncate(x):
      return int(x / 0.01) * 0.01

    a = 0.123456
    b = 0.567890

    numbers = [a, b, (a / b) * b, (b / a) * a]

    counters = {}
    for x in numbers:
      x = truncate(x)
      counters[x] = counters.get(x, 0) + 1

    for x in counters:
      print("%f: %d" % (x, counters[x]))
    '
  />

  <p>The output of this program shows it works as desired:</p>

  <CodeBlock
    language="python"
    code="
    0.120000: 2
    0.560000: 2
    "
  />

  <p>
    Notice that now both <code>b</code> and <code>(b / a) * a</code> are no
    longer considered to be two distinct numbers by the hash function since they
    are truncated before being passed to it, and the same holds true for
    <code>a</code> and <code>(a / b) * a</code>.
  </p>

  <p>
    However, as I mentioned earlier, the problem is only alleviated by the trick
    just presented. Indeed, the original problem (numbers extremely close to
    each other being considered distinct by the hash function) has not been
    entirely addressed: we divided the interval $[0, 1)$ into intervals of width
    $0.01$ over which all numbers are considered equal, but on the shared
    boundaries of each interval, i.e., for numbers in the form $0.01 N$ for $N =
    1, 2, \ldots, 99$, the problem persists since minor deviations around these
    numbers will fall into different intervals. For example, for a very small
    $\delta > 0$, $0.50 - \delta$ will fall within $[0.49, 0.50)$ while $0.50 +
    \delta$ will fall within $[0.50, 0.51)$; hence, these two numbers will be
    treated differently by the hash function even though they are very close to
    each other.
  </p>

  <p>
    To summarize: creating hash tables using floating-point numbers as keys is a
    tricky task. Hashing them is akin to comparing them for equality using the
    <code>==</code> operator, and the result may cause your application to
    behave in unexpected ways.
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
