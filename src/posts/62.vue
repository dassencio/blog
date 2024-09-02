<template>
  <p>
    Suppose you want to
    <a href="https://en.wikipedia.org/wiki/Lossless_compression"
      >losslessly compress</a
    >
    data that can be represented as a sequence of symbols from a specific
    alphabet. A common example is a standard text file where the symbols are
    letters and punctuation marks, and the alphabet is the collection of all
    these symbols. This post introduces an important algorithm known as
    <a href="https://en.wikipedia.org/wiki/Huffman_coding">Huffman coding</a>
    for addressing this problem. Huffman coding compresses data by creating an
    <a href="https://en.wikipedia.org/wiki/Character_encoding"
      >encoding scheme</a
    >
    that is optimal in the sense that no other encoding scheme can achieve a
    better compression rate for the data. Although this form of compression is
    not the only one available, it's commonly used for its simplicity, including
    in popular file formats such as JPEG and MP3.
  </p>

  <p>Huffman coding works as follows:</p>

  <ListBlock ordered>
    <ListBlockItem>
      For each distinct symbol $s_i$ in the data, count its number of
      occurrences $n_{s_i}$, where $i = 1, \ldots, N$. Here, $N$ represents the
      size of the alphabet.
    </ListBlockItem>
    <ListBlockItem>
      For each distinct symbol $s_i$, generate a tree containing a single node
      with key $s_i$ and weight $n_{s_i}$.
    </ListBlockItem>
    <ListBlockItem>
      Select the two trees with the smallest root node weights and merge them
      under a new root node. The key of this new root node is the concatenation
      of the keys of the root nodes of the merged trees, and its weight is the
      sum of their weights. Therefore, if the two chosen trees have root nodes
      with keys $\alpha_j$ and $\alpha_k$ and weights $w_j$ and $w_k$
      respectively, we put them under a new root node with key
      $\alpha_j\alpha_k$ and weight $w_j + w_k$.
    </ListBlockItem>
    <ListBlockItem>
      If only a single tree remains, stop. Otherwise, return to step 3.
    </ListBlockItem>
    <ListBlockItem>
      The encoding of each symbol is derived from the bit sequence formed during
      the traversal of the final tree, starting from the root node and ending at
      the node containing the symbol as a key. We append a
      <code>0</code> to the bit sequence each time we traverse to the left child
      node, and a <code>1</code> when we traverse to the right.
    </ListBlockItem>
  </ListBlock>

  <p>
    While the above description might seem somewhat abstract, the algorithm is,
    in fact, quite straightforward.
    <FigureLink id="huffman-coding" capitalized /> provides a visual
    representation of how it works for the text segment below, which consists
    solely of the letters <code>A</code>, <code>B</code>, <code>C</code>, and
    <code>D</code>. Each of these letters represents a symbol in an alphabet
    comprised only of these four letters, which means $N = 4$ in this example.
    The text contains $20$ characters in total, with $n_\textrm{A} = 12$,
    $n_\textrm{B} = 5$, $n_\textrm{C} = 2$, and $n_\textrm{D} = 1$ denoting the
    number of occurrences of each of these letters:
  </p>

  <!-- prettier-ignore -->
  <CodeBlock paragraphMode>
    <span class="A">A </span>
    <span class="A">A </span>
    <span class="B">B </span>
    <span class="A">A </span>
    <span class="C">C </span>
    <span class="A">A </span>
    <span class="A">A </span>
    <span class="B">B </span>
    <span class="B">B </span>
    <span class="A">A </span>
    <span class="A">A </span>
    <span class="B">B </span>
    <span class="A">A </span>
    <span class="A">A </span>
    <span class="A">A </span>
    <span class="C">C </span>
    <span class="A">A </span>
    <span class="B">B </span>
    <span class="A">A </span>
    <span class="D">D </span>
  </CodeBlock>

  <FigureBlock
    id="huffman-coding"
    caption="A visual depiction of Huffman coding. We begin by merging the trees
             with root nodes <code>C</code> and <code>D</code>. In the next
             step, the trees with root nodes <code>B</code> and <code>CD</code>
             are merged. Finally, the trees with root nodes <code>A</code> and
             <code>BCD</code> are merged. The resulting Huffman encoding of each
             letter is as follows: <code>A</code> $\rightarrow$ <code>0</code>,
             <code>B</code> $\rightarrow$ <code>10</code>, <code>C</code>
             $\rightarrow$ <code>110</code>, <code>D</code> $\rightarrow$
             <code>111</code>."
  >
    <ResponsiveImage alt="Huffman coding" :src="huffmanCoding" />
  </FigureBlock>

  <p>
    Here is the encoding of the text above using the encoding scheme from
    <FigureLink id="huffman-coding" />:
  </p>

  <!-- prettier-ignore -->
  <CodeBlock paragraphMode>
    <span class="A">0 </span>
    <span class="A">0 </span>
    <span class="B">10 </span>
    <span class="A">0 </span>
    <span class="C">110 </span>
    <span class="A">0 </span>
    <span class="A">0 </span>
    <span class="B">10 </span>
    <span class="B">10 </span>
    <span class="A">0 </span>
    <span class="A">0 </span>
    <span class="B">10 </span>
    <span class="A">0 </span>
    <span class="A">0 </span>
    <span class="A">0 </span>
    <span class="C">110 </span>
    <span class="A">0 </span>
    <span class="B">10 </span>
    <span class="A">0 </span>
    <span class="D">111 </span>
  </CodeBlock>

  <p>
    For comparison, here is the encoding of the same text using
    <a href="https://en.wikipedia.org/wiki/ASCII">ASCII</a>, a commonly used
    encoding scheme for storing text files on computers:
  </p>

  <CodeBlock paragraphMode>
    <span class="A">01000001 </span>
    <span class="A">01000001 </span>
    <span class="B">01000010 </span>
    <span class="A">01000001 </span>
    <span class="C">01000011 </span>
    <span class="A">01000001 </span>
    <span class="A">01000001 </span>
    <span class="B">01000010 </span>
    <span class="B">01000010 </span>
    <span class="A">01000001 </span>
    <span class="A">01000001 </span>
    <span class="B">01000010 </span>
    <span class="A">01000001 </span>
    <span class="A">01000001 </span>
    <span class="A">01000001 </span>
    <span class="C">01000011 </span>
    <span class="A">01000001 </span>
    <span class="B">01000010 </span>
    <span class="A">01000001 </span>
    <span class="D">01000100 </span>
  </CodeBlock>

  <p>
    The Huffman encoding of the text is clearly more efficient than the ASCII
    one, but by how much? If $L^\SupPar{\textrm{A}}_{s_i}$ represents the number
    of bits used to encode the letter $s_i$ in the alphabet using ASCII, then
    the total number of bits needed to represent the character sequence using
    ASCII is:
  </p>

  <EquationBlock>
    N^\SupPar{\textrm{A}} = \sum_i L^\SupPar{\textrm{A}}_{s_i} n_{s_i} = 8
    n_{\textrm{A}} + 8 n_{\textrm{B}} + 8 n_{\textrm{C}} + 8 n_{\textrm{D}} =
    160
  </EquationBlock>

  <p>The equivalent quantity for the Huffman encoding is:</p>

  <EquationBlock>
    N^\SupPar{\textrm{H}} = \sum_i L^\SupPar{\textrm{H}}_{s_i} n_{s_i} = 1
    n_{\textrm{A}} + 2 n_{\textrm{B}} + 3 n_{\textrm{C}} + 3 n_{\textrm{D}} = 31
  </EquationBlock>

  <p>
    which is less than $20\%$ of the space needed with the ASCII encoding
    scheme. The Huffman encoding employs a clever approach: it uses shorter bit
    strings to represent letters that appear more frequently in the data and
    longer bit strings for those that occur less frequently.
  </p>

  <p>
    A special feature of Huffman coding is its ability to consistently generate
    unambiguous encodings. In other words, the original data can be accurately
    reconstructed from the compressed version, which is expressed as a
    concatenation of bit strings. This is because Huffman coding always produces
    <a href="https://en.wikipedia.org/wiki/Prefix_code">prefix codes</a>. To
    illustrate this, consider the Huffman encoding derived for each letter in
    the previous example. If you encounter the bit sequence <code>01010</code>,
    it can only represent <code>ABB</code>. With Huffman coding, a bit sequence
    will always have a unique decoding into symbols from the original alphabet.
  </p>

  <p>
    You can find an implementation of Huffman coding written in Python
    <a href="https://github.com/dassencio/huffman.git">here</a>.
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";
import huffmanCoding from "@/assets/images/huffman-coding.svg";

onMounted(() => onViewMounted());
</script>

<style scoped>
.A {
  color: green;
}
.B {
  color: crimson;
}
.C {
  color: rgb(226, 124, 0);
}
.D {
  color: royalblue;
}
</style>
