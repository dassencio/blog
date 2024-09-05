<template>
  <p>
    <i>
      A band of $N$ pirates has stolen a bag containing $C$ gold coins and must
      now divide the loot among themselves. The pirates are ranked by seniority,
      with the captain being the most senior pirate. The captain proposes how
      the coins should be divided. All the pirates, including the captain, then
      vote on whether to accept his proposal. If it is accepted by at least half
      of the pirates, it is carried out. If the proposal is rejected, the
      captain is thrown overboard to the sharks, and the next most senior pirate
      becomes the new captain. This new captain is tasked with making a new
      proposal on how to divide the coins, risking the same fate as their
      predecessor if the proposal is rejected. This process continues until a
      proposal is accepted. When deciding how to proceed, the pirates'
      preferences are ordered in the following way:
    </i>
  </p>

  <ListBlock ordered>
    <ListBlockItem><i>Each pirate wants to survive.</i></ListBlockItem>
    <ListBlockItem>
      <i>
        Given survival, each pirate wants to maximize the number of gold coins
        he receives.
      </i>
    </ListBlockItem>
    <ListBlockItem>
      <i>
        If a pirate would get the same number of coins by either throwing the
        captain overboard or not, he would vote for throwing the captain
        overboard out of spite.
      </i>
    </ListBlockItem>
  </ListBlock>

  <p>
    <i>
      Assume that these pirates are highly intelligent, treacherous, and
      selfish. They are also extremely patient, so each pirate will wait through
      any number of proposals and rejections until he arrives at a proposal that
      he accepts. What is the maximum number of coins that the captain can keep
      for himself?
    </i>
  </p>

  <p>
    The above is a generalization of the
    <a href="https://en.wikipedia.org/wiki/Pirate_game">pirate game</a> for an
    arbitrary number of pirates. Like the original problem, it can be solved
    using
    <a href="https://en.wikipedia.org/wiki/Backward_induction"
      >backward induction</a
    >. We start by numbering the pirates from $1$ to $N$, with the initial
    captain labeled as $P_1$ and the most junior pirate as $P_N$. Assume now
    that $P_k$ is the current captain, i.e., that all pirates $P_i$ with $i \lt
    k$ have been thrown overboard. In what follows, we will denote the proposal
    made by $P_k$ as $\Vecg{\mu}^\SupPar{k} = (\mu^\SupPar{k}_k,
    \mu^\SupPar{k}_{k + 1}, \ldots, \mu^\SupPar{k}_N)$, with $\mu^\SupPar{k}_i$
    representing the number of coins that $P_i$ will receive for $k \le i \le
    N$. Note that $\sum_{i = k}^N \mu^\SupPar{k}_i = C$, and that
    $\Vecg{\mu}^\SupPar{k}$ has $N - k + 1$ elements, one for each remaining
    pirate.
  </p>

  <p>
    When $P_1$ makes their proposal $\Vecg{\mu}^\SupPar{1}$, there are two
    possible outcomes: either the proposal is accepted, or it is rejected. If it
    is accepted, each pirate $P_i$ will receive their assigned number of coins
    $\mu^\SupPar{1}_i$. If the proposal is rejected, $P_1$ will be thrown
    overboard, and $P_2$ will become the new captain and have to make a new
    proposal $\Vecg{\mu}^\SupPar{2}$. This process continues until a proposal is
    accepted.
  </p>

  <p>
    This is where backward induction comes into play. Assume that all proposals
    are rejected until only two pirates remain: $P_{N - 1}$ and $P_N$. Since
    $P_{N - 1}$ is allowed to vote on any proposal he makes, he has full control
    over the coin division since his vote alone already comprises half of the
    total number of votes. Being selfish, $P_{N - 1}$ will take all the coins
    for himself, leaving $P_N$ with none &mdash; an outcome that $P_N$ will have
    no choice but to accept. Therefore:
  </p>

  <EquationBlock>
    \Vecg{\mu}^\SupPar{N - 1} = (\mu^\SupPar{N - 1}_{N - 1}, \mu^\SupPar{N -
    1}_N) = (C, 0)
  </EquationBlock>

  <p>
    Consider now what happens when $P_{N - 2}$ is the captain, with all pirates
    $P_i$ such that $i \lt N - 2$ having been thrown overboard, leaving $P_{N -
    2}$, $P_{N - 1}$, and $P_N$ as the only remaining ones. $P_N$ knows that if
    both he and $P_{N - 1}$ reject the proposal, $P_{N - 2}$ will be thrown
    overboard and $P_{N - 1}$ will become the captain, leading to the coin
    division $\Vecg{\mu}^\SupPar{N - 1}$ in which $P_N$ will get no coins since
    $\mu^\SupPar{N - 1}_N = 0$. Therefore, as long as $P_N$ is offered more than
    zero coins, he will accept the proposal, and it will pass because he and
    $P_{N - 2}$ form a majority. If $P_N$ is offered exactly zero coins, he will
    reject the proposal out of spite, and $P_{N - 2}$ will be thrown overboard.
    This means $P_{N - 2}$ can safely propose giving a single coin to $P_N$ and
    keeping the rest for himself, with $P_{N - 1}$ receiving no coins.
    Therefore:
  </p>

  <EquationBlock>
    \Vecg{\mu}^\SupPar{N - 2} = (\mu^\SupPar{N - 2}_{N - 2}, \mu^\SupPar{N -
    2}_{N - 1}, \mu^\SupPar{N - 2}_N) = (C - 1, 0, 1)
  </EquationBlock>

  <p>
    What happens then when $P_{N - 3}$ is the captain? $P_{N - 3}$ knows that he
    needs only a single additional vote (beyond his own) to pass his proposal,
    and since $P_{N - 1}$ will get zero coins if the proposal is rejected, $P_{N
    - 1}$ will vote for any proposal that gives him at least one coin. This
    means $P_{N - 3}$ can safely propose giving a single coin to $P_{N - 1}$ and
    keeping the rest for himself, with $P_{N - 2}$ and $P_N$ receiving no coins.
    Therefore:
  </p>

  <EquationBlock>
    \Vecg{\mu}^\SupPar{N - 3} = (\mu^\SupPar{N - 3}_{N - 3}, \mu^\SupPar{N -
    3}_{N - 2}, \mu^\SupPar{N - 3}_{N - 1}, \mu^\SupPar{N - 3}_N) = (C - 1, 0,
    1, 0)
  </EquationBlock>

  <p>
    Let us now consider the case where $P_{N - 4}$ is the captain. There are a
    total of five remaining pirates $P_i$ with $N - 4 \le i \le N$. As long as
    two other pirates vote for $P_{N - 4}$'s proposal, it will be accepted.
    Since $P_{N - 2}$ and $P_N$ know that they will get zero coins if the
    proposal is rejected ($\mu^\SupPar{N - 3}_{N - 2} = \mu^\SupPar{N - 3}_N =
    0$), they will vote for any proposal that gives them at least one coin, so
    the following proposal will be accepted:
  </p>

  <EquationBlock>
    \Vecg{\mu}^\SupPar{N - 4} = (\mu^\SupPar{N - 4}_{N - 4}, \mu^\SupPar{N -
    4}_{N - 3}, \mu^\SupPar{N - 4}_{N - 2}, \mu^\SupPar{N - 4}_{N - 1},
    \mu^\SupPar{N - 4}_N) = (C - 2, 0, 1, 0, 1)
  </EquationBlock>

  <p>
    <TableLink id="proposals" capitalized /> summarizes all the results obtained
    so far:
  </p>

  <TableBlock
    id="proposals"
    :columns="6"
    caption="Proposed coin divisions for captains $P_k$, with
             $N - 4 \le k \le N - 1$."
  >
    <b>Captain $(P_k)$</b>
    <span>$\mu^\SupPar{k}_{N - 4}$</span>
    <span>$\mu^\SupPar{k}_{N - 3}$</span>
    <span>$\mu^\SupPar{k}_{N - 2}$</span>
    <span>$\mu^\SupPar{k}_{N - 1}$</span>
    <span>$\mu^\SupPar{k}_{N}$</span>

    <span>$P_{N - 1}$</span>
    <span>&mdash;</span>
    <span>&mdash;</span>
    <span>&mdash;</span>
    <span>$C$</span>
    <span>$0$</span>

    <span>$P_{N - 2}$</span>
    <span>&mdash;</span>
    <span>&mdash;</span>
    <span>$C - 1$</span>
    <span>$0$</span>
    <span>$1$</span>

    <span>$P_{N - 3}$</span>
    <span>&mdash;</span>
    <span>$C - 1$</span>
    <span>$0$</span>
    <span>$1$</span>
    <span>$0$</span>

    <span>$P_{N - 4}$</span>
    <span>$C - 2$</span>
    <span>$0$</span>
    <span>$1$</span>
    <span>$0$</span>
    <span>$1$</span>
  </TableBlock>

  <p>
    By now, you may have noticed a pattern: when $P_k$ is the captain, he can
    safely propose giving zero coins to $P_{k + 1}$, one coin to $P_{k + 2}$,
    zero coins to $P_{k + 3}$, and so on. In other words, $\mu^\SupPar{k}_{k +
    1} = \mu^\SupPar{k}_{k + 3} = \ldots = 0$ and $\mu^\SupPar{k}_{k + 2} =
    \mu^\SupPar{k}_{k + 4} = \ldots = 1$. By doing that, $P_k$ wins the votes of
    $P_{k + 2}$, $P_{k + 4}$, $P_{k + 6}$, and so on, because these pirates know
    that if proposal $\Vecg{\mu}^\SupPar{k}$ is rejected, $P_{k + 1}$ will
    become the next captain, and his proposal $\Vecg{\mu}^\SupPar{k + 1}$ will
    be such that they will all get zero coins. Therefore, they will vote for the
    proposal $\Vecg{\mu}^\SupPar{k}$ from $P_k$, since it grants them at least
    one coin each. Combined with $P_k$'s own vote, proposal
    $\Vecg{\mu}^\SupPar{k}$ always gathers enough votes to be accepted, either
    with a tie or with an absolute majority.
  </p>

  <p>
    When $N - k$ is even, $P_k$ ends up with $C - (N - k) / 2$ coins since he
    needs to give one coin to at least half of the other $N - k$ pirates to get
    his proposal accepted through a majority vote. When $N - k$ is odd, $P_k$
    ends up with $C - (N - k - 1) / 2$ coins since he only needs $(N - k - 1) /
    2$ votes from the other $N - k$ pirates to get his proposal accepted through
    a tie. We can obtain a single expression that works for both cases by noting
    that when $N - k$ is odd, the following is true:
  </p>

  <EquationBlock> (N - k - 1) / 2 = \Floor{(N - k) / 2} </EquationBlock>

  <p>
    where $\Floor{x}$ represents the greatest integer less than or equal to a
    real number $x$. When $N - k$ is even, we trivially have:
  </p>

  <EquationBlock> (N - k) / 2 = \Floor{(N - k) / 2} </EquationBlock>

  <p>Therefore:</p>

  <EquationBlock label="C-k">
    \Vecg{\mu}^\SupPar{k} = (\mu^\SupPar{k}_k, \mu^\SupPar{k}_{k + 1}, \ldots,
    \mu^\SupPar{k}_N) = (C - \Floor{(N - k) / 2}, 0, 1, 0, 1, \ldots)
  </EquationBlock>

  <p>
    Equation \eqref{C-k} gives us the number of coins that the original captain
    $P_1$ can keep for himself:
  </p>

  <EquationBlock label="C-1-1" boxed>
    \mu^\SupPar{1}_1 = C - \Floor{(N - 1) / 2}
  </EquationBlock>

  <p>
    Equation \eqref{C-1-1} is a very counterintuitive result, especially when
    $C$ is much larger than $N$. As an example, taking $C = 1000$ and $N = 10$,
    we obtain $\mu^\SupPar{1}_1 = 1000 - \Floor{9 / 2} = 996$, i.e., the captain
    can keep $996$ coins for himself!
  </p>

  <p>
    Above, we implicitly assumed that the number of coins $C$ was sufficiently
    large to allow the original captain to make a proposal that would be
    accepted, i.e., that $C \ge \Floor{(N - 1) / 2}$ and therefore
    $\mu^\SupPar{1}_1 \ge 0$. In the special case where $C = \Floor{(N - 1) /
    2}$, we have $\mu^\SupPar{1}_1 = 0$, meaning the captain has no choice but
    to give all the coins to the other pirates in order to save his life. When
    $C \lt \Floor{(N - 1) / 2}$, the captain will find himself in trouble
    because at least one pirate $P_i$ whose vote he needs to pass his proposal
    will end up without any coins, even if the captain proposes giving all the
    coins away. That is because from $P_i$'s perspective, voting to throw the
    captain overboard will either lead to a division of the coins that gives him
    zero coins or to a division that gives him at least one coin. In the first
    scenario, $P_i$ will vote to throw the captain overboard out of spite, and
    in the second scenario, he will vote to throw the captain overboard to get
    at least one coin. In both cases, the captain's proposal will fail, and the
    next most senior pirate will become the new captain. This will continue
    happening until we reach the case where a captain $P_k$ is able to give all
    the coins to the other pirates while keeping none for himself in order to
    save his life, i.e., when $C = \Floor{(N - k) / 2}$.
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());
</script>
