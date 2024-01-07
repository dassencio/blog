<template>
  <p>
    Suppose you're given a
    <a href="https://en.wikipedia.org/wiki/Sequence">sequence</a>
    of $n$ data points $x_i$, where $i = 1, 2, \ldots, n$, which are corrupted
    by noise. Further suppose that you don't have any knowledge about the
    original shape of the data before noise was introduced, i.e., you're not
    aware of the type of function (e.g., sine, linear, etc.) that could model
    the original data accurately. This post describes a technique that can be
    employed to denoise data in such situations. An implementation of the
    algorithm presented below can be found
    <a href="https://github.com/dassencio/denoise">here</a>.
  </p>

  <p>
    Our goal is to determine $n$ new data points $\tilde{x}_i$ that meet the
    following two criteria:
  </p>

  <ListBlock>
    <ListBlockItem bullet="1.">
      Each value $\tilde{x}_i$ should not deviate excessively from the value
      $x_i$.
    </ListBlockItem>
    <ListBlockItem bullet="2.">
      The sequence of values $\tilde{x}_i$ should be smooth, meaning the
      differences between adjacent values $\tilde{x}_i$ and $\tilde{x}_{i+1}$
      should be small.
    </ListBlockItem>
  </ListBlock>

  <p>
    One way to satisfy the first criterion is by constraining the
    <a href="https://en.wikipedia.org/wiki/Euclidean_distance"
      >Euclidean distance</a
    >
    between the two sequences to not be too large. In other words, we aim to
    keep the following quantity as small as possible:
  </p>

  <EquationBlock label="euclidean-distance-data">
    \|\Vec{\tilde{x}} - \Vec{x}\|^2_2 = \sum_{i=1}^n (\tilde{x}_i - x_i)^2
  </EquationBlock>

  <p>
    where $\Vec{x}$ and $\Vec{\tilde{x}}$ represent vectors that contain the
    sequences of values $x_i$ and $\tilde{x}_i$, respectively, for $i = 1, 2,
    \ldots, n$. However, if we over-constrain this term, we run the risk of
    forcing each $\tilde{x}_i$ to adhere too closely to its corresponding $x_i$,
    essentially recreating the noisy sequence. Indeed, if we set
    $\Vec{\tilde{x}} = \Vec{x}$, then $\|\Vec{\tilde{x}} - \Vec{x}\|_2$ will be
    exactly zero, but this is not what we want. Our goal is to retain as much of
    the data $\Vec{x}$ as possible, while also eliminating the noise in it.
    Therefore, we must allow some deviation between the two sequences, but
    within a reasonable limit.
  </p>

  <p>
    Now, let's shift our attention to the second criterion. Noisy data often
    features significant differences between adjacent values; in other words,
    $x_i$ and $x_{i+1}$ can differ considerably. In contrast, smooth data
    satisfies $x_i \approx x_{i+1}$. Ideally, our generated denoised sequence
    $\tilde{x}_i$ should minimize the following quantity:
  </p>

  <EquationBlock label="euclidean-distance-derivative">
    \sum_{i=1}^{n-1} (\tilde{x}_{i+1} - \tilde{x}_i)^2
  </EquationBlock>

  <p>
    To meet the second criterion, we aim to keep this value as low as possible.
    Since the values $x_i$ typically originate from measurements taken at
    regular time intervals (for instance, every $\Delta{t}$ seconds), minimizing
    the above quantity can be interpreted as a way to ensure that the estimated
    derivative values from the sequence $\tilde{x}_i$ are not excessively large:
  </p>

  <EquationBlock>
    \sum_{i=1}^{n-1} (\tilde{x}_{i+1} - \tilde{x}_i)^2 = (\Delta{t})^2
    \sum_{i=1}^{n-1} \left(\frac{\tilde{x}_{i+1} -
    \tilde{x}_i}{\Delta{t}}\right)^2
  </EquationBlock>

  <p>
    It's important to note that minimizing this sum too much results in all
    $\tilde{x}_i$ being equal, i.e., $\tilde{x}_1 = \tilde{x}_2 = \ldots =
    \tilde{x}_n = c$. However, a constant sequence is of little value to us,
    unless the sequence $x_i$ is also approximately constant.
  </p>

  <p>
    Taking into account the facts above, it becomes clear that our objectives
    are in direct conflict with each other. Therefore, the optimal approach to
    this problem involves striking a balance, providing a solution that
    partially but adequately achieves both goals. A viable strategy is to
    minimize the sum of both terms in \eqref{euclidean-distance-data} and
    \eqref{euclidean-distance-derivative} concurrently, i.e., minimize the
    following cost function:
  </p>

  <EquationBlock label="cost-function-1">
    J_\mu(\Vec{x}, \Vec{\tilde{x}}) = \sum_{i=1}^n (\tilde{x}_i - x_i)^2 + \mu
    \sum_{i=1}^{n-1} (\tilde{x}_{i+1} - \tilde{x}_i)^2
  </EquationBlock>

  <p>
    The factor $\mu$ adjusts the extent of denoising applied to the data. If
    $\mu = 0$, we will solely minimize the first term and reproduce the noisy
    sequence ($\tilde{x}_i = x_i$). As $\mu$ increases, the second term gains
    more importance and, in the limit as $\mu \rightarrow \infty$, minimizing
    $J_\mu(\Vec{x}, \Vec{\tilde{x}})$ becomes equivalent to minimizing this
    second term. As mentioned above, the generated sequence then converges to a
    constant sequence $\tilde{x}_i = c$ for $i = 1, 2, \ldots,n$.
  </p>

  <p>
    Having reduced our problem to finding the vector $\Vec{\tilde{x}}$ that
    minimizes the value of $J_\mu(\Vec{x}, \Vec{\tilde{x}})$ (with $\mu$ as a
    constant here), we need to devise a way to solve this minimization problem.
    Fortunately, as we will discuss, this problem is essentially a
    <a
      href="https://en.wikipedia.org/wiki/Linear_least_squares_%28mathematics%29"
      >linear least squares</a
    >
    problem in disguise. To prove this, let's first define:
  </p>

  <EquationBlock label="b">
    \Vec{b} = \MatrixTwoOne{\Vec{x}}{\Vec{0}_{n-1}}
  </EquationBlock>

  <p>
    where $\Vec{0}_{n-1}$ is the $(n-1)$-dimensional zero vector. Let's also
    define:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock label="D">
    D_{n-1} = \Matrix{
      -1     & 1      & 0      &      0 & \ldots & 0      & 0      \\
      0      & -1     & 1      &      0 & \ldots & 0      & 0      \\
      0      & 0      & -1     &      1 & \ldots & 0      & 0      \\
      \vdots & \vdots & \vdots & \vdots & \ddots & \vdots & \vdots \\
      0      & 0      & 0      &      0 & \ldots & -1     & 1
    }
  </EquationBlock>

  <p>
    where $D_{n-1}$ is an $(n-1) \times n$ matrix that can be interpreted as a
    "differentiation matrix". With these definitions, we can rewrite equation
    \eqref{cost-function-1} as follows:
  </p>

  <EquationBlock>
    J_\mu(\Vec{x}, \Vec{\tilde{x}}) = \|A\Vec{\tilde{x}} - \Vec{b}\|^2_2
  </EquationBlock>

  <p>where:</p>

  <EquationBlock label="A">
    A = \MatrixTwoOne{I_{n \times n}}{\sqrt{\mu} D_{n-1}}
  </EquationBlock>

  <p>
    is a $(2n - 1) \times n$ matrix, and $I_{n \times n}$ represents the
    $n$-dimensional identity matrix. Indeed, using equations \eqref{b},
    \eqref{D} and \eqref{A}, we find that:
  </p>

  <EquationBlock label="Ax-tilde-b">
    A \Vec{\tilde{x}} - \Vec{b} = \MatrixTwoOne{I_{n \times n} \Vec{\tilde{x}} -
    \Vec{x}}{\sqrt{\mu} D_{n-1} \Vec{\tilde{x}}} = \MatrixTwoOne{\Vec{\tilde{x}}
    - \Vec{x}}{\sqrt{\mu} D_{n-1} \Vec{\tilde{x}}}
  </EquationBlock>

  <p>
    The square of the Euclidean norm of the vector in equation
    \eqref{Ax-tilde-b} is equal to $J_\mu(\Vec{x}, \Vec{\tilde{x}})$. This means
    we can use any linear least squares solver to determine $\Vec{\tilde{x}}$.
  </p>

  <p>
    While it's somewhat outside the scope of this post, it's worth mentioning
    that finding the vector $\Vec{\tilde{x}}$ that minimizes $J_\mu(\Vec{x},
    \Vec{\tilde{x}})$ is equivalent to solving the following linear system,
    known as the
    <a
      href="https://en.wikipedia.org/wiki/Linear_least_squares_%28mathematics%29#The_general_problem"
      >normal equations</a
    >
    for our linear least squares problem:
  </p>

  <EquationBlock label="normal-equations">
    (A^T A) \Vec{\tilde{x}} = A^T \Vec{b}
  </EquationBlock>

  <p>
    This linear system has a unique solution because $A^T A$ is invertible. To
    prove this fact, note first that the definition of $A$ in equation \eqref{A}
    implies $A \Vec{y} = \Vec{0}$ if and only if $\Vec{y} = \Vec{0}$. Therefore,
    if $A^T A \Vec{y} = \Vec{0}$, it follows that:
  </p>

  <EquationBlock>
    \Vec{y}^T A^T A \Vec{y} = (A \Vec{y})^T (A \Vec{y}) = \|A \Vec{y}\|^2_2 =
    \Vec{0} \Longrightarrow A \Vec{y} = \Vec{0}
  </EquationBlock>

  <p>
    Consequently, $\Vec{y} = \Vec{0}$, implying $A^T A \Vec{y} = \Vec{0}$ if and
    only if $\Vec{y} = \Vec{0}$, i.e., $A^TA$ is invertible.
  </p>

  <p>
    To summarize, we can now detail our method for producing a denoised version
    $\Vec{\tilde{x}}$ of a noisy sequence $\Vec{x}$:
  </p>

  <ListBlock>
    <ListBlockItem bullet="1.">
      Compute $\Vec{b}$ and $A$ according to equations \eqref{b} and \eqref{A},
      respectively.
    </ListBlockItem>
    <ListBlockItem bullet="2.">
      Solve the linear system given in equation \eqref{normal-equations}; its
      solution $\Vec{\tilde{x}}$ is the denoised version of the sequence
      $\Vec{x}$.
    </ListBlockItem>
  </ListBlock>

  <p>
    If the obtained solution appears either overly smooth or insufficiently
    smooth, try using different values of $\mu$. Increasing $\mu$ will render
    the generated sequence $\Vec{\tilde{x}}$ smoother, while smaller values of
    $\mu$ will lead to less smoothing, i.e., more trust is placed on the
    accuracy of the data $\Vec{x}$.
  </p>

  <p>
    <FigureLink id="denoised-data-1" capitalized /> exhibits a typical outcome
    of applying the algorithm detailed above. In this example,
    <a href="https://en.wikipedia.org/wiki/Gaussian_noise">Gaussian noise</a>
    is incorporated into data representing a sine wave to create a noisy data
    sequence. The algorithm we've formulated is subsequently employed to yield a
    denoised version of the noisy sequence.
  </p>

  <FigureBlock
    id="denoised-data-1"
    caption="Gaussian noise with a mean of zero and standard deviation
             $\sigma = 0.1$ is added to a pure sine wave. The algorithm
             discussed previously is then used, with $\mu = 5$, to (partially)
             filter out this added noise component."
  >
    <FlotChart :data="data1" :options="options" />
  </FigureBlock>

  <SectionTitle>Additional insights on the differentiation term</SectionTitle>

  <p>
    As previously discussed, $D_{n-1} \Vec{\tilde{x}}$ represents a derivative
    computed at each point $\tilde{x}_i$ for $i = 2, 3, \ldots, n$. In
    particular, it represents a first-order accurate
    <a href="https://en.wikipedia.org/wiki/Finite_difference#Basic_types"
      >backward difference</a
    >
    approximation to these derivatives. However, there are alternative formulas
    that could be used for this purpose. For instance, if we employ the
    second-order accurate
    <a href="https://en.wikipedia.org/wiki/Finite_difference#Basic_types"
      >central difference</a
    >
    formula, we derive the following cost function:
  </p>

  <EquationBlock label="cost-function-2">
    J^c_\mu(\Vec{x}, \Vec{\tilde{x}}) = \sum_{i=1}^n (\tilde{x}_i - x_i)^2 + \mu
    \sum_{i=2}^{n-1} (\tilde{x}_{i+1} - \tilde{x}_{i-1})^2
  </EquationBlock>

  <p>
    The differentiation matrix corresponding to $J^c_\mu(\Vec{x},
    \Vec{\tilde{x}})$ is now an $(n-2) \times n$ matrix:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock label="Dc">
    D^c_{n-2} = \Matrix{
      -1      & 0      & 1      & 0      & \ldots & 0      & 0      & 0 \\
      0       & -1     & 0      & 1      & \ldots & 0      & 0      & 0 \\
      \vdots  & \vdots & \vdots & \vdots & \ddots & \vdots & \vdots & \vdots \\
      0       & 0      & 0      & 0      & \ldots & -1     & 0      & 1
    }
  </EquationBlock>

  <p>
    <FigureLink id="denoised-data-2" capitalized /> exhibits the results
    obtained for the same data sequence as in
    <FigureLink id="denoised-data-1" /> using the same $\mu$ value.
  </p>

  <FigureBlock
    id="denoised-data-2"
    caption="Results obtained when the cost function provided in equation
             \eqref{cost-function-2} is minimized, with $\mu = 5$."
  >
    <FlotChart :data="data2" :options="options" />
  </FigureBlock>

  <p>
    The results are now intriguing. Why is there so much oscillation in the
    denoised sequence? To answer this question, let's first consider the
    original matrix $D_{n-1}$. If $D_{n-1} \Vec{z} = \Vec{0}$ for some
    $n$-dimensional vector $\Vec{z}$, then, by the definition of $D_{n-1}$, we
    must have $z_2 - z_1 = 0$, $z_3 - z_2 = 0$, $\ldots$, $z_n - z_{n-1} = 0$,
    so $z_1 = z_2 = \ldots = z_n$. Therefore, the only vectors in the
    <a href="https://en.wikipedia.org/wiki/Kernel_%28linear_algebra%29"
      >null space</a
    >
    of $D_{n-1}$ are those representing constant sequences (as it should be for
    a well-behaved derivative operator). $D^c_{n-2}$, on the other hand, has a
    significant flaw: $D^c_{n-2} \Vec{z} = \Vec{0}$ only implies that $z_1 =
    z_3$, $z_2 = z_4$, $z_3 = z_5$, $z_4 = z_6$, and so on. As long as all the
    "odd" and "even" elements of $\Vec{z}$ are set to two independent constants
    $c_{\textrm{odd}}$ and $c_{\textrm{even}}$, respectively, the resulting
    vector will be in the null space of $D^c_{n-2}$. This implies that highly
    oscillatory vectors such as $\Vec{z} = (1, -1, 1, -1, \ldots)$ are in the
    null space of $D^c_{n-2}$ and thus incur no error on the second term of
    equation \eqref{cost-function-2}. This is why the resulting denoised
    sequence is afflicted by a distinctly visible oscillatory noise that is
    observable even for large values of $\mu$.
  </p>

  <p>
    Rather than attempting to create a smooth sequence by restricting the values
    that the first derivative of the denoised sequence can take, we can instead
    constrain the values of its second derivative. By using the second-order
    accurate
    <a
      href="https://en.wikipedia.org/wiki/Finite_difference#Higher-order_differences"
      >central difference</a
    >
    approximation to the second derivative, we obtain the following cost
    function:
  </p>

  <EquationBlock label="cost-function-3">
    J^{c,2}_\mu(\Vec{x}, \Vec{\tilde{x}}) = \sum_{i=1}^n (\tilde{x}_i - x_i)^2 +
    \mu \sum_{i=2}^{n-1} (\tilde{x}_{i+1} - 2 \tilde{x}_i + \tilde{x}_{i-1})^2
  </EquationBlock>

  <p>
    The resulting differentiation matrix has dimensions $(n-2) \times n$ and
    resembles the
    <a href="https://en.wikipedia.org/wiki/Discrete_Laplace_operator"
      >discrete Laplacian operator</a
    >
    in one dimension:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock label="Lc">
    L_{n-2} = \Matrix{
      1      & -2     & 1      & 0      & \ldots & 0      & 0      & 0 \\
      0      & 1      & -2     & 1      & \ldots & 0      & 0      & 0 \\
      \vdots & \vdots & \vdots & \vdots & \ddots & \vdots & \vdots & \vdots \\
      0      & 0      & 0      & 0      & \ldots & 1      & -2     & 1
    }
  </EquationBlock>

  <p>
    <FigureLink id="denoised-data-3" capitalized /> presents the results
    obtained for the same data sequence from
    <FigureLink id="denoised-data-1" /> using the same $\mu$ value. These
    results are evidently superior to those shown in
    <FigureLink id="denoised-data-2" /> because the null space of $L_{n-2}$ does
    not contain highly oscillatory vectors (we won't provide a proof for this
    fact here, though). Observe that since we're not attempting to limit
    fluctuations in the denoised data (i.e., the distance between $\tilde{x}_i$
    and $\tilde{x}_{i+1}$), but rather the fluctuations in the first derivative
    values, the resulting sequence $\Vec{\tilde{x}}$ tends to be more linear
    compared to the one from <FigureLink id="denoised-data-1" />.
  </p>

  <FigureBlock
    id="denoised-data-3"
    caption="Results obtained when the cost function provided in equation
             \eqref{cost-function-3} is minimized, with $\mu = 5$."
  >
    <FlotChart :data="data3" :options="options" />
  </FigureBlock>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());

