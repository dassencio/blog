<template>
  <p>
    A function is a set of instructions that encapsulates a specific task. It
    receives input data from the caller in the form of
    <b>arguments</b> and processes them internally using
    <b>parameters</b> (variables), which are
    <a href="https://en.wikipedia.org/wiki/Parameter_(computer_programming)"
      >initialized</a
    >
    by their corresponding arguments. Function parameters are used in function
    definitions, while function arguments are used in function calls. For
    example, consider the pseudocode below:
  </p>

  <CodeBlock
    code="
    ReturnType some_function(ParameterType1 p1, ..., ParameterTypeN pN) {
      ...
    }

    ...

    some_function(expr1, ..., exprN);
    "
  />

  <p>
    To call <code>some_function</code>, we need $N$ arguments. In the code
    above, these arguments are the results of evaluating the expressions
    <code>expr1</code>, ..., <code>exprN</code>. The parameters of
    <code>some_function</code> are the (local) function variables
    <code>p1</code>, ..., <code>pN</code> with types
    <code>ParameterType1</code>, ..., <code>ParameterTypeN</code>, respectively.
    When <code>some_function</code> is called, the $n$-th argument it receives
    will be used to initialize its $n$-th parameter.
  </p>

  <p>
    Although it might seem like we're just assigning names to concepts, the
    distinction between function parameters and function arguments is crucial,
    especially in C++. This distinction stems from the fact that, when a
    function is called:
  </p>

  <ListBlock>
    <ListBlockItem bullet="1.">
      The types of its parameters don't always match the types of their
      associated arguments.
    </ListBlockItem>
    <ListBlockItem bullet="2.">
      User-defined types come with their own constructors, which means a
      parameter of a user-defined type can potentially be initialized in
      multiple ways.
    </ListBlockItem>
  </ListBlock>

  <p>The first point is illustrated by the simple example below:</p>

  <CodeBlock
    language="c++"
    code="
    // do_something has a single parameter n of type unsigned int.
    int do_something(unsigned int n) {
      ...
    }

    ...

    // Call do_something with the (int) value 3 as argument.
    do_something(3);
    "
  />

  <p>
    In the code above, the argument value <code>3</code> that is passed to
    <code>do_something</code> is of type <code>int</code>. It is used to
    initialize the function parameter <code>n</code>, which is of type
    <code>unsigned int</code>. This initialization involves an implicit type
    conversion of the value <code>3</code> from <code>int</code> to
    <code>unsigned int</code>. Within the scope of <code>do_something</code>,
    <code>n</code> is a regular variable holding the value <code>3</code> as an
    <code>unsigned int</code>.
  </p>

  <p>
    The second point mentioned earlier is the more intriguing one. Consider the
    following example:
  </p>

  <CodeBlock
    language="c++"
    code='
    #include <iostream>
    #include <string>

    class Message {
    public:
      Message(int n) {
        std::cout << "Message::Message(int)\n";
      }

      Message(const std::string& m) {
        std::cout << "Message::Message(const std::string&)\n";
      }

      Message(std::string&& m) {
        std::cout << "Message::Message(std::string&&)\n";
      }
    };

    void log_message(Message msg) {
      // Log the input Message.
    }

    int main() {
      std::string str = "Hello, world!";

      log_message(3);
      log_message(str);
      log_message(std::move(str));

      return 0;
    }
    '
  />

  <p>The output of this program might surprise some readers:</p>

  <CodeBlock
    language="c++"
    code="
    Message::Message(int)
    Message::Message(const std::string&)
    Message::Message(std::string&&)
    "
  />

  <p>
    In this example, the manner in which <code>msg</code> is initialized by its
    corresponding argument in <code>log_message</code> has distinct and
    observable consequences. On the first call to <code>log_message</code>, the
    argument <code>3</code> is of type <code>int</code>. As a result,
    <code>msg</code> gets initialized using the constructor
    <code>Message::Message(int)</code>. On the second call to
    <code>log_message</code>, since the argument <code>str</code> is an lvalue
    of type <code>std::string</code>, <code>msg</code> is initialized using the
    constructor <code>Message::Message(const std::string&amp;)</code>. Lastly,
    during the third call to <code>log_message</code>, as
    <code>std::move(str)</code> creates an rvalue of type
    <code>std::string&amp;&amp;</code>, <code>msg</code> is initialized through
    the constructor <code>Message::Message(std::string&amp;&amp;)</code>. In
    essence, the constructor chosen to initialize the function parameter
    <code>msg</code> is directly influenced by the type of argument provided to
    <code>log_message</code>, even though the type of <code>msg</code> remains
    consistent as <code>Message</code>.
  </p>

  <p>
    In conclusion, a function parameter is a standard variable that is
    initialized by its corresponding input argument when the function is
    invoked, implying that the type of a parameter does not necessarily have to
    match the type of the argument used for its initialization.
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
