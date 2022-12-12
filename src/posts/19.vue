<template>
  <p>
    <i>
      If $n$ people are randomly selected from a very large population, what is
      the probability that at least two of them will have the same birthday?
    </i>
  </p>

  <p>
    This problem is commonly known as the
    <a href="https://en.wikipedia.org/wiki/Birthday_problem"
      >birthday paradox</a
    >
    (the reason behind "paradox" will become clear as we solve the problem). The
    solution is relatively simple if we assume that the probability that a
    randomly selected person was born on a certain day of the year is the same
    for every day of the year, i.e., that birthdays form a
    <a href="https://en.wikipedia.org/wiki/Discrete_uniform_distribution"
      >discrete uniform distribution</a
    >
    in which every value has equal probability $1/N$, where $N$ is the number of
    days in a year. This assumption is not true in practice (birthdays in
    September are, for instance, more common than in January), but still
    <a
      href="https://towardsdatascience.com/how-popular-is-your-birthday-91ab133f7fc4"
      >good enough</a
    >
    for this problem.
  </p>

  <p>
    More generally, one could ask:
    <i>
      If $n$ elements are randomly selected from a
      <a href="https://en.wikipedia.org/wiki/Set_%28mathematics%29">set</a> $S$
      with $N$ distinct elements, and if the element selection events are
      <a href="https://en.wikipedia.org/wiki/Independence_(probability_theory)"
        >independent</a
      >, what is the probability that at least one element is selected two or
      more times?
    </i>
  </p>

  <p>
    In the original question, a birthday is an element in the set $Y = \{1, 2,
    \ldots, 365\}$ which represents all days of the year, assuming a year
    contains $365$ days (<a href="https://en.wikipedia.org/wiki/Leap_year"
      >leap years</a
    >
    will not be considered in this post). Since we're assuming birthdays form a
    discrete uniform distribution, randomly selecting a person is equivalent to
    randomly selecting an element from $Y$. In what follows, the event of
    selecting a given element more than once will be called a <b>collision</b>.
  </p>

  <p>
    Let's solve the problem in its general formulation (not necessarily thinking
    of birthdays). We first randomly select an element $E_1$ from a set which
    contains $N$ elements. The total number of possible $E_1$ values is $N$. We
    then randomly select a second element $E_2$. The probability that this
    second element is distinct from the first one is:
  </p>

  <EquationBlock>
    P^{(2)} \ColonEq P(E_2 \notin \{E_1\}) = \frac{N-1}{N}
  </EquationBlock>

  <p>
    since there are $N-1$ elements which are distinct from $E_1$ (above, I wrote
    $E_2 \notin \{E_1\}$ instead of $E_2 \neq E_1$ for reasons which will become
    clear below). We then randomly select a third element $E_3$. The probability
    that this element is distinct from the first two selected elements is:
  </p>

  <EquationBlock>
    P^{(3)} \ColonEq P(E_3 \notin \{E_1,E_2\}) = \frac{N-2}{N}
  </EquationBlock>

  <p>
    since there are $N-2$ elements distinct from both $E_1$ and $E_2$ if $E_1
    \neq E_2$. We keep on repeating this process until we select the $n$-th
    element. Assuming the $(n-1)$ previously selected elements are all distinct
    from each other, the probability that the $n$-th element is distinct from
    these $(n-1)$ elements is:
  </p>

  <EquationBlock>
    P^{(n)} \ColonEq P(E_n \notin \{E_1,E_2,\ldots,E_{n-1}\}) =
    \frac{N-(n-1)}{N}
  </EquationBlock>

  <p>
    since after the first $(n-1)$ distinct elements are selected, there are
    still $N - (n-1)$ elements left which were not yet selected.
  </p>

  <p>
    The probability $P^*(n)$ of selecting $n$ elements which are all distinct is
    the multiplication of the probabilities $P^{(i)}$ computed above for $i = 2,
    \ldots, n$:
  </p>

  <EquationBlock> P^*(n) = P^{(2)} P^{(3)} \ldots P^{(n)} </EquationBlock>

  <p>
    The probability $P(n)$ of at least two among the $n$ selected elements being
    equal is therefore:
  </p>

  <!-- prettier-ignore-->
  <EquationBlock align>
    P(n) &= 1 - P^*(n) \\
         &= 1 - P^{(2)} P^{(3)} \ldots P^{(n)} \\
         &= 1 - \left(\frac{N-1}{N}\right)\left(\frac{N-2}{N}\right) \ldots \left(\frac{N-(n-1)}{N}\right) \\
         &= 1 - \prod_{i=1}^{n-1}\left(\frac{N-i}{N}\right) \label{eq_deriv_pn}
  </EquationBlock>

  <p>But since:</p>

  <EquationBlock>
    \prod_{i=1}^{n-1}\left(\frac{N-i}{N}\right) =
    \frac{\prod_{i=1}^{n-1}(N-i)}{N^{n-1}} = \frac{\prod_{i=0}^{n-1}(N-i)}{N^n}
  </EquationBlock>

  <p>and given that:</p>

  <EquationBlock>
    \prod_{i=0}^{n-1}(N-i) = N (N-1) \ldots (N - n + 1) = \frac{N!}{(N - n)!}
  </EquationBlock>

  <p>we obtain:</p>

  <EquationBlock boxed>
    P(n) = 1 - \prod_{i=1}^{n-1}\left(\frac{N-i}{N}\right) = 1 - \frac{N!}{N^n(N
    - n)!} \label{eq_pn}
  </EquationBlock>

  <p>
    The intermediate result obtained in equation \eqref{eq_deriv_pn} has been
    added to equation \eqref{eq_pn} as it makes the computation of $P(n)$ very
    easy to do on a computer. Computing $P(n)$ using the version involving
    factorials would not be a trivial task since $N!$ can be an immense number
    (it will definitely be for $N = 365$) which most computers are not able to
    deal with due to the use of
    <a href="https://en.wikipedia.org/wiki/Floating_point"
      >finite precision arithmetic</a
    >. I will show later how one can use equation \eqref{eq_deriv_pn} to compute
    $P(n)$ using <a href="https://www.gnu.org/software/octave/">Octave</a> (see
    the "bonus" section below).
  </p>

  <p>
    Consider again the original problem: How many people do we need to select so
    that two or more of them will have the same birthday with probability larger
    than or equal to $50\%$? Perhaps $365/2 \approx 182$? Or $150$?
    Surprisingly, the answer is $23$:
  </p>

  <EquationBlock>
    P(23) = 1 - \frac{365!}{(365)^{23}(365 - 23)!} \approx 0.5073
  </EquationBlock>

  <p>
    In other words, with only $n = 23$ randomly selected people, we can already
    expect a birthday collision with more than $50\%$ probability! If the
    "paradox" in "birthday paradox" was not yet clear to you, it probably is
    now. <FigureLink :figureNumber="1">Figure 1</FigureLink> shows the
    probability $P(n)$ of a birthday collision for different values of $n$ and
    $N = 365$.
  </p>

  <FigureBlock
    :figureNumber="1"
    caption="Collision probability $P(n)$ versus number $n$ of elements randomly
             selected from of a set $Y = \{1,2,\ldots,365\}$ representing the
             days of the year. $Q(n) = 1 - e^{-n(n-1)/(2N)}$ is a lower bound
             estimate of $P(n)$."
  >
    <FlotChart class="figure-1" :data="data" :options="options" />
  </FigureBlock>

  <p>
    Also interestingly, we can expect a collision with $99\%$ probability if we
    select as few as $n = 57$ people:
  </p>

  <EquationBlock> P(57) \approx 0.9901 </EquationBlock>

  <SectionTitle>A lower bound estimate for $P(n)$</SectionTitle>

  <p>
    We will now compute a simple lower bound estimate for $P(n)$ which is a
    useful tool for better understanding the birthday paradox. From equation
    \eqref{eq_pn}, we get:
  </p>

  <EquationBlock>
    P(n) = 1 - \prod_{i=1}^{n-1}\left(\frac{N-i}{N}\right) = 1 -
    \prod_{i=1}^{n-1}\left(1 - \frac{i}{N}\right) \geq 1 -
    \prod_{i=1}^{n-1}e^{-i/N}
  </EquationBlock>

  <p>
    where above we used the fact that $1 - x \leq e^{-x}$ for all $x \geq 0$
    (for $x = 0$, both sides are equal to $1$; the derivative of $(1-x)$ is $-1$
    while the derivative of $e^{-x}$ is $-e^{-x} \geq -1$ for all $x \geq 0$, so
    $(1-x)$ decreases faster than $e^{-x}$ for $x \gt 0$). Then:
  </p>

  <EquationBlock>
    P(n) \geq 1 - e^{-\frac{1}{N}\sum_{i=1}^{n-1} i}
  </EquationBlock>

  <p>But since:</p>

  <EquationBlock> \sum_{i=1}^{n-1} i = \frac{n(n-1)}{2} </EquationBlock>

  <p>we finally obtain:</p>

  <EquationBlock>
    P(n) \geq Q(n) \ColonEq 1 - e^{-n(n-1)/(2N)} \label{eq_approx_p}
  </EquationBlock>

  <p>
    You can compare how close $Q(n)$ is to $P(n)$ in
    <FigureLink :figureNumber="1">figure 1</FigureLink>. For any given
    probability $p$, equation \eqref{eq_approx_p} can be used to estimate the
    smallest value of $n$ for which we will have a collision with probability
    larger than or equal to $p$, i.e., $P(n) \geq p$. We can do that by solving
    this same problem for $Q(n)$ instead of $P(n)$ since any value of $n$ such
    that $Q(n) \geq p$ also satisfies $P(n) \geq p$:
  </p>

  <!-- prettier-ignore -->
  <EquationBlock align>
    Q(n) \geq p 
      & \Longleftrightarrow 1 - e^{-n(n-1)/(2N)} \geq p \\
      & \Longleftrightarrow e^{-n(n-1)/(2N)} \leq 1 - p \\
      & \Longleftrightarrow \frac{-n(n-1)}{2N} \leq \log(1 - p) \\
      & \Longleftrightarrow n(n-1) \geq 2N\log\left(\frac{1}{1-p}\right) \label{eq_n2}
  </EquationBlock>

  <p>
    Given that $n(n-1) \geq (n-1)^2$, any value of $n$ for which the following
    is true:
  </p>

  <EquationBlock> (n-1)^2 \geq 2N\log\left(\frac{1}{1-p}\right) </EquationBlock>

  <p>will also satisfy:</p>

  <EquationBlock> n(n-1) \geq 2N\log\left(\frac{1}{1-p}\right) </EquationBlock>

  <p>Therefore:</p>

  <EquationBlock>
    (n-1)^2 \geq 2N\log\left(\frac{1}{1-p}\right) \Longrightarrow Q(n) \geq p
  </EquationBlock>

  <p>This implies that any value of $n$ such that:</p>

  <EquationBlock>
    n \geq \sqrt{2N\log\left(\frac{1}{1-p}\right)} + 1\label{eq_n}
  </EquationBlock>

  <p>
    will yield a collision with probability larger than or equal to $p$. For $N
    = 365$ and $p = 0.5$, we get $n \geq 23.45$, which is a good approximation
    of the correct result.
  </p>

  <p>
    The birthday paradox gets even stranger if we take $N = 10^6$ (one million)
    and $p = 0.5$: for those parameters, we get $n \geq 1178.4$, so we will
    already have a collision with at least $50\%$ probability with as few as
    $1180$ elements! In general, to produce a collision with approximately
    $50\%$ probability for a given $N$, we can select a number of elements given
    by:
  </p>

  <EquationBlock> n \approx 1.2\sqrt{N} \label{eq_n_approx} </EquationBlock>

  <p>
    The equation above is obtained by setting $p = 0.5$ in equation
    \eqref{eq_n}, rounding up the constant factor and assuming that $\sqrt{N}
    \gg 1$. For $N = 365$, equation \eqref{eq_n_approx} yields $n \approx 22.92$
    (no surprises here).
  </p>

  <SectionTitle>Bonus: Using Octave to compute $P(n)$</SectionTitle>

  <p>
    On Ubuntu/Debian, you can install Octave by opening a terminal and running
    the following command:
  </p>

  <CodeBlock code="sudo apt-get install octave" />

  <p>
    Now create a file called <code>birthday.m</code> with the following contents
    (or <a :href="octaveFile" download="birthday.m">download it</a> directly):
  </p>

  <CodeBlock language="octave" :code="octaveCode" />

  <p>
    Now start Octave in the same directory where <code>birthday.m</code> is
    stored:
  </p>

  <CodeBlock code="octave" />

  <p>and compute $P(n)$ as in the example below:</p>

  <CodeBlock
    language="octave"
    code="
    octave:1> birthday(365, 23)
    ans =  0.50730
    "
  />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";