const pointsExact = [
  [1, 0],
  [2, 0.0634239],
  [3, 0.126592],
  [4, 0.189251],
  [5, 0.251148],
  [6, 0.312033],
  [7, 0.371662],
  [8, 0.429795],
  [9, 0.486197],
  [10, 0.540641],
  [11, 0.592908],
  [12, 0.642788],
  [13, 0.690079],
  [14, 0.734592],
  [15, 0.776146],
  [16, 0.814576],
  [17, 0.849725],
  [18, 0.881453],
  [19, 0.909632],
  [20, 0.934148],
  [21, 0.954902],
  [22, 0.971812],
  [23, 0.984808],
  [24, 0.993838],
  [25, 0.998867],
  [26, 0.999874],
  [27, 0.996855],
  [28, 0.989821],
  [29, 0.978802],
  [30, 0.963842],
  [31, 0.945001],
  [32, 0.922354],
  [33, 0.895994],
  [34, 0.866025],
  [35, 0.83257],
  [36, 0.795762],
  [37, 0.75575],
  [38, 0.712694],
  [39, 0.666769],
  [40, 0.618159],
  [41, 0.56706],
  [42, 0.513677],
  [43, 0.458227],
  [44, 0.400931],
  [45, 0.34202],
  [46, 0.281733],
  [47, 0.220311],
  [48, 0.158001],
  [49, 0.095056],
  [50, 0.0317279],
  [51, -0.0317279],
  [52, -0.095056],
  [53, -0.158001],
  [54, -0.220311],
  [55, -0.281733],
  [56, -0.34202],
  [57, -0.400931],
  [58, -0.458227],
  [59, -0.513677],
  [60, -0.56706],
  [61, -0.618159],
  [62, -0.666769],
  [63, -0.712694],
  [64, -0.75575],
  [65, -0.795762],
  [66, -0.83257],
  [67, -0.866025],
  [68, -0.895994],
  [69, -0.922354],
  [70, -0.945001],
  [71, -0.963842],
  [72, -0.978802],
  [73, -0.989821],
  [74, -0.996855],
  [75, -0.999874],
  [76, -0.998867],
  [77, -0.993838],
  [78, -0.984808],
  [79, -0.971812],
  [80, -0.954902],
  [81, -0.934148],
  [82, -0.909632],
  [83, -0.881453],
  [84, -0.849725],
  [85, -0.814576],
  [86, -0.776146],
  [87, -0.734592],
  [88, -0.690079],
  [89, -0.642788],
  [90, -0.592908],
  [91, -0.540641],
  [92, -0.486197],
  [93, -0.429795],
  [94, -0.371662],
  [95, -0.312033],
  [96, -0.251148],
  [97, -0.189251],
  [98, -0.126592],
  [99, -0.0634239],
  [100, 6.43249e-16],
];

