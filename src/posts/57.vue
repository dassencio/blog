<template>
  <p>
    A common problem that arises when dealing with
    <a href="https://en.wikipedia.org/wiki/Graph_(discrete_mathematics)"
      >graphs</a
    >
    is determining whether a given graph $G$ contains a
    <a href="https://en.wikipedia.org/wiki/Cycle_%28graph_theory%29">cycle</a>.
    For instance, one way to implement
    <a href="https://en.wikipedia.org/wiki/Kruskal%27s_algorithm"
      >Kruskal's algorithm</a
    >
    to compute the
    <a href="https://en.wikipedia.org/wiki/Minimum_spanning_tree"
      >minimum spanning tree</a
    >
    (MST) of a graph involves preventing the formation of cycles in the computed
    MST. This is achieved by detecting and eliminating cycles as the MST is
    constructed (this version of Kruskal's algorithm does not utilize the
    <a href="https://en.wikipedia.org/wiki/Disjoint-set_data_structure"
      >union-find</a
    >
    data structure). This post describes how one can detect the existence of
    cycles in
    <a href="https://en.wikipedia.org/wiki/Graph_(discrete_mathematics)"
      >undirected</a
    >
    graphs.
  </p>

  <p>
    In the context of this post, a graph is allowed to have trivial cycles
    formed by
    <a href="https://en.wikipedia.org/wiki/Multiple_edges">parallel edges</a>
    and
    <a href="https://en.wikipedia.org/wiki/Loop_%28graph_theory%29"
      >self-loops</a
    >. An implementation of the cycle detection algorithm, written in Python,
    will be presented to aid clarity. You can download the code from this post
    by clicking <a :href="pythonFile" download="detect-graph-cycle.py">here</a>.
  </p>

  <p>
    Let's begin by introducing an implementation of a simple graph class
    containing only the minimum functionality we need. Our implementation will
    only store a dictionary that maps each vertex $v$ to its list of neighbors.
    A list of all vertices in the graph can be easily obtained from the keys of
    this dictionary, as demonstrated in the member function
    <code>vertices()</code> below.
  </p>

  <CodeBlock language="python" :code="graphClass" />

  <p>
    Now, let's delve into the cycle detection algorithm. For undirected graphs,
    the algorithm selects an unexplored vertex $v$ of $G$ and employs
    <a href="https://en.wikipedia.org/wiki/Breadth-first_search"
      >breadth-first search</a
    >
    (BFS) to explore every vertex reachable from $v$. As each vertex is
    explored, it's assigned a numerical value equal to its
    <a href="https://en.wikipedia.org/wiki/Distance_%28graph_theory%29"
      >distance</a
    >
    to $v$. This value, referred to as the vertex's "layer" and denoted as
    $\textrm{layer}(x)$ for a vertex $x$, provides an ordered grouping of
    vertices by their distance from the starting vertex. Initially, $v$ is
    assigned a layer of $0$ while all other vertices are assigned a layer of
    $-1$ to signify that they haven't been explored yet. As the BFS progresses
    layer by layer, our goal is to ascertain whether it's possible to reach a
    vertex in the graph from $v$ via two distinct paths. We can leverage the
    layer information of the vertices to achieve this. Should a cycle exist
    within $G$, it will manifest during the BFS in one of the following ways:
  </p>

  <ListBlock ordered>
    <ListBlockItem>
      There will be an integer $n$ such that after exploring all vertices from
      the $n$-th layer and proceeding to explore the vertices on the $(n+1)$-th
      layer, a vertex $z$ on the $(n+1)$-th layer will be reachable from two
      vertices $u$ and $w$ on the $n$-th layer (see
      <FigureLink id="possible-cases" subfigureId="case-1" />).
    </ListBlockItem>
    <ListBlockItem>
      There will be an integer $n$ such that after exploring all vertices from
      the $n$-th layer and proceeding to explore the vertices on the $(n+1)$-th
      layer, it will be discovered that two vertices $u$ and $w$ on the $n$-th
      layer are connected by an edge (see
      <FigureLink id="possible-cases" subfigureId="case-2" />).
    </ListBlockItem>
  </ListBlock>

  <FigureBlock
    id="possible-cases"
    caption="The two possible scenarios to consider when detecting cycles using
             BFS (only the relevant edges of each graph are shown). In both
             figures, $v$ is the starting vertex, and $u$ and $w$ are vertices
             on the $n$-th layer. Figure (a) depicts the scenario where both $u$
             and $w$ are connected to the same vertex $z$ on the $(n+1)$-th
             layer. Figure (b) illustrates the scenario where $u$ and $w$ are
             directly connected."
  >
    <BaseSubfigure id="case-1">
      <ResponsiveImage alt="Case 1" :src="detectCycleUG1" />
    </BaseSubfigure>
    <BaseSubfigure id="case-2">
      <ResponsiveImage alt="Case 2" :src="detectCycleUG2" />
    </BaseSubfigure>
  </FigureBlock>

  <p>
    Let's start with the first scenario. If $z$ is initially reached from vertex
    $u$, and since $\textrm{layer}(u) = n$, then we must set $\textrm{layer}(z)$
    to $n+1$. Later, if we encounter $z$ again from another vertex $w$ with
    $\textrm{layer}(w) = n$, the condition $\textrm{layer}(w) \lt
    \textrm{layer}(z)$ will signal that $z$ has previously been reached through
    a different path, indicating the presence of a cycle. Now, let's consider
    the second scenario, where a vertex $u$ from layer $n$ is connected by an
    edge to another vertex $w$ also on layer $n$. In this case,
    $\textrm{layer}(w) = \textrm{layer}(u) = n$ signals the presence of a cycle.
    In both scenarios, the presence of a cycle is therefore signaled by the
    condition in which a vertex $z$ is reached by another vertex $w$ with
    $\textrm{layer}(w) \le \textrm{layer}(z)$.
  </p>

  <p>
    To handle
    <a href="https://en.wikipedia.org/wiki/Connectivity_%28graph_theory%29"
      >disconnected</a
    >
    graphs as well, we merely need to carry out multiple iterations of BFS, each
    starting at an unexplored vertex, until all vertices have been explored. If
    $G$ is connected, the initial unexplored vertex $v$ will be the starting
    point for a BFS that will explore all vertices in $G$. However, if $G$ is
    disconnected, several iterations of BFS will be necessary, each exploring a
    unique
    <a
      href="https://en.wikipedia.org/wiki/Connected_component_%28graph_theory%29"
      >connected component</a
    >
    within $G$.
  </p>

  <p>
    Now, let's move from theory to practice. The function below implements the
    algorithm we just discussed. It returns <code>True</code> if the input graph
    $G$ has a cycle, or <code>False</code> otherwise:
  </p>

  <CodeBlock language="python" :code="isCyclicGraphMethod" />

  <p>
    Regarding the runtime complexity of the algorithm, note that each edge is
    explored at most twice (once for each of its endpoints). Since the algorithm
    also traverses every vertex of $G$ at most once, the overall complexity is
    $O(m + n)$, where $m$ and $n$ are the number of edges and vertices in $G$,
    respectively.
  </p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { onViewMounted } from "@/functions";
