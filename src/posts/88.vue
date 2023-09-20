<template>
  <p>
    Suppose you have an array of C-style strings, i.e., an array of
    <code>char*</code> or <code>const char*</code>, and you want to sort the
    array by ordering the strings in
    <a href="https://en.wikipedia.org/wiki/Lexicographical_order"
      >lexicographical order</a
    >. One might naively think that the following would work:
  </p>

  <CodeBlock
    language="c++"
    code='
    #include <algorithm>
    #include <iostream>
    #include <vector>

    int main() {
      std::vector<const char*> names = { "Mary", "Bob", "John", "Roy" };

      std::sort(names.begin(), names.end());

      for (const char* name : names) {
        std::cout << name << " ";
      }
      std::cout << "\n";

      return 0;
    }
    '
  />

  <p>
    Unfortunately, this will print the names in the original order, which is not
    what we want:
  </p>

  <CodeBlock code="Mary Bob John Roy" />

  <p>
    This happens because a C-style string is represented as a pointer to its
    first character (as <code>const char*</code> in the example above). By
    directly sorting the elements of <code>names</code>, we are essentially
    comparing pointer values. These values indicate the
    <a href="https://en.wikipedia.org/wiki/Memory_address">memory addresses</a>
    where the strings reside, not the content of the strings themselves. Put
    differently, we're comparing <code>const char*</code> values using the
    <code>&lt;</code> operator, which is the default comparison method for
    <a href="http://en.cppreference.com/w/cpp/algorithm/sort"
      ><code>std::sort</code></a
    >. The memory addresses of the strings in <code>names</code> are determined
    at compile time. In this instance, the compiler has chosen to allocate
    <code>"Mary"</code> at an address that is lower than the address of
    <code>"Bob"</code>, which is further placed at an address lower than
    <code>"John"</code>, and so forth.
  </p>

  <p>
    So, how can we sort the strings as intended? The simplest approach involves
    providing a custom comparison function to <code>std::sort</code> that orders
    the C-style strings lexicographically rather than by their memory addresses:
  </p>

  <CodeBlock
    language="c++"
    code='
    #include <algorithm>
    #include <cstring>
    #include <iostream>
    #include <vector>

    int main() {
      std::vector<const char*> names = { "Mary", "Bob", "John", "Roy" };

      // Compares C-style strings lexicographically, not by address.
      auto cstr_compare = [](const char* s1, const char* s2) {
        return strcmp(s1, s2) < 0;
      };

      std::sort(names.begin(), names.end(), cstr_compare);

      for (const char* name : names) {
        std::cout << name << " ";
      }
      std::cout << "\n";

      return 0;
    }
    '
  />

  <p>The output is now as we desire:</p>

  <CodeBlock code="Bob John Mary Roy" />

  <p>
    Our solution is straightforward: use
    <a href="http://www.cplusplus.com/reference/cstring/strcmp/"
      ><code>strcmp</code></a
    >
    to compare strings lexicographically. The expression
    <code>strcmp(s1, s2) &lt; 0</code> evaluates to <code>true</code> if and
    only if <code>s1</code> is lexicographically smaller than <code>s2</code>.
  </p>

  <SectionTitle
    >Bonus: Ordered associative containers of C-style strings</SectionTitle
  >

  <p>
    Ordered associative containers, such as
    <a href="http://en.cppreference.com/w/cpp/container/map"
      ><code>std::map</code></a
    >
    and
    <a href="http://en.cppreference.com/w/cpp/container/set"
      ><code>std::set</code></a
    >, typically store their elements in balanced binary search trees. These
    trees utilize the ordering criterion for the keys to ensure quick insertion
    and lookup operations. However, as we observed earlier, the default ordering
    criterion for <code>const char*</code> disregards the contents of the string
    it references. Therefore, we need to provide a comparison function that
    imposes a lexicographical order on the container elements:
  </p>

  <CodeBlock
    language="c++"
    code='
    #include <cstring>
    #include <iostream>
    #include <set>

    struct NameCompare {
      bool operator()(const char* s1, const char* s2) const {
        return strcmp(s1, s2) < 0;
      }
    };

    int main() {
      // Strings ordered by memory addresses (not what we want).
      std::set<const char*> names_1 = { "Mary", "Bob", "John", "Roy" };

      std::cout << "names_1: ";
      for (const char* name : names_1) {
        std::cout << name << " ";
      }
      std::cout << "\n";

      // Use NameCompare as an ordering criterion for the names.
      std::set<const char*, NameCompare> names_2 = { "Mary", "Bob",
                                                     "John", "Roy" };

      std::cout << "names_2: ";
      for (const char* name : names_2) {
        std::cout << name << " ";
      }
      std::cout << "\n";

      return 0;
    }
    '
  />

  <p>The output of this program is:</p>

  <CodeBlock
    code="
    names_1: Mary Bob John Roy
    names_2: Bob John Mary Roy
    "
  />

  <p>
    When iterating over the elements of either an <code>std::set</code> or an
    <code>std::map</code> using a
    <a href="http://en.cppreference.com/w/cpp/language/range-for"
      >range-based for loop</a
    >, the elements of the container are traversed according to their key's
    ordering criterion, starting from the "smallest" and proceeding to the
    "largest". In the example provided above, it's evident that the names in
    <code>names_1</code> are printed based on the order of their memory
    addresses. Names in <code>names_2</code>, on the other hand, are printed in
    lexicographical order, a result of the ordering enforced by
    <code>NameCompare</code> for C-style strings.
  </p>

  <p>
    For those curious, the default ordering criterion for both
    <code>std::set</code> and <code>std::map</code> is determined by an instance
    of
    <a href="http://en.cppreference.com/w/cpp/utility/functional/less"
      ><code>std::less</code></a
    >. This instance establishes an order for a type <code>T</code> by utilizing
    the <code>&lt;</code> operator specific to that type:
  </p>

  <CodeBlock
    language="c++"
    code="
    template<typename T>
    struct less {
      bool operator()(const T& x, const T& y) const {
        return x < y;
      }
    };
    "
  />

  <p>
    As might be expected, <code>std::sort</code> uses <code>std::less</code> as
    its default mechanism to compare elements.
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
