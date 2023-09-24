<template>
  <p>
    Suppose you have a sequence of $n$ objects of type $T$ and want to compute
    all permutations of the objects in this sequence. There are several
    approaches to solve this problem. For instance,
    <a
      href="https://github.com/dassencio/cracking-the-coding-interview/blob/master/chapter08/8.04/solve.cpp"
      >this implementation</a
    >
    works for sequences that are strings with $n$ characters and can be easily
    adapted for sequences of objects of arbitrary types.
  </p>

  <p>
    Instead of implementing a solution yourself, however, consider leveraging
    the
    <a href="https://en.wikipedia.org/wiki/Standard_Template_Library">STL</a>
    algorithm
    <a href="http://www.cplusplus.com/reference/algorithm/next_permutation/"
      ><code>std::next_permutation</code></a
    >. We will first show an example of how it should be used, and then go over
    the details:
  </p>

  <CodeBlock
    language="cpp"
    code='
    #include <algorithm>
    #include <iostream>
    #include <vector>

    int main() {
      std::vector<int> v = { 1, 2, 3 };

      do {
        for (const int x : v) {
          std::cout << x << " ";
        }
        std::cout << "\n";
      }
      while (std::next_permutation(v.begin(), v.end()) == true);

      return 0;
    }
    '
  />

  <p>
    The output of this program displays all permutations of the set $\{1, 2,
    3\}$:
  </p>

  <CodeBlock
    code="
    1 2 3
    1 3 2
    2 1 3
    2 3 1
    3 1 2
    3 2 1
    "
  />

  <p>
    The <code>std::next_permutation</code> algorithm assumes that there is an
    ordering criterion for the objects in the sequence. In other words, any two
    objects in the sequence must be comparable using a "less than" operation. By
    default, <code>std::next_permutation</code> uses the
    <code>&lt;</code> operator for comparisons, but you can provide your own
    comparison function, as we will demonstrate below.
  </p>

  <p>
    If the objects in the sequence can be compared using a "less than"
    operation, we can arrange all permutations of this sequence
    <a href="https://en.wikipedia.org/wiki/Lexicographical_order"
      >lexicographically</a
    >, much like how words are ordered in a dictionary. Given a sequence in this
    "permutation dictionary", <code>std::next_permutation</code> can determine
    the next permutation in lexicographical order. If a subsequent permutation
    exists in the "permutation dictionary," it returns <code>true</code> and
    permutes the sequence in place to yield this next permutation. However, if
    the sequence has already achieved its "largest" permutation in
    lexicographical terms (with elements sorted in descending order),
    <code>std::next_permutation</code> returns <code>false</code> and rearranges
    the sequence into its "smallest" lexicographical permutation, sorting the
    elements in ascending order.
  </p>

  <p>
    The necessity for objects in the sequence to be orderable can be a
    limitation. This is because many types don't have a naturally defined order.
    For such types, we can either overload the <code>&lt;</code> operator or
    pass a custom comparison function to <code>std::next_permutation</code>, as
    illustrated below:
  </p>

  <CodeBlock
    language="cpp"
    code='
    #include <algorithm>
    #include <iostream>
    #include <string>
    #include <vector>

    struct Person {
      std::string name;
      int age;
    };

    // Order Person objects by their names.
    bool compare(const Person& a, const Person& b) {
      return a.name < b.name;
    }

    int main() {
      std::vector<Person> v = { { "John", 35 }, { "Mary", 27 }, { "Bob", 22 } };

      std::sort(v.begin(), v.end(), compare);

      do {
        for (const Person& p : v) {
          std::cout << "{ " << p.name << ", " << p.age << " }" << " ";
        }
        std::cout << "\n";
      }
      while (std::next_permutation(v.begin(), v.end(), compare) == true);

      return 0;
    }
    '
  />

  <p>
    This program outputs all permutations of the three
    <code>Person</code> objects:
  </p>

  <CodeBlock
    code="
    { Bob, 22 } { John, 35 } { Mary, 27 }
    { Bob, 22 } { Mary, 27 } { John, 35 }
    { John, 35 } { Bob, 22 } { Mary, 27 }
    { John, 35 } { Mary, 27 } { Bob, 22 }
    { Mary, 27 } { Bob, 22 } { John, 35 }
    { Mary, 27 } { John, 35 } { Bob, 22 }
    "
  />

  <p>
    It's important to note that before generating all permutations of the
    sequence of
    <code>Person</code> objects in <code>v</code>, we first sorted the sequence.
    This preliminary sorting step is crucial; omitting it would mean we wouldn't
    capture all possible permutations of <code>v</code>. This is due to the
    behavior of <code>std::next_permutation</code>: the initial sequence must be
    the "smallest one" lexicographically, meaning it should be sorted in
    ascending order.
  </p>

  <p>
    The iterators passed to <code>std::next_permutation</code> must be at least
    of
    <a href="http://www.cplusplus.com/reference/iterator/BidirectionalIterator"
      >bidirectional</a
    >
    type. Moreover, <code>std::next_permutation</code> employs
    <a href="http://www.cplusplus.com/reference/algorithm/swap/"
      ><code>std::swap</code></a
    >
    to modify the order of objects in the sequence to yield the next
    permutation. If swapping is resource-intensive for the type you're dealing
    with, consider assigning indices ($0, 1, \ldots, n - 1$) or pointers to the
    objects and computing permutations of these indices or pointers. This way,
    you can represent the desired permutations of the original sequence via
    permutations of these indices or pointers, rather than directly manipulating
    the objects themselves.
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
