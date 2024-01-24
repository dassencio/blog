<template>
  <p>
    Suppose a certain company has a sales team responsible for selling two
    different products $P_1$ and $P_2$, with a sales quota encompassing both
    products together. If a seller overachieves their quota, commission
    accelerators apply to the volume of sales above the quota.
  </p>

  <p>
    In this company, commissions are determined based on overall sales quota
    attainment over a certain period, such as a year. The company realizes that
    while the sales team is performing well overall, most of the revenue is
    generated through sales of product $P_1$, with the performance of $P_2$
    sales being subpar. In an attempt to incentivize sellers to sell more of
    $P_2$, the company decides to introduce a new commission structure where
    commission earnings are paid out based on the sales performance of each
    product individually. The original commission formula is retained but now
    applied to the sales numbers of each product separately, with the total
    commission becoming the sum of the commissions earned for each product. The
    total sales quota, i.e., the sum of the sales quotas set for $P_1$ and
    $P_2$, remains the same as before.
  </p>

  <p>
    Should the sales team be worried that the new commission structure may cause
    them to lose money? After all, the new structure seems to require good sales
    performance on two products instead of just one. With $P_1$ historically
    performing far better than $P_2$, it raises the question of how realistic it
    is to expect the sales quota attainment for both products to be high enough
    so that the total commission earned is the same as before. What if a seller
    overachieves their quota for $P_1$ but underachieves it for $P_2$?
  </p>

  <p>
    This post will prove that the sellers should not be concerned. For any total
    sales volume achieved by a seller, it is impossible for the new commission
    structure to result in a lower commission than before, provided a few simple
    (and reasonable) assumptions about the original commission formula are met.
  </p>

  <p>
    Consider the initial commission structure first, for a certain seller. In
    what follows, we will denote their total sales quota by $q$, their total
    volume of sales by $s$, their on-target commission by $t$, and their
    commission earned by $c(q, s, t)$, i.e., the commission formula depends only
    on $q$, $s$, and $t$. The first assumption we make is that the commission
    earned is directly proportional to the on-target commission $t$:
  </p>

  <EquationBlock> c(q, s, t) = t f(q, s) </EquationBlock>

  <p>
    where $f(q, s)$ is a function that depends on $q$ and $s$ only. This is
    commonly the case since commission earnings are often determined based on
    the on-target commission, with a multiplying factor applied that reflects
    actual performance. This multiplying factor typically depends only on the
    quota attainment $r = s / q$ instead of individually on the sales quota $q$
    and the sales volume $s$. Therefore:
  </p>

  <EquationBlock label="commission-factor"> f(q, s) = h(s / q) </EquationBlock>

  <p>
    where $h(r)$ is a function that depends only on the quota attainment $r$.
    Equation $\eqref{commission-factor}$ can be used to express the fact that
    the commission earned by a seller ultimately depends only on their on-target
    commission and their quota attainment:
  </p>

  <EquationBlock label="commission-aggregated-step">
    c(q, s, t) = t h(r)
  </EquationBlock>

  <p>
    Note that at $100\%$ quota attainment, i.e., when $s = q$, we have $c(q, q,
    t) = t$ and therefore $h(1) = 1$.
  </p>

  <p>
    The second assumption we make, which is also common practice in sales, is
    that the on-target commission is defined as a fixed percentage of the total
    sales quota in the commission plan. Therefore:
  </p>

  <EquationBlock label="on-target-commission"> t = \alpha q </EquationBlock>

  <p>
    where $\alpha$ is a constant. Using $\eqref{on-target-commission}$ in
    $\eqref{commission-aggregated-step}$ yields:
  </p>

  <EquationBlock label="commission-aggregated">
    c(q, s, t) = \alpha q h(r)
  </EquationBlock>

  <p>
    We now proceed by making the following assumption about the accelerators
    applied in the commission structure: they must be
    <a href="https://en.wikipedia.org/wiki/Monotonic_function"
      >monotonically increasing</a
    >. In other words, for a certain quota attainment $r$, and letting $a(r)$ be
    the accelerator associated with $r$, $r_1 \le r_2 \implies a(r_1) \le
    a(r_2)$. Accelerators in this commission structure are therefore such that
    the higher the quota attainment, the higher the accelerators applied.
    Accelerators can eventually achieve a maximum value at a certain level of
    quota attainment but are never allowed to decrease. This is common in most
    commission structures in practice.
    <TableLink id="commission-structure" capitalized /> shows an example of a
    commission structure with monotonically increasing accelerators.
  </p>

  <TableBlock
    id="commission-structure"
    :columns="2"
    caption="An example of a commission structure with monotonically increasing
             accelerators. Note that the accelerator values never decrease,
             despite a maximum value of $2.0$ being reached starting at $140\%$
             quota attainment."
  >
    <b>Quota attainment $(\%)$</b>
    <b>Accelerator</b>

    <span>$0$ &mdash; $100$</span>
    <span>$1.0$</span>

    <span>$100$ &mdash; $110$</span>
    <span>$1.2$</span>

    <span>$110$ &mdash; $120$</span>
    <span>$1.4$</span>

    <span>$120$ &mdash; $130$</span>
    <span>$1.6$</span>

    <span>$130$ &mdash; $140$</span>
    <span>$1.8$</span>

    <span>$140$ &mdash; $\infty$</span>
    <span>$2.0$</span>
  </TableBlock>

  <p>
    The key fact to note here is that since $a(r)$ determines the rate at which
    the multiplying factor $h(r)$ increases with respect to the quota attainment
    $r$, $a(r)$ is the derivative of $h(r)$, i.e., $a(r) = h'(r)$. Because
    $a(r)$ is monotonically increasing, $h(r)$ is a convex function. This
    convexity property is precisely what will lead to the result that the new
    commission structure cannot cause a seller to lose money.
  </p>

  <p>
    Let us now examine the new commission structure. As mentioned before, this
    structure splits commissions on a per-product basis, while preserving the
    same commission formula. For each product $P_i$, denote its sales quota by
    $q_i$, sales volume by $s_i$, on-target commission by $t_i$, and commission
    earned by $c_i(q_i, s_i, t_i) = t_i h(r_i) = \alpha q_i h(r_i)$, where $r_i
    = s_i / q_i$ is the quota attainment for $P_i$. The new commission earned is
    thus:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock split label="commission-split">
    c_\textrm{split}(q_1, s_1, t_1, q_2, s_2, t_2)
      &= c(q_1, s_1, t_1) + c(q_2, s_2, t_2) \\
      &= \alpha q_1 h(r_1) + \alpha q_2 h(r_2)
  </EquationBlock>

  <p>
    Since the total sales quota remains the same, $q = q_1 + q_2$. This implies
    that at $100\%$ quota attainment for both products (i.e., $s_1 = q_1$ and
    $s_2 = q_2$), the total commission earned is the same as before:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock split>
    c_\textrm{split}(q_1, q_1, t_1, q_2, q_2, t_2)
      &= c(q_1, q_1, t_1) + c(q_2, q_2, t_2) \\
      &= \alpha q_1 h(1) + \alpha q_2 h(1) \\
      &= \alpha q_1 + \alpha q_2 \\
      &= \alpha q \\
      &= t
  </EquationBlock>

  <p>where \eqref{on-target-commission} was used in the last step.</p>

  <p>
    At this point, we have all the ingredients we need to define the goal in
    this post purely in mathematical terms. We want to show that, for a fixed
    total sales volume $s = s_1 + s_2$, the following holds:
  </p>

  <EquationBlock>
    \Delta{c} = c_\textrm{split}(q_1, s_1, t_1, q_2, s_2, t_2) - c(q, s, t) \geq
    0
  </EquationBlock>

  <p>
    for all possible values of $q_1$, $q_2$, $s_1$, $s_2$, $t_1$, and $t_2$.
    From equations \eqref{commission-aggregated} and \eqref{commission-split},
    we have:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock split>
    \Delta{c}
      &= \alpha q_1 h(r_1) + \alpha q_2 h(r_2) - \alpha q h(r) \\
      &= \alpha q_1 h(r_1) + \alpha q_2 h(r_2)
         - \alpha (q_1 + q_2) h\left(\frac{s_1 + s_2}{q_1 + q_2}\right) \\
      &= \alpha (q_1 + q_2) \left[
           \frac{q_1}{q_1 + q_2} h(r_1) + \frac{q_2}{q_1 + q_2} h(r_2)
           - h\left(\frac{s_1 + s_2}{q_1 + q_2}\right)
         \right]
  </EquationBlock>

  <p>Letting $\lambda = q_1 / (q_1 + q_2)$, we can rewrite the above as:</p>

  <EquationBlock>
    \Delta{c} = \alpha q \left[ \lambda h(r_1) + (1 - \lambda) h(r_2) -
    h\left(\frac{s_1 + s_2}{q_1 + q_2}\right) \right]
  </EquationBlock>

  <p>Since:</p>

  <EquationBlock>
    \frac{s_1 + s_2}{q_1 + q_2} = \frac{r_1 q_1 + r_2 q_2}{q_1 + q_2} = \lambda
    r_1 + (1 - \lambda) r_2
  </EquationBlock>

  <p>we then have:</p>

  <EquationBlock>
    \Delta{c} = \alpha q \left[ \lambda h(r_1) + (1 - \lambda) h(r_2) -
    h(\lambda r_1 + (1 - \lambda) r_2) \right]
  </EquationBlock>

  <p>
    Because $h(r)$ is convex, the following inequality holds for all $r_1$ and
    $r_2$, and for all $0 \leq \lambda \leq 1$:
  </p>

  <EquationBlock>
    \lambda h(r_1) + (1 - \lambda) h(r_2) - h(\lambda r_1 + (1 - \lambda) r_2)
    \geq 0
  </EquationBlock>

  <p>Finally, since $\alpha q = t \gt 0$, we have:</p>

  <EquationBlock> \Delta{c} \geq 0 </EquationBlock>

  <p>
    This proves that the new commission structure will always result in a seller
    earning at least as much commission as they would have under the original
    commission structure.
  </p>

  <p>
    A natural question to ask at this point is whether the same would be valid
    if we were to split the commission structure into more than two products.
    The answer is yes, and the proof is similar to the one above. The key
    insight is that we can break down the commission structure into a series of
    binary splits, and each of these splits will result in a non-negative
    increase in earnings in the same way as we have shown above. Additionally,
    the same result will hold even if the commission structure differs per
    product, provided that the commission formula for each product has an
    associated function $h_i(r) \geq h(r)$, i.e., that the multiplying factors
    for each product are at least as high as those under the initial commission
    structure.
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