const pointsNoisy = [
  [1, -0.0816768],
  [2, 0.00520175],
  [3, 0.131854],
  [4, 0.066951],
  [5, 0.107055],
  [6, 0.206326],
  [7, 0.476274],
  [8, 0.267375],
  [9, 0.38222],
  [10, 0.387895],
  [11, 0.728017],
  [12, 0.695729],
  [13, 0.572231],
  [14, 0.704112],
  [15, 0.589955],
  [16, 0.791639],
  [17, 0.788129],
  [18, 0.967704],
  [19, 0.885867],
  [20, 0.886918],
  [21, 0.913659],
  [22, 0.835806],
  [23, 0.882289],
  [24, 0.821747],
  [25, 0.899288],
  [26, 0.892462],
  [27, 1.07554],
  [28, 0.923214],
  [29, 0.953149],
  [30, 0.832936],
  [31, 0.945246],
  [32, 1.03548],
  [33, 0.78452],
  [34, 0.845365],
  [35, 0.921525],
  [36, 0.838221],
  [37, 0.880259],
  [38, 0.685216],
  [39, 0.646212],
  [40, 0.551112],
  [41, 0.488324],
  [42, 0.594564],
  [43, 0.676241],
  [44, 0.379983],
  [45, 0.373701],
  [46, 0.222597],
  [47, 0.043532],
  [48, 0.169933],
  [49, 0.171276],
  [50, 0.114458],
  [51, -0.10016],
  [52, -0.177911],
  [53, -0.218989],
  [54, -0.180542],
  [55, -0.0580257],
  [56, -0.410464],
  [57, -0.39477],
  [58, -0.677435],
  [59, -0.605181],
  [60, -0.50112],
  [61, -0.51494],
  [62, -0.7107],
  [63, -0.853176],
  [64, -0.669597],
  [65, -0.977157],
  [66, -0.920987],
  [67, -0.982412],
  [68, -0.919532],
  [69, -0.991171],
  [70, -0.948565],
  [71, -0.856241],
  [72, -1.14226],
  [73, -1.09344],
  [74, -1.02344],
  [75, -1.00135],
  [76, -0.966866],
  [77, -0.94432],
  [78, -0.883996],
  [79, -1.0856],
  [80, -0.97052],
  [81, -1.06076],
  [82, -0.846814],
  [83, -0.703231],
  [84, -0.974307],
  [85, -1.08463],
  [86, -0.790653],
  [87, -0.534496],
  [88, -0.697874],
  [89, -0.59263],
  [90, -0.54361],
  [91, -0.62361],
  [92, -0.571661],
  [93, -0.344715],
  [94, -0.345459],
  [95, -0.426008],
  [96, -0.303186],
  [97, -0.346788],
  [98, -0.130674],
  [99, -0.112005],
  [100, -0.111486],
];

