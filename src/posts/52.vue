<template>
  <p>Consider the following innocent-looking code:</p>

  <CodeBlock
    language="c++"
    code="
    #include <deque>

    #define MAX_VAL 1000000

    int main () {
      std::deque<int> Q;

      // Insert the even numbers 0, 2, 4, ..., (2 * MAX_VAL) into Q.
      for (int i = 0; i <= MAX_VAL; ++i) {
        Q.push_back(2 * i);
      }

      // For each even element of Q, insert an odd element at its back.
      for (auto it = Q.begin(); it != Q.end(); ++it) {
        if (*it % 2 == 0) {
          Q.push_back(*it + 1);
        }
      }

      return 0;
    }
    "
  />

  <p>
    You can compile this program with the command below (assuming you saved it
    as a file named <code>deque.cpp</code>):
  </p>

  <CodeBlock code="g++ deque.cpp -std=c++11 -o deque" />

  <p>
    At first glance, one might think that adding elements to an
    <a href="http://www.cplusplus.com/reference/deque/deque/"
      ><code>std::deque</code></a
    >
    using
    <a href="http://www.cplusplus.com/reference/deque/deque/push_back/"
      ><code>push_back()</code></a
    >
    is safe to do inside the second <code>for</code> loop. For those familiar
    with how <code>std::deque</code> is implemented, the rationale might be the
    following: <code>std::deque</code> stores its elements in possibly
    <a href="http://www.cplusplus.com/reference/deque/deque/">separate</a>
    blocks of memory, so inserting elements at its end should not be a problem
    for any iterator pointing to one of its existing elements, as new blocks of
    memory are automatically allocated to make room for the new elements
    whenever necessary, without any reallocations taking place. However, this
    assumption is unfortunately incorrect: if you compile the program above, it
    will likely crash due to a segmentation fault (if this does not happen, try
    increasing the value of <code>MAX_VAL</code>).
  </p>

  <p>
    The problem arises from the fact that adding elements to an
    <code>std::deque</code> using <code>push_back()</code> invalidates
    <a href="http://www.cplusplus.com/reference/deque/deque/push_back/"
      >all of its iterators</a
    >, even though pointers and references to elements in the container remain
    valid (they still point to the same elements as they did before). This
    happens because the iterator mapping of <code>std::deque</code> changes when
    new blocks are allocated. In fact, since
    <code>std::deque::iterator</code> is of
    <a href="http://www.cplusplus.com/reference/deque/deque/">random-access</a>
    type, <code>std::deque</code> must be aware that moving
    <code>N</code> elements forward might lead to another memory block, which
    means the iterator mapping has to be updated whenever a new block is
    created, invalidating all iterators in the process.
  </p>

  <p>
    The lesson to be learned here is: before calling a function that manipulates
    the data stored in a container, make sure you understand how this function
    affects its iterators!
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
