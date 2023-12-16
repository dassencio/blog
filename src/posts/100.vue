<template>
  <p>
    A class that declares or inherits at least one virtual function contains a
    <a href="https://en.wikipedia.org/wiki/Virtual_method_table"
      >virtual function table</a
    >
    (or vtable, for short). Such a class is referred to as a
    <a href="http://www.cplusplus.com/doc/tutorial/polymorphism/"
      >polymorphic class</a
    >. An object of a polymorphic class type contains a special data member (a
    "vtable pointer") that points to the vtable of the class. This pointer is an
    implementation detail and cannot be accessed directly by programmers (not
    without resorting to some low-level tricks, at least). In this post, I will
    assume the reader is familiar with vtables at least on a basic level. For
    those uninitiated,
    <a href="https://www.learncpp.com/cpp-tutorial/the-virtual-table/">here</a>
    is a good resource to learn about this topic.
  </p>

  <p>
    I hope you have learned that when you wish to make use of polymorphism, you
    need to access objects of derived types through pointers or references to a
    base type. For example, consider the following program:
  </p>

  <CodeBlock
    language="cpp"
    code='
    #include <iostream>

    struct Fruit {
      virtual const char* name() const {
        return "Fruit";
      }
    };

    struct Apple: public Fruit {
      virtual const char* name() const override {
        return "Apple";
      }
    };

    struct Banana: public Fruit {
      virtual const char* name() const override {
        return "Banana";
      }
    };

    void analyze_fruit(const Fruit& f) {
      std::cout << f.name() << "\n";
    }

    int main() {
      Apple a;
      Banana b;

      analyze_fruit(a);  // Prints "Apple".
      analyze_fruit(b);  // Prints "Banana".

      return 0;
    }
    '
  />

  <p>
    So far, there are no surprises here. But what will happen if, instead of
    taking a reference to a <code>Fruit</code> object in
    <code>analyze_fruit</code>, we take a <code>Fruit</code> object by value?
  </p>

  <p>
    Any experienced C++ developer will immediately recognize the term "<a
      href="https://en.wikipedia.org/wiki/Object_slicing"
      >slicing</a
    >" in this context. Indeed, taking a <code>Fruit</code> object by value
    means that inside <code>analyze_fruit</code>, the object <code>f</code> is
    merely a <code>Fruit</code>, and never an <code>Apple</code>, a
    <code>Banana</code>, or any other derived type:
  </p>

  <CodeBlock
    language="cpp"
    code='
    // Same code as before...

    void analyze_fruit(Fruit f) {
      std::cout << f.name() << "\n";
    }

    int main() {
      Apple a;
      Banana b;

      analyze_fruit(a);  // Prints "Fruit".
      analyze_fruit(b);  // Prints "Fruit".

      return 0;
    }
    '
  />

  <p>
    This situation is worth analyzing in more detail, even if it seems trivial
    at first glance. In the calls to <code>analyze_fruit</code>, we pass objects
    of type <code>Apple</code> and <code>Banana</code>
    as arguments, which are used to initialize its parameter
    <code>f</code> (of type <code>Fruit</code>). This process is a copy
    initialization, meaning the initialization of <code>f</code> in both cases
    is no different from the way <code>f</code> is initialized in the code
    fragment below:
  </p>

  <CodeBlock
    language="cpp"
    code="
    Apple a;
    Fruit f(a);
    "
  />

  <p>
    Even though <code>Fruit</code> does not define a copy constructor, one is
    provided by the compiler. This default copy constructor simply copies each
    data member of the source <code>Fruit</code> object into the corresponding
    data member of the <code>Fruit</code> object being created. In our case,
    <code>Fruit</code> has no data members, but it still has a vtable pointer.
    How is this pointer initialized? Is it copied directly from the input
    <code>Fruit</code> object? Before we answer these questions, let's look at
    what the compiler-generated copy constructor of
    <code>Fruit</code> resembles:
  </p>

  <CodeBlock
    language="cpp"
    code='
    struct Fruit {
      // Compiler-generated copy constructor.
      Fruit(const Fruit& sf): vptr(/* What goes in here? */) {
        // Nothing happens here.
      }

      virtual const char* name() const {
        return "Fruit";
      }
    };
    '
  />

  <p>
    The signature of the <code>Fruit</code> copy constructor indicates that it
    takes a reference to a source <code>Fruit</code> object. This means if we
    pass an <code>Apple</code> object to the copy constructor of
    <code>Fruit</code>, the vtable pointer of <code>sf</code> (for "source
    fruit") will actually point to the vtable of an <code>Apple</code> object.
    In other words, if this vtable pointer is directly copied to the vtable
    pointer of the <code>Fruit</code> object being constructed (represented as
    <code>vptr</code> in the code above), this object will behave like an
    <code>Apple</code> whenever any of its virtual functions are called!
  </p>

  <p>
    But as mentioned in the second code example above (the one where
    <code>analyze_fruit</code> takes a <code>Fruit</code> object by value), the
    <code>Fruit</code> parameter <code>f</code> always behaves as a
    <code>Fruit</code>, and never as an <code>Apple</code> or as a
    <code>Banana</code>.
  </p>

  <p>
    This brings us to the key lesson of this post: vtable pointers are not
    ordinary data members that are directly copied or moved by copy and move
    constructors, respectively. Instead, they are always initialized by any
    constructor used to build an object of a polymorphic class type
    <code>T</code> with the address of the vtable for the <code>T</code> class.
    Additionally, assignment operators will never alter the values stored in
    vtable pointers. In the context of our classes, the vtable pointer of a
    <code>Fruit</code> object will be initialized by any constructor of
    <code>Fruit</code> with the address of the vtable for the
    <code>Fruit</code> class and will retain this value throughout the entire
    lifetime of the object.
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
