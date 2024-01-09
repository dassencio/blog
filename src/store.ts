import { createStore } from "vuex";

interface Element {
  id: string;
  parentId?: string;
}

type ElementWithParent = Element & { parentId: string };

type Figure = Element;
type Reference = Element;
type Subfigure = ElementWithParent;
type Table = Element;

interface State {
  figures: Figure[];
  references: Reference[];
  subfigures: Subfigure[];
  tables: Table[];
}

/**
 * Determines the index of an element among its siblings.
 *
 * @param elements Array of elements to search.
 * @param element Element to find.
 * @returns Index of the element, or -1 if not found.
 */
function findElementIndex(elements: Element[], element: Element) {
  const siblings = element.parentId
    ? elements.filter((_element) => _element.parentId === element.parentId)
    : elements;
  return siblings.findIndex((_sibling) => _sibling.id === element.id);
}

const store = createStore<State>({
  state() {
    return {
      figures: [],
      subfigures: [],
      references: [],
      tables: [],
    };
  },
  getters: {
    figureNumber: (state) => (figure: Figure) => {
      return findElementIndex(state.figures, figure) + 1;
    },
    referenceNumber: (state) => (reference: Reference) => {
      return findElementIndex(state.references, reference) + 1;
    },
    subfigureLabel: (state) => (subfigure: Subfigure) => {
      const subfigureIndex = findElementIndex(state.subfigures, subfigure);
      return subfigureIndex !== -1
        ? String.fromCharCode(97 + subfigureIndex)
        : "?";
    },
    tableNumber: (state) => (table: Table) => {
      return findElementIndex(state.tables, table) + 1;
    },
  },
  mutations: {
    storeFigure(state, figure: Figure) {
      if (findElementIndex(state.figures, figure) !== -1) {
        throw new Error(`Duplicate figure ID: ${figure.id}`);
      }
      state.figures.push(figure);
    },
    storeReference(state, reference: Reference) {
      if (findElementIndex(state.references, reference) !== -1) {
        throw new Error(`Duplicate reference ID: ${reference.id}`);
      }
      state.references.push(reference);
    },
    storeSubfigure(state, subfigure: Subfigure) {
      if (findElementIndex(state.subfigures, subfigure) !== -1) {
        throw new Error(`Duplicate subfigure ID: ${subfigure.id}`);
      }
      state.subfigures.push(subfigure);
    },
    storeTable(state, table: Table) {
      if (findElementIndex(state.tables, table) !== -1) {
        throw new Error(`Duplicate table ID: ${table.id}`);
      }
      state.tables.push(table);
    },
    resetState(state) {
      state.figures = [];
      state.references = [];
      state.subfigures = [];
      state.tables = [];
    },
  },
  actions: {
    registerFigure(context, figure: Figure) {
      context.commit("storeFigure", { ...figure });
    },
    registerReference(context, reference: Reference) {
      context.commit("storeReference", { ...reference });
    },
    registerSubfigure(context, subfigure: Subfigure) {
      context.commit("storeSubfigure", { ...subfigure });
    },
    registerTable(context, table: Table) {
      context.commit("storeTable", { ...table });
    },
    reset(context) {
      context.commit("resetState");
    },
  },
});

export default store;
