import { createStore } from "vuex";

interface State {
  figureIds: string[];
  tableIds: string[];
}

const store = createStore<State>({
  state() {
    return {
      figureIds: [],
      tableIds: [],
    };
  },
  getters: {
    figureNumber: (state) => (id: string) => {
      return state.figureIds.indexOf(id) + 1;
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
    storeTableId(state, id: string) {
      if (state.tableIds.includes(id)) {
        throw new Error(`Duplicate table ID: ${id}`);
      }
      state.tableIds.push(id);
    },
    resetState(state) {
      state.figureIds = [];
      state.tableIds = [];
    },
  },
  actions: {
    registerFigure(context, id: string) {
      context.commit("storeFigureId", id);
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
