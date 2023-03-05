import { createStore } from "vuex";

interface State {
  tableIds: string[];
}

const store = createStore<State>({
  state() {
    return {
      tableIds: [],
    };
  },
  getters: {
    tableNumber: (state) => (id: string) => {
      return state.tableIds.indexOf(id) + 1;
    },
  },
  mutations: {
    storeTableId(state, id: string) {
      if (state.tableIds.includes(id)) {
        throw new Error(`Duplicate table ID: ${id}`);
      }
      state.tableIds.push(id);
    },
    resetState(state) {
      state.tableIds = [];
    },
  },
  actions: {
    registerTable(context, id: string) {
      context.commit("storeTableId", id);
    },
    reset(context) {
      context.commit("resetState");
    },
  },
});

export default store;
