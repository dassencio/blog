<template>
  <p>
    In this post, I will show how solving a
    <a href="https://en.wikipedia.org/wiki/Sudoku">Sudoku puzzle</a>
    is equivalent to solving an
    <a href="https://en.wikipedia.org/wiki/Integer_programming"
      >integer linear programming</a
    >
    (ILP) problem. This equivalence allows us to solve a Sudoku puzzle using any
    of the many freely available ILP solvers. An implementation of a solver (in
    Python) that follows the formulation described in this post can be found
    <a href="https://github.com/dassencio/sudoku">here</a>.
  </p>

  <p>
    A Sudoku puzzle is an $N \times N$ grid divided into blocks of size $m
    \times n$, i.e., each block contains $m$ rows and $n$ columns, with $N = mn$
    since the number of cells in a block is the same as the number of
    rows/columns in the puzzle. The most commonly known version of Sudoku is a
    $9 \times 9$ grid ($N = 9$) with $3 \times 3$ blocks ($m = n = 3$).
    Initially, a cell can be either empty or contain an integer value in the
    interval $[1, N]$; non-empty cells are fixed and cannot be modified as the
    puzzle is solved. The rules for solving the puzzle are:
  </p>

  <ListBlock>
    <ListBlockItem bullet="1.">
      Each integer value $k \in [1, N]$ must appear exactly once in each row.
    </ListBlockItem>
    <ListBlockItem bullet="2.">
      Each integer value $k \in [1, N]$ must appear exactly once in each column.
    </ListBlockItem>
    <ListBlockItem bullet="3.">
      Each integer value $k \in [1, N]$ must appear exactly once in each block.
    </ListBlockItem>
  </ListBlock>

  <p>
    These rules imply that every cell of the puzzle will have a number assigned
    to it when the puzzle is solved, and that each row, column, or block of a
    solved puzzle will represent some permutation of the sequence $\{1, 2,
    \ldots, N\}$. Each rule can be directly expressed as a set of constraints of
    an ILP problem. Our formulation will ensure that the constraints enforce
    everything needed to determine a valid solution to the puzzle, and the
    objective function will therefore be irrelevant since any point that
    satisfies the constraints will be correct (note, however, that some Sudoku
    puzzles may contain
    <a
      href="https://web.archive.org/web/20161121121205/https://maa.org/external_archive/joma/Volume8/Bartlett/solvingPuzzle.html"
      >more than one</a
    >
    solution, but I'm assuming the reader will be content with finding a single
    one of those). Therefore, our objective function will be simply
    $\Vec{0}^T\Vec{x} = 0$, where $\Vec{0}$ is a vector with all elements set to
    $0$ and $\Vec{x}$ is a vector representing all variables used in the ILP
    formulation.
  </p>

  <p>
    The puzzle grid can be represented as an $N \times N$ matrix, and each grid
    cell can be naturally assigned a pair of indices $(i, j)$, with $i$ and $j$
    representing the cell's row and column respectively (see
    <FigureLink id="sudoku" />). The top-left grid cell has $(i, j) = (1, 1)$,
    and the bottom-right one has $(i, j) = (N, N)$, with $i$ increasing downward
    and $j$ increasing toward the right.
  </p>

  <FigureBlock
    id="sudoku"
    caption="A Sudoku puzzle with blocks of size $m \times n = 2 \times 3$. The
             cell indices $(i, j)$ are shown inside every cell, and the block
             indices $(I, J)$ are shown on the left and top sides of the grid,
             respectively. Both the height (number of rows) and width (number of
             columns) of the puzzle are equal to $N = mn = 6$. The puzzle has
             $n = 3$ blocks along the vertical direction and $m = 2$ blocks
             along the horizontal direction."
  >
    <ResponsiveImage alt="Sudoku puzzle" :src="sudoku" />
  </FigureBlock>

  <p>
    Let's then define $N^3$ variables as follows: $x_{ijk}$ is an integer
    variable that is restricted to be either $0$ or $1$, with $1$ meaning the
    value at cell $(i, j)$ is equal to $k$, and $0$ meaning the value at cell
    $(i, j)$ is not $k$. Rule (1) above, i.e., the requirement that each $k \in
    [1, N]$ must appear exactly once per row, can be expressed as:
  </p>

  <EquationBlock label="row-constraint">
    \sum_{j=1}^N x_{ijk} = 1
  </EquationBlock>

  <p>
    for $i, k = 1, 2, \ldots, N$. In other words, for a fixed row $i$ and a
    fixed $k \in [1, N]$, only a single $x_{ijk}$ will be $1$ in that row for $j
    = 1, 2, \ldots, N$.
  </p>

  <p>
    If the fact that the constraints above do not have any "$\leq$" is bothering
    you, remind yourself that $x = a$ can be expressed as $a \leq x \leq a$,
    which in turn is equivalent to the combination of $-x \leq -a$ and $x \leq
    a$. In other words, any equality constraint can be expressed as a pair of
    "less-than-or-equal-to" constraints like the ones we need in linear
    programming problems.
  </p>

  <p>
    Rule (2), i.e., the requirement that each $k \in [1, N]$ must appear exactly
    once per column, can be expressed as:
  </p>

  <EquationBlock label="column-constraint">
    \sum_{i=1}^N x_{ijk} = 1
  </EquationBlock>

  <p>
    for $j, k = 1, 2, \ldots, N$. Expressing rule (3), i.e., the requirement
    that each $k \in [1, N]$ must appear exactly once per block, is a bit more
    complicated. A way to simplify this task is by assigning pairs of indices
    $(I, J)$ to each block in a similar way as we did for cells (see
    <FigureLink id="sudoku" />): $(I, J) = (1, 1)$ represents the top-left
    block, and $(I, J) = (n, m)$ represents the bottom-right block, with $I$
    increasing downward and ranging from $1$ to $n$ (there are $n$ blocks along
    the vertical direction) and $J$ increasing toward the right and ranging from
    $1$ to $m$ (there are $m$ blocks along the horizontal direction). Block $(I,
    J)$ therefore contains the cells with row indices $i = (I - 1)m + 1,$
    $\ldots, Im$ and column indices $j = (J - 1)n + 1,$ $\ldots, Jn$. Thus, rule
    (3) can be expressed as:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock label="block-constraint">
    \sum_{i = (I - 1)m + 1}^{Im} \sum_{j = (J - 1)n + 1}^{Jn} x_{ijk} = 1
  </EquationBlock>

  <p>
    for $I = 1, 2, \ldots, n$, $J = 1, 2, \ldots, m$, and $k = 1, 2, \ldots, N$.
    Note that both equations \eqref{row-constraint} and
    \eqref{column-constraint} represent $N^2$ constraints each. As it turns out,
    equation \eqref{block-constraint} contains $nmN = N^2$ constraints as well.
  </p>

  <p>
    So far, our formulation does not prevent $x_{ijk}$ from being equal to $1$
    for two or more distinct values of $k$ at the same cell $(i, j)$. We
    therefore need to impose these constraints manually:
  </p>

  <EquationBlock label="cell-constraint">
    \sum_{k=1}^N x_{ijk} = 1
  </EquationBlock>

  <p>for $i, j = 1, 2, \ldots, N$.</p>

  <p>
    Not all cells are initially empty in a Sudoku puzzle. Some cells will
    already contain values at the beginning, and these values are necessary so
    that the solution to the puzzle can be deduced logically (ideally, there
    should be a single valid solution). Let $\mathcal{C}$ be the set of tuples
    $(i, j, k)$ representing the fact that a cell $(i, j)$ initially contains
    the value $k$. We then have:
  </p>

  <EquationBlock label="initial-puzzle-constraint">x_{ijk} = 1</EquationBlock>

  <p>for $(i, j, k) \in \mathcal{C}$.</p>

  <p>
    Our last set of constraints limits the values that each variable $x_{ijk}$
    can take: it's either $0$ or $1$ (our ILP formulation then technically
    defines a <i>binary</i> integer linear programming problem, or BILP for
    short):
  </p>

  <EquationBlock label="binary-constraint">
    0 \leq x_{ijk} \leq 1
  </EquationBlock>

  <p>
    for $i, j, k = 1, 2, \ldots, N$. Since most ILP solvers allow bounds on the
    values that each variable $x_{ijk}$ can take to be set directly, this last
    set of constraints often does not need to be specified in the same manner as
    the previous ones.
  </p>

  <p>
    We now have a complete ILP formulation of a Sudoku puzzle: our goal is to
    minimize the objective function $f(x_{111}, \ldots, x_{ijk}, \ldots,
    x_{NNN}) = 0$, subject to all constraints specified in equations
    \eqref{row-constraint}, \eqref{column-constraint}, \eqref{block-constraint},
    \eqref{cell-constraint}, \eqref{initial-puzzle-constraint}, and
    \eqref{binary-constraint}.
  </p>

  <p>
    After solving the ILP problem outlined above, the solution to the Sudoku
    puzzle can be constructed directly by placing, at each cell $(i, j)$, the
    value $k$ such that $x_{ijk} = 1$.
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";
import sudoku from "@/assets/images/sudoku.svg";

onMounted(() => onViewMounted());
</script>
