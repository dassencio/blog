<template>
  <p>
    <i>
      A group of $N$ fugitives is running away from the police. They reach a
      very narrow bridge. Since it's dark and they have only one flashlight,
      they must cross the bridge in pairs. The $i^{th}$ fugitive needs $T_i$
      minutes to cross the bridge. When a pair of fugitives crosses the bridge,
      they must go at the speed of the slowest fugitive. In other words, the
      crossing time for the pair of fugitives $(i, j)$ is $\max\{T_i, T_j\}$.
    </i>
  </p>

  <p>
    <i>
      After a pair of fugitives crosses the bridge, one of the fugitives who has
      already crossed must return with the flashlight so that a new pair of
      fugitives can cross (this new pair can include the fugitive who just
      brought back the flashlight). This process is repeated until everyone has
      crossed the bridge.
    </i>
  </p>

  <p>
    <i>
      If the police are $T_P$ minutes behind the fugitives, and assuming they
      can no longer safely escape unless all of them have crossed the bridge by
      the time the police get to it, can they make it? If yes, how?
    </i>
  </p>

  <p>
    I was asked this question during a job interview and found it very
    interesting, so I decided to write a
    <a href="https://en.wikipedia.org/wiki/Brute-force_search"
      >brute-force solver</a
    >
    for this problem and discuss it here.
  </p>

  <NoteBlock>
    Readers who only want to experiment with the brute-force solver should
    proceed directly to the bottom of this post. If you're interested in the
    discussion of the problem, please continue reading!
  </NoteBlock>

  <p>
    Let's start by considering the simplest possible scenarios. The case when $N
    = 1$ is technically excluded, as the statement of the problem requires that
    a pair of fugitives exist for the initial bridge crossing. However, even
    without that requirement, this scenario is trivial because it's evident that
    the lone fugitive would manage to escape only if $T_1 \leq T_P$. When $N =
    2$, the two fugitives will succeed in escaping as long as $\max\{T_1, T_2\}
    \le T_P$. This means if the slower fugitive takes longer than $T_P$ to cross
    the bridge, the police will arrive before they can safely escape. In light
    of this, we will assume $N \ge 2$ for the rest of the discussion.
  </p>

  <p>
    Now, let's compute the number of steps $S_N$ that must occur until all $N$
    fugitives have crossed the bridge. A step can be either a pair of fugitives
    crossing the bridge or one fugitive returning. We will prove that:
  </p>

  <EquationBlock> S_N = 2N - 3 </EquationBlock>

  <p>
    We can begin by observing that for $N = 2$, there is only one step (both
    fugitives cross the bridge), so the equation above holds since $S_2 = 1$.
    Now, let's assume that the equation is valid for $N - 1$ fugitives and
    consider the case where we have $N$ fugitives. After the first two cross and
    one returns with the flashlight (in other words, after two steps), we have
    $N - 1$ fugitives left to cross the bridge. From that point onward, there
    are $S_{N - 1}$ steps remaining until all the fugitives have crossed. Hence:
  </p>

  <EquationBlock>
    S_N = S_{N - 1} + 2 = \left[2(N - 1) - 3\right] + 2 = 2N - 3
  </EquationBlock>

  <p>as we wanted to prove.</p>

  <p>
    Finally, let's compute the total number of ways the fugitives can cross the
    bridge, without considering the possibility of being caught by the police
    during the process. First, observe that if $N$ fugitives have not yet
    crossed the bridge, the number of possible pairs for crossing it is:
  </p>

  <EquationBlock> \binom{N}{2} = \frac{N (N - 1)}{2} </EquationBlock>

  <p>
    When a fugitive must return with the flashlight, and if $M$ fugitives have
    already crossed the bridge, the number of possible choices is simply $M$.
    Therefore, we will have the scheme as shown in
    <TableLink id="num-possibilities" />.
  </p>

  <TableBlock
    id="num-possibilities"
    :columns="3"
    caption='Number of possibilities at each step. $N \gt 2$ is implicitly
             assumed for illustration purposes. Green values indicate which
             group has the flashlight at each step. "Crossed" refers to the
             number of fugitives that have already crossed the bridge, while
             "must cross" refers to the number of fugitives that still need to
             cross.'
  >
    <b>Crossed</b>
    <b>Must cross</b>
    <b>Possibilities</b>

    <span>$0$</span>
    <span class="highlight">$N$</span>
    <span>$N (N - 1) / 2$</span>

    <span class="highlight">$2$</span>
    <span>$N - 2$</span>
    <span>$2$</span>

    <span>$1$</span>
    <span class="highlight">$N - 1$</span>
    <span>$(N - 1)(N - 2) / 2$</span>

    <span>$\vdots$</span>
    <span>$\vdots$</span>
    <span>$\vdots$</span>

    <span class="highlight">$N - 2$</span>
    <span>$2$</span>
    <span>$N - 2$</span>

    <span>$N - 3$</span>
    <span class="highlight">$3$</span>
    <span>$3 \cdot 2 / 2 = 3$</span>

    <span class="highlight">$N - 1$</span>
    <span>$1$</span>
    <span>$N - 1$</span>

    <span>$N - 2$</span>
    <span class="highlight">$2$</span>
    <span>$2 \cdot 1 / 2 = 1$</span>

    <span class="highlight">$N$</span>
    <span>$0$</span>
    <span>$0$</span>
  </TableBlock>

  <p>
    The total number $P_N$ of ways the fugitives can cross the bridge is given
    by:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock align>
    P_N &= \frac{N(N - 1)}{2} \cdot 2 \cdot \frac{(N - 1)(N - 2)}{2}
           \ldots (N - 2) \frac{3 \cdot 2}{2} (N - 1) \frac{2 \cdot 1}{2} \\
        &= \left[2 \ldots (N - 2)(N - 1)\right] \left[\frac{N(N - 1)}{2}
           \frac{(N - 1)(N - 2)}{2} \ldots \frac{3 \cdot 2}{2}
           \frac{2 \cdot 1}{2}\right] \\
        &= (N - 1)! \frac{N(N - 1)^2 (N - 2)^2 \ldots 3^2 \cdot 2^2 \cdot 1}{2^{N - 1}} \\
        &= (N - 1)! \frac{N^2 (N - 1)^2 (N - 2)^2 \ldots 3^2 \cdot 2^2}{2^{N - 1}N} \\
        &= \frac{(N - 1)!}{2^{N - 1}N} (N!)^2
  </EquationBlock>

  <p>and therefore:</p>

  <EquationBlock label="num-possibilities">
    P_N = \frac{N!^3}{2^{N - 1} N^2}
  </EquationBlock>

  <p>
    As shown in <TableLink id="PN-values" />, the computational workload
    required to simulate all possibilities escalates rapidly as $N$ increases.
    This is expected from equation \eqref{num-possibilities}, since $N!$ grows
    significantly faster than both $2^{N - 1}$ and $N$. This places practical
    constraints on the maximum number of fugitives that can be managed when
    attempting to solve the problem using brute force. However, these
    limitations can be partly mitigated by disregarding bridge crossings that
    would surpass the police's arrival time, thus eliminating entire subtrees of
    possibilities that would not lead to a solution. Additionally, the total
    number of possibilities considered is further reduced by not differentiating
    between fugitives that require the same amount of time to cross the bridge.
  </p>

  <TableBlock
    id="PN-values"
    :columns="2"
    caption="Values of $P_N$ for some values of $N$."
  >
    <div>$N$</div>
    <div>$P_N$</div>

    <div>$2$</div>
    <div>$1$</div>

    <div>$3$</div>
    <div>$6$</div>

    <div>$4$</div>
    <div>$108$</div>

    <div>$5$</div>
    <div>$4320$</div>

    <div>$6$</div>
    <div>$324000$</div>

    <div>$7$</div>
    <div>$40824000$</div>

    <div>$8$</div>
    <div>$8001504000$</div>
  </TableBlock>

  <p>
    It's time to play with the brute-force solver now! In the text fields below,
    enter the time needed by each fugitive to cross the bridge and the time the
    police will take to reach it. The values already entered are the ones I was
    given in my job interview.
  </p>

  <ResponsiveForm class="solver">
    <InputField label="Fugitive times:" v-model.trim="fugitiveTimes" />
    <InputField label="Police time:" v-model.trim="policeTime" />
    <div class="solver__controls">
      <BaseCheckbox v-model="findAllSolutions">Find all solutions</BaseCheckbox>
      <BaseButton @click="solve">Solve</BaseButton>
    </div>
  </ResponsiveForm>
  <CodeBlock class="solver__output" :code="solverOutput" />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import _ from "lodash";
