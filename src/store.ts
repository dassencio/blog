import { createStore } from "vuex";

interface ElementWithId {
  id: string;
}

type Figure = ElementWithId;
type Reference = ElementWithId;
type Table = ElementWithId;

interface Subfigure extends ElementWithId {
  parentId: string;
}

interface State {
  figures: Figure[];
  subfigures: Subfigure[];
  references: Reference[];
  tables: Table[];
}

function findElementIndex(elements: ElementWithId[], element: ElementWithId) {
  return elements.findIndex((_element) => _element.id === element.id);
}

function findSubfigureIndex(subfigures: Subfigure[], subfigure: Subfigure) {
  return findElementIndex(
    subfigures.filter(
      (_subfigure) => _subfigure.parentId === subfigure.parentId
    ),
    subfigure
  );
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
      const subfigureIndex = findSubfigureIndex(state.subfigures, subfigure);
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
      if (findSubfigureIndex(state.subfigures, subfigure) !== -1) {
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
