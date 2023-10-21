<template>
  <p>
    In this post, I will show that every
    <a href="http://en.cppreference.com/w/cpp/language/lambda"
      >lambda function</a
    >
    in C++ (or "lambda expression", or just "lambda" for short) is equivalent to
    a
    <a
      href="http://stackoverflow.com/questions/356950/c-functors-and-their-uses#356993"
      >functor class</a
    >, i.e., to a class that has an overloaded
    <a href="http://en.cppreference.com/w/cpp/language/operators"
      ><code>operator()</code></a
    >. Objects that are instances of such classes can be called as if they were
    functions. I will illustrate this fact by explicitly constructing equivalent
    functor classes for various lambda functions. The advantage of using lambda
    functions over their equivalent functor classes is that the required amount
    of code for a lambda can be significantly shorter and cleaner, provided that
    the lambda itself isn't too long or complicated.
  </p>

  <p>
    To understand this post, readers should have a basic knowledge of how a
    lambda function is defined and at least some familiarity with what a capture
    list is.
  </p>

  <p>Let's start with a simple example:</p>

  <CodeBlock
    language="c++"
    code='
    #include <iostream>

    int main() {
      auto add_one = [](const int x) { return x + 1; };

      int x = 1;

      std::cout << add_one(x) << "\n"; // Prints 2.
      std::cout << add_one(2) << "\n"; // Prints 3.

      return 0;
    }
    '
  />

  <p>
    This program contains a lambda function <code>add_one</code> that accepts a
    single integer value <code>x</code> and returns <code>x + 1</code>. As
    demonstrated in the following program, the same task can be accomplished
    using a functor class named <code>AddOne</code>:
  </p>

  <CodeBlock
    language="c++"
    code='
    #include <iostream>

    class AddOne {
    public:
      int operator()(const int x) const {
        return x + 1;
      }
    };

    int main() {
      AddOne add_one;

      int x = 1;

      std::cout << add_one(x) << "\n"; // Prints 2.
      std::cout << add_one(2) << "\n"; // Prints 3.

      return 0;
    }
    '
  />

  <p>
    The code above was valid even before C++11 was introduced. Notice that it's
    considerably longer than the first version.
  </p>

  <p>
    Now, let's consider an example where the lambda function has a non-empty
    capture list:
  </p>

  <CodeBlock
    language="c++"
    code='
    #include <iostream>

    int main() {
      int a = 3;
      int b = 2;

      // For a line y(x) = a * x + b, determine y given x.
      auto compute_y = [=](const int x) { return a * x + b; };

      int x = 1;

      std::cout << compute_y(x) << "\n"; // Prints 5.
      std::cout << compute_y(2) << "\n"; // Prints 8.

      return 0;
    }
    '
  />

  <p>
    The lambda function <code>compute_y</code> uses a capture list that copies
    all variables from the local scope of the <code>main</code> function
    available before its definition. That is, copies of both <code>a</code> and
    <code>b</code> are made accessible for <code>compute_y</code> to use
    internally. The equivalent version with a functor class achieves the same
    result by using a constructor that copies the values of <code>a</code> and
    <code>b</code> into private data members <code>a_</code> and
    <code>b_</code>, respectively:
  </p>

  <CodeBlock
    language="c++"
    code='
    #include <iostream>

    class ComputeY {
    public:
      ComputeY(const int a, const int b): a_(a), b_(b) {
        // Nothing needs to be done here.
      }

      int operator()(const int x) const {
        return a_ * x + b_;
      }

    private:
      int a_;
      int b_;
    };

    int main() {
      int a = 3;
      int b = 2;

      ComputeY compute_y(a, b);

      int x = 1;

      std::cout << compute_y(x) << "\n"; // Prints 5.
      std::cout << compute_y(2) << "\n"; // Prints 8.

      return 0;
    }
    '
  />

  <p>
    Since capture lists can also capture variables from the local scope by
    reference, the following is an example illustrating this scenario:
  </p>

  <CodeBlock
    language="c++"
    code='
    #include <array>
    #include <iostream>

    int main() {
      int a = 2;
      std::array<int, 3> v = { 1, 2, 3 };

      /*
       * For an input array x with three elements, return a + x * v,
       * where "*" represents a dot product operation. This lambda
       * captures a by value and v by reference.
       */
      auto affine = [a, &v](const std::array<int, 3>& x) {
                      return a + x[0] * v[0] + x[1] * v[1] + x[2] * v[2];
                    };

      std::array<int, 3> x = { 1, -1, 2 };

      std::cout << affine(x) << "\n"; // Prints 7.

      return 0;
    }
    '
  />

  <p>
    The functor class version requires a private data member that references an
    input array:
  </p>

  <CodeBlock
    language="c++"
    code='
    #include <array>
    #include <iostream>

    class Affine {
    public:
      Affine(const int a, std::array<int, 3>& v): a_(a), v_(v) {
        // Nothing needs to be done here.
      }

      int operator()(const std::array<int, 3>& x) const {
        return a_ + x[0] * v_[0] + x[1] * v_[1] + x[2] * v_[2];
      }

    private:
      int a_;
      std::array<int, 3>& v_;
    };

    int main() {
      int a = 2;
      std::array<int, 3> v = { 1, 2, 3 };

      Affine affine(a, v);

      std::array<int, 3> x = { 1, -1, 2 };

      std::cout << affine(x) << "\n"; // Prints 7.

      return 0;
    }
    '
  />

  <p>
    The next scenario we need to consider is when a lambda function can modify
    its own state. Examining the previous examples, one can observe that every
    definition of <code>operator()</code> is qualified as <code>const</code>. By
    default, a lambda cannot alter the value of a parameter captured by value.
    And while references themselves can't be modified after initialization, the
    objects they refer to
    <a href="http://stackoverflow.com/q/16764153">can be modified</a>, similar
    to pointers. This behavior is illustrated in the following program:
  </p>

  <CodeBlock
    language="c++"
    code='
    #include <iostream>

    int main() {
      int a = 0;
      int b = 0;

      // Error: copy of a cannot be changed.
      auto lambda_1 = [a](const int x) { ++a; return a * x; };

      /*
       * OK: A reference cannot be modified after initialization, but
       * the object it refers to can be modified.
       */
      auto lambda_2 = [&b](const int x) { ++b; return b * x; };

      std::cout << lambda_2(1) << "\n"; // Prints 1.
      std::cout << lambda_2(1) << "\n"; // Prints 2.
      std::cout << lambda_2(1) << "\n"; // Prints 3.

      std::cout << b << "\n"; // Prints 3.

      return 0;
    }
    '
  />

  <p>
    To modify the state of variables captured by value inside a lambda function,
    it needs to be declared as
    <a href="http://stackoverflow.com/q/5501959"><code>mutable</code></a
    >:
  </p>

  <CodeBlock
    language="c++"
    code='
    #include <iostream>

    int main() {
      int a = 0;
      int b = 0;

      // OK: Copy of a can be modified since lambda_1 is mutable.
      auto lambda_1 = [a](const int x) mutable { ++a; return a * x; };

      std::cout << lambda_1(1) << "\n"; // Prints 1.
      std::cout << lambda_1(1) << "\n"; // Prints 2.
      std::cout << lambda_1(1) << "\n"; // Prints 3.

      std::cout << a << "\n"; // Prints 0.

      // OK: b is captured by reference (no need for mutable).
      auto lambda_2 = [&b](const int x) { ++b; return b * x; };

      std::cout << lambda_2(1) << "\n"; // Prints 1.
      std::cout << lambda_2(1) << "\n"; // Prints 2.
      std::cout << lambda_2(1) << "\n"; // Prints 3.

      std::cout << b << "\n"; // Prints 3.

      return 0;
    }
    '
  />

  <p>
    Declaring a lambda function as <code>mutable</code> essentially removes the
    <code>const</code> qualifier from the <code>operator()</code> of the
    corresponding functor class, which allows the operator to modify the data
    members of the class.
  </p>

  <p>
    So far, all the lambda functions we have defined are valid in C++11. Our
    final example will be a generic lambda function, i.e., a lambda that has at
    least one parameter with the type <code>auto</code> (generic lambdas were
    introduced in C++14.) There is nothing truly special about how an equivalent
    functor class is defined in this case; we simply use templates to
    accommodate the missing functionality:
  </p>

  <CodeBlock
    language="c++"
    code='
    #include <iostream>

    int main() {
      auto add_one = [](const auto x) { return x + 1; };

      int x = 1;

      std::cout << add_one(x) << "\n"; // Prints 2.
      std::cout << add_one(2) << "\n"; // Prints 3.

      return 0;
    }
    '
  />

  <p>Here is the equivalent program using a functor class:</p>

  <CodeBlock
    language="c++"
    code='
    #include <iostream>

    class AddOne {
    public:
      template<typename T>
      T operator()(const T x) const {
        return x + 1;
      }
    };

    int main() {
      AddOne add_one;

      int x = 1;

      std::cout << add_one(x) << "\n"; // Prints 2.
      std::cout << add_one(2) << "\n"; // Prints 3.

      return 0;
    }
    '
  />

  <p>
    In all the examples above, I demonstrated how to construct an equivalent
    functor class for a given lambda. While the code that uses a functor class
    produces the same results as the original and can thus be considered
    equivalent in that sense, they aren't entirely equivalent in the context of
    type definition. Specifically, introducing a functor class means you're
    introducing a new type to replace the lambda function. However, it's worth
    noting that in all cases except for the generic lambda functions, we can
    declare the functor classes
    <a href="http://stackoverflow.com/a/25383554">locally</a> as anonymous
    classes. In doing so, no new type is explicitly introduced. To clarify, here
    is how it can be done for our very first example:
  </p>

  <CodeBlock
    language="c++"
    code='
    #include <iostream>

    int main() {
      // Anonymous class (no need for AddOne).
      class {
      public:
        int operator()(const int x) const {
          return x + 1;
        }
      } add_one;

      int x = 1;

      std::cout << add_one(x) << "\n"; // Prints 2.
      std::cout << add_one(2) << "\n"; // Prints 3.

      return 0;
    }
    '
  />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