import "lodash.combinations";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());

const findAllSolutions = ref(false);
const fugitiveTimes = ref("1, 2, 5, 10");
const policeTime = ref("17");
const solverOutput = ref(`Click "Solve" to search for solutions.`);

enum Side {
  Police = 0,
  Safe = 1,
}

interface Move {
  fromSide: Side;
  fugitives: number[];
}

interface Solution {
  readonly moves: Move[];
  readonly timeTaken: number;
}

class SimulationState {
  private moves: Move[];
  private nextFromSide: Side;
  private policeSide: number[];
  private policeTime: number;
  private safeSide: number[];
  private timeTaken: number;

  constructor(policeSide: number[], policeTime: number) {
    this.moves = [];
    this.nextFromSide = Side.Police;
    this.policeSide = [...policeSide];
    this.policeTime = policeTime;
    this.safeSide = [];
    this.timeTaken = 0;
  }

  finished() {
    return this.policeSide.length === 0;
  }

  private moveSource(fromSide: Side) {
    return fromSide === Side.Police ? this.policeSide : this.safeSide;
  }

  private moveDestination(fromSide: Side) {
    return fromSide === Side.Police ? this.safeSide : this.policeSide;
  }

  private oppositeSide(side: Side) {
    return side === Side.Police ? Side.Safe : Side.Police;
  }

