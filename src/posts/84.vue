<template>
  <p>
    Consider a typical programming task: sorting an array of $n$ integer values.
    A well-versed computer scientist would know multiple solutions to this
    problem:
    <a href="https://en.wikipedia.org/wiki/Merge_sort">merge sort</a>,
    <a href="https://en.wikipedia.org/wiki/Quicksort">quicksort</a>,
    <a href="https://en.wikipedia.org/wiki/Heapsort">heap sort</a>, and many
    other
    <a
      href="https://en.wikipedia.org/wiki/Sorting_algorithm#Popular_sorting_algorithms"
      >general-purpose sorting algorithms</a
    >.
  </p>

  <p>
    However, before diving into a solution, it's prudent to inquire more about
    the problem at hand. For instance, one might ask: what do the array values
    represent? Are they sorted in some specific pattern already? Is sorting
    actually necessary? Taking a moment to ponder can often yield more
    intriguing and relevant questions.
  </p>

  <p>
    To underscore the significance of posing these questions, let's consider a
    scenario where the array values represent the ages of a website's users.
    Suppose your objective is to determine the
    <a href="https://en.wikipedia.org/wiki/Median">median</a> user age. One
    approach is to sort the array first. In this case, the median would be the
    middle element if the array length is odd, or the average of the two central
    elements if the length is even. While the sorting can certainly be executed
    using well-established algorithms with a runtime complexity of $O(n \log_2
    n)$, those algorithms don't take advantage of a key fact: no human is known
    to have lived for
    <a href="https://en.wikipedia.org/wiki/Oldest_people">more than 125 years</a
    >, so we can safely assume that no age value will exceed 124. This insight
    allows the sorting to be achieved in a runtime of $O(n)$, as illustrated
    below. The ensuing algorithm is presented in C for simplicity and clarity,
    using only well-known features of the language:
  </p>

  <CodeBlock
    language="c"
    code="
    void sort_ages(int* ages, const size_t length) {
      int count[125];

      // Initialize all elements of count to zero.
      for (int age = 0; age < 125; ++age) {
        count[age] = 0;
      }

      // Count the number of occurrences of each age value.
      for (int i = 0; i < length; ++i) {
        ++count[ages[i]];
      }

      // Sort (rewrite) the ages array in place using count.
      int i = 0;
      for (int age = 0; age < 125; ++age) {
        while (count[age] > 0) {
          ages[i] = age;
          --count[age];
          ++i;
        }
      }
    }

    double median_age(int* ages, const size_t length) {
      sort_ages(ages, length);

      int age_1 = ages[length / 2];
      int age_2 = ages[(length - 1) / 2];

      /*
       * age_1 == age_2 if ages has an odd number of elements
       * because (length - 1) / 2 == length / 2 if length is odd.
       * In this case, we sum the middle value of ages twice,
       * so this formula always yields the correct median.
       */
      return (double) (age_1 + age_2) / 2.0;
    }
    "
  />

  <p>
    The algorithm presented above operates in $O(n)$ time, leveraging the simple
    fact that age values are bounded within a small range. By counting the
    occurrences of each age value, we can reorder them sequentially in the
    original <code>ages</code> array, effectively sorting it in place. Once
    sorted, computing the median becomes straightforward. This offers a
    substantial advantage over algorithms that run in $O(n \log_2 n)$ time.
  </p>

  <p>
    In addition to its improved asymptotic runtime for large $n$ values, the
    showcased algorithm boasts several other notable benefits:
  </p>

  <ListBlock>
    <ListBlockItem>
      Every value in the input array <code>ages</code> is read sequentially and
      only once. This minimizes the number of
      <a href="https://en.wikipedia.org/wiki/CPU_cache#Cache_miss"
        >cache misses</a
      >, especially when contrasted with algorithms like randomized quick-sort.
    </ListBlockItem>
    <ListBlockItem>
      The algorithm refrains from any
      <a
        href="https://en.wikipedia.org/wiki/Dynamic_memory_allocation#Dynamic_memory_allocation"
        >dynamic memory allocation</a
      >. Instead, only a modest and fixed amount of memory is allocated on the
      <a href="https://en.wikipedia.org/wiki/Stack-based_memory_allocation"
        >stack</a
      >, ensuring memory usage remains independent of $n$.
    </ListBlockItem>
    <ListBlockItem>
      The sorting process is encapsulated within a singular function,
      eliminating the need for additional function calls.
    </ListBlockItem>
  </ListBlock>

  <p>
    Just when it might seem our discussion has reached its conclusion, there is
    still more to uncover. Upon examining the <code>sort_ages</code> function,
    one might realize that there is no need to sort the <code>ages</code> array
    to compute its median value. Instead, the median can be determined directly
    from the <code>count</code> array.
  </p>

  <CodeBlock
    language="c"
    code="
    double median_age_2(const int* ages, const size_t length) {
      int count[125];

      // Initialize all elements of count to zero.
      for (int age = 0; age < 125; ++age) {
        count[age] = 0;
      }

      // Count the number of occurrences of each age value.
      for (int i = 0; i < length; ++i) {
        ++count[ages[i]];
      }

      // Determine the median age from count.
      int i = 0;
      int age_sum = 0;
      for (int age = 0; age < 125; ++age) {
        while (count[age] > 0) {
          if (i == (length - 1) / 2) {
            age_sum += age;
          }
          if (i == length / 2) {
            age_sum += age;
            return (double) age_sum / 2.0;
          }
          --count[age];
          ++i;
        }
      }

      return 0.0;
    }
    "
  />

  <p>
    The revised computation for the median age remains efficient with a runtime
    of $O(n)$. It retains all the advantages of the previous method. However, a
    key improvement is that we no longer overwrite the entire
    <code>ages</code> array, which further minimizes cache misses. Notably, we
    leave the <code>ages</code> array untouched! The <code>count</code> array
    serves as a precise and concise representation of the sorted values from
    <code>ages</code>, enabling us to derive the median age directly. As in the
    previous method, when <code>ages</code> has an odd number of elements, we
    sum the middle value twice. But since this sum is divided by two, the result
    accurately represents the median.
  </p>

  <p>
    It's also worth highlighting a subtle benefit: the
    <code>median_age_2</code> function can gracefully manage arrays of length
    zero, whereas the <code>median_age</code> function expects a non-empty
    <code>ages</code> array.
  </p>

  <p>
    In essence, by merely posing some straightforward questions about the
    problem we're trying to solve, we were able to devise an algorithm that is
    both more efficient and more elegant than the standard sorting-based
    median-computing algorithm. And curiously, in the process of trying to
    improve the sorting of age values, we discovered a better way to compute the
    median without requiring sorting at all.
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
