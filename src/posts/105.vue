<template>
  <p>
    Suppose you're debugging a C++ program and need to know the type that the
    compiler deduces for a certain expression. There are many complicated ways
    of doing this, but in this post, I will show you a very simple trick that
    allows you to determine types directly at compile time.
  </p>

  <p>
    The trick is this: declare a class template but do not define it, then
    attempt to instantiate this class template with the expression whose type
    you're trying to determine. Here is an example:
  </p>

  <CodeBlock
    language="c++"
    code="
    // Class template declaration (no definition available).
    template<typename T>
    class ShowType;

    int main() {
      signed int x = 1;
      unsigned int y = 2;

      // (signed int) + (unsigned int): what is the resulting type?
      ShowType<decltype(x + y)> dummy;

      return 0;
    }
    "
  />

  <p>
    In the program above, we're trying to determine the type deduced by the
    compiler when we add a <code>signed int</code> (<code>x</code>) to an
    <code>unsigned int</code> (<code>y</code>). This type is
    <code>decltype(x + y)</code>. When the compiler attempts to create an
    instance of <code>ShowType&lt;decltype(x + y)&gt;</code>, it realizes that
    this is not possible and indicates the problem with a very helpful error
    message:
  </p>

  <CodeBlock
    code="error: implicit instantiation of undefined template 'ShowType<**unsigned int**>'"
  />

  <p>
    In this message, the compiler (in this case, <code>gcc</code>) is telling us
    that it tried to create an instance of
    <code>ShowType&lt;unsigned int&gt;</code> but failed. Therefore, the type of
    the expression <code>x + y</code> is <code>unsigned int</code>. This
    resulting type comes directly from the
    <a href="https://stackoverflow.com/q/50605">integer addition rules</a>
    specified in the C++ language.
  </p>

  <p>
    Let's try a more interesting example. In C++, the type deduction rules for
    template parameters are complex. When in doubt, you can use the above trick
    to determine which type the compiler deduces for a certain template
    parameter:
  </p>

  <CodeBlock
    language="c++"
    code="
    template<typename T>
    class ShowType;

    template<typename T>
    void my_function(T x) {
      ShowType<T> dummy;
    }

    int main() {
      const int x = 3;
      my_function(x);

      return 0;
    }
    "
  />

  <p>
    One common question developers often have regarding the type
    <code>T</code> in <code>my_function</code> is: will it be deduced as
    <code>int</code> or <code>const int</code>? As it turns out, since we're
    passing <code>x</code> by value, the compiler will deduce <code>T</code> to
    be <code>int</code>:
  </p>

  <CodeBlock
    code="error: implicit instantiation of undefined template 'ShowType<**int**>'"
  />

  <p>
    As a final example, let's consider <code>auto</code>. The rules for
    <code>auto</code> type deduction are generally the same as those for
    template types, but <code>auto</code> type deduction assumes that
    initializing expressions such as <code>{ 1, 2, 3 }</code> represent
    initializer lists. Let's demonstrate this in practice:
  </p>

  <CodeBlock
    language="c++"
    code="
    #include <initializer_list>

    template<typename T>
    class ShowType;

    int main() {
      auto x = { 1, 2, 3 };
      ShowType<decltype(x)> dummy;

      return 0;
    }
    "
  />

  <p>The error message tells us what we expect:</p>

  <CodeBlock
    code="error: ... undefined template 'ShowType<**std::initializer_list<int>**>'"
  />

  <p>
    Note that we must pass an actual type (not an expression) to
    <code>ShowType&lt;T&gt;</code>. That's why determining the type of a certain
    expression (e.g., <code>x + y</code>) requires us to enclose it with
    <a href="https://en.wikipedia.org/wiki/Decltype"><code>decltype</code></a
    >. In the second example, we already had the desired type
    <code>T</code> available in the definition of <code>my_function</code>, so
    we could use it directly.
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
