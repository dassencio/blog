<template>
  <p>
    Whenever you call a non-static member function of a class, you do so through
    an existing object of that class type. Inside the definition of such a
    member function, you can refer to this object through the
    <a href="http://en.cppreference.com/w/cpp/language/this"
      ><code>this</code></a
    >
    pointer. Unless there is a need to disambiguate the use of a certain
    variable name (for instance, if a class data member has the same name as a
    local variable of the member function), developers often do not use the
    <code>this</code> pointer to explicitly refer to class data members. This is
    usually not problematic, but as I will discuss in this post, there are
    situations that require special care to avoid certain pitfalls.
  </p>

  <p>To begin, consider the following piece of code:</p>

  <CodeBlock
    language="c++"
    code="
    class AddNumber {
    public:
      ...
      int add(const int other) const;

    private:
      int number;
    };

    int AddNumber::add(const int other) const {
      return number + other;
    }
    "
  />

  <p>
    When the compiler parses the code above, it understands that in the
    definition of <code>AddNumber::add</code>, <code>number</code> refers to the
    class data member with that name. Therefore, the definition of
    <code>AddNumber::add</code> is equivalent to this:
  </p>

  <CodeBlock
    language="c++"
    code="
    int AddNumber::add(const int other) const {
      return this->number + other;
    }
    "
  />

  <p>
    However, if we change the name of the parameter <code>other</code> in
    <code>AddNumber::add</code> to <code>number</code>, the compiler will
    interpret any occurrence of <code>number</code> inside its definition as the
    function parameter <code>number</code>, not the data member
    <code>this->number</code>:
  </p>

  <CodeBlock
    language="c++"
    code="
    int AddNumber::add(const int number) const {
      return number + number; // Here, number is not this->number!
    }
    "
  />

  <p>
    To fix this ambiguity, we can use the <code>this</code> pointer to indicate
    to the compiler that the first occurrence of <code>number</code> actually
    refers to the class data member instead of the function parameter:
  </p>

  <CodeBlock
    language="c++"
    code="
    int AddNumber::add(const int number) const {
      return this->number + number; // This is what we originally had.
    }
    "
  />

  <p>
    I hope everything discussed so far is familiar to you, so let's move on to
    more intriguing topics.
  </p>

  <p>
    One could argue that classes, as commonly perceived, don't truly exist: they
    are essentially syntactic sugar to avoid the explicit passing of object
    pointers, as is done in C programs. To elucidate this concept, examine the
    code below: it is conceptually similar to the previous example, except for
    the absence of the <code>private</code>&nbsp;<a
      href="http://en.cppreference.com/w/cpp/language/access"
      >access specifier</a
    >. To alleviate any potential confusion, note that the following code is not
    valid C++; its purpose is solely to illustrate the concepts we're about to
    explore:
  </p>

  <CodeBlock
    language="c++"
    code="
    struct AddNumber {
      ...
      int number;
    };

    int AddNumber::add(const AddNumber* this, const int number) {
      return this->number + number;
    }
    "
  />

  <p>
    Why isn't the code above valid? Well, for two reasons:
    <code>AddNumber::add</code> is not a valid function name in this context (as
    it is not a member of <code>AddNumber</code>), and <code>this</code>, being
    a <a href="http://en.cppreference.com/w/cpp/keyword">reserved keyword</a>,
    cannot be used as a parameter name. Recall that in the original program,
    <code>AddNumber::add</code> is called through an existing object of type
    <code>AddNumber</code>:
  </p>

  <CodeBlock
    language="c++"
    code="
    AddNumber my_adder;
    ...
    my_adder.add(3);
    "
  />

  <p>
    However, in our (invalid) standalone implementation of
    <code>AddNumber::add</code>, it is called with an object as an argument:
  </p>

  <CodeBlock
    language="c++"
    code="
    AddNumber my_adder;
    ...
    AddNumber::add(&my_adder, 3);
    "
  />

  <p>
    If it were valid, the non-class version would function identically to the
    original one. Nonetheless, it more accurately reflects how the compiler
    interprets things. Clearly, if we omit the <code>this-&gt;</code> prefix
    from the first occurrence of <code>number</code>, we encounter the earlier
    discussed problem: <code>number</code> will be interpreted as the function
    parameter. But don't just take my word for it; see for yourself:
  </p>

  <CodeBlock
    language="c++"
    code="
    struct AddNumber {
      ...
      int number;
    };

    int AddNumber::add(const AddNumber* this, const int number) {
      return number + number; // Simply returns 2 * number.
    }
    "
  />

  <p>
    This leads us to the first lesson of this post: when you encounter a
    non-static member function, try to conceptualize it as an independent (i.e.,
    non-member) function that includes an implicit parameter named
    <code>this</code>, which is a pointer to the object for which the function
    is performing its tasks.
  </p>

  <p>
    A pertinent question arises at this point: what about
    <a href="http://www.learncpp.com/cpp-tutorial/812-static-member-functions/"
      >static member functions</a
    >? Do they also implicitly contain a <code>this</code> pointer? The answer
    is no. If they did, they would inherently be linked to some existing object
    of the class. However, static member functions, like static data members,
    are inherent to the class itself and can be invoked directly, i.e., without
    requiring an existing class object. In this sense, a static member function
    is not special: the compiler does not implicitly add a
    <code>this</code> parameter to its declaration, nor does it introduce
    <code>this-&gt;</code> prefixes in its definition.
  </p>

  <p>
    Nevertheless, static member functions can access the internals of a class
    similar to any other member or
    <a href="http://en.cppreference.com/w/cpp/language/friend"
      ><code>friend</code></a
    >
    function, as long as they are provided with a pointer to a class object.
    This implies that the following code is valid:
  </p>

  <CodeBlock
    language="c++"
    code="
    class AddNumber {
    public:
      ...
      static int add(const AddNumber* adder, const int number);

    private:
      int number;
    };

    int AddNumber::add(const AddNumber* adder, const int number) {
      return adder->number + number;
    }
    "
  />

  <p>
    There is one type of situation in which the implicit presence of the
    <code>this</code> pointer on non-static member functions can cause a lot of
    headache to the innocent developer. Here it is, in its full "glory":
  </p>

  <CodeBlock
    language="c++"
    code='
    // A global array of callable warning objects.
    std::vector<std::function<void()>> warnings;

    class WarningManager {
    public:
      ...
      void add_warning(const std::string& message) const;

    private:
      std::string name;
    };

    void WarningManager::add_warning(const std::string& message) const {
      warnings.emplace_back([=]() {
        std::cout << name << ": " << message << "\n";
      });
    }
    '
  />

  <p>
    The aim of the code above is straightforward:
    <code>WarningManager::add_warning</code> fills the global array
    <code>warnings</code> with lambda functions that, when executed, display a
    warning message. While the purpose of this code might seem trivial, similar
    scenarios do occur in real-world applications. So, can you identify the
    problem here?
  </p>

  <p>
    If the problem is not immediately apparent, revisit the earlier suggestion:
    interpret the member function <code>WarningManager::add_warning</code> as if
    it were a non-member function that accepts a pointer named
    <code>this</code> pointing to a <code>WarningManager</code> object:
  </p>

  <CodeBlock
    language="c++"
    code='
    void WarningManager::add_warning(const WarningManager* this,
                                     const std::string& message) {
      warnings.emplace_back([=]() {
        std::cout << this->name << ": " << message << "\n";
      });
    }
    '
  />

  <p>
    You might be puzzled by the fact that <code>name</code> in the original
    version of the code is replaced with <code>this-&gt;name</code> in the
    (remember, invalid) second version. You may wonder, "Isn't
    <code>name</code> itself actually copied by the capture list in the lambda
    function"? The answer is no. A "capture all by value" capture list (i.e.,
    <code>[=]</code>) captures all non-static local variables visible in the
    scope where the lambda is created, and nothing else. Function parameters are
    included in this category, but class data members are not. Therefore, the
    definition of <code>WarningManager::add_warning</code>
    is conceptually identical to the following:
  </p>

  <CodeBlock
    language="c++"
    code='
    void WarningManager::add_warning(const WarningManager* this,
                                     const std::string& message) {
      warnings.emplace_back([this, message]() {
        std::cout << this->name << ": " << message << "\n";
      });
    }
    '
  />

  <p>
    The problem now becomes more evident: in the original example, the
    <code>name</code> data member is not captured directly by value but is
    accessed through a copy of the <code>this</code> pointer to the
    <code>WarningManager</code> object for which
    <code>WarningManager::add_warning</code> is invoked. Since the lambda might
    be executed after the original object no longer exists, this code is prone
    to errors. The lambda's lifetime is independent of the
    <code>WarningManager</code> object that creates it, and the implicit
    replacement of <code>name</code> with <code>this-&gt;name</code> in the
    lambda's definition could lead to debugging a complex program crash.
  </p>

  <p>
    A straightforward solution to the problem just discussed is to be explicit
    about our intentions. We aim to capture <code>name</code> by value, so let's
    make that abundantly clear:
  </p>

  <CodeBlock
    language="c++"
    code='
    // A global array of callable warning objects.
    std::vector<std::function<void()>> warnings;

    class WarningManager {
    public:
      ...
      void add_warning(const std::string& message) const;

    private:
      std::string name;
    };

    void WarningManager::add_warning(const std::string& message) const {
      const std::string& manager_name = this->name;

      warnings.emplace_back([manager_name, message]() {
        std::cout << manager_name << ": " << message << "\n";
      });
    }
    '
  />

  <p>
    Inside the capture list, the string <code>this-&gt;name</code> is copied via
    its reference <code>manager_name</code>, ensuring that the lambda
    <a
      href="http://stackoverflow.com/questions/19676473/in-lambda-how-reference-is-being-captured-by-value"
      >owns a copy</a
    >
    of <code>this-&gt;name</code> under the alias <code>manager_name</code>. In
    C++14, this approach can be further streamlined using the
    <a href="https://en.wikipedia.org/wiki/C%2B%2B14#Lambda_capture_expressions"
      >init capture</a
    >
    feature introduced to lambda functions:
  </p>

  <CodeBlock
    language="c++"
    code='
    void WarningManager::add_warning(const std::string& message) const {
      warnings.emplace_back([manager_name = this->name, message]() {
        std::cout << manager_name << ": " << message << "\n";
      });
    }
    '
  />

  <p>
    In this version, we explicitly copy <code>this-&gt;name</code> to a string
    called <code>manager_name</code>, which then becomes accessible within the
    lambda function. As discussed in a
    <RouterLink :to="{ name: '95' }">previous post</RouterLink>, lambda
    functions are akin to functor classes, and here,
    <code>manager_name</code> acts as a data member of such a class, initialized
    as a copy of <code>this-&gt;name</code>.
  </p>

  <p>
    To conclude this post, I recommend taking a look at the
    <a href="https://en.wikipedia.org/wiki/Zen_of_Python">Zen of Python</a>.
    Focus on the second guiding principle: "Explicit is better than implicit".
    Having read this post, I hope you can appreciate the wisdom behind that
    aphorism! :-)
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
