<template>
  <p>
    From the name of the type, one might think that a
    <a href="https://en.wikipedia.org/wiki/Character_%28computing%29#char"
      ><code>char</code></a
    >
    variable always represents a character &mdash; an
    <a href="https://en.wikipedia.org/wiki/ASCII">ASCII</a> character to be
    precise. However, <code>char</code> in C/C++ is not a "character type" but
    instead an
    <a href="https://en.wikipedia.org/wiki/C_data_types">integer type</a>. The
    <code>char</code> type is an 8-bit integer type on
    <a
      href="http://stackoverflow.com/questions/2098149/what-platforms-have-something-other-than-8-bit-char"
      >virtually every platform</a
    >, including all mobile phones and desktop computers.
  </p>

  <p>
    The C standard does not define whether <code>char</code> is a signed or
    unsigned type. Even though the standard defines <code>char</code>,
    <code>signed char</code>, and <code>unsigned char</code> as three distinct
    types, it requires C compilers to treat the <code>char</code> type as either
    <code>signed char</code> or <code>unsigned char</code>
    (see section 6.2.5, item 15 of the
    <a href="http://www.open-std.org/JTC1/SC22/WG14/www/docs/n1570.pdf"
      >C11 standard</a
    >). Some compilers allow you to specify whether the <code>char</code> type
    should be interpreted as <code>signed char</code> or
    <code>unsigned char</code>, depending on what is best for your project. For
    instance, <a href="http://linux.die.net/man/1/gcc"><code>gcc</code></a> can
    be executed with the <code>-fsigned-char</code> or
    <code>-funsigned-char</code> flags.
  </p>

  <p>
    This flexible
    <a href="https://en.wikipedia.org/wiki/Signedness">signedness</a> of the
    <code>char</code> type paves the way for many dangerous pitfalls. For
    example, the following code will run in finite time if <code>char</code> is
    unsigned, but will loop indefinitely if <code>char</code> is signed:
  </p>

  <CodeBlock
    language="cpp"
    code='
    #include <stdio.h>

    int main() {
      for (char c = 0; c < 200; ++c) {
        printf("%c\n", c);
      }

      return 0;
    }
    '
  />

  <p>
    If <code>char</code> is an unsigned type, the program will finish because an
    unsigned 8-bit integer can store values ranging from <code>0</code> to
    <code>255</code>. However, a signed 8-bit integer can only hold values
    between <code>-128</code> and <code>127</code>, i.e., the condition
    <code>c &lt; 200</code> will always evaluate to <code>true</code>. To be
    precise, when evaluating the condition <code>c &lt; 200</code> with
    <code>char</code> being a signed type, <code>c</code> is first promoted to
    <code>int</code> and then compared with the (<code>int</code>) value
    <code>200</code> (since <code>int</code> has at least 16 bits, it can
    represent <code>200</code>). However, even when we cast <code>c</code> to
    <code>int</code>, the resulting value will never exceed
    <code>127</code> because every time <code>c</code> reaches <code>127</code>,
    the update statement <code>++c</code> will cause it to overflow to
    <code>-128</code>.
  </p>

  <p>
    Below is a classic example of how an incorrect assumption about the
    signedness property of the <code>char</code> type can lead to undesired
    program behavior:
  </p>

  <CodeBlock
    language="cpp"
    code='
    #include <stdio.h>

    int main() {
      // DANGER: getchar() returns int, not char!
      char c = getchar();

      while (c != EOF) {
        printf("%c\n", c);
        c = getchar();
      }

      return 0;
    }
    '
  />

  <p>
    If <code>char</code> is unsigned, this program will continuously consume
    input because <code>EOF</code> is defined as the integer value
    <code>-1</code> in <code>stdio.h</code>, a value that an
    <code>unsigned char</code> cannot represent. Specifically, in the
    <a href="https://en.wikipedia.org/wiki/Two's_complement"
      >two's complement</a
    >
    representation used by modern computers, <code>-1</code> corresponds to
    <code>0xffffffff</code> (assuming a 32-bit <code>int</code>; a similar
    argument holds for 16-bit systems). When this value is assigned to an
    <code>unsigned char</code>, it gets truncated to <code>0xff</code>, so when
    <code>EOF</code> is encountered, <code>c</code> becomes <code>0xff</code>.
    When later compared with <code>EOF</code>, <code>c</code> is promoted to
    <code>int</code>, and its value is converted to <code>0x000000ff</code>,
    which is <code>255</code> in decimal. As a result, the condition
    <code>c != EOF</code> remains true even when
    <a href="http://en.cppreference.com/w/c/io/getchar"><code>getchar</code></a>
    returns <code>EOF</code>, indicating an error or end of input. The corrected
    version of the program is provided below:
  </p>

  <CodeBlock
    language="cpp"
    code='
    #include <stdio.h>

    int main() {
      // CORRECT: getchar() returns int.
      int i = getchar();

      while (i != EOF) {
        char c = i;
        printf("%c\n", c);
        i = getchar();
      }

      return 0;
    }
    '
  />

  <p>
    Note how, in our very first sample code above, we used the
    <a href="https://en.wikipedia.org/wiki/Increment_and_decrement_operators"
      >post-increment operator</a
    >
    on a variable of type <code>char</code>. Generally, since
    <code>char</code> is an
    <a href="http://en.cppreference.com/w/c/language/arithmetic_types"
      >arithmetic type</a
    >, all statements in the code below are valid:
  </p>

  <CodeBlock
    language="cpp"
    code="
    int main() {
      char c;

      c = 35;
      c = '#';

      // Shortcut assignment operators.
      c *= 2;
      c /= 3;
      c %= 25;

      // Increment and decrement operators.
      ++c;
      --c;

      // Arithmetic expressions.
      c = 'a' + '#' - 20;
      c = 2 * 'c' + '#' / 7;

      return 0;
    }
    "
  />

  <p>
    It's vital to remember that since <code>char</code> is an integer type, it
    can overflow, as demonstrated in our first example. To ensure consistent
    behavior across different compilers, consider using
    <code>signed char</code> or <code>unsigned char</code> instead of plain
    <code>char</code>. For arithmetic operations with 8-bit integers, it's
    advisable to use the <code>int8_t</code> and <code>uint8_t</code> types
    instead of the <code>char</code> type. These 8-bit integer types can be
    found in
    <a href="https://en.wikibooks.org/wiki/C_Programming/C_Reference/stdint.h"
      ><code>stdint.h</code></a
    >.
  </p>

  <p>
    As illustrated in the program above, an expression like
    <code>'#'</code> represents the integer value of the ASCII code associated
    with that symbol. Given that the code for <code>'#'</code> is
    <code>35</code>, the two first assignment statements in the program are
    equivalent. This is because expressions such as <code>'#'</code> are
    replaced by their corresponding integer values during compilation. Hence, a
    <code>char</code> type isn't intrinsically more "character-like" than any
    other type. It's merely the smallest integer type capable of representing
    any of the 128 characters from the ASCII standard.
  </p>

  <SectionTitle>Safe practices with <code>char</code> variables</SectionTitle>

  <p>
    To minimize potential issues when working with <code>char</code> variables,
    avoid comparing them directly with integer values. Instead, compare them
    with ASCII characters enclosed in single quotes as these comparisons are
    always valid. For checking if a <code>char</code> variable meets certain
    criteria, rely on portable functions like
    <a href="http://linux.die.net/man/3/isalpha"><code>isalpha</code></a> or
    <a href="http://linux.die.net/man/3/isdigit"><code>isdigit</code></a
    >, rather than verifying if its value is within a range of integers
    representing specific character sets, such as "alphanumeric" or "digit".
    Moreover, for arithmetic operations with 8-bit integers, it's advisable to
    use <code>int8_t</code> or <code>uint8_t</code> over the
    <code>char</code> type, whenever possible.
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
