<template>
  <p>
    There are two main approaches for working with heaps in C++. Both of them
    employ mechanisms provided by the
    <a href="https://en.wikipedia.org/wiki/Standard_Template_Library"
      >Standard Template Library</a
    >
    (STL). The first approach involves using the STL container
    <a href="http://www.cplusplus.com/reference/queue/priority_queue/"
      ><code>std::priority_queue</code></a
    >, which provides most of the functionalities required by a heap. The second
    approach leverages the
    <a href="http://www.cplusplus.com/reference/vector/vector/"
      ><code>std::vector</code></a
    >
    container (or any other container offering
    <a href="http://www.cplusplus.com/reference/iterator/RandomAccessIterator/"
      >random-access iterators</a
    >) to store the heap elements, in conjunction with the functions
    <a href="http://www.cplusplus.com/reference/algorithm/make_heap/"
      ><code>std::make_heap</code></a
    >,
    <a href="http://www.cplusplus.com/reference/algorithm/push_heap/"
      ><code>std::push_heap</code></a
    >, and
    <a href="http://www.cplusplus.com/reference/algorithm/pop_heap/"
      ><code>std::pop_heap</code></a
    >. These functions arrange the vector's elements into a valid heap, and then
    enable pushing and popping of elements from the vector while maintaining its
    heap structure. This post will cover the first approach, and a subsequent
    post will cover the second approach.
  </p>

  <SectionTitle>Heaps based on <code>std::priority_queue</code></SectionTitle>

  <p>
    Before we delve into code examples, we need to go over a bit of theory. A
    <a href="https://en.wikipedia.org/wiki/Priority_Queue">priority queue</a> is
    an abstract data type composed of a queue of elements, with each element
    having an associated "priority". For instance, a set of tasks assigned
    priority values, meant to be executed in a "higher priority first" sequence,
    can be naturally represented as a priority queue. A
    <a href="https://en.wikipedia.org/wiki/Heap_%28data_structure%29">heap</a>
    is an efficient implementation of a priority queue, similar to how a
    <a href="https://en.wikipedia.org/wiki/Linked_list">linked list</a>
    implements the abstract
    <a href="https://en.wikipedia.org/wiki/List_%28abstract_data_type%29"
      >list</a
    >
    data type. Given that a heap is by far the most common implementation of
    priority queues, the two terms are often used interchangeably.
  </p>

  <p>
    Here is the declaration of the <code>std::priority_queue</code> class
    template:
  </p>

  <CodeBlock
    language="c++"
    code="
    template<
      class T,
      class Container = std::vector<T>,
      class Compare = std::less<typename Container::value_type>
    > class priority_queue;
    "
  />

  <p>
    As the declaration shows, <code>std::priority_queue</code> is a class
    template requiring three template parameters: <code>T</code> denotes the
    type of the stored elements, <code>Container</code> determines the type of
    the container to hold these elements (with
    <code>std::vector&lt;T&gt;</code> being the default), and
    <code>Compare</code> is a comparison class provided by the user to specify
    an
    <a href="https://en.wikipedia.org/wiki/Total_order">order relation</a> for
    the elements within the priority queue. If <code>Container</code> is
    <code>std::vector&lt;T&gt;</code>, <code>Compare</code> defaults to
    <a href="http://www.cplusplus.com/reference/functional/less/"
      ><code>std::less&lt;T&gt;</code></a
    >, a class that contains the following member function:
  </p>

  <CodeBlock
    language="c++"
    code="
    bool operator()(const T& x, const T& y) const {
      return x < y;
    }
    "
  />

  <p>With <code>std::less</code>, two values can be compared as shown below:</p>

  <CodeBlock
    language="c++"
    code='
    #include <functional>
    #include <iostream>

    int main() {
      std::less<int> compare;
      std::cout << std::boolalpha
                << compare(2, 3) << "\n"  // true
                << compare(3, 2) << "\n"; // false
      return 0;
    }
    '
  />

  <p>
    We can also generate instances of <code>std::less</code> as needed. For
    example, the code below produces the same output as the code above, but it
    constructs objects of type <code>std::less&lt;int&gt;</code> directly where
    they are required:
  </p>

  <CodeBlock
    language="c++"
    code='
    #include <functional>
    #include <iostream>

    int main() {
      std::cout << std::boolalpha
                << std::less<int>()(2, 3) << "\n"  // true
                << std::less<int>()(3, 2) << "\n"; // false
      return 0;
    }
    '
  />

  <p>
    Classes such as <code>std::less</code> are referred to as
    <a
      href="http://www.cprogramming.com/tutorial/functors-function-objects-in-c++.html"
      >functor classes</a
    >, since they can be used with syntax similar to that of functions.
  </p>

  <p>
    The <code>std::priority_queue</code> container is designed to always place
    the "largest element" (as determined by the <code>Compare</code> class) at
    its top. This means that for an element <code>x</code>, if
    <code>Compare(x, y) == false</code> for every other contained element
    <code>y</code>, <code>x</code> is positioned at the top. If multiple copies
    of this "largest element" exist, any one of them can be at the top. Since we
    can provide a custom comparison class, we also have the possibility to
    configure <code>std::priority_queue</code> to act as a min-heap. Before
    delving into that, however, let's first examine how
    <code>std::priority_queue</code> functions in its default mode, a max-heap:
  </p>

  <CodeBlock
    language="c++"
    code='
    #include <queue>
    #include <iostream>

    int main() {
      std::priority_queue<int> Q;

      Q.push(3);
      Q.push(4);
      Q.push(2);
      Q.push(1);

      while (!Q.empty())
      {
        // Print the top element, then remove it.
        std::cout << Q.top() << " ";
        Q.pop();
      }
      std::cout << "\n";

      return 0;
    }
    '
  />

  <p>
    Given that <code>std::priority_queue</code> defaults to a max-heap, the
    program above outputs:
  </p>

  <CodeBlock code="4 3 2 1" />

  <p>
    Note that the line in the code where <code>Q</code> is defined is equivalent
    to this:
  </p>

  <CodeBlock
    language="c++"
    code="std::priority_queue<int, std::vector<int>, std::less<int>> Q;"
  />

  <p>
    To transform <code>Q</code> into a min-heap, we simply need to replace the
    default <code>std::less&lt;int&gt;</code> with
    <a href="http://www.cplusplus.com/reference/functional/greater/"
      ><code>std::greater&lt;int&gt;</code></a
    >. Like <code>std::less</code>, <code>std::greater</code> is a functor
    class. However, it provides a different member function for comparing two
    values:
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
    The only distinction from <code>std::less</code> is that it returns the
    value of <code>(x &gt; y)</code> instead of <code>(x &lt; y)</code>. Here is
    the same code from the previous example but with <code>Q</code> now
    functioning as a min-heap:
  </p>

  <CodeBlock
    language="c++"
    code='
    #include <queue>
    #include <iostream>

    int main() {
      std::priority_queue<int, std::vector<int>, std::greater<int>> Q;

      Q.push(3);
      Q.push(4);
      Q.push(2);
      Q.push(1);

      while (!Q.empty()) {
        // Print the top element, then remove it.
        std::cout << Q.top() << " ";
        Q.pop();
      }
      std::cout << "\n";

      return 0;
    }
    '
  />

  <p>As expected, the output of this program is:</p>

  <CodeBlock code="1 2 3 4" />

  <p>
    It's important to note that <code>std::less</code> and
    <code>std::greater</code> are only applicable for objects with a defined
    order through the comparison operators <code>&lt;</code> and
    <code>&gt;</code>, respectively. This means if you try to store objects from
    a type that lacks definitions for these operators, the code will not
    compile. If implementing these operators is not possible, you can still
    create your own functor class to establish an appropriate order for these
    objects:
  </p>

  <CodeBlock
    language="c++"
    code='
    #include <queue>
    #include <iostream>

    // Objects of type Integer cannot be compared using < or >.
    struct Integer {
      Integer(const int __x): x(__x) { }
      int x;
    };

    // Functor class that defines the order for Integer objects.
    struct Order {
      bool operator()(const Integer& a, const Integer& b) const {
        return a.x > b.x;
      }
    };

    int main() {
      std::priority_queue<Integer, std::vector<Integer>, Order> Q;

      Q.push(Integer(3));
      Q.push(Integer(4));
      Q.push(Integer(2));
      Q.push(Integer(1));

      while (!Q.empty()) {
        // Print the top element, then remove it.
        std::cout << Q.top().x << " ";
        Q.pop();
      }
      std::cout << "\n";

      return 0;
    }
    '
  />

  <p>
    The structure of the <code>Order</code> functor is analogous to
    <code>std::greater</code>. However, it compares objects of type
    <code>Integer</code> by evaluating the values of their
    <code>x</code> members. Given these similarities, it's not surprising that
    the output of the program above is:
  </p>

  <CodeBlock code="1 2 3 4" />

  <SectionTitle>Bonus: Runtime complexity of heap construction</SectionTitle>

  <p>
    When the elements to be inserted into the heap are known in advance, it's
    more efficient to build the heap directly from these elements rather than
    inserting them one at a time. For example, if $n$ elements are inserted
    one-by-one as we did above, the runtime complexity would be $O(n\log_2(n))$.
    However, if all elements are known beforehand and stored, for instance, in a
    vector, we can construct the heap in $O(n)$ time using the
    <a
      href="https://www.cs.princeton.edu/~wayne/kleinberg-tardos/pdf/DemoHeapify.pdf"
      >heapify</a
    >
    method. Conveniently, the <code>std::priority_queue</code> container
    provides a constructor that performs this task for us:
  </p>

  <CodeBlock
    language="c++"
    code="
    int main() {
      // Elements are first stored in a random-access container.
      std::vector<int> V = { 3, 4, 2, 1 };

      // Build heap using heapify method (linear runtime complexity).
      std::priority_queue<int> Q(V.begin(), V.end());

      ...
    }
    "
  />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