const pointsDenoised1 = [
  [1, 0.0432799],
  [2, 0.0682712],
  [3, 0.105876],
  [4, 0.138286],
  [5, 0.184963],
  [6, 0.247221],
  [7, 0.317659],
  [8, 0.356373],
  [9, 0.412887],
  [10, 0.475534],
  [11, 0.555709],
  [12, 0.601422],
  [13, 0.628274],
  [14, 0.666334],
  [15, 0.696839],
  [16, 0.748721],
  [17, 0.79202],
  [18, 0.836096],
  [19, 0.853851],
  [20, 0.865203],
  [21, 0.872211],
  [22, 0.870931],
  [23, 0.876675],
  [24, 0.881296],
  [25, 0.897827],
  [26, 0.914066],
  [27, 0.934626],
  [28, 0.927002],
  [29, 0.920137],
  [30, 0.906669],
  [31, 0.907948],
  [32, 0.901767],
  [33, 0.868843],
  [34, 0.852784],
  [35, 0.838209],
  [36, 0.806971],
  [37, 0.769483],
  [38, 0.70984],
  [39, 0.655122],
  [40, 0.602186],
  [41, 0.559464],
  [42, 0.530971],
  [43, 0.489759],
  [44, 0.411251],
  [45, 0.338996],
  [46, 0.2598],
  [47, 0.188044],
  [48, 0.145192],
  [49, 0.0973904],
  [50, 0.0348121],
  [51, -0.0436954],
  [52, -0.11091],
  [53, -0.164724],
  [54, -0.207686],
  [55, -0.256076],
  [56, -0.344076],
  [57, -0.418798],
  [58, -0.498326],
  [59, -0.542032],
  [60, -0.573109],
  [61, -0.618583],
  [62, -0.684786],
  [63, -0.745806],
  [64, -0.785353],
  [65, -0.84805],
  [66, -0.884926],
  [67, -0.91459],
  [68, -0.930689],
  [69, -0.94902],
  [70, -0.95892],
  [71, -0.970891],
  [72, -1.00579],
  [73, -1.0134],
  [74, -1.005],
  [75, -0.992914],
  [76, -0.979139],
  [77, -0.967819],
  [78, -0.961199],
  [79, -0.97002],
  [80, -0.955724],
  [81, -0.93847],
  [82, -0.896757],
  [83, -0.865032],
  [84, -0.865669],
  [85, -0.844577],
  [86, -0.775475],
  [87, -0.703337],
  [88, -0.664967],
  [89, -0.620016],
  [90, -0.580542],
  [91, -0.548454],
  [92, -0.501335],
  [93, -0.440151],
  [94, -0.398054],
  [95, -0.366476],
  [96, -0.322992],
  [97, -0.28347],
  [98, -0.231283],
  [99, -0.199218],
  [100, -0.184596],
];