onMounted(() => onViewMounted());

const N = 365;

const Pn: [number, number][] = [];
const Qn: [number, number][] = [];

let pc = 1.0;
for (let n = 0; n <= 80; ++n) {
  pc *= (N - n) / N;
  Pn.push([n, 1.0 - pc]);
  Qn.push([n, 1.0 - Math.exp((-n * (n - 1)) / (2 * N))]);
}

const data = [
  { label: "$P(n)$", data: Pn },
  { label: "$Q(n)$", data: Qn },
];

const options = {
  xaxis: {
    axisLabel: "$n$",
    max: 80,
    min: 0,
    ticks: 10,
  },
  yaxis: {
    max: 1.1,
    min: 0,
    ticks: 4,
  },
};

const octaveCode = `
# N: Size of set from which elements are selected
# n: Number of randomly selected elements
function p = birthday(N, n)
  # We need to choose at least two elements.
  if n < 2
    p = 0;
  else
    pc = 1.0;
    for i = 1 : (n - 1)
      pc = pc * (N - i) / N;
    end
    p = 1 - pc;
  end
end
`;

const octaveFile = URL.createObjectURL(
  new Blob([octaveCode.trim()], { type: "text/plain" })
);
</script>

<style scoped lang="scss">
.figure-1 {
  height: 20 * $base-length;
  width: 35 * $base-length;
}
</style>
