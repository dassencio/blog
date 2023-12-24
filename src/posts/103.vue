<template>
  <p>Consider the following program:</p>

  <CodeBlock
    language="c++"
    code="
    std::vector<int> random_numbers(const size_t n) {
      std::vector<int> numbers;

      // Generate n random numbers and store them in numbers.
      ...

      return numbers;
    }

    int main() {
      // Create an array with 100 random numbers.
      std::vector<int> my_numbers = random_numbers(100);

      ...
    }
    "
  />

  <p>
    Returning an <code>std::vector&lt;int&gt;</code> by value can make a
    developer nervous: will this cause the vector to be copied? That would be a
    costly performance penalty and, therefore, something to avoid if possible.
  </p>

  <p>
    In this type of situation, a solid understanding of how
    <a href="https://en.wikipedia.org/wiki/Return_value_optimization"
      >return value optimization</a
    >
    (or simply RVO, for short) works leads to inner peace. Any decent compiler
    <a href="https://stackoverflow.com/a/17473869">will understand</a> that
    <code>numbers</code> is a temporary variable whose value will be returned at
    the end of the <code>random_numbers</code> function. Since this returned
    value is an rvalue (a temporary object), it can be used to initialize
    <code>my_numbers</code> directly, i.e., without going through any of the
    <code>std::vector&lt;int&gt;</code> constructors. In other words, no vectors
    should be copied or moved in the code above. How wonderful!
  </p>

  <p>
    Let's take a closer look at how RVO removes the need for a copy operation.
    When <code>random_numbers</code> is called, memory on the
    <a href="https://en.wikipedia.org/wiki/Call_stack">call stack</a> will be
    reserved for its return value (an <code>std::vector&lt;int&gt;</code>).
    Inside <code>random_numbers</code>, <code>numbers</code> is clearly a
    temporary variable whose value will be returned at the end. So instead of
    copying this value to the memory location reserved for the function's return
    value at the very end, <code>numbers</code> is stored directly at that
    memory location. The elimination of an unnecessary copy operation when a
    function returns is what "return value optimization" stands for. In general,
    any type of optimization that causes copy operations to be eliminated is
    referred to as
    <a href="https://en.wikipedia.org/wiki/Copy_elision">copy elision</a>.
  </p>

  <p>
    Despite all these facts, it is not uncommon for developers to be less
    confident than they should be in this type of situation and prefer "being on
    the safe side" by writing code like this:
  </p>

  <CodeBlock
    language="c++"
    code="
    std::vector<int> random_numbers(const size_t n) {
      std::vector<int> numbers;

      // Generate n random numbers and store them in numbers.
      ...

      return std::move(numbers);  // Don't do this!
    }
    "
  />

  <p>
    As innocent as this decision may seem, it is severely flawed because of the
    way RVO works: only a local variable or a temporary object can be stored
    directly at the memory location for a function's return value (function
    parameters are not eligible for that), and this is only allowed if such an
    object is directly returned by the function and has the same type as the
    function's return type. By adding
    <a href="http://www.cplusplus.com/reference/utility/move/"
      ><code>std::move</code></a
    >
    to the <code>return</code> statement above, we converted the type of the
    returned object to <code>std::vector&lt;int&gt;&amp;&amp;</code> (an rvalue
    reference to an object of type <code>std::vector&lt;int&gt;</code>), but
    <code>random_numbers</code> returns an <code>std::vector&lt;int&gt;</code>.
    Because the conditions required for RVO are not satisfied, the compiler will
    have no choice but to construct <code>numbers</code> outside the memory area
    reserved for the return value of <code>random_numbers</code> and then move
    it to that location when the function returns (a move operation is still
    possible here since <code>std::move(numbers)</code> is an rvalue and will
    therefore trigger the move constructor for the
    <code>std::vector&lt;int&gt;</code> that is constructed as the return
    value).
  </p>

  <p>
    For many user-defined types, such an additionally incurred move operation
    will be cheap, but it will definitely not be cheaper than what RVO offers.
    Therefore, by "playing it safe", we inadvertently worsened our program's
    performance. Also, note that we were lucky to have a return type
    (<code>std::vector&lt;int&gt;</code>) with a move constructor; had this not
    been the case, the added <code>std::move</code> would have caused the return
    value to be initialized through a copy constructor, which is exactly what we
    wanted to avoid in the first place!
  </p>

  <p>
    To conclude, here is an example that illustrates everything discussed so
    far:
  </p>

  <CodeBlock
    language="c++"
    code='
    #include <iostream>

    class X {
    public:
      // Default constructor.
      X() {
        std::cout << "X::X()\n";
      }

      // Copy constructor.
      X(const X&) {
        std::cout << "X::X(const X&)\n";
      }

      // Move constructor.
      X(X&&) {
        std::cout << "X::X(X&&)\n";
      }
    };

    X good() {
      std::cout << "good()\n";
      X x;
      return x;
    }

    X bad() {
      std::cout << "bad()\n";
      X x;
      return std::move(x);
    }

    int main() {
      X x1 = good();
      X x2 = bad();

      return 0;
    }
    '
  />

  <p>
    The program's output demonstrates that the <code>std::move</code> in the
    <code>bad</code> function disables RVO, forcing an unnecessary move
    operation (this will be the case even if you compile with high
    optimizations, e.g., using <code>-O3</code> with <code>gcc</code>):
  </p>

  <CodeBlock
    code="
    good()
    X::X()
    bad()
    X::X()
    **X::X(X&&)**
    "
  />

  <p>
    Try compiling and running this program, then remove the move constructor
    from <code>X</code>. The resulting output will show that
    <code>std::move</code> now causes <code>X</code> to be copied, an even worse
    outcome:
  </p>

  <CodeBlock
    code="
    good()
    X::X()
    bad()
    X::X()
    **X::X(const X&)**
    "
  />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