const pointsDenoised2 = [
  [1, 0.162132],
  [2, 0.179925],
  [3, 0.210894],
  [4, 0.21487],
  [5, 0.275464],
  [6, 0.279399],
  [7, 0.373716],
  [8, 0.358542],
  [9, 0.451456],
  [10, 0.455919],
  [11, 0.543043],
  [12, 0.5669],
  [13, 0.597635],
  [14, 0.652115],
  [15, 0.657308],
  [16, 0.726931],
  [17, 0.730451],
  [18, 0.788806],
  [19, 0.792059],
  [20, 0.814901],
  [21, 0.834905],
  [22, 0.826592],
  [23, 0.862001],
  [24, 0.836441],
  [25, 0.885038],
  [26, 0.849228],
  [27, 0.905226],
  [28, 0.853369],
  [29, 0.891351],
  [30, 0.84354],
  [31, 0.865117],
  [32, 0.835832],
  [33, 0.822857],
  [34, 0.788195],
  [35, 0.788264],
  [36, 0.729123],
  [37, 0.727019],
  [38, 0.648232],
  [39, 0.635126],
  [40, 0.559945],
  [41, 0.541015],
  [42, 0.473424],
  [43, 0.457443],
  [44, 0.362675],
  [45, 0.330111],
  [46, 0.248464],
  [47, 0.194061],
  [48, 0.139427],
  [49, 0.0881174],
  [50, 0.0242879],
  [51, -0.0344583],
  [52, -0.108885],
  [53, -0.143894],
  [54, -0.228252],
  [55, -0.23831],
  [56, -0.357162],
  [57, -0.368783],
  [58, -0.475411],
  [59, -0.494058],
  [60, -0.553255],
  [61, -0.597109],
  [62, -0.641526],
  [63, -0.716594],
  [64, -0.715962],
  [65, -0.808763],
  [66, -0.799672],
  [67, -0.867253],
  [68, -0.859118],
  [69, -0.902711],
  [70, -0.906482],
  [71, -0.920477],
  [72, -0.945429],
  [73, -0.951091],
  [74, -0.945009],
  [75, -0.953234],
  [76, -0.928904],
  [77, -0.945755],
  [78, -0.905206],
  [79, -0.938562],
  [80, -0.885749],
  [81, -0.901961],
  [82, -0.849339],
  [83, -0.833601],
  [84, -0.813434],
  [85, -0.791315],
  [86, -0.745354],
  [87, -0.690366],
  [88, -0.668214],
  [89, -0.620592],
  [90, -0.585143],
  [91, -0.556409],
  [92, -0.510378],
  [93, -0.478786],
  [94, -0.423356],
  [95, -0.427978],
  [96, -0.351913],
  [97, -0.377563],
  [98, -0.290217],
  [99, -0.333303],
  [100, -0.260428],
];

