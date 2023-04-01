<template>
  <p>
    Whenever you rip a song from a CD to a format such as MP3 or Ogg Vorbis,
    audio data from the original song is discarded to make it smaller. In
    technical terms, you're performing a
    <a href="https://en.wikipedia.org/wiki/Lossy_compression"
      >lossy compression</a
    >
    of the song, ideally retaining enough information to generate a faithful
    reproduction of the original song.
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
    (SVD), as I will explain in this post.
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
    Now start Octave. In what follows, I will use the following matrix $A$ as an
    example:
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
    You can generate this matrix locally in Octave by typing "<code>A=[</code>"
    (without the quotes), then copying and pasting the values from $A$ above,
    then ending the matrix definition with another square bracket
    "<code>]</code>".
  </p>

  <p>Octave provides a method for computing the SVD of $A$:</p>

  <CodeBlock
    code="
    octave:2> **[U, Sigma, V] = svd(A)**
    U =

      -0.418968  -0.449078   0.754908   0.062295  -0.214765   0.053890
      -0.386832  -0.456683  -0.393433   0.517682   0.431095  -0.182140
      -0.369989   0.429224   0.277599  -0.322350   0.623764  -0.329882
      -0.455376  -0.257780  -0.427104  -0.676512  -0.286282  -0.064336
      -0.469840   0.546519  -0.099622   0.407044  -0.510912  -0.209588
      -0.331388   0.201005  -0.076946   0.029369   0.189640   0.898350

    Sigma =

    Diagonal Matrix

       4.6780e+00            0            0            0            0            0
                0   8.9303e-01            0            0            0            0
                0            0   4.5870e-02            0            0            0
                0            0            0   7.2871e-03            0            0
                0            0            0            0   3.1559e-06            0
                0            0            0            0            0   7.6681e-07

    V =

      -0.418967  -0.449081   0.726848   0.183781   0.025224   0.245097
      -0.386832  -0.456683  -0.363839  -0.694098  -0.121153   0.113896
      -0.369989   0.429218  -0.101563  -0.071040   0.686946   0.437748
      -0.455376  -0.257776  -0.373570   0.487618   0.251537  -0.534404
      -0.469840   0.546520   0.309389  -0.289355  -0.276771  -0.473832
      -0.331390   0.201009  -0.306141   0.397377  -0.610670   0.474582
  "
  />

  <p>
    As the output above shows, the singular values of $A$ (the diagonal entries
    of $\Sigma$) are placed in decreasing order along the diagonal of $\Sigma$.
    Compared to the first two singular values ($\Sigma_{11}$ and $\Sigma_{22}$),
    the other four ($\Sigma_{33}$, $\Sigma_{44}$, $\Sigma_{55}$ and
    $\Sigma_{66}$) are relatively small. Being so small, and since $A = U\Sigma
    V^T$, the effect of discarding them should still imply $A \approx U\Sigma
    V^T$ for this modified $\Sigma$. Let's do exactly that and see what happens:
  </p>

  <CodeBlock
    code="
    octave:3> **Sigma(3,3) = Sigma(4,4) = Sigma(5,5) = Sigma(6,6) = 0**
    Sigma =

    Diagonal Matrix

       4.6780        0        0        0        0        0
            0   0.8930        0        0        0        0
            0        0        0        0        0        0
            0        0        0        0        0        0
            0        0        0        0        0        0
            0        0        0        0        0        0
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

      -0.4190  -0.4491
      -0.3868  -0.4567
      -0.3700   0.4292
      -0.4554  -0.2578
      -0.4698   0.5465
      -0.3314   0.2010

    octave:5> **V = V(1:6, 1:2)**
    V =

      -0.4190  -0.4491
      -0.3868  -0.4567
      -0.3700   0.4292
      -0.4554  -0.2578
      -0.4698   0.5465
      -0.3314   0.2010

    octave:6> **Sigma = Sigma(1:2, 1:2)**
    Sigma =

    Diagonal Matrix

       4.6780        0
            0   0.8930
    "
  />

  <p>Now let's compute $U\Sigma V^T$:</p>

  <CodeBlock
    code="
    octave:7> **A_tilde = U * Sigma * V'**
    A_tilde =

       1.0012   0.9413   0.5530   0.9959   0.7017   0.5689
       0.9413   0.8863   0.4945   0.9292   0.6273   0.5177
       0.5530   0.4945   0.8049   0.6894   1.0227   0.6506
       0.9959   0.9292   0.6894   1.0294   0.8751   0.6597
       0.7017   0.6273   1.0227   0.8751   1.2994   0.8265
       0.5689   0.5177   0.6506   0.6597   0.8265   0.5498
    "
  />

  <p>
    The elements of $\tilde{A}$ are very close to the ones from the original
    matrix $A$. Let's compute the relative error for each entry of $\tilde{A}$
    (below, the <code>./</code> operation computes the division of each entry of
    $(A - \tilde{A})$ by each corresponding entry of $A$):
  </p>

  <CodeBlock
    code="
    octave:8> **(A - A_tilde) ./ A**
    ans =

       2.4600e-02  -1.3910e-02  -6.4600e-03  -1.2932e-02   1.4857e-02  -1.8658e-02
      -1.3375e-02   4.4343e-03   3.1565e-03   9.1512e-03  -1.0755e-02   1.3384e-02
       1.5705e-02  -6.1096e-03  -1.3998e-03  -8.6349e-03   4.4961e-03  -7.4838e-03
      -1.5443e-02   1.1227e-02   3.3820e-03   4.7515e-03  -5.3244e-03   6.0858e-03
      -3.9725e-03  -6.3166e-04   2.4656e-04   3.5904e-03  -1.7512e-03   3.1102e-03
      -4.4599e-03   2.1888e-03   5.2841e-04   2.1520e-03  -1.3987e-03   2.1154e-03
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
