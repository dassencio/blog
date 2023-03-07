import { createStore } from "vuex";

interface ElementWithId {
  id: string;
}

interface Subfigure extends ElementWithId {
  parentId: string;
}

interface State {
  figureIds: string[];
  subfigures: Subfigure[];
  tableIds: string[];
}

const store = createStore<State>({
  state() {
    return {
      figureIds: [],
      subfigures: [],
      tableIds: [],
    };
  },
  getters: {
    figureNumber: (state) => (id: string) => {
      return state.figureIds.indexOf(id) + 1;
    },
    subfigureLabel: (state) => (subfigure: Subfigure) => {
      const subfigureIndex = state.subfigures
        .filter(({ parentId }) => parentId === subfigure.parentId)
        .findIndex(({ id }) => id === subfigure.id);
      return subfigureIndex !== -1
        ? String.fromCharCode(97 + subfigureIndex)
        : "?";
    },
    tableNumber: (state) => (id: string) => {
      return state.tableIds.indexOf(id) + 1;
    },
  },
  mutations: {
    storeFigureId(state, id: string) {
      if (state.figureIds.includes(id)) {
        throw new Error(`Duplicate figure ID: ${id}`);
      }
      state.figureIds.push(id);
    },
    storeSubfigure(state, subfigure: Subfigure) {
      if (
        state.subfigures.some(
          (registedSubfigure) =>
            registedSubfigure.id === subfigure.id &&
            registedSubfigure.parentId === subfigure.parentId
        )
      ) {
        throw new Error(`Duplicate subfigure ID: ${subfigure.id}`);
      }
      state.subfigures.push(subfigure);
    },
    storeTableId(state, id: string) {
      if (state.tableIds.includes(id)) {
        throw new Error(`Duplicate table ID: ${id}`);
      }
      state.tableIds.push(id);
    },
    resetState(state) {
      state.figureIds = [];
      state.subfigures = [];
      state.tableIds = [];
    },
  },
  actions: {
    registerFigure(context, id: string) {
      context.commit("storeFigureId", id);
    },
    registerSubfigure(context, subfigure: Subfigure) {
      context.commit("storeSubfigure", subfigure);
    },
    registerTable(context, id: string) {
      context.commit("storeTableId", id);
    },
    reset(context) {
      context.commit("resetState");
    },
  },
});

export default store;
