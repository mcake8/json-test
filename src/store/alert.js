import Vue from "vue";

function generateKey() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

const state = {
  show: false,
  alerts: {},
};

const mutations = {
  showAlert(state, { message, timer, type }) {
    const key = generateKey();

    if (Object.keys(state.alerts).length === 0) {
      state.show = true;
    }

    Vue.set(state.alerts, key, {
      message,
      timer,
      type,
      key,
    });
  },

  closeAlert(state, key) {
    const arr = Object.keys(state.alerts);

    if (arr.length <= 1) {
      state.show = false;
    }

    Vue.delete(state.alerts, key);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
};