  private isValidMove(fugitives: number[]) {
    if (fugitives.length !== (this.nextFromSide === Side.Police ? 2 : 1)) {
      return false;
    }
    const source = [...this.moveSource(this.nextFromSide)];
    const sourceLengthAfterMove = source.length - fugitives.length;
    fugitives.forEach((fugitive) => _.pullAt(source, source.indexOf(fugitive)));
    return (
      this.timeTaken + Math.max(...fugitives) <= this.policeTime &&
      source.length === sourceLengthAfterMove
    );
  }

  possibleNextMoves() {
    const moves =
      this.nextFromSide === Side.Police
        ? _.combinations(this.policeSide, 2)
        : _.combinations(this.safeSide, 1);
    return moves.filter((fugitives) => this.isValidMove(fugitives));
  }

  moveFugitives(fugitives: number[]) {
    const fromSide = this.nextFromSide;
    const source = this.moveSource(fromSide);
    const destination = this.moveDestination(fromSide);

    // Move fugitives from source side to destination side.
    fugitives.forEach((fugitive) => _.pullAt(source, source.indexOf(fugitive)));
    destination.push(...fugitives);

    this.moves.push({
      fromSide,
      fugitives: [...fugitives].sort(),
    });
    this.nextFromSide = this.oppositeSide(fromSide);
    this.timeTaken += Math.max(...fugitives);
  }

  reverseLastMove() {
    const lastMove = this.moves.pop();
    if (!lastMove) {
      throw new Error("There is no move to reverse.");
    }

    const { fromSide, fugitives } = lastMove;
    const source = this.moveSource(fromSide);
    const destination = this.moveDestination(fromSide);

    // Reverse-move fugitives from destination side to source side.
    fugitives.forEach((fugitive) =>
      _.pullAt(destination, destination.indexOf(fugitive))
    );
    source.push(...fugitives);

    this.nextFromSide = fromSide;
    this.timeTaken -= Math.max(...fugitives);
  }

  toSolution(): Solution {
    return {
      moves: [...this.moves],
      timeTaken: this.timeTaken,
    };
  }
}

// Time at which the brute-force solver started.
let solverStartTime = 0;

// Maximum allowed time the solver is allowed to run (in seconds).
const maxSimulationTime = 5;

// Maximum number of solutions allowed during a simulation.
const maxSolutionsLimit = 25;

/**
 * Returns the time already spent by the solver (in seconds).
 */
function simulationTime() {
  return (Date.now() - solverStartTime) / 1000;
}

function solve() {
  // At least two fugitives are required.
  if (!/^(\d+)(,\d+){1,}$/.test(fugitiveTimes.value.replace(/\s/g, ""))) {
    solverOutput.value = "Invalid fugitive times (valid example: 1, 2, 5, 10).";
    return;
  }

  if (!Number.isInteger(Number(policeTime.value))) {
    solverOutput.value = "Invalid police time (valid example: 17).";
    return;
  }

  solverStartTime = Date.now();

  const solutionsFound: Solution[] = [];

  const initialState = new SimulationState(
    JSON.parse(`[${fugitiveTimes.value}]`),
    Number(policeTime.value)
  );

  nextMove(initialState, solutionsFound);

  let output = "";

  if (simulationTime() > maxSimulationTime) {
    output += `Solver timed out after ${maxSimulationTime} seconds.\n`;
  }

  if (solutionsFound.length > 0) {
    if (findAllSolutions.value) {
      if (solutionsFound.length > maxSolutionsLimit) {
        output += "Found too many solutions.\n";
        output += `Only the first ${maxSolutionsLimit} will be displayed.\n`;
      } else {
        output += `Found ${solutionsFound.length} solutions.\n`;
      }
    } else {
      output += "Solution found.\n";
    }
  } else {
    output += "No solution found.\n";
  }

  solutionsFound.forEach((solution) => {
    const separatorLine = `${_.repeat("-", 40)}`;
    const timeTaken = `Total time taken: ${solution.timeTaken}`;
    const moves = solution.moves
      .map((move) => {
        const fugitives = move.fugitives.join(" and ");
        return move.fromSide === Side.Police
          ? `Fugitives ${fugitives} cross the bridge`
          : `Fugitive ${fugitives} returns with flashlight`;
      })
      .join("\n");
    output += `${separatorLine}\n${moves}\n${timeTaken}\n`;
  });

  solverOutput.value = output;
}

function nextMove(state: SimulationState, solutionsFound: Solution[]) {
  for (const move of state.possibleNextMoves()) {
    if (simulationTime() > maxSimulationTime) {
      break;
    }
    if (solutionsFound.length > 0) {
      if (
        !findAllSolutions.value ||
        solutionsFound.length > maxSolutionsLimit
      ) {
        break;
      }
    }
    state.moveFugitives(move);
    if (state.finished()) {
      const newSolution = state.toSolution();
      if (
        !solutionsFound.some((solution) => _.isEqual(solution, newSolution))
      ) {
        solutionsFound.push(newSolution);
      }
    } else {
      nextMove(state, solutionsFound);
    }
    state.reverseLastMove();
  }
}
</script>

<style scoped lang="scss">
.highlight {
  color: #058f4f;
}
.solver {
  &__controls {
    display: flex;
    justify-content: space-between;
  }
}
</style>
