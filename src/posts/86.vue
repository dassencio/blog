<template>
  <p>
    A
    <a href="http://en.cppreference.com/w/c/chrono/tm"
      ><code>struct tm</code></a
    >
    object (or, equivalently,
    <a href="http://en.cppreference.com/w/cpp/chrono/c/tm"
      ><code>std::tm</code></a
    >
    in C++) stores a calendar time value with a precision of one second.
  </p>

  <p>
    Programmers dealing with time values often encounter the following problem:
    when a fixed amount of time is added to a given calendar time, what is the
    resulting calendar time? For instance, if we have an instance of
    <code>struct tm</code> representing the calendar time "<code
      >Fri Jan 22 12:35:20 2016</code
    >", what will the resulting calendar time be if we add, for example, 15 days
    and 12 hours to it?
  </p>

  <p>
    Fortunately, solving this problem is straightforward. First, we add any
    desired time shift to the original <code>struct tm</code> object, even if
    this action renders the object invalid (e.g., if we add <code>65</code> to
    the <code>tm_min</code> field, it will no longer represent a valid "minutes"
    value since it exceeds <code>59</code>). After making these changes, we
    employ the
    <a href="http://en.cppreference.com/w/c/chrono/mktime"
      ><code>mktime</code></a
    >
    function to "renormalize" the fields of the <code>struct tm</code> object.
    Specifically, <code>mktime</code> adjusts all fields of a
    <code>struct tm</code> object to ensure they fall within their valid ranges.
    For instance, <code>tm_min</code> will be set within the range
    <code>0..59</code>. As this adjustment occurs, time shifts are accommodated.
    For example, if <code>tm_min</code> becomes <code>75</code> after our
    modifications, it will be reduced to <code>15</code>, and
    <code>tm_hour</code> will increase by one. Should this change cause
    <code>tm_hour</code> to surpass <code>23</code>, it will also be adjusted,
    and <code>tm_mday</code> will increase accordingly. The following example
    illustrates this process:
  </p>

  <CodeBlock
    language="c"
    code='
    #include <stdio.h>
    #include <time.h>

    int main() {
      // Fri Jan 22 12:35:20 2016.
      struct tm caltime = {
        .tm_year = 2016 - 1900,
        .tm_yday = 21,
        .tm_mon = 0,
        .tm_wday = 5,
        .tm_mday = 22,
        .tm_hour = 12,
        .tm_min = 35,
        .tm_sec = 20,
        .tm_isdst = 0
      };

      // Print the calendar time in human-readable format.
      printf("Original time: %s", asctime(&caltime));

      /*
       * Add 15 days and 12 hours to caltime. The final values of
       * the members tm_mday and tm_hour will be invalid, but we
       * will renormalize them below.
       */
      caltime.tm_mday += 15;
      caltime.tm_hour += 12;

      // Renormalize caltime to get a valid calendar time.
      mktime(&caltime);

      // Print the renormalized time in human-readable format.
      printf("Shifted time : %s", asctime(&caltime));

      return 0;
    }
    '
  />

  <p>The output of this program is:</p>

  <CodeBlock
    code="
    Original time: Fri Jan 22 12:35:20 2016
    Shifted time : Sun Feb  7 00:35:20 2016
    "
  />

  <p>
    When applying time shifts to calendar times using the above technique,
    remember that <code>mktime</code> ignores the fields
    <code>tm_wday</code> and <code>tm_yday</code>. Therefore, they shouldn't be
    used for this purpose.
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
