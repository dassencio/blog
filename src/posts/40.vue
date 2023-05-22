<template>
  <p>
    Let $r$ be a line passing through two distinct points $\Vec{P}$ and
    $\Vec{Q}$, as depicted in <FigureLink id="closest-point-line-point" />, and
    let $\Vec{X}$ be a point in space. Our goal is to determine the point
    $\Vec{S}$ on line $r$ that is closest to $\Vec{X}$.
  </p>

  <FigureBlock
    id="closest-point-line-point"
    caption="$\Vec{S}$ is the point on the line $r$ that is closest to
             $\Vec{X}$."
  >
    <ResponsiveImage
      alt="Closest point on line to point"
      :src="closestPointLinePoint"
    />
  </FigureBlock>

  <p>We can parameterize $r$ as follows:</p>

  <EquationBlock>
    r \ColonEq \left\{ \Vec{R}(\lambda) = \Vec{P} + \lambda (\Vec{Q} - \Vec{P}),
    \; \forall \lambda \in \Real \right\} \label{line-parameterization}
  </EquationBlock>

  <p>
    The point $\Vec{S}$ on $r$ that is closest to $\Vec{X}$ satisfies the
    following condition:
  </p>

  <EquationBlock>
    d(\Vec{X}, \Vec{S}) = \min_{\lambda \in \Real} d(\Vec{X}, \Vec{R}(\lambda))
  </EquationBlock>

  <p>
    where $d(\cdot, \cdot)$ denotes the
    <a href="https://en.wikipedia.org/wiki/Euclidean_distance"
      >Euclidean distance</a
    >
    function. The value of $\lambda$ that minimizes $d(\Vec{X},
    \Vec{R}(\lambda))$, represented as $\lambda_\Vec{S}$, must satisfy:
  </p>

  <EquationBlock>
    \left. \DDo{\lambda} d(\Vec{X}, \Vec{R}(\lambda)) \right|_{\lambda =
    \lambda_\Vec{S}} = 0
  </EquationBlock>

  <p>
    Using the definition of the Euclidean distance $d(\cdot, \cdot)$ in the
    equation above yields:
  </p>

  <EquationBlock>
    \left. \DDo{\lambda}\sqrt{(\Vec{R}(\lambda) - \Vec{X})^2} \right|_{\lambda =
    \lambda_\Vec{S}} = \frac{2 (\Vec{R}(\lambda_\Vec{S}) -
    \Vec{X})\cdot\Vec{R}'(\lambda_\Vec{S})}{2\sqrt{(\Vec{R}(\lambda_\Vec{S}) -
    \Vec{X})^2}} = 0
  </EquationBlock>

  <p>
    where it was assumed that $\Vec{X}$ does not fall on the line $r$ (otherwise
    the denominator would vanish; however, the result derived at the end will
    remain valid even if $\Vec{X}$ falls on $r$). From equation
    \eqref{line-parameterization}, we have that:
  </p>

  <EquationBlock> \Vec{R}'(\lambda) = \Vec{Q} - \Vec{P} </EquationBlock>

  <p>which leads us to:</p>

  <EquationBlock>
    \left. \DDo{\lambda} d(\Vec{X}, \Vec{R}(\lambda)) \right|_{\lambda =
    \lambda_\Vec{S}} = \frac{(\Vec{R}(\lambda_\Vec{S}) - \Vec{X}) \cdot (\Vec{Q}
    - \Vec{P})}{d(\Vec{X}, \Vec{R}(\lambda_\Vec{S}))} = 0
    \label{lambda-closest-point-equation}
  </EquationBlock>

  <p>
    Thus, by plugging in $\lambda = \lambda_\Vec{S}$ from equation
    \eqref{line-parameterization} into equation
    \eqref{lambda-closest-point-equation}, we obtain:
  </p>

  <EquationBlock>
    (\Vec{P} + \lambda_\Vec{S} (\Vec{Q} - \Vec{P}) - \Vec{X}) \cdot (\Vec{Q} -
    \Vec{P}) = 0
  </EquationBlock>

  <p>This implies:</p>

  <EquationBlock boxed>
    \lambda_\Vec{S} = \frac{(\Vec{X} - \Vec{P}) \cdot (\Vec{Q} -
    \Vec{P})}{(\Vec{Q} - \Vec{P}) \cdot (\Vec{Q} - \Vec{P})}
    \label{lambda-closest-point}
  </EquationBlock>

  <p>We can now directly obtain the point $\Vec{S}$ on the line $r$:</p>

  <EquationBlock boxed>
    \Vec{S} = \Vec{P} + \lambda_\Vec{S} (\Vec{Q} - \Vec{P})
  </EquationBlock>

  <p>
    The case in which $\Vec{X}$ lies on $r$ yields the same result. To
    demonstrate this, note that in this situation, we have $\Vec{S} = \Vec{X}$
    and hence $d(\Vec{S}, \Vec{X}) = 0$. Therefore:
  </p>

  <EquationBlock>
    \Vec{X} = \Vec{P} + \lambda_{S} (\Vec{Q} - \Vec{P}) \Longrightarrow \Vec{X}
    - \Vec{P} = \lambda_{S} (\Vec{Q} - \Vec{P})
  </EquationBlock>

  <p>
    If we take the dot product of both sides of this equation with $(\Vec{Q} -
    \Vec{P})$, we arrive once more at equation \eqref{lambda-closest-point}.
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";
import closestPointLinePoint from "@/assets/images/closest-point-line-point.svg";

onMounted(() => onViewMounted());
</script>