import detectCycleUG1 from "@/assets/images/detect-graph-cycle-case-1.svg";
import detectCycleUG2 from "@/assets/images/detect-graph-cycle-case-2.svg";

onMounted(() => onViewMounted());

const graphClass = `
class graph:
  def __init__(self):
    """Initializes a graph object"""
    self.neighbors = {}

  def add_vertex(self, v):
    """Adds a vertex labeled v to the graph"""
    if v not in self.neighbors:
      self.neighbors[v] = []

  def add_edge(self, u, v):
    """Adds an edge between vertices u and v"""
    self.neighbors[u].append(v)
    # If u == v, do not connect u to itself twice.
    if u != v:
      self.neighbors[v].append(u)

  def vertices(self):
    """Returns a list containing all vertices of the graph"""
    return list(self.neighbors.keys())

  def vertex_neighbors(self, v):
    """Returns a list containing all neighbors of v"""
    return self.neighbors[v]
`;

const isCyclicGraphMethod = `
def is_cyclic_graph(G):
  """Returns True if the graph G contains a cycle, False otherwise"""

  Q = []
  V = G.vertices()

  # Initially, all vertices are unexplored.
  layer = { v: -1 for v in V }

  for v in V:
    # If v has already been explored, move on.
    if layer[v] != -1:
      continue

    # Take v as a starting vertex.
    layer[v] = 0
    Q.append(v)

    # As long as Q is not empty...
    while len(Q) > 0:
      # Get the next vertex w of Q that must be explored.
      w = Q.pop(0)
      C = G.vertex_neighbors(w)

      for z in C:
        # If z has not yet been explored, assign it to the next layer.
        if layer[z] == -1:
          layer[z] = layer[w] + 1
          Q.append(z)
        # Check if a cycle has been found.
        elif layer[w] <= layer[z]:
          return True

  return False
`;

const pythonFile = URL.createObjectURL(
  new Blob([(graphClass + "\n" + isCyclicGraphMethod).trim()], {
    type: "text/plain",
  })
);
</script>
