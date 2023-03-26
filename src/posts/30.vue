<template>
  <p>
    Whenever you rip a song from a CD to a format such as MP3 or Ogg Vorbis,
    audio data from the original song is discarded to make it smaller. In
    technical terms, you're performing a
    <a href="https://en.wikipedia.org/wiki/Lossy_compression"
      >lossy compression</a
    >
    of the song, ideally retaining enough information to make the compressed
    song sound as close as possible to the original.
  </p>

  <p>
    Matrices can also be compressed in this sense, with many applications in
    fields such as digital signal processing, machine learning and scientific
    computing, to name a few. Specifically, given a matrix $A$, it is possible
    to generate another matrix $\tilde{A} \approx A$ such that $\tilde{A}$ can
    be stored using less disk (or memory) space than $A$ itself. This
    representation can be obtained through a powerful tool in linear algebra
    called
    <a href="https://en.wikipedia.org/wiki/Singular_value_decomposition">
      singular value decomposition</a
    >
    (SVD). This post will not present techniques for computing SVDs, but merely
    discuss it in the context of matrix compression.
  </p>

  <p>
    The SVD of an $m \times n$ real matrix $A$ is the factorization $A = U
    \Sigma V^T$, where $U$ is an $m \times m$ real orthogonal matrix, $\Sigma$
    is an $m \times n$ diagonal matrix with real nonnegative values along its
    diagonal (called the
    <a href="https://en.wikipedia.org/wiki/Singular_value">singular values</a>
    of $A$) and $V$ is an $n \times n$ real orthogonal matrix. Every matrix has
    an SVD (for a proof of this fact, see
    <ReferenceLink id="applied-numerical-linear-algebra" />, theorem 3.2).
  </p>

  <p>
    To illustrate how one can use the SVD to compress a matrix, I will use
    <a href="https://www.gnu.org/software/octave/">Octave</a>. If you're using
    Ubuntu/Debian, you can install it by opening a terminal and running the
    following command:
  </p>

  <CodeBlock code="sudo apt-get install octave" />

  <p>
    Now start Octave. I have generated an example matrix which is shown below
    (in what follows, all user input is highlighted):
  </p>

  <CodeBlock
    code="
    octave:1> **A**
    A =

      1.02650   0.92840   0.54947   0.98317   0.71226   0.55847
      0.92889   0.89021   0.49605   0.93776   0.62066   0.52473
      0.56184   0.49148   0.80378   0.68346   1.02731   0.64579
      0.98074   0.93973   0.69170   1.03432   0.87043   0.66371
      0.69890   0.62694   1.02294   0.87822   1.29713   0.82905
      0.56636   0.51884   0.65096   0.66109   0.82531   0.55098
  "
  />

  <p>
    You can generate this matrix locally in Octave by typing '<code>A=[</code>'
    (without the quotes), then copying and pasting the values from $A$ above,
    then ending the matrix definition with another square bracket
    '<code>]</code>'.
  </p>

  <p>Octave provides a method for computing the SVD of $A$:</p>

  <CodeBlock
    code="
    octave:2> **[U, Sigma, V] = svd(A)**
    U =

      -0.418967  -0.449082   0.754882   0.062414  -0.211638   0.065260
      -0.386832  -0.456685  -0.393449   0.517538   0.420908  -0.204913
      -0.369990   0.429218   0.277696  -0.322484   0.605310  -0.362449
      -0.455375  -0.257776  -0.427049  -0.676528  -0.289362  -0.048923
      -0.469840   0.546519  -0.099679   0.407065  -0.521257  -0.182266
      -0.331389   0.201011  -0.076997   0.029526   0.237081   0.887000

    Sigma =

    Diagonal Matrix

      **4.6780e+00**            0            0            0            0            0
               0   **8.9303e-01**            0            0            0            0
               0            0   **4.5869e-02**            0            0            0
               0            0            0   **7.2919e-03**            0            0
               0            0            0            0   **1.5466e-16**            0
               0            0            0            0            0   **4.5360e-17**

    V =

      -0.418967  -0.449082   0.726833   0.183844  -0.240614   0.053029
      -0.386832  -0.456685  -0.363745  -0.694211  -0.126874  -0.107069
      -0.369990   0.429218  -0.101603  -0.070784  -0.356422   0.732468
      -0.455375  -0.257776  -0.373669   0.487768   0.559525   0.188602
      -0.469840   0.546519   0.309430  -0.289389   0.439192  -0.328915
      -0.331389   0.201011  -0.306111   0.396987  -0.541307  -0.552684
  "
  />

  <p>
    As the output above shows, the singular values of $A$ (the highlighted
    diagonal entries of $\Sigma$) are placed in decreasing order along the
    diagonal of $\Sigma$. Compared to the first two singular values
    ($\Sigma_{11}$ and $\Sigma_{22}$), the other four ($\Sigma_{33}$,
    $\Sigma_{44}$, $\Sigma_{55}$ and $\Sigma_{66}$) are relatively small. Being
    so small, and since $A = U\Sigma V^T$, the effect of discarding them should
    still imply $A \approx U\Sigma V^T$ for this modified $\Sigma$. Let's do
    exactly that and see what happens:
  </p>

  <CodeBlock
    code="
    octave:3> **Sigma(3,3) = Sigma(4,4) = Sigma(5,5) = Sigma(6,6) = 0**
    Sigma =

    Diagonal Matrix

      **4.67800**         0         0         0         0         0
            0   **0.89303**         0         0         0         0
            0         0   **0.00000**         0         0         0
            0         0         0   **0.00000**         0         0
            0         0         0         0   **0.00000**         0
            0         0         0         0         0   **0.00000**
    "
  />

  <p>
    Discarding $\Sigma_{33}$ means the third column of $U$ and the third row of
    $V^T$ (the third column of $V$) have no effect on $U\Sigma V^T$ since they
    contain the only entries of $U$ and $V$ respectively which are multiplied by
    $\Sigma_{33}$. We can then discard these entries and also discard the third
    row and the third column of $\Sigma$ altogether. Similarly, we can discard
    the fourth, fifth and sixth columns of $U$ and $V$ and also the fourth,
    fifth and sixth rows and columns of $\Sigma$:
  </p>

  <CodeBlock
    code="
    octave:4> **U = U(1:6, 1:2)**
    U =

      -0.41897  -0.44908
      -0.38683  -0.45668
      -0.36999   0.42922
      -0.45538  -0.25778
      -0.46984   0.54652
      -0.33139   0.20101

    octave:5> **V = V(1:6, 1:2)**
    V =

      -0.41897  -0.44908
      -0.38683  -0.45669
      -0.36999   0.42922
      -0.45537  -0.25778
      -0.46984   0.54652
      -0.33139   0.20101

    octave:6> **Sigma = Sigma(1:2, 1:2)**
    Sigma =

    Diagonal Matrix

      4.67800         0
            0   0.89303
    "
  />

  <p>Now let's compute $U\Sigma V^T$:</p>

  <CodeBlock
    code="
    octave:7> **A_tilde = U * Sigma * V'**
    A_tilde =

      1.00125   0.94131   0.55302   0.99588   0.70167   0.56888
      0.94131   0.88626   0.49448   0.92918   0.62733   0.51770
      0.55302   0.49448   0.80491   0.68936   1.02269   0.65062
      0.99588   0.92918   0.68936   1.02940   0.87507   0.65967
      0.70168   0.62733   1.02269   0.87507   1.29940   0.82647
      0.56888   0.51770   0.65062   0.65967   0.82647   0.54982
    "
  />

  <p>
    The elements of $\tilde{A}$ are very close to the ones from the original
    matrix $A$. Let's compute the relative error for each entry of $\tilde{A}$
    (below the '<code>./</code>' operation computes the division of each entry
    of $(A - \tilde{A})$ by each corresponding entry of $A$):
  </p>

  <CodeBlock
    code="
    octave:8> **(A - A_tilde) ./ A**
    ans =

       2.4599e-02  -1.3907e-02  -6.4608e-03  -1.2934e-02   1.4859e-02  -1.8656e-02
      -1.3375e-02   4.4309e-03   3.1586e-03   9.1550e-03  -1.0756e-02   1.3384e-02
       1.5708e-02  -6.1061e-03  -1.4028e-03  -8.6418e-03   4.4995e-03  -7.4838e-03
      -1.5442e-02   1.1226e-02   3.3826e-03   4.7511e-03  -5.3225e-03   6.0837e-03
      -3.9746e-03  -6.3450e-04   2.4899e-04   3.5946e-03  -1.7525e-03   3.1091e-03
      -4.4631e-03   2.1875e-03   5.2814e-04   2.1558e-03  -1.3991e-03   2.1170e-03
    "
  />

  <p>
    As the numbers above show, the relative errors are small, so indeed
    $\tilde{A} \approx A$. Storing $A$ requires storing $N_{A} = 36$ elements,
    and while $\tilde{A}$ itself has the same number of elements, it is more
    efficient to store $U$, $\Sigma$ and $V$ after removing their elements in
    the way described above. This yields:
  </p>

  <EquationBlock>
    N_{\tilde{A}} = \textrm{size}(U) + \textrm{size}(V) + \textrm{size}(\Sigma)
    = 12 + 12 + 2 = 26
  </EquationBlock>

  <p>
    so we can rebuild $\tilde{A}$ from only $N_{\tilde{A}} = 26$ stored elements
    instead of $N_A = 36$ elements. The reason why $\textrm{size}(\Sigma)= 2$ is
    because $\Sigma$ is a diagonal matrix, so its off-diagonal elements do not
    need to be stored since we know they are zero. In this particular example,
    $28\%$ less storage space is required to store $\tilde{A}$ than $A$. For
    bigger matrices, even better compression ratios can be achieved.
  </p>

  <p>
    It's possible to use the technique above to compress images while still
    preserving most of their visual properties. If you want to know how, please
    visit this blog again in the future :-)
  </p>

  <ReferenceListBlock>
    <ReferenceListBlockItem
      id="applied-numerical-linear-algebra"
      :authors="['James W. Demmel']"
      title="Applied Numerical Linear Algebra"
      url="http://dx.doi.org/10.1137/1.9781611971446"
    />
  </ReferenceListBlock>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
