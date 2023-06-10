<template>
  <p>
    Suppose you have a
    <a href="https://en.wikipedia.org/wiki/DNA">DNA</a> sequence (e.g.,
    ATCGATTGAC...) that you want to store in a C/C++ program. Assuming the
    sequence is uniformly random, in the sense that the $i$-th base can be any
    of A, C, G, or T with equal probabilities, what is the most efficient way to
    store it?
  </p>

  <p>
    To start solving this problem, first note that storing the DNA sequence in a
    <a href="https://en.wikipedia.org/wiki/Character_%28computing%29#char"
      ><code>char</code></a
    >
    array is not efficient because each character can have only four possible
    values: <code>'A'</code>, <code>'C'</code>, <code>'G'</code>, or
    <code>'T'</code>. Since an 8-bit <code>char</code> can represent 256
    different values, using one <code>char</code> to store each DNA base is
    wasteful. We can do better.
  </p>

  <p>
    Consider this fact: since a base can take only four different values, we
    need only two bits to store it. In more technical terms, a base in the DNA
    sequence has only two bits of
    <a href="https://en.wikipedia.org/wiki/Entropy_%28information_theory%29"
      >entropy</a
    >. This means we can assign a unique pair of bits to each base, as shown in
    the table below:
  </p>

  <TableBlock
    id="binary-codes"
    :columns="2"
    caption="Binary codes assigned to each DNA base."
  >
    <b>Base</b>
    <b>Binary code</b>

    <span>A</span>
    <span>00</span>

    <span>C</span>
    <span>01</span>

    <span>G</span>
    <span>10</span>

    <span>T</span>
    <span>11</span>
  </TableBlock>

  <p>
    In light of this fact, the most efficient way to store a DNA sequence is to
    store not just one, but four bases per 8-bit <code>char</code> (or,
    equivalently, per one-byte unsigned integer: <code>uint8_t</code>).
    <FigureLink id="dna-compression" capitalized /> shows how this can be
    accomplished.
  </p>

  <FigureBlock
    id="dna-compression"
    caption="Instead of storing one DNA base per <code>char</code>, a much
             more efficient method is to store four bases in each 8-bit block of
             memory."
  >
    <ResponsiveImage alt="DNA compression" :src="dnaCompression" />
  </FigureBlock>

  <p>
    Below is an example of a C++ class that stores a DNA sequence by converting
    it from a string to a bit array. It was written using as few
    <a href="https://en.wikipedia.org/wiki/Standard_Template_Library">STL</a>
    members as possible to demonstrate how the solution can be implemented in C
    (C++ developers could use
    <a href="http://www.cplusplus.com/reference/string/string/"
      ><code>std::string</code></a
    >
    instead of <code>char*</code>, and store the DNA data using
    <a href="http://www.cplusplus.com/reference/bitset/bitset/"
      ><code>std::bitset</code></a
    >). Since most of the details are straightforward, I will leave the task of
    understanding the code to the reader. A fully compilable example can be
    found <a href="https://github.com/dassencio/dna-compression">here</a>.
  </p>

  <CodeBlock language="c++" :code="code" />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";
import dnaCompression from "@/assets/images/dna-compression.svg";

onMounted(() => onViewMounted());

const code = `
#define BASE_MASK 0x3 // Binary: 11.

// Binary codes assigned to each DNA base.
enum
{
  BASE_A = 0x0, // Binary: 00.
  BASE_C = 0x1, // Binary: 01.
  BASE_G = 0x2, // Binary: 10.
  BASE_T = 0x3, // Binary: 11.
};

class DnaBitset
{
public:
  /**
   * @brief Constructs a compressed representation of a DNA sequence.
   * @param dna_str String holding a DNA sequence (e.g. "ATGCACG").
   * @param dna_len The length of the DNA sequence.
   */
  DnaBitset(const char* dna_str, const size_t dna_len)
  {
    m_len = dna_len;

    // Number of bytes necessary to store dna_str as a bitset.
    size_t dna_bytes = (dna_len / 4) + (dna_len % 4 != 0);

    m_data = new uint8_t[dna_bytes];
    std::memset(m_data, 0, dna_bytes);

    // For each base of the DNA sequence...
    for (size_t i = 0; i < dna_len; ++i)
    {
      uint8_t shift = 6 - 2 * (i % 4);

      switch (dna_str[i])
      {
        case 'A':
          m_data[i / 4] |= BASE_A << shift;
          break;
        case 'C':
          m_data[i / 4] |= BASE_C << shift;
          break;
        case 'G':
          m_data[i / 4] |= BASE_G << shift;
          break;
        case 'T':
          m_data[i / 4] |= BASE_T << shift;
          break;
        default:
          throw std::invalid_argument("Invalid DNA base");
      }

      shift = (shift == 0) ? 6 : shift - 2;
    }
  }

  /**
   * @brief Destructor.
   */
  ~DnaBitset()
  {
    delete[] m_data;
  }

  /**
   * @brief Returns the stored DNA sequence as an ASCII string.
   */
  char* to_string() const
  {
    char* dna_str = new char[m_len + 1];

    // For each base of the DNA sequence...
    for (size_t i = 0; i < m_len; ++i)
    {
      uint8_t shift = 6 - 2 * (i % 4);
      uint8_t mask = BASE_MASK << shift;

      // Get the i-th DNA base.
      uint8_t base = (m_data[i / 4] & mask) >> shift;

      switch (base)
      {
        case BASE_A:
          dna_str[i] = 'A';
          break;
        case BASE_C:
          dna_str[i] = 'C';
          break;
        case BASE_G:
          dna_str[i] = 'G';
          break;
        case BASE_T:
          dna_str[i] = 'T';
          break;
        default:
          throw std::runtime_error("Invalid DNA base");
      }
    }

    dna_str[m_len] = '\\0';
    return dna_str;
  }

private:
  uint8_t* m_data;
  size_t m_len;
};
`;
</script>
