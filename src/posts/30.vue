<template>
  <p>
    Whenever you rip a song from a CD to a format such as MP3 or Ogg Vorbis,
    audio data from the original song is discarded to make it smaller. In
    technical terms, you're performing a
    <a href="https://en.wikipedia.org/wiki/Lossy_compression"
      >lossy compression</a
    >
    of the song, ideally retaining enough information so that the resulting file
    sounds as close as possible to the original.
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

  <p>
    <b>NOTE</b>: The numbers shown below may differ slightly from the ones you
    will obtain in Octave. This is because I changed Octave's output precision
    to four decimal places to make the output more readable. If you wish to do
    the same, enter "<code>output_precision(4)</code>" in Octave before running
    the commands below.
  </p>

  <p>Octave provides a method for computing the SVD of $A$:</p>

  <CodeBlock
    code="
    octave:2> **[U, Sigma, V] = svd(A)**
    U =

      -0.41897  -0.44908   0.75491   0.06229  -0.21476   0.05389
      -0.38683  -0.45668  -0.39343   0.51768   0.43110  -0.18214
      -0.36999   0.42922   0.27760  -0.32235   0.62376  -0.32988
      -0.45538  -0.25778  -0.42710  -0.67651  -0.28628  -0.06434
      -0.46984   0.54652  -0.09962   0.40704  -0.51091  -0.20959
      -0.33139   0.20101  -0.07695   0.02937   0.18964   0.89835

    Sigma =

    Diagonal Matrix

       4.678e+00           0           0           0           0           0
               0   8.930e-01           0           0           0           0
               0           0   4.587e-02           0           0           0
               0           0           0   7.287e-03           0           0
               0           0           0           0   3.156e-06           0
               0           0           0           0           0   7.668e-07

    V =

      -0.41897  -0.44908   0.72685   0.18378   0.02522   0.24510
      -0.38683  -0.45668  -0.36384  -0.69410  -0.12115   0.11390
      -0.36999   0.42922  -0.10156  -0.07104   0.68695   0.43775
      -0.45538  -0.25778  -0.37357   0.48762   0.25154  -0.53440
      -0.46984   0.54652   0.30939  -0.28936  -0.27677  -0.47383
      -0.33139   0.20101  -0.30614   0.39738  -0.61067   0.47458
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

       4.678       0       0       0       0       0
           0   0.893       0       0       0       0
           0       0       0       0       0       0
           0       0       0       0       0       0
           0       0       0       0       0       0
           0       0       0       0       0       0
    "
  />

  <p>
    Discarding $\Sigma_{33}$ means the third column of $U$ and the third row of
    $V^T$ (i.e., the third column of $V$) have no effect on $U\Sigma V^T$ since
    they contain the only entries of $U$ and $V$ respectively which are
    multiplied by $\Sigma_{33}$. We can then discard these entries and also
    discard the third row and the third column of $\Sigma$ altogether.
    Similarly, we can discard the fourth, fifth and sixth columns of $U$ and $V$
    and also the fourth, fifth and sixth rows and columns of $\Sigma$:
  </p>

  <CodeBlock
    code="
    octave:4> **U = U(1:6, 1:2)**
    U =

      -0.419  -0.449
      -0.387  -0.457
      -0.370   0.429
      -0.455  -0.258
      -0.470   0.547
      -0.331   0.201

    octave:5> **V = V(1:6, 1:2)**
    V =

      -0.419  -0.449
      -0.387  -0.457
      -0.370   0.429
      -0.455  -0.258
      -0.470   0.547
      -0.331   0.201

    octave:6> **Sigma = Sigma(1:2, 1:2)**
    Sigma =

    Diagonal Matrix

       4.678       0
           0   0.893
    "
  />

  <p>Now let's compute $U\Sigma V^T$:</p>

  <CodeBlock
    code="
    octave:7> **A_tilde = U * Sigma * V'**
    A_tilde =

       1.001   0.941   0.553   0.996   0.702   0.569
       0.941   0.886   0.494   0.929   0.627   0.518
       0.553   0.494   0.805   0.689   1.023   0.651
       0.996   0.929   0.689   1.029   0.875   0.660
       0.702   0.627   1.023   0.875   1.299   0.826
       0.569   0.518   0.651   0.660   0.826   0.550
    "
  />

  <p>
    The elements of $\tilde{A}$ are very close to the ones from the original
    matrix $A$. Let's compute the relative error for each entry of $\tilde{A}$
    (below, the <code>./</code> operator computes the division of each entry of
    $(A - \tilde{A})$ by each corresponding entry of $A$):
  </p>

  <CodeBlock
    code="
    octave:8> **abs((A - A_tilde) ./ A)**
    ans =

       2.460e-02   1.391e-02   6.460e-03   1.293e-02   1.486e-02   1.866e-02
       1.337e-02   4.434e-03   3.156e-03   9.151e-03   1.076e-02   1.338e-02
       1.570e-02   6.110e-03   1.400e-03   8.635e-03   4.496e-03   7.484e-03
       1.544e-02   1.123e-02   3.382e-03   4.752e-03   5.324e-03   6.086e-03
       3.973e-03   6.317e-04   2.466e-04   3.590e-03   1.751e-03   3.110e-03
       4.460e-03   2.189e-03   5.284e-04   2.152e-03   1.399e-03   2.115e-03
    "
  />

  <p>
    As the numbers above show, the relative errors are small, so indeed
    $\tilde{A} \approx A$. Storing $A$ requires storing $N_{A} = 36$ elements,
    and while $\tilde{A}$ has the same number of elements as $A$, it is more
    efficient to store $U$, $\Sigma$ and $V$ (with rows and columns removed in
    the way described above) than $\tilde{A}$ itself. This yields:
  </p>

  <EquationBlock>
    N_{\tilde{A}} = \Size(U) + \Size(V) + \Size(\Sigma) = 12 + 12 + 2 = 26
  </EquationBlock>

  <p>
    so we can rebuild $\tilde{A}$ from only $N_{\tilde{A}} = 26$ stored elements
    instead of $N_A = 36$ elements. The reason why $\Size(\Sigma)= 2$ is because
    $\Sigma$ is a diagonal matrix, so its off-diagonal elements do not need to
    be stored since we know they are zero. In this particular example, $28\%$
    less storage space is required to store $\tilde{A}$ than $A$. For bigger
    matrices, even better compression ratios can be achieved.
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
