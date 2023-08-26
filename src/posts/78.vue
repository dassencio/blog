<template>
  <p>
    Before <a href="https://en.wikipedia.org/wiki/C%2B%2B11">C++11</a> was
    released, the most straightforward way to generate random numbers in C++ was
    using the
    <a href="http://en.cppreference.com/w/cpp/numeric/random/rand"
      ><code>std::rand()</code></a
    >
    function. However, C++11 introduced easy-to-use and vastly superior
    mechanisms for generating random numbers. It also provides developers with
    the ability to sample from many commonly used distributions using tools
    <a href="http://en.cppreference.com/w/cpp/numeric/random"
      >available in the STL</a
    >. In this post, we will explore the new C++11 methods for generating random
    integers from a uniform distribution over a closed interval. Once the
    concepts illustrated below are understood, sampling from other distributions
    becomes trivial.
  </p>

  <p>
    Let's tackle the following problem: sample ten integer values from the
    closed interval $[1,6]$ (i.e., the set $\{1,2,3,4,5,6\}$), assuming a
    <a href="https://en.wikipedia.org/wiki/Uniform_distribution_%28discrete%29"
      >uniform distribution</a
    >. This task is akin to simulating ten rolls of a six-faced dice. The code
    below demonstrates how this can be accomplished:
  </p>

  <CodeBlock
    language="c++"
    code='
    #include <iostream>
    #include <random>

    int main() {
      std::random_device device;
      std::mt19937 generator(device());
      std::uniform_int_distribution<int> distribution(1, 6);

      // Generate ten random integers in the interval [1, 6].
      for (size_t i = 0; i < 10; ++i) {
        std::cout << distribution(generator) << " ";
      }
      std::cout << "\n";

      return 0;
    }
    '
  />

  <p>Compile and run the code provided. Here is one possible output:</p>

  <CodeBlock code="1 2 4 5 4 4 2 1 4 6" />

  <p>
    Now, let's delve into how the code above works. The first step involves
    creating an instance of
    <a href="http://en.cppreference.com/w/cpp/numeric/random/random_device"
      ><code>std::random_device</code></a
    >:
  </p>

  <CodeBlock language="c++" code="std::random_device device;" />

  <p>
    The <code>std::random_device</code> class is designed to produce
    uniformly-distributed unsigned integers with a length of $32$ bits. It
    generates random numbers either by tapping into the operating system's
    <a href="https://en.wikipedia.org/wiki/Entropy_%28computing%29"
      >entropy pool</a
    >
    through
    <a href="https://en.wikipedia.org/wiki/System_call">system calls</a> or by
    utilizing
    <a href="https://en.wikipedia.org/wiki/Hardware_random_number_generator"
      >hardware random number generators</a
    >, such as Intel's
    <a href="https://en.wikipedia.org/wiki/RdRand">RdRand</a>, when available.
    However, it's worth noting that not all implementations of
    <code>std::random_device</code> support this. Developers should be aware
    that while this generator produces $32$-bit unsigned integers, its entropy
    might be less than $32$ bits.
  </p>

  <p>
    Unfortunately, repeatedly using <code>std::random_device</code> can rapidly
    deplete the system's entropy pool, compromising the randomness available to
    other processes. Its dependence on system calls also renders it a
    <a href="http://www.pcg-random.org/posts/cpps-random_device.html"
      >relatively slow</a
    >
    random number generator. To illustrate, the following code also generates
    random integers in the closed interval $[1,6]$, but this approach is not
    recommended:
  </p>

  <CodeBlock
    language="c++"
    code='
    #include <iostream>
    #include <random>

    int main() {
      std::random_device device;
      std::uniform_int_distribution<int> distribution(1, 6);

      // Generate ten random integers in the interval [1, 6].
      for (size_t i = 0; i < 10; ++i) {
        /*
         * This is a BAD way to generate random numbers. One should never
         * repeatedly use std::random_device to generate random numbers!
         */
        std::cout << distribution(device) << " ";
      }
      std::cout << "\n";

      return 0;
    }
    '
  />

  <p>
    So, if we're discouraged from using
    <code>std::random_device</code> repeatedly, how should we go about
    generating multiple random numbers? The solution is straightforward: use
    <code>std::random_device</code> to produce a single random number, and then
    use this number as a
    <a href="https://en.wikipedia.org/wiki/Random_seed">seed</a> for a
    <a href="https://en.wikipedia.org/wiki/Pseudorandom_number_generator"
      >pseudorandom number generator</a
    >
    (PRNG). Subsequently, you can employ the PRNG to generate as many
    pseudorandom numbers as desired. For those unfamiliar with the concept of a
    PRNG, envision it as an algorithm that leverages an initial seed (a random
    number) and applies specific calculations, producing numbers that, while not
    genuinely random, closely resemble randomness.
  </p>

  <p>
    The procedure we have detailed aligns perfectly with our original code: we
    employed <code>std::random_device</code> to generate a seed for a PRNG known
    as the
    <a href="https://en.wikipedia.org/wiki/Mersenne_twister">Mersenne Twister</a
    >. This PRNG is implemented in the
    <a href="http://www.cplusplus.com/reference/random/mt19937/"
      ><code>std::mt19937</code></a
    >
    class. The name "MT19937" stands for "Mersenne Twister" and derives from the
    <a href="https://en.wikipedia.org/wiki/Mersenne_prime">Mersenne prime</a>
    $2^{19937}−1$. The Mersenne Twister generates sequences of $32$-bit integers
    and boasts a remarkably long period of $2^{19937}−1$. In other words, the
    sequence will only repeat after $2^{19937}−1$ numbers have been generated
    &mdash; a truly staggering quantity! In our original code, the following
    line initializes an instance of the MT19937 PRNG using a seed sourced from
    <code>device</code>, an object of type <code>std::random_device</code>:
  </p>

  <CodeBlock language="c++" code="std::mt19937 generator(device());" />

  <p>
    Let's now return to our initial objective: we aim to establish a uniform
    integer distribution that yields random values solely within the closed
    interval $[1,6]$. This is done through an instance of
    <a
      href="http://en.cppreference.com/w/cpp/numeric/random/uniform_int_distribution"
      ><code>std::uniform_int_distribution</code></a
    >, a class specifically designed for this purpose. This instance is created
    as follows (note that the closed interval from which we want to sample
    values is specified through arguments to the constructor):
  </p>

  <CodeBlock
    language="c++"
    code="std::uniform_int_distribution<int> distribution(1, 6);"
  />

  <p>
    By utilizing its overloaded
    <a
      href="http://en.cppreference.com/w/cpp/numeric/random/uniform_int_distribution/operator%28%29"
      ><code>operator()</code></a
    >, an instance of <code>std::uniform_int_distribution</code> can accept a
    random number generator and leverage it to produce a number within its
    designated target interval. As demonstrated in our code, the following
    expression yields a value within the range $[1,6]$:
  </p>

  <CodeBlock language="c++" code="distribution(generator)" />

  <p>
    To round off, it's worth noting that the STL offers an implementation of the
    Mersenne Twister PRNG that creates $64$-bit pseudorandom integers. This is
    made available through the
    <a href="http://www.cplusplus.com/reference/random/mt19937_64/"
      ><code>std::mt19937_64</code></a
    >
    class. While not a strict requirement, it's
    <a
      href="http://stackoverflow.com/questions/24334012/best-way-to-seed-mt19937-64-for-monte-carlo-simulations/24334084#24334084"
      >recommended</a
    >
    that the seed for this PRNG be a $64$-bit integer.
  </p>

  <SectionTitle>Generating reproducible sequences</SectionTitle>

  <p>
    If you want to ensure your program consistently reproduces the same sequence
    of pseudorandom numbers (for instance, for the sake of scientific experiment
    replication), you simply need to seed your PRNG with a constant value. The
    example below demonstrates this concept by consistently seeding the
    generated instance of <code>std::mt19937</code> with the value $0$, thereby
    ensuring it always yields the same sequence of pseudorandom numbers:
  </p>

  <CodeBlock
    language="c++"
    code='
    #include <iostream>
    #include <random>

    int main() {
      // Seed the PRNG (MT19937) with a fixed value (0 in this instance).
      std::mt19937 generator(0);
      std::uniform_int_distribution<int> distribution(1, 6);

      // Generate ten integers in the interval [1, 6] (always the same sequence).
      for (size_t i = 0; i < 10; ++i) {
        std::cout << distribution(generator) << " ";
      }
      std::cout << "\n";

      return 0;
    }
    '
  />

  <p>
    When executed on my laptop, this code invariably produces the following
    sequence:
  </p>

  <CodeBlock code="4 4 5 6 4 6 4 6 3 4" />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
