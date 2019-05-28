import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Highscore: 0,
  },
  getters: {
    Highscore(state) {
      return state.Highscore
    }
  },
  mutations: {
    setScore(state, score) {
      state.Highscore = score
    }
  },
  plugins: [createPersistedState()]
})