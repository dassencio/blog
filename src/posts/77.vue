<template>
  <p>
    The
    <a href="https://en.wikipedia.org/wiki/Lagrange_multiplier"
      >Lagrange multiplier method</a
    >
    is a technique that solves the following problem: finding the local maxima
    and minima of a function $f(x_1, \ldots, x_n)$ over values of $x_1, \ldots,
    x_n$ that satisfy $m$ constraint equations:
  </p>

  <EquationBlock> g_k(x_1, \ldots, x_n) = 0 \label{constraints} </EquationBlock>

  <p>
    where $k = 1, 2, \ldots, m$. Each constraint equation defines an
    $(n-1)$-dimensional surface. The intersection of all these surfaces defines
    the set of points over which we must find the local maxima and minima of
    $f(\Vec{x})$, where $\Vec{x} = (x_1, \ldots, x_n)$. In the following, we
    will refer to this set of points as the "feasible surface". Without the
    constraints defined in \eqref{constraints}, we could use standard techniques
    from calculus to solve the problem by finding and analyzing the stationary
    points of $f(\Vec{x})$. With the imposed constraints, however, things are
    not as straightforward.
  </p>

  <p>
    Our approach here will be to study the properties of the local maxima and
    minima of $f(\Vec{x})$ subject to the constraints above. This exploration
    will naturally lead us to the Lagrange multiplier method, illustrating why
    it works.
  </p>

  <p>
    First, observe that each constraint equation $g_k(\Vec{x}) = 0$ allows us to
    express one coordinate $x_i$ in terms of the others. Ideally, we can begin
    with $g_1(\Vec{x}) = 0$ and determine $x_n$ as a function of $x_1, \ldots,
    x_{n-1}$. Then, we employ this expression for $x_n$ in $g_2(\Vec{x}) = 0$ to
    determine $x_{n-1}$ as a function of $x_1, \ldots, x_{n-2}$, and so forth.
    Given $m$ constraints, we can determine $x_{n-m+1}, \ldots, x_n$ as
    functions of $x_1, \ldots, x_{n-m}$, implying that the feasible surface can
    be parameterized using $n-m$ parameters, corresponding to each coordinate
    $x_i$ for $i = 1, 2, \ldots, n-m$. To be specific, we can designate $x_i =
    \alpha_i$ for $i = 1, 2, \ldots, n-m$ and express the subsequent coordinates
    $x_i$ for $i = (n-m+1), \ldots, n$ in terms of $\alpha_1, \ldots,
    \alpha_{n-m}$. Although in the general scenario, we might encounter
    exceptions to this approach, the central principle remains: barring rare
    cases, each constraint allows us to express one variable in terms of the
    others. Thus, with $m$ constraints, only $n-m$ variables remain free. This
    demonstrates that the feasible surface is an $(n-m)$-dimensional entity.
  </p>

  <p>
    Let's elucidate this with an example. Suppose we have a function $f(x,y,z)$
    and two constraints $g_1(x,y,z) = 0$ and $g_2(x,y,z) = 0$. Using $g_1(x,y,z)
    = 0$, we can express $z$ as a function of $x$ and $y$: $z = z(x,y)$.
    Substituting $z$ with $z(x,y)$ in $g_2(x,y,z) = 0$, only $x$ and $y$ remain
    as free variables. Thus, we can express $y$ as a function of $x$: $y =
    y(x)$. This indicates that the feasible surface is a curve (or set of
    curves), parameterized using $x = \alpha$. This curve represents the set of
    points $(\alpha, y(\alpha), z(\alpha, y(\alpha)))$ for all valid values of
    $\alpha$. Hence, with $n = 3$ dimensions and $m = 2$ constraints, our
    feasible surface is $1$-dimensional.
  </p>

  <p>
    Now, consider a point $\Vec{x}$ on the feasible surface where $f(\Vec{x})$
    represents a local maximum or minimum. Also, imagine an infinitesimal
    displacement $\delta\Vec{x}$ from $\Vec{x}$, such that $\delta\Vec{x}$ is
    tangent to the feasible surface. We have:
  </p>

  <EquationBlock>
    f(\Vec{x} + \delta\Vec{x}) = f(\Vec{x}) + \nabla f(\Vec{x}) \cdot
    \delta\Vec{x} \label{f-x-plus-dx}
  </EquationBlock>

  <p>
    Since $\nabla f(\Vec{x})$ points in the direction where $f(\Vec{x})$
    increases most rapidly, $\nabla f(\Vec{x})$ must be locally perpendicular to
    the feasible surface, i.e., $\nabla f(\Vec{x}) \cdot \delta\Vec{x} = 0$. If
    this weren't the case, we would have either $\nabla f(\Vec{x}) \cdot
    \delta\Vec{x} \gt 0$ or $\nabla f(\Vec{x}) \cdot \delta\Vec{x} \lt 0$.
    Assuming the former, we can deduce from equation \eqref{f-x-plus-dx} that
    $f(\Vec{x} + \delta\Vec{x}) \gt f(\Vec{x})$. However, with such a
    displacement $\delta\Vec{x}$, we would also get $\nabla f(\Vec{x}) \cdot
    (-\delta\Vec{x}) \lt 0$. Using equation \eqref{f-x-plus-dx} and replacing
    $\delta\Vec{x}$ with $(-\delta\Vec{x})$, we infer that $f(\Vec{x} -
    \delta\Vec{x}) \lt f(\Vec{x})$. In essence, $f$ would increase if we move
    towards $\Vec{x} + \delta\Vec{x}$ but decrease if we move to $\Vec{x} -
    \delta\Vec{x}$, indicating that $f(\Vec{x})$ cannot be a local extremum. The
    argument is analogous when $\nabla f(\Vec{x}) \cdot \delta\Vec{x} \lt 0$. In
    summary, $\nabla f(\Vec{x})$ is locally perpendicular to the feasible
    surface wherever $f(\Vec{x})$ has a local extremum.
  </p>

  <p>
    This naturally raises a question: how do we mathematically ascertain what
    "perpendicular to the feasible surface" means? The key is in the constraints
    in equation \eqref{constraints}. For each function $g_k(\Vec{x})$, the
    condition $g_k(\Vec{x}) = 0$ defines a
    <a href="https://en.wikipedia.org/wiki/Level_set">level set</a> for
    $g_k(\Vec{x})$, that is, a surface (or collection of surfaces) where
    $g_k(\Vec{x})$ has a constant value. Given that this constant is zero in our
    case, we will call this level set the "zero level set" of $g_k(\Vec{x})$.
    Since $\nabla g_k(\Vec{x})$ points in the direction where $g_k(\Vec{x})$
    increases most rapidly, it must be locally perpendicular to the zero level
    set of $g_k(\Vec{x})$. This is because, for a point $\Vec{x}$ on the zero
    level set and an infinitesimal displacement vector $\delta\Vec{x}$ tangent
    to the level set surface containing $\Vec{x}$, the point $\Vec{x} +
    \delta\Vec{x}$ would still belong to the zero level set, hence:
  </p>

  <EquationBlock>
    g_k(\Vec{x} + \delta\Vec{x}) = g_k(\Vec{x}) + \nabla g_k(\Vec{x}) \cdot
    \delta\Vec{x} = 0
  </EquationBlock>

  <p>
    Therefore, $\nabla g_k(\Vec{x}) \cdot \delta\Vec{x} = 0$ since $g_k(\Vec{x})
    = 0$. This means that for every point $\Vec{x}$ on the zero level set of
    $g_k(\Vec{x})$, the gradient $\nabla g_k(\Vec{x})$ is locally perpendicular
    to the level surface set at $\Vec{x}$.
  </p>

  <p>
    Consequently, at any point $\Vec{x}$ lying on the zero level set of
    $g_k(\Vec{x})$, the gradient $\nabla g_k(\Vec{x})$ establishes an
    $(n-1)$-dimensional plane that is tangent to this level set at $\Vec{x}$. If
    we consider an infinitesimal displacement $\delta\Vec{x}$ that is parallel
    to this plane, the point $\Vec{x} + \delta\Vec{x}$ continues to be on the
    zero level set of $g_k(\Vec{x})$. Now, when $\Vec{x}$ is part of the
    feasible surface, it simultaneously exists on the zero level set of all the
    functions $g_k(\Vec{x})$, meaning there are $m$ planes, each passing through
    $\Vec{x}$ and perpendicular to the zero level sets of their respective
    $g_k(\Vec{x})$ for $k = 1, 2, \ldots, m$. The intersection of these $m$
    planes defines an $(n-m)$-dimensional surface that is tangent to the
    feasible surface at $\Vec{x}$. This is corroborated by observing that any
    infinitesimal displacement $\delta\Vec{x}$ from $\Vec{x}$ within the
    intersection of the $m$ planes keeps $\Vec{x} + \delta\Vec{x}$ on the zero
    level set of every function $g_k(\Vec{x})$. Therefore, $\Vec{x} +
    \delta\Vec{x}$ is situated on the feasible surface, meaning the
    $(n-m)$-dimensional surface defined by the intersection of the $m$ planes at
    $\Vec{x}$ is indeed tangent to the feasible surface.
  </p>

  <p>
    Let's now revisit the example where $n = 3$ and $m = 2$. For any point
    $(x,y,z)$ on the feasible surface, there will be two associated planes: one
    perpendicular to $\nabla g_1(x,y,z)$ and the other perpendicular to $\nabla
    g_2(x,y,z)$. The intersection of these planes forms a line that passes
    through $(x,y,z)$. Now, for infinitesimally small displacements around the
    point $(x,y,z)$ that lie on this line, we remain on both planes.
    Consequently, we are also on the zero level sets of both $g_1(x,y,z)$ and
    $g_2(x,y,z)$, implying we remain on the feasible surface. Thus, points on
    this intersecting line, within an infinitesimally small vicinity of
    $\Vec{x}$, are also part of the feasible surface.
  </p>

  <p>
    Considering the displacement vector $\delta\Vec{x}$ as discussed above, if
    $\Vec{x} + \delta\Vec{x}$ remains on each of the $m$ planes that pass
    through $\Vec{x}$ and are perpendicular to $\nabla g_k(\Vec{x})$ for $k = 1,
    2, \ldots, m$, then $\delta\Vec{x}$ is orthogonal to any linear combination
    of these gradient vectors. Thus, for any set of coefficients $(\lambda_1,
    \ldots, \lambda_m)$, the following holds:
  </p>

  <EquationBlock>
    \sum_{k=1}^m \lambda_k \nabla g_k(\Vec{x}) \cdot \delta\Vec{x} = 0
  </EquationBlock>

  <p>
    Let's again revisit the example where $n = 3$ and $m = 2$. The feasible
    surface is a one-dimensional curve. At each point $(x,y,z)$ on this curve,
    there are two distinct planes that pass through $(x,y,z)$ and are
    perpendicular to $\nabla g_1(x,y,z)$ and $\nabla g_2(x,y,z)$, respectively.
    Their intersection forms a line tangent to the feasible surface at
    $(x,y,z)$. An infinitesimal displacement vector $\delta\Vec{x}$ parallel to
    this line is also parallel to both planes and therefore simultaneously
    perpendicular to $\nabla g_1(x,y,z)$ and $\nabla g_2(x,y,z)$. This implies
    that $\delta\Vec{x}$ is orthogonal to $\lambda_1 \nabla g_1(x,y,z) +
    \lambda_2 \nabla g_2(x,y,z)$ for any values of $\lambda_1$ and $\lambda_2$.
  </p>

  <p>
    As demonstrated above, for a point $\Vec{x}$ on the feasible surface where
    $f(\Vec{x})$ achieves a local maximum or minimum, $\nabla f(\Vec{x})$ is
    perpendicular to any infinitesimal displacement vector $\delta\Vec{x}$
    tangent to the feasible surface at $\Vec{x}$. Given that the feasible
    surface has dimension $(n-m)$, and considering that the set of $m$ vectors
    $\nabla g_k(\Vec{x})$ spans an $m$-dimensional vector space (under the
    assumption that they are linearly independent, as we ignore pathological
    cases), we can express $\nabla f(\Vec{x})$ as a linear combination of any
    $(n-m)$ linearly independent vectors tangent to the feasible surface and the
    $m$ vectors $\nabla g_k(\Vec{x})$ which are perpendicular to it.
    Consequently, with $\nabla f(\Vec{x})$ being perpendicular to the feasible
    surface, it follows that:
  </p>

  <EquationBlock>
    \nabla f(\Vec{x}) = \sum_{k=1}^m \lambda_k \nabla g_k(\Vec{x})
    \label{nabla-f}
  </EquationBlock>

  <p>
    In other words, if we can identify all points $\Vec{x}$ for which both
    \eqref{constraints} and \eqref{nabla-f} are satisfied for any set of values
    $(\lambda_1, \ldots, \lambda_m)$, then all maxima and minima of $f(\Vec{x})$
    over the feasible surface must belong to this set of points. But those
    equations are precisely the ones obtained when using the Lagrange multiplier
    method! In fact, the Lagrange multiplier method instructs us to determine
    all stationary points of the following function (often referred to as the
    "Lagrangian" for the problem):
  </p>

  <EquationBlock>
    L(x_1, \ldots, x_n, \lambda_1, \ldots, \lambda_m) = f(x_1, \ldots, x_n) -
    \sum_{k=1}^m \lambda_k g_k(x_1, \ldots, x_n)
  </EquationBlock>

  <p>
    It's worth noting that this problem is unconstrained: our task is simply to
    identify the stationary points of $L$, i.e., to tackle a standard calculus
    problem. But at the stationary points of $L$, all its first-order partial
    derivatives become zero:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock align numberLines>
    \PP{L}{x_i} &= \PP{f}{x_i} - \sum_{k=1}^m \lambda_k \PP{g_k}{x_i} = 0
      \label{partial-L-1} \\
    \PP{L}{\lambda_k} &= g_k(x_1, \ldots, x_n) = 0 \label{partial-L-2}
  </EquationBlock>

  <p>
    for $i = 1, 2, \ldots, n$ and $k = 1, 2, \ldots, m$. Equation
    \eqref{partial-L-2} reveals that the stationary points $(x_1, \ldots, x_n,
    \lambda_1, \ldots, \lambda_m)$ of $L$ are those where $(x_1, \ldots, x_n)$
    meet all the constraints $g_k(x_1, \ldots, x_n) = 0$ for $k = 1, 2, \ldots,
    m$. Thus, these points lie within the feasible surface represented by
    equation \eqref{constraints}. Moreover, equation \eqref{partial-L-1} can be
    reformulated as:
  </p>

  <EquationBlock>
    \nabla f(\Vec{x}) - \sum_{k=1}^m \lambda_k \nabla g_k(\Vec{x}) = 0
    \Longrightarrow \nabla f(\Vec{x}) = \sum_{k=1}^m \lambda_k \nabla
    g_k(\Vec{x})
  </EquationBlock>

  <p>
    To recap, the Lagrange multiplier method identifies all points $(\Vec{x},
    \Vecg{\lambda})$, with $\Vecg{\lambda} = (\lambda_1, \ldots, \lambda_m)$,
    for which the constraints \eqref{constraints} are met and for which
    \eqref{nabla-f} is also valid. By examining the characteristics of each of
    these points, we can then determine which ones correspond to local maxima,
    minima, or simply saddle points. However, a detailed exploration of this
    task goes beyond the scope of this post and is left to the reader's
    discretion. It's worth noting that if our primary goal is identifying the
    global maximum/minimum of $f(\Vec{x})$ over the feasible surface, we simply
    need to compute $f(\Vec{x})$ for each point $\Vec{x}$ derived using the
    Lagrange multiplier method and retain only the one associated with the
    largest/smallest value of $f(\Vec{x})$.
  </p>

  <ReferenceListBlock>
    <ReferenceListBlockItem
      :authors="['Dan Klein']"
      title="Lagrange Multipliers without Permanent Scarring"
      url="http://www.eecs.berkeley.edu/~klein/papers/lagrange-multipliers.pdf"
    />
    <ReferenceListBlockItem
      :authors="['Tom M. Apostol']"
      title="Calculus - Volume II"
      url="https://openlibrary.org/books/OL7598503M/Calculus"
    />
  </ReferenceListBlock>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
