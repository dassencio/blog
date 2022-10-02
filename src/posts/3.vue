<template>
  <p>
    <i>
      A group of $N$ fugitives is running away from the police. They reach a
      very narrow bridge. Since it's dark and they have a single flashlight,
      they can only cross the bridge in pairs. The $i^{th}$ fugitive takes $T_i$
      minutes to cross the bridge. When a pair of fugitives crosses the bridge,
      they must go at the speed of the slowest fugitive. In other words, the
      crossing time for the pair of fugitives $(i, j)$ is $\max\{T_i, T_j\}$.
    </i>
  </p>

  <p>
    <i>
      After a pair of fugitives crosses the bridge, one of those who already
      crossed must return with the flashlight so that another pair of fugitives
      can go too (this new pair can include the fugitive who just brought back
      the flashlight). The process goes on until everyone has crossed the
      bridge.
    </i>
  </p>

  <p>
    <i>
      If the police is $T_p$ minutes behind the prisoners, and assuming they can
      no longer safely escape unless all of them have crossed the bridge by the
      time the police gets to it, can they make it? If yes, how?
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

  <p>
    The problem only becomes interesting if $N \ge 3$. If $N = 2$, the two
    fugitives will make it as long as $\max\{T_1, T_2\} \le T_p$, meaning if the
    slower fugitive needs longer than $T_p$ to cross the bridge, the police will
    arrive before they can safely flee. The case $N = 1$ is excluded as we would
    have a single fugitive crossing the bridge, but the statement of the problem
    says they should cross it (to the safe side) in pairs (so $N \ge 2$).
  </p>

  <p>
    <b>NOTE:</b> readers who just wish to play with the brute-force solver
    should go directly to the end of this post. If you are interested in the
    discussion of the problem, read on!
  </p>

  <p>
    Let's first compute the number of steps $S_N$ which must happen until all
    $N$ fugitives have crossed the bridge. A step can be either a pair of
    fugitives crossing the bridge or one fugitive returning. We will prove that:
  </p>

  <EquationBlock boxed> S_N = 2N - 3 </EquationBlock>

  <p>
    We start by first noticing that for $N = 2$, we have only one step (the two
    fugitives cross the bridge), so the equation above applies since $S_2 = 1$.
    Now assume the equation is valid for $N - 1$ fugitives. Then, for $N$
    fugitives, after the first two cross and one returns with the flashlight (in
    other words, after two steps), we have $N - 1$ fugitives left to cross the
    bridge. From there on, there are $S_{N - 1}$ steps until all fugitives have
    crossed. So:
  </p>

  <EquationBlock>
    S_N = S_{N - 1} + 2 = \left[2(N - 1) - 3\right] + 2 = 2N - 3
  </EquationBlock>

  <p>as we wanted to prove.</p>

  <p>
    Now let's compute the theoretical maximum number of possibilities that one
    has to try when using brute force to solve the problem. First, notice that
    if $N$ fugitives have not yet crossed the bridge, the number of possible
    pairs for crossing it is:
  </p>

  <EquationBlock>
    \left(\matrix{N \newline 2}\right) = \frac{N (N - 1)}{2}
  </EquationBlock>

  <p>
    When a fugitive must return with the flashlight, and if $M$ fugitives have
    already crossed the bridge, then the number of choices is simply $M$.
  </p>

  <p>
    We will therefore have the scheme shown below (assuming $N \gt 2$). I have
    marked the side which has the flashlight in green. "Crossed" refers to the
    number of fugitives which have already crossed the bridge while "must cross"
    refers to the number of fugitives which must still cross it:
  </p>

  <MultiModeGrid mode="table" :columns="3">
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
    <span class="highlight">$3$</span>
    <span>$N - 3$</span>
    <span>$3$</span>
    <span>$\vdots$</span>
    <span>$\vdots$</span>
    <span>$\vdots$</span>
    <span>$N - 5$</span>
    <span class="highlight">$5$</span>
    <span>$5 \cdot 4 / 2 = 10$</span>
    <span class="highlight">$N - 3$</span>
    <span>$3$</span>
    <span>$N - 3$</span>
    <span>$N - 4$</span>
    <span class="highlight">$4$</span>
    <span>$4 \cdot 3 / 2 = 6$</span>
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
  </MultiModeGrid>

  <p>
    The maximum number of moves $P_N$ which a brute-force solver must simulate
    is therefore:
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

  <EquationBlock boxed>
    P_N = \frac{N!^3}{2^{N - 1} N^2} \label{num_possibilities}
  </EquationBlock>

  <p>The table below shows the values of $P_N$ for some values of $N$:</p>

  <MultiModeGrid mode="table" :columns="2">
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
  </MultiModeGrid>

  <p>
    From the numbers above and from equation \eqref{num_possibilities}, it is
    clear that the computational work required to simulate all possibilities
    grows extremely fast ($N!$ grows much faster than both $2^{N - 1}$ and $N$).
    This will impose a limitation on how many fugitives ($N$) we can have when
    trying to solve the problem using brute force. The solver can be made more
    efficient, however, if it uses recursion and only keeps on going down a
    given branch of possibilities as long as the total crossing time has not yet
    exceeded the police time on that branch. Also, the solver can be made more
    efficient by not distinguishing between fugitives which take the same time
    to cross the bridge.
  </p>

  <p>
    Now, to the brute-force solver! On the text fields below, enter the times
    taken by each fugitive to cross the bridge and the time the police will take
    to reach it. The values must be separated by commas (the values already
    entered are the ones I was given in my job interview). If two or more
    fugitives take the same amount of time to cross the bridge, the solver will
    not differentiate between them when computing solutions.
  </p>

  <ResponsiveForm class="solver">
    <InputField label="Fugitive times:" v-model.trim="fugitiveTimes" />
    <InputField label="Police time:" v-model.trim="policeTime" />
    <span class="solver__controls">
      <BinaryOption v-model="findAllSolutions">Find all solutions</BinaryOption>
      <BaseButton @click="solve">Solve</BaseButton>
    </span>
  </ResponsiveForm>
  <CodeBlock class="solver__output">{{ solverOutput }}</CodeBlock>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import _ from "lodash";
import "lodash.combinations";
import mathjax from "@/mathjax";

onMounted(() => {
  mathjax.render();
});

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
  background-color: #87fd87;
}
.solver {
  &__controls {
    display: flex;
    justify-content: space-between;
  }
}
</style>
