<template>
  <p>
    The C++ type system is complex. When type deduction rules are added to the
    mix (e.g., in function templates or when variables are declared with the
    type <code>auto</code>), the results may be unexpected for those not
    entirely familiar with how types are deduced in such contexts. Luckily,
    there are a few tools that can help, one of my favorites being a type trait
    called
    <a href="http://en.cppreference.com/w/cpp/types/is_same"
      ><code>std::is_same</code></a
    >. Given two types <code>T1</code> and <code>T2</code>,
    <code>std::is_same&lt;T1, T2&gt;</code> is a <code>struct</code> containing
    a boolean member <code>value</code> that is equal to <code>true</code> if
    <code>T1</code> and <code>T2</code> are the same type, up to their
    <a href="http://en.cppreference.com/w/cpp/language/cv">const-volatile</a>
    qualifications; otherwise, it's <code>false</code>. Here is an example of
    how it can be used:
  </p>

  <CodeBlock
    language="c++"
    code='
    #include <iostream>
    #include <string>
    #include <type_traits>

    int main() {
      using namespace std;

      // Print boolean values as "true"/"false" instead of 1/0.
      cout << boolalpha;

      cout << is_same<int, int>::value << "\n";        // true
      cout << is_same<int, const int>::value << "\n";  // false
      cout << is_same<int, char>::value << "\n";       // false

      cout << is_same<int, int&>::value << "\n";   // false
      cout << is_same<int, int&&>::value << "\n";  // false

      auto x1 = string("Hello, world!");
      auto& x2 = x1;
      auto&& x3 = move(x1);

      cout << is_same<decltype(x1), string>::value << "\n";    // true
      cout << is_same<decltype(x2), string&>::value << "\n";   // true
      cout << is_same<decltype(x3), string&&>::value << "\n";  // true

      cout << is_same<decltype(x1), decltype(x2)>::value << "\n";  // false
      cout << is_same<decltype(x2), decltype(x3)>::value << "\n";  // false
      cout << is_same<decltype(x3), decltype(x1)>::value << "\n";  // false

      return 0;
    }
    '
  />

  <p>
    You might be wondering why we can't simply use the
    <a href="http://en.cppreference.com/w/cpp/language/typeid"
      ><code>typeid</code></a
    >
    operator to determine types. Unfortunately, <code>typeid</code> is far less
    precise than <code>std::is_same</code> for this purpose. To illustrate,
    let's convert the code above to use <code>typeid</code> instead (note that
    the header <code>typeinfo</code> is now included instead of
    <code>type_traits</code>):
  </p>

  <CodeBlock
    language="c++"
    code='
    #include <iostream>
    #include <string>
    #include <typeinfo>

    int main() {
      using namespace std;

      // Print boolean values as "true"/"false" instead of 1/0.
      cout << boolalpha;

      cout << (typeid(int) == typeid(int)) << "\n";        // true
      cout << (typeid(int) == typeid(const int)) << "\n";  // true (!)
      cout << (typeid(int) == typeid(char)) << "\n";       // false

      cout << (typeid(int) == typeid(int&)) << "\n";   // true (!)
      cout << (typeid(int) == typeid(int&&)) << "\n";  // true (!)

      auto x1 = string("Hello, world!");
      auto& x2 = x1;
      auto&& x3 = move(x1);

      cout << (typeid(x1) == typeid(string)) << "\n";    // true
      cout << (typeid(x2) == typeid(string&)) << "\n";   // true
      cout << (typeid(x3) == typeid(string&&)) << "\n";  // true

      cout << (typeid(x1) == typeid(x2)) << "\n";  // true (!)
      cout << (typeid(x2) == typeid(x3)) << "\n";  // true (!)
      cout << (typeid(x3) == typeid(x1)) << "\n";  // true (!)

      return 0;
    }
    '
  />

  <p>
    The output of this program demonstrates that
    <code>typeid</code> is an inadequate tool for determining types. The issue
    with <code>typeid</code> is that it overlooks the reference,
    <code>const</code>, and
    <code>volatile</code>
    qualifications of the type or expression passed to it. Review the example
    just shown, and you'll notice that this is precisely why the type comparison
    results are what they are. As surprising as this may be, it's actually
    specified in the C++ language (for more on this topic, see
    <ReferenceLink id="effective-modern-cpp" />, items 1 and 4).
  </p>

  <p>
    As a final note, an object of type <code>std::is_same</code> can be
    implicitly converted to <code>bool</code>, allowing you to
    default-initialize such an object and print its value directly. This
    approach requires less typing and results in cleaner code:
  </p>

  <CodeBlock
    language="c++"
    code='
    #include <iostream>
    #include <type_traits>

    int main() {
      using namespace std;

      // Print boolean values as "true"/"false" instead of 1/0.
      cout << boolalpha;

      cout << is_same<int, int>{} << "\n";        // true
      cout << is_same<int, const int>{} << "\n";  // false
      cout << is_same<int, char>{} << "\n";       // false

      return 0;
    }
    '
  />

  <ReferenceListBlock>
    <ReferenceListBlockItem
      id="effective-modern-cpp"
      :authors="['Scott Meyers']"
      title="Effective Modern C++"
      url="https://www.oreilly.com/library/view/effective-modern-c/9781491908419/"
    />
  </ReferenceListBlock>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
