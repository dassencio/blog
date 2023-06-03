<template>
  <p>
    As the German saying goes, "<i>Deutsche Sprache, schwere Sprache</i>" ("<i
      >German language, hard language</i
    >"). Indeed, for most people, German can be a difficult language to master.
  </p>

  <p>
    Personally, in addition to the intricate
    <a href="https://en.wikipedia.org/wiki/Declension">declension</a> forms,
    verbal conjugations, plural forms, and gender assignments, one of the most
    challenging aspects of the German language is the existence of numerous
    "similar words" that carry vastly different meanings. For instance, consider
    the following words:
  </p>

  <TableBlock
    id="similar-words"
    :columns="4"
    caption="A collection of similar words in the German language."
  >
    <span>
      <a href="http://dict.tu-chemnitz.de/dings.cgi?query=leben">leben</a>
    </span>
    <span>
      <a href="http://dict.tu-chemnitz.de/dings.cgi?query=neben">neben</a>
    </span>
    <span>
      <a href="http://dict.tu-chemnitz.de/dings.cgi?query=haben">haben</a>
    </span>
    <span>
      <a href="http://dict.tu-chemnitz.de/dings.cgi?query=sehen">sehen</a>
    </span>

    <span>
      <a href="http://dict.tu-chemnitz.de/dings.cgi?query=oben">oben</a>
    </span>
    <span>
      <a href="http://dict.tu-chemnitz.de/dings.cgi?query=deren">deren</a>
    </span>
    <span>
      <a href="http://dict.tu-chemnitz.de/dings.cgi?query=liegen">liegen</a>
    </span>
    <span>
      <a href="http://dict.tu-chemnitz.de/dings.cgi?query=seien">seien</a>
    </span>

    <span>
      <a href="http://dict.tu-chemnitz.de/dings.cgi?query=gehen">gehen</a>
    </span>
    <span>
      <a href="http://dict.tu-chemnitz.de/dings.cgi?query=sieben">sieben</a>
    </span>
    <span>
      <a href="http://dict.tu-chemnitz.de/dings.cgi?query=neuen">neuen</a>
    </span>
    <span>
      <a href="http://dict.tu-chemnitz.de/dings.cgi?query=eben">eben</a>
    </span>

    <span>
      <a href="http://dict.tu-chemnitz.de/dings.cgi?query=wegen">wegen</a>
    </span>
    <span>
      <a href="http://dict.tu-chemnitz.de/dings.cgi?query=gegen">gegen</a>
    </span>
    <span>
      <a href="http://dict.tu-chemnitz.de/dings.cgi?query=jeden">jeden</a>
    </span>
    <span>
      <a href="http://dict.tu-chemnitz.de/dings.cgi?query=bleiben">bleiben</a>
    </span>
  </TableBlock>

  <p>
    Although the spelling of these words does not vary much, their meanings are
    substantially different from one another. In other words, the words are all
    "close" to each other but have completely unrelated meanings.
  </p>

  <p>
    One way to measure the "distance" between two words is through the
    <a href="https://en.wikipedia.org/wiki/Levenshtein_distance"
      >Levenshtein distance</a
    >, which is a type of
    <a href="https://en.wikipedia.org/wiki/Edit_distance">edit distance</a>. The
    Levenshtein distance between two words is equal to the smallest number of
    character insertions, deletions, or substitutions that need to be applied to
    one of these words to transform it into the other (each modification is
    called an "edit"). For instance, consider the words "kitten" and "sitting".
    One way to transform "kitten" into "sitting" is described below:
  </p>

  <ListBlock>
    <ListBlockItem bullet="1.">
      Substitute "k" by "s": <b>k</b>itten &#8594; <b>s</b>itten.
    </ListBlockItem>
    <ListBlockItem bullet="2.">
      Substitute "e" by "i": sitt<b>e</b>n &#8594; sitt<b>i</b>n.
    </ListBlockItem>
    <ListBlockItem bullet="3.">
      Insert "g" at the end: sittin &#8594; sittin<b>g</b>.
    </ListBlockItem>
  </ListBlock>

  <p>
    Therefore, the word "kitten" can be transformed into "sitting" through three
    edits. In this case, the smallest possible number of edits to transform
    "kitten" into "sitting" is indeed three. Generally, if $r$ and $s$ are
    strings with lengths (number of characters) $m$ and $n$ respectively, the
    Levenshtein distance between them, $\Lev_{r,s}(m,n)$, can be computed using
    the following recursive formula:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock numberLines>
    \Lev_{r,s}(i,j) =
    \begin{cases}
      \max(i,j) & \text{if}\, \min(i,j) = 0, \\
      \min
        \begin{cases}
        \Lev_{r,s}(i-1,j) + 1, \\
        \Lev_{r,s}(i,j-1) + 1, \\
        \Lev_{r,s}(i-1,j-1) + 1_{(r_i \neq s_j)}
        \end{cases}
      & \text{otherwise}.
    \end{cases}
    \label{levenshtein}
  </EquationBlock>

  <p>
    The formula above can be understood by right-aligning the strings $r$ and
    $s$ and considering the necessary transformations to convert $r$ into $s$,
    starting from the rightmost character of both strings and moving to the left
    one character at a time. At each step, character insertion, deletion, or
    substitution is considered. With this in mind:
  </p>

  <MapBlock>
    <span>$\Lev_{r,s}(i-1,j) + 1$</span>
    <span>Corresponds to deleting a character from $r$.</span>

    <span>$\Lev_{r,s}(i,j-1) + 1$</span>
    <span>Corresponds to inserting a character in $r$.</span>

    <span>$\Lev_{r,s}(i-1,j-1) + 1_{(r_i \neq s_j)}$</span>
    <span>
      Corresponds to substituting a character in $r$ if $r_i \neq s_j$ (i.e., if
      the $i$-th character of $r$ is different from the $j$-th character of
      $s$).
    </span>
  </MapBlock>

  <p>
    The Levenshtein distance satisfies all properties of a
    <a href="https://en.wikipedia.org/wiki/Metric_%28mathematics%29"
      >metric function</a
    >, so the space of strings with the Levenshtein distance forms a
    <a href="https://en.wikipedia.org/wiki/Metric_space">metric space</a>.
  </p>

  <p>
    As previously mentioned, equation \eqref{levenshtein} defines the
    Levenshtein distance in a recursive manner. Although this is easy to
    implement in a program, there are equivalent versions that compute
    $\Lev_{r,s}(m,n)$ much more efficiently, such as the
    <a href="https://en.wikipedia.org/wiki/Wagner%E2%80%93Fischer_algorithm"
      >Wagner–Fischer algorithm</a
    >. However, a thorough discussion of such algorithms is outside the scope of
    this post.
  </p>

  <p>
    At this point, a natural question arises: If one randomly selects a word
    from a dictionary for a specific language, what is the average number of
    words from that dictionary that will be within a distance of $d$ (hereafter,
    "distance" will refer to the "Levenshtein distance") from the chosen word?
    To better understand this question, refer to
    <FigureLink id="similar-words-land" />.
  </p>

  <FigureBlock
    id="similar-words-land"
    caption='A set of words similar to the German word "Land". The inner circle
             contains all words within a distance of $d=0$ from "Land" (i.e.,
             "Land" itself). The middle and outer layers contain words with
             distances of $d=1$ and $d=2$ from "Land", respectively.'
  >
    <ResponsiveImage alt='Similar words to "Land"' :src="similarWords" />
  </FigureBlock>

  <p>
    To answer this question, I wrote a
    <a href="https://github.com/dassencio/langcmp">Python script</a> that takes
    a dictionary file, computes the Levenshtein distances between all words with
    at least $L$ characters, and then calculates the average number of words
    within distance $d$ from a randomly selected word from that dictionary with
    at least $L$ characters (i.e., the average number of "neighbor words"). I
    have termed this average the "word proximity level" (WPL) of the language.
    The higher the WPL for a language (technically, for the input dictionary),
    the "closer" the words of the language are in terms of spelling.
  </p>

  <p>
    The reason only words with at least $L$ characters (for example, $L = 5$)
    are considered is due to the fact that shorter words will be within a
    distance $d$ of each other even for small values of $d$. However, this
    doesn't necessarily mean they are "close" to each other. For instance,
    consider the words "ape" and "bee": they are at a distance of $d=2$ from
    each other but their spellings are arguably not very similar.
  </p>

  <p>
    To compare the English and German languages, I computed their WPLs using
    word lists that contain the $1000$ most commonly used words from each
    language. These lists were obtained from the
    <a href="http://www.wortschatz.uni-leipzig.de/html/wliste.html"
      >University of Leipzig, Germany</a
    >. Since the University of Leipzig also provides similar word lists for
    Dutch and French, I computed the WPLs for these languages as well. All
    results are summarized in <TableLink id="results-all-languages" />.
  </p>

  <TableBlock
    id="results-all-languages"
    :columns="3"
    caption="WPL values for several languages and different values of $d$ and
             $L$. Note how the values for Dutch are similar to those for German,
             with both being significantly higher than the values for English."
  >
    <b>Language</b>
    <span>$\textrm{WPL}(L=5, d=2)$</span>
    <span>$\textrm{WPL}(L=6, d=3)$</span>

    <span>English</span>
    <span>$1.59$</span>
    <span>$2.66$</span>

    <span>German</span>
    <span>$3.40$</span>
    <span>$8.15$</span>

    <span>French</span>
    <span>$2.11$</span>
    <span>$3.53$</span>

    <span>Dutch</span>
    <span>$2.94$</span>
    <span>$7.40$</span>
  </TableBlock>

  <p>
    As shown in <TableLink id="results-all-languages" />, when considering only
    words with at least five characters ($L = 5$) and pairs of words with a
    maximum distance equal to two ($d = 2$), a German word has approximately
    twice as many "close words" to it as an English word, given we're
    considering only the $1000$ most commonly used words of these languages. If
    we raise the bar and consider words with at least six characters ($L = 6$)
    and pairs of words with a maximum distance of three ($d = 3$), the
    difference becomes even more significant: a German word now has about three
    times as many "close words" as an English word.
  </p>

  <p>
    To further illustrate the difference between English and German, histograms
    showing the percentages of analyzed words containing different numbers of
    "neighbor words" (that is, words within a distance $d$ from the given word)
    are shown in <FigureLink id="en-de-L5-d2" /> and
    <FigureLink id="en-de-L6-d3" />
    for the pairs of values $(L,d) = (5,2)$ and $(L,d) = (6,3)$, respectively.
  </p>

  <FigureBlock
    id="en-de-L5-d2"
    caption='Percentage of analyzed words versus number of "neighbor words"
             for $L = 5$ and $d = 2$. As the histogram shows, English words
             tend to have fewer neighbor words than German words, resulting in a
             smaller WPL value.'
  >
    <FlotChart
      class="neighbor-words-histogram"
      :data="dataEnDeL5d2"
      :options="optionsEnDeL5d2"
    />
  </FigureBlock>

  <FigureBlock
    id="en-de-L6-d3"
    :caption="`Percentage of analyzed words versus number of &quot;neighbor
               words&quot; for $L = 6$ and $d = 3$. Note how the tail of the
               distribution for German words becomes more pronounced than in
               ${enDeL5d2Link}.`"
  >
    <FlotChart
      class="neighbor-words-histogram"
      :data="dataEnDeL6d3"
      :options="optionsEnDeL6d3"
    />
  </FigureBlock>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { figureLink, onViewMounted } from "@/functions";
import store from "@/store";
import similarWords from "@/assets/images/similar-words.svg";

onMounted(() => onViewMounted());

const enDeL5d2Link = computed(() =>
  figureLink("en-de-L5-d2", store.getters.figureNumber({ id: "en-de-L5-d2" }))
);

const pointsEnL5d2 = [
  [0, 0.359606],
  [1, 0.252874],
  [2, 0.155993],
  [3, 0.09688],
  [4, 0.057471],
  [5, 0.031199],
  [6, 0.01642],
  [7, 0.011494],
  [8, 0.006568],
  [9, 0.006568],
  [10, 0.001642],
  [11, 0.003284],
];

const pointsDeL5d2 = [
  [0, 0.327354],
  [1, 0.179372],
  [2, 0.100149],
  [3, 0.06278],
  [4, 0.052317],
  [5, 0.064275],
  [6, 0.047833],
  [7, 0.032885],
  [8, 0.019432],
  [9, 0.019432],
  [10, 0.013453],
  [11, 0.008969],
  [12, 0.007474],
  [13, 0.008969],
  [14, 0.008969],
  [15, 0.007474],
  [16, 0.00299],
  [17, 0.008969],
  [18, 0.00299],
  [19, 0.004484],
  [20, 0.00299],
  [21, 0.005979],
  [22, 0.004484],
  [23, 0.00299],
  [24, 0.0],
  [25, 0.001495],
  [26, 0.0],
  [27, 0.0],
  [28, 0.001495],
];

const pointsEnL6d3 = [
  [0, 0.246606],
  [1, 0.187783],
  [2, 0.128959],
  [3, 0.126697],
  [4, 0.09276],
  [5, 0.08371],
  [6, 0.054299],
  [7, 0.020362],
  [8, 0.015837],
  [9, 0.015837],
  [10, 0.011312],
  [11, 0.004525],
  [12, 0.006787],
  [13, 0.002262],
  [14, 0.002262],
];

const pointsDeL6d3 = [
  [0, 0.209163],
  [1, 0.145418],
  [2, 0.059761],
  [3, 0.075697],
  [4, 0.053785],
  [5, 0.027888],
  [6, 0.023904],
  [7, 0.033865],
  [8, 0.031873],
  [9, 0.027888],
  [10, 0.025896],
  [11, 0.021912],
  [12, 0.021912],
  [13, 0.017928],
  [14, 0.00996],
  [15, 0.015936],
  [16, 0.025896],
  [17, 0.013944],
  [18, 0.011952],
  [19, 0.013944],
  [20, 0.015936],
  [21, 0.005976],
  [22, 0.001992],
  [23, 0.00996],
  [24, 0.00996],
  [25, 0.007968],
  [26, 0.013944],
  [27, 0.005976],
  [28, 0.001992],
  [29, 0.005976],
  [30, 0.005976],
  [31, 0.005976],
  [32, 0.001992],
  [33, 0.005976],
  [34, 0.001992],
  [35, 0.001992],
  [36, 0.001992],
  [37, 0.003984],
  [38, 0.0],
  [39, 0.0],
  [40, 0.0],
  [41, 0.0],
  [42, 0.005976],
  [43, 0.001992],
  [44, 0.0],
  [45, 0.0],
  [46, 0.001992],
  [47, 0.007968],
  [48, 0.0],
  [49, 0.0],
  [50, 0.0],
  [51, 0.001992],
  [52, 0.0],
  [53, 0.0],
  [54, 0.0],
  [55, 0.0],
  [56, 0.001992],
];

const optionsEnDeL5d2 = {
  legend: {
    position: "ne",
  },
  xaxis: {
    axisLabel: "Number of neighbor words",
    max: 30,
    min: -0.5,
    ticks: 10,
  },
  yaxis: {
    axisLabel: "Percentage of analyzed words",
    axisLabelPadding: 10,
    max: 37.0,
    min: 0,
    ticks: 8,
  },
};

const optionsEnDeL6d3 = {
  legend: {
    position: "ne",
  },
  xaxis: {
    axisLabel: "Number of neighbor words",
    max: 55,
    min: -0.5,
    ticks: 10,
  },
  yaxis: {
    axisLabel: "Percentage of analyzed words",
    axisLabelPadding: 10,
    max: 25.0,
    min: 0,
    ticks: 5,
  },
};

/**
 * Converts the given data to percentage values.
 *
 * @param data Array of [x, y] pairs.
 * @param offset Offset to be added to the x values (to improve readability).
 */
function convertToPercentage(data: number[][], offset = 0) {
  return data.map((point) => [point[0] + offset, point[1] * 100]);
}

const dataEnDeL5d2 = [
  {
    bars: { show: true, barWidth: 0.3, align: "center" },
    data: convertToPercentage(pointsEnL5d2),
    label: "English",
  },
  {
    bars: { show: true, barWidth: 0.3, align: "center" },
    color: 2,
    data: convertToPercentage(pointsDeL5d2, 0.4),
    label: "German",
  },
];

const dataEnDeL6d3 = [
  {
    bars: { show: true, barWidth: 0.3, align: "center" },
    data: convertToPercentage(pointsEnL6d3),
    label: "English",
  },
  {
    bars: { show: true, barWidth: 0.3, align: "center" },
    color: 2,
    data: convertToPercentage(pointsDeL6d3, 0.4),
    label: "German",
  },
];
</script>

<style scoped lang="scss">
.neighbor-words-histogram {
  height: 20 * $base-length;
  width: 35 * $base-length;
}
</style>
