<template>
  <p>
    In a <RouterLink :to="{ name: '69' }">previous post</RouterLink>, the
    <a href="http://www.cplusplus.com/reference/queue/priority_queue/"
      ><code>std::priority_queue</code></a
    >
    container was introduced as an approach for working with
    <a href="https://en.wikipedia.org/wiki/Heap_%28data_structure%29">heaps</a>
    in C++. This post presents an alternative approach, which leverages the
    <a href="http://www.cplusplus.com/reference/vector/vector/"
      ><code>std::vector</code></a
    >
    container (or any other container offering
    <a href="http://www.cplusplus.com/reference/iterator/RandomAccessIterator/"
      >random-access iterators</a
    >) to store the heap elements, in conjunction with the STL functions
    <a href="http://www.cplusplus.com/reference/algorithm/make_heap/"
      ><code>std::make_heap</code></a
    >,
    <a href="http://www.cplusplus.com/reference/algorithm/push_heap/"
      ><code>std::push_heap</code></a
    >, and
    <a href="http://www.cplusplus.com/reference/algorithm/pop_heap/"
      ><code>std::pop_heap</code></a
    >. These functions arrange the container's elements into a valid heap, and
    they allow for the pushing and popping of elements from the container, all
    while maintaining its heap structure. While the approach presented here
    offers more flexibility, it might be perceived as less pristine from a
    software engineering perspective as it provides no
    <a href="https://en.wikipedia.org/wiki/Information_hiding#Encapsulation"
      >encapsulation</a
    >
    for the heap elements compared to what is provided by
    <code>std::priority_queue</code>.
  </p>

  <p>
    The techniques demonstrated here reveal some of the intricacies of the heap
    data structure when implemented in an array, which is the most prevalent
    implementation. For example, to insert a new element into the heap, we place
    it in the array position immediately after the last heap element. We then
    "bubble up" this new element until it finds its valid position, ensuring the
    array remains a valid heap. Conversely, when we want to pop the root element
    from the heap (which represents the heap's "largest element"), we swap it
    with the rightmost element in the array. After removing it, we "bubble down"
    the element now at the root until it occupies a valid position. The
    following example elucidates these concepts further:
  </p>

  <CodeBlock
    language="c++"
    code='
    #include <algorithm>
    #include <iostream>
    #include <vector>

    int main() {
      // Heap elements are stored in a random-access container.
      std::vector<int> Q;

      for (const int x : { 3, 4, 2, 1 }) {
        // Insert x at the end of the array.
        Q.push_back(x);

        // Restore the heap property by "bubbling up" x to its valid position.
        std::push_heap(Q.begin(), Q.end());
      }

      while (!Q.empty()) {
        // Print the value of the element at the root of the heap.
        std::cout << Q.front() << " ";

        // Swap the root and the rightmost array element, then "bubble down"
        // the element placed at the root to restore the heap property.
        std::pop_heap(Q.begin(), Q.end());

        // Remove the last array element (previously the root).
        Q.pop_back();
      }
      std::cout << "\n";

      return 0;
    }
    '
  />

  <p>
    By default, <code>std::push_heap</code> and
    <code>std::pop_heap</code> rearrange the array elements such that the
    "largest element" (as defined by the <code>&lt;</code> operator for the heap
    elements) is positioned at the leftmost array slot. In other words, the
    element <code>x</code> for which <code>(x &lt; y) == false</code> for every
    other stored element <code>y</code> will be the first array element. If
    multiple copies of this "largest element" exist, any one of them may occupy
    the first slot. This is why the "largest element" of the heap is printed
    using <code>Q.front()</code>. The output of the program above is therefore:
  </p>

  <CodeBlock code="4 3 2 1" />

  <p>
    Furthermore, both <code>std::push_heap</code> and
    <code>std::pop_heap</code> can accept a comparison function to establish the
    <a href="https://en.wikipedia.org/wiki/Total_order">order relation</a> for
    the heap's elements. The following example demonstrates how to use this
    feature to change the order relation from the default <code>&lt;</code> to
    <code>&gt;</code>, which transforms the heap into a min-heap:
  </p>

  <CodeBlock
    language="c++"
    code='
    #include <algorithm>
    #include <iostream>
    #include <vector>

    bool compare_ints(const int x, const int y) {
      return x > y;
    }

    int main() {
      // Heap elements are stored in a random-access container.
      std::vector<int> Q;

      for (const int x : { 3, 4, 2, 1 }) {
        // Insert x at the end of the array.
        Q.push_back(x);

        // Restore the heap property by "bubbling up" x to its valid position.
        std::push_heap(Q.begin(), Q.end(), compare_ints);
      }

      while (!Q.empty()) {
        // Print the value of the element at the root of the heap.
        std::cout << Q.front() << " ";

        // Swap the root and the rightmost array element, then "bubble down"
        // the element placed at the root to restore the heap property.
        std::pop_heap(Q.begin(), Q.end(), compare_ints);

        // Remove the last array element (previously the root).
        Q.pop_back();
      }
      std::cout << "\n";

      return 0;
    }
    '
  />

  <p>
    From the definition of <code>compare_ints</code>, we can infer that the
    element <code>x</code>, for which
    <code>compare_ints(x, y) == false</code> for all other <code>y</code> in the
    array, must be the smallest element. Since this element is placed at the
    leftmost position in the array (the root of the heap), we have effectively
    transformed the heap into a min-heap. Consequently, the output is now:
  </p>

  <CodeBlock code="1 2 3 4" />

  <p>
    Instead of using a custom comparison function as we did in the example
    above, an arguably more elegant way to create a min-heap is by employing
    instances of
    <a href="http://www.cplusplus.com/reference/functional/greater/"
      ><code>std::greater&lt;int&gt;</code></a
    >
    as the
    <a href="https://en.cppreference.com/w/cpp/named_req/Compare"
      >comparison function object</a
    >. As highlighted in <RouterLink :to="{ name: '69' }">part 1</RouterLink>,
    <code>std::greater</code> is a
    <a
      href="http://www.cprogramming.com/tutorial/functors-function-objects-in-c++.html"
      >functor class</a
    >
    with a member function that behaves exactly the same as
    <code>compare_ints</code>:
  </p>

  <CodeBlock
    language="c++"
    code="
    bool operator()(const T& x, const T& y) const {
      return x > y;
    }
    "
  />

  <p>
    Objects that are instances of functor classes can be used in places where
    functions are expected. As such, an instance of
    <code>std::greater</code> can be directly used wherever a comparison
    function is required, as the following example demonstrates:
  </p>

  <CodeBlock
    language="c++"
    code='
    #include <algorithm>
    #include <functional>
    #include <iostream>
    #include <vector>

    int main() {
      // Heap elements are stored in a random-access container.
      std::vector<int> Q;

      for (const int x : { 3, 4, 2, 1 }) {
        // Insert x at the end of the array.
        Q.push_back(x);

        // Restore the heap property by "bubbling up" x to its valid position.
        std::push_heap(Q.begin(), Q.end(), std::greater<int>());
      }

      while (!Q.empty()) {
        // Print the value of the element at the root of the heap.
        std::cout << Q.front() << " ";

        // Swap the root and the rightmost array element, then "bubble down"
        // the element placed at the root to restore the heap property.
        std::pop_heap(Q.begin(), Q.end(), std::greater<int>());

        // Remove the last array element (previously the root).
        Q.pop_back();
      }
      std::cout << "\n";

      return 0;
    }
    '
  />

  <p>
    Since <code>std::greater</code> behaves exactly as the function
    <code>compare_ints</code>, the output of the program above is the same as
    before:
  </p>

  <CodeBlock code="1 2 3 4" />

  <SectionTitle>Bonus: Runtime complexity of heap construction</SectionTitle>

  <p>
    As discussed in <RouterLink :to="{ name: '69' }">part 1</RouterLink>, a heap
    with $n$ elements can be constructed in time $O(n)$ instead of
    $O(n\log_2(n))$ if we first store its elements in an array and then
    rearrange the array elements using the
    <a
      href="https://www.cs.princeton.edu/~wayne/kleinberg-tardos/pdf/DemoHeapify.pdf"
      >heapify</a
    >
    method to turn it into a valid heap. This is what
    <code>std::make_heap</code> does:
  </p>

  <CodeBlock
    language="c++"
    code='
    #include <algorithm>
    #include <iostream>
    #include <vector>

    int main() {
      // Heap elements are stored in a random-access container.
      std::vector<int> Q = { 3, 4, 2, 1 };

      // Heapify Q (linear runtime complexity).
      std::make_heap(Q.begin(), Q.end());

      while (!Q.empty()) {
        // Print the value of the element at the root of the heap.
        std::cout << Q.front() << " ";

        // Swap the root and the rightmost array element, then "bubble down"
        // the element placed at the root to restore the heap property.
        std::pop_heap(Q.begin(), Q.end());

        // Remove the last array element (previously the root).
        Q.pop_back();
      }
      std::cout << "\n";

      return 0;
    }
    '
  />

  <p>
    Notice how we arranged the array elements into a valid heap in one operation
    instead of pushing one element at a time as in our previous examples. Since
    <code>std::make_heap</code> turns the input array into a max-heap by
    default, the output of the program above is:
  </p>

  <CodeBlock code="4 3 2 1" />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
