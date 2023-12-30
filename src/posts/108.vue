<template>
  <p>
    Asynchronous programming in JavaScript is unfortunately not trivial. One way
    to deal with asynchronous work is by using plain callbacks when certain
    events are triggered (e.g., a file is loaded from a server). However, this
    approach is error-prone since it is difficult to ensure that all errors and
    exceptions are properly handled, especially across multiple callback
    functions.
  </p>

  <p>
    A
    <a
      href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise"
      ><code>Promise</code></a
    >
    in JavaScript is a great tool for writing asynchronous code, but
    understanding how to use it requires some effort. Nonetheless, much of the
    literature on the topic makes it seem more complicated than it actually is,
    which is why I decided to write this post.
  </p>

  <p>
    Let's first start with a statement of the problem we are trying to solve: we
    want to do some work, but this work can take a long time (e.g., fetch a
    large file from a server), and we cannot simply wait until it is done before
    continuing with the execution of the program. Otherwise, the user experience
    may suffer considerably (e.g., the webpage the user is visiting would stop
    responding to events such as key presses until the file is completely
    loaded). On top of that, when this work is done, we may want to do
    additional work, such as fetching another file based on the results
    obtained.
  </p>

  <p>
    So how can promises help us solve this problem? The high-level answer is
    simple: a promise is an object that wraps a unit of work to be executed and
    acts as a handle to the outcome of this work. As soon as the outcome becomes
    available (e.g., our file has been loaded), it is handled by an appropriate
    user-defined callback function attached to the promise. We say that a
    promise is "resolved" (or "fulfilled") when the work it wraps finishes
    successfully, and it is "rejected" when something goes wrong. To handle
    these situations separately, we can attach two callback functions to a
    promise: one to handle success and another to handle failure.
  </p>

  <p>
    Before jumping into a code example using promises, consider the following
    naive attempt to execute an asynchronous file request:
  </p>

  <CodeBlock
    language="js"
    code='
    // WARNING: This will not work as expected!

    function getFile(fileUrl) {
      // Prepare an asynchronous request for fileUrl.
      const request = new XMLHttpRequest();
      request.open("GET", fileUrl, true);

      // Specify what to do when the loading operation finishes.
      request.addEventListener("load", function() {
        if (request.status < 400) {
          // Successful execution: return the file contents.
          return request.responseText;
        }
        else {
          // Failed execution: throw an exception.
          throw new Error(request.statusText);
        }
      });

      // Send the request.
      request.send();
    }

    // Request a file. Handle success and failure separately.
    try {
      const contents = getFile("files/John.json");
      console.log("File contents:\n" + contents);
    }
    catch (error) {
      console.log("Could not get file: " + error);
    }
    '
  />

  <p>
    Our intention in the program above is to asynchronously download a
    <a href="files/John.json">JSON file</a>
    and handle success (file downloaded) by printing its contents and failure
    (file not downloaded) by throwing an exception. If you do not understand all
    the technical aspects of the program, read it this way:
    <a href="https://en.wikipedia.org/wiki/XMLHttpRequest"
      ><code>XMLHttpRequest</code></a
    >
    is an API that we use to prepare an asynchronous file request. The
    <code>request</code> variable acts as a handle to the result of this file
    request. By registering a callback function to handle the request's
    <code>load</code> event, we can define what needs to be done when the
    loading operation finishes: if the
    <a href="https://en.wikipedia.org/wiki/List_of_HTTP_status_codes"
      >HTTP status code</a
    >
    returned is less than <code>400</code>, the file was successfully
    downloaded, and its contents are then returned by the callback function.
    Otherwise, an exception is thrown to indicate that the file request failed.
    Unfortunately, even when the file request succeeds, the output of this
    program shows that we made a serious mistake in our thinking:
  </p>

  <CodeBlock
    code="
    File contents:
    undefined
    "
  />

  <p>
    What happened here? The answer is simple: <code>getFile</code> does not
    return any value. The <code>return</code> statement appearing in its body
    belongs to the callback function that handles the <code>load</code> event
    from <code>request</code>; the returned value will never be seen by
    <code>getFile</code> itself. As a matter of fact, from the way the code is
    written, any value returned by the callback function will actually be lost
    &mdash; no one will ever receive it. In the program above, the
    <code>try</code> block invokes <code>getFile</code>, and since
    <code>getFile</code> does not return anything, its return value is assumed
    to be <code>undefined</code>. That is exactly what the program prints as the
    "file contents".
  </p>

  <p>
    Asynchronous programming in JavaScript is not easy, but making the program
    above work correctly requires only a few changes if we use a
    <code>Promise</code> object. Our first corrected version will be kept
    similar to the original (incorrect) program, but we will improve it
    afterwards:
  </p>

  <CodeBlock
    language="js"
    code='
    const fileUrl = "files/John.json";

    function getFile(succeed, fail) {
      // Prepare an asynchronous request for fileUrl.
      const request = new XMLHttpRequest();
      request.open("GET", fileUrl, true);

      // Specify what to do when the loading operation finishes.
      request.addEventListener("load", function() {
        if (request.status < 400) {
          // Success: resolve the promise with the file contents.
          succeed(request.responseText);
        }
        else {
          // Failure: reject the promise with an error.
          fail(new Error(request.statusText));
        }
      });

      // Send the request.
      request.send();
    }

    function processSuccess(contents) {
      console.log("File contents:\n" + contents);
    }

    function processFailure(error) {
      console.log("Could not get file: " + error);
    }

    // Request a file asynchronously.
    const requestHandle = new Promise(getFile);

    // Define how to handle success and failure.
    requestHandle.then(processSuccess, processFailure);
    '
  />

  <p>
    The main difference now is in how <code>getFile</code> is called and how it
    signals success or failure: a promise (<code>requestHandle</code>) is
    created to wrap the file request. Its constructor takes a function
    (<code>getFile</code>) that defines the work to be done (we will refer to it
    as the "task function" from now on). The constructor of a promise
    immediately invokes its given task function with two arguments, which are
    themselves functions that the task function must use to indicate success or
    failure, respectively. These functions are not provided by the user, but by
    the promise constructor itself. In the definition of <code>getFile</code>,
    the parameters <code>succeed</code> and <code>fail</code>
    represent these functions; the former is used to return a value, while the
    latter is used to return an error. If the file download succeeds,
    <code>getFile</code> calls <code>succeed</code> with the file contents as an
    argument; otherwise, <code>fail</code> is called with an error as an
    argument, indicating what went wrong. In both cases, the result is stored in
    <code>requestHandle</code>, i.e., <code>requestHandle</code> acts as a
    handle to the outcome of <code>getFile</code>.
  </p>

  <p>
    Note that the signaling of success or failure is asynchronous, i.e., it does
    not happen while <code>getFile</code> is executing, but only when the file
    request is finished &mdash; an event that can occur much later in time.
  </p>

  <p>
    After <code>getFile</code> calls either <code>succeed</code> or
    <code>fail</code>, what happens to the result it sends? The answer is in the
    last line of the program: <code>requestHandle</code> calls its
    <code>then</code> method to register callback functions that handle success
    and failure, respectively. As soon as <code>requestHandle</code> receives a
    result from <code>getFile</code>, it will call the appropriate callback
    function with that result as an argument. In the program above, these
    callback functions are <code>processSuccess</code> (the "success handler")
    and <code>processFailure</code> (the "failure handler") respectively. If you
    attempt to run this program in your browser console, you should get the
    following output:
  </p>

  <CodeBlock
    code='
    File contents:
    {
        "name": "John",
        "age": 35,
        "mother": "Mary"
    }
    '
  />

  <p>
    One unfortunate aspect of how this program is written is the fact that we
    cannot invoke <code>getFile</code> with <code>fileUrl</code> as its single
    argument. Instead, we converted <code>fileUrl</code> into a global variable
    so it can be used by <code>getFile</code>. This is not ideal but can be
    easily rectified by modifying <code>getFile</code> to create and return the
    promise that wraps the file request. Additionally, let's use this
    opportunity to improve the names of the success and failure handlers:
  </p>

  <CodeBlock
    language="js"
    code='
    function getFile(fileUrl) {
      // Auxiliary function to be invoked by the promise constructor.
      function getFileTask(succeed, fail) {
        // Prepare an asynchronous request for fileUrl.
        const request = new XMLHttpRequest();
        request.open("GET", fileUrl, true);

        // Specify what to do when the loading operation finishes.
        request.addEventListener("load", function() {
          if (request.status < 400) {
            // Success: resolve the promise with the file contents.
            succeed(request.responseText);
          }
          else {
            // Failure: reject the promise with an error.
            fail(new Error(request.statusText));
          }
        });

        // Send the request.
        request.send();
      }

      return new Promise(getFileTask);
    }

    function displayFile(contents) {
      console.log("File contents:\n" + contents);
    }

    function printError(error) {
      console.log("Could not get file: " + error);
    }

    // Request a file. Handle success and failure separately.
    getFile("files/John.json").then(displayFile, printError);
    '
  />

  <p>
    The last line of this program deserves appreciation: it clearly communicates
    that we want to fetch the file <code>files/John.json</code> and then display
    its contents if the file request succeeds or print an error message if it
    fails.
  </p>

  <p>
    Despite the fact that all this sounds very interesting, the programs above
    can be written without using promises in ways that some may find easier to
    understand. However, if you need to chain actions together, using promises
    will significantly simplify the process. Indeed, when the
    <code>then</code> method is called on a promise (let's call it the "original
    promise" from now on), it generates a new <code>Promise</code> object that
    can register its own success and failure handlers (let's call this the
    "then-promise" from now on). The outcome of the then-promise depends on the
    result-handler callback invoked by the original promise, regardless of
    whether it's a success or failure handler. Specifically, the following will
    happen:
  </p>

  <ListBlock>
    <ListBlockItem bullet="1.">
      If the result-handler callback invoked by the original promise returns a
      non-promise value, the then-promise will be resolved with that value,
      i.e., its success handler will be called with that value as an argument.
    </ListBlockItem>
    <ListBlockItem bullet="2.">
      If the result-handler callback invoked by the original promise throws an
      exception, the then-promise will be rejected with that exception, i.e.,
      its failure handler will be invoked with that exception as an argument.
    </ListBlockItem>
    <ListBlockItem bullet="3.">
      If the result-handler callback invoked by the original promise returns a
      promise, the success and failure handlers of the then-promise will be used
      as success and failure handlers for the returned promise, respectively.
    </ListBlockItem>
  </ListBlock>

  <p>
    All of this may sound complicated, but I hope that seeing each of these
    cases in action will make things clearer for the reader.
  </p>

  <SectionTitle>
    Example #1: Original promise handler returns a non-promise value
  </SectionTitle>

  <CodeBlock language="js" :code="jsCodeExample1" />

  <p>
    In this example, we omitted the callbacks for handling failures on the first
    two promises (note the absence of a second parameter on the first two calls
    to <code>then</code>). This is allowed and is equivalent to setting these
    failure handlers to <code>null</code>. In this case, a rejection of the
    promise simply passes the error on to the then-promise to be handled by its
    own failure handler. In this program, any error will be passed on until it
    is caught by <code>printError</code>, which will then print it. From the
    structure of the program, we can see that provided the file request
    succeeds, the result of the success handler of each promise is passed on to
    the success handler of its associated then-promise, forming a chain that
    results in the following output:
  </p>

  <CodeBlock code="John's age plus 10 is: 45" />

  <SectionTitle>
    Example #2: Original promise handler throws an exception
  </SectionTitle>

  <p>
    The example below is the same as example #1, with a single difference: we
    modify <code>getAge</code> to have it simply throw an exception instead of
    returning an age value:
  </p>

  <CodeBlock language="js" :code="jsCodeExample2" />

  <p>
    When <code>getAge</code> is called, it throws an exception, causing the
    first then-promise in the chain to be rejected with that exception as the
    result. Since it only registered a success handler (<code>addTen</code>), it
    simply passes on the exception to the second then-promise, which then
    invokes its own failure handler (<code>printError</code>) with the exception
    as an argument. The output of this program is then:
  </p>

  <CodeBlock
    code="Something went wrong: Error: getAge does not want to share this data!"
  />

  <SectionTitle>
    Example #3: Original promise handler returns a promise
  </SectionTitle>

  <p>
    The third and final example will illustrate the case in which a success
    handler returns a promise. If that happens, the then-promise will become a
    proxy to it, meaning the then-promise will be resolved or rejected with the
    same value or error as the promise returned by the original success handler.
  </p>

  <p>
    In this example, we will attempt to fetch a file, and if that operation
    succeeds, we will request another file and return a promise that is a handle
    to the outcome of this second file request:
  </p>

  <CodeBlock language="js" :code="jsCodeExample3" />

  <p>
    The output of this program shows that the success handler for the first
    then-promise (<code>printAge</code>) is used as the success handler for the
    promise returned by <code>getMotherFile</code> itself:
  </p>

  <CodeBlock code="Age of John's mother: 62" />

  <SectionTitle>Summary</SectionTitle>

  <p>
    This post explained how a <code>Promise</code> object wraps a unit of
    (possibly asynchronous) work and acts as a handle to its outcome, processing
    success or failure using dedicated callback functions that are registered
    through the promise's <code>then</code> method. The real advantage of using
    promises instead of manually handling asynchronous tasks comes from the fact
    that the <code>then</code> method also returns a promise, making chains of
    work easier to create and understand.
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());