const pointsDenoised3 = [
  [1, -0.0628614],
  [2, -0.000693653],
  [3, 0.057711],
  [4, 0.109768],
  [5, 0.167724],
  [6, 0.235257],
  [7, 0.303917],
  [8, 0.359464],
  [9, 0.42213],
  [10, 0.493731],
  [11, 0.5681],
  [12, 0.617902],
  [13, 0.647786],
  [14, 0.677966],
  [15, 0.713546],
  [16, 0.764858],
  [17, 0.817517],
  [18, 0.862493],
  [19, 0.884878],
  [20, 0.890808],
  [21, 0.886615],
  [22, 0.877855],
  [23, 0.875491],
  [24, 0.882077],
  [25, 0.901525],
  [26, 0.925683],
  [27, 0.945952],
  [28, 0.947086],
  [29, 0.93976],
  [30, 0.929873],
  [31, 0.926],
  [32, 0.917332],
  [33, 0.896906],
  [34, 0.881392],
  [35, 0.864979],
  [36, 0.834654],
  [37, 0.788712],
  [38, 0.726161],
  [39, 0.664319],
  [40, 0.612313],
  [41, 0.575651],
  [42, 0.5476],
  [43, 0.503962],
  [44, 0.42993],
  [45, 0.345155],
  [46, 0.259296],
  [47, 0.187725],
  [48, 0.13847],
  [49, 0.0907226],
  [50, 0.0299674],
  [51, -0.0422011],
  [52, -0.10729],
  [53, -0.158399],
  [54, -0.202751],
  [55, -0.259686],
  [56, -0.344105],
  [57, -0.430574],
  [58, -0.506932],
  [59, -0.553859],
  [60, -0.586134],
  [61, -0.628798],
  [62, -0.689894],
  [63, -0.75469],
  [64, -0.812617],
  [65, -0.8728],
  [66, -0.915765],
  [67, -0.942904],
  [68, -0.956658],
  [69, -0.967367],
  [70, -0.977946],
  [71, -0.996072],
  [72, -1.02354],
  [73, -1.0342],
  [74, -1.02561],
  [75, -1.0072],
  [76, -0.987968],
  [77, -0.975731],
  [78, -0.974089],
  [79, -0.980361],
  [80, -0.973849],
  [81, -0.954899],
  [82, -0.923193],
  [83, -0.899587],
  [84, -0.889659],
  [85, -0.859715],
  [86, -0.792993],
  [87, -0.717714],
  [88, -0.661628],
  [89, -0.615845],
  [90, -0.578721],
  [91, -0.543972],
  [92, -0.498289],
  [93, -0.444292],
  [94, -0.399277],
  [95, -0.360621],
  [96, -0.314941],
  [97, -0.261929],
  [98, -0.198927],
  [99, -0.140249],
  [100, -0.086556],
];

const options = {
  legend: {
    position: "ne",
  },
  xaxis: {
    axisLabel: "$i$",
    max: 100,
    min: 1,
    ticks: 10,
  },
  yaxis: {
    max: 1.2,
    min: -1.2,
    ticks: 5,
  },
};

const mainData = [
  {
    label: "Pure sine data",
    data: pointsExact,
    color: 1,
  },
  {
    label: "Noisy data ($x_i$)",
    data: pointsNoisy,
    color: 0,
  },
];

const metadataDenoised = {
  label: "Denoised data ($\\tilde{x}_i$)",
  color: 2,
};

const data1 = [
  ...mainData,
  {
    ...metadataDenoised,
    data: pointsDenoised1,
  },
];

const data2 = [
  ...mainData,
  {
    ...metadataDenoised,
    data: pointsDenoised2,
  },
];

const data3 = [
  ...mainData,
  {
    ...metadataDenoised,
    data: pointsDenoised3,
  },
];
</script>
