<template>
  <p>
    In a <RouterLink :to="{ name: '40' }">previous post</RouterLink>, I
    described how to compute the point $\Vec{S}$ on a line $r$ that is closest
    to a given point $\Vec{X}$. I assumed the line $r$ passed through two
    distinct points $\Vec{P}$ and $\Vec{Q}$ (see
    <FigureLink id="closest-point-line-point" />). In this post, I will apply
    that technique to determine the closest point on a segment $\Vec{PQ}$ to a
    point $\Vec{X}$.
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

  <p>
    Before we examine the segment case, let's revisit the problem involving a
    line. For a line, the coordinates of $\Vec{S}$ can be computed using the
    following equation:
  </p>

  <EquationBlock>
    \Vec{S} = \Vec{P} + \lambda_\Vec{S} (\Vec{Q} - \Vec{P})
    \label{closest-point-line}
  </EquationBlock>

  <p>where:</p>

  <EquationBlock>
    \lambda_\Vec{S} = \frac{(\Vec{X} - \Vec{P}) \cdot (\Vec{Q} -
    \Vec{P})}{(\Vec{Q} - \Vec{P}) \cdot (\Vec{Q} - \Vec{P})}
    \label{lambda-closest-point-line}
  </EquationBlock>

  <p>
    To solve the problem with a segment instead of a line, we need to consider
    three cases: $\lambda_\Vec{S} \leq 0$, $0 \lt \lambda_\Vec{S} \lt 1$, and
    $\lambda_\Vec{S} \geq 1$. To understand why, first note that equation
    \eqref{closest-point-line} can be rewritten as follows:
  </p>

  <EquationBlock>
    \Vec{S} = \Vec{P} + \lambda_\Vec{S} (\Vec{Q} - \Vec{P}) = \Vec{P} +
    \lambda_\Vec{S} \Vec{v}
  </EquationBlock>

  <p>
    where $\Vec{v} = \Vec{Q} - \Vec{P}$ is the vector that connects $\Vec{P}$ to
    $\Vec{Q}$, as shown in <FigureLink id="closest-point-line-point" />.
    Therefore, since $\Vec{S}$ is equal to the sum of $\Vec{P}$ and
    $\lambda_\Vec{S} \Vec{v}$, it will lie between $\Vec{P}$ and $\Vec{Q}$ if $0
    \lt \lambda_\Vec{S} \lt 1$. If $\lambda_\Vec{S} \geq 1$, $\Vec{S}$ will lie
    either directly at or "after" $\Vec{Q}$ (note that when $\lambda_\Vec{S} =
    1$, $\Vec{S} = \Vec{P} + (\Vec{Q} - \Vec{P}) = \Vec{Q}$). When
    $\lambda_\Vec{S} \leq 0$, $\Vec{S}$ will lie either "before" or directly at
    $\Vec{P}$ since $\lambda_\Vec{S}\Vec{v}$ will point away from $\Vec{Q}$ or
    be the zero vector (if $\lambda_\Vec{S} = 0$).
  </p>

  <p>
    Since our goal is to determine the point $\Vec{S}$ on the segment $\Vec{PQ}$
    that is closest to $\Vec{X}$, we must ensure that $\Vec{S}$ does not lie
    outside of $\Vec{PQ}$. This implies that if $\Vec{S}$ would lie "before"
    $\Vec{P}$ on line $r$, then the closest point to $\Vec{X}$ on $\Vec{PQ}$ is
    $\Vec{P}$. Similarly, if $\Vec{S}$ would lie "after" $\Vec{Q}$, then the
    closest point to $\Vec{X}$ on $\Vec{PQ}$ is $\Vec{Q}$.
    <FigureLink id="closest-point-line-segment" capitalized /> illustrates these
    cases.
  </p>

  <FigureBlock
    id="closest-point-line-segment"
    caption="$\Vec{S}$ is the point on the segment $\Vec{PQ}$ that is closest to
             $\Vec{X}$. The figure displays the three possible cases of
             interest. From left to right, the corresponding $\lambda_\Vec{S}$
             values satisfy $0 \lt \lambda_\Vec{S} \lt 1$,
             $\lambda_\Vec{S} \leq 0$, and $\lambda_\Vec{S} \geq 1$."
  >
    <ResponsiveImage
      alt="Closest point on segment to point"
      :src="closestPointSegmentPoint"
    />
  </FigureBlock>

  <p>
    In summary, here is an algorithm for determining the point $\Vec{S}$ on a
    segment $\Vec{PQ}$ that is closest to a point $\Vec{X}$ (this method also
    applies if $\Vec{X}$ lies on $\Vec{PQ}$):
  </p>

  <ListBlock>
    <ListBlockItem bullet="1.">
      Compute $\lambda_\Vec{S}$ using equation
      \eqref{lambda-closest-point-line}.
    </ListBlockItem>
    <ListBlockItem bullet="2.">
      If $\lambda_\Vec{S} \leq 0$, then $\Vec{S} = \Vec{P}$.
    </ListBlockItem>
    <ListBlockItem bullet="3.">
      If $\lambda_\Vec{S} \geq 1$, then $\Vec{S} = \Vec{Q}$.
    </ListBlockItem>
    <ListBlockItem bullet="4.">
      If $0 \lt \lambda_\Vec{S} \lt 1$, then $\Vec{S} = \Vec{P} +
      \lambda_\Vec{S}(\Vec{Q} - \Vec{P})$.
    </ListBlockItem>
  </ListBlock>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";
import closestPointLinePoint from "@/assets/images/closest-point-line-point-2.svg";
import closestPointSegmentPoint from "@/assets/images/closest-point-segment-point.svg";

onMounted(() => onViewMounted());
</script>