const jsCodeExample1 = `
function getFile(fileUrl) {
  // Same as before...
}

function getAge(jsonData) {
  return JSON.parse(jsonData).age;
}

function addTen(number) {
  return number + 10;
}

function printResult(result) {
  console.log("John's age plus 10 is: " + result);
}

function printError(error) {
  console.log("Something went wrong: " + error);
}

getFile("files/John.json").then(getAge)
                          .then(addTen)
                          .then(printResult, printError);
`;

const jsCodeExample2 = `
function getFile(fileUrl) {
  // Same as before...
}

function getAge(jsonData) {
  throw new Error("getAge does not want to share this data!");
}

function addTen(number) {
  return number + 10;
}

function printResult(result) {
  console.log("John's age plus 10 is: " + result);
}

function printError(error) {
  console.log("Something went wrong: " + error);
}

getFile("files/John.json").then(getAge)
                          .then(addTen)
                          .then(printResult, printError);
`;

const jsCodeExample3 = `
function getFile(fileUrl) {
  // Same as before...
}

function getMotherFile(jsonData) {
  const motherName = JSON.parse(jsonData).mother;

  // Return a promise.
  return getFile("files/" + motherName + ".json");
}

function printAge(jsonData) {
  console.log("Age of John's mother: " + JSON.parse(jsonData).age);
}

function printError(error) {
  console.log("Something went wrong: " + error);
}

getFile("files/John.json").then(getMotherFile)
                          .then(printAge, printError);
`;
</script>
