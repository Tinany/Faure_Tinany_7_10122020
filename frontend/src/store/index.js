import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    token: null,
    user: null
  },

  getters: {
    authenticated(state) {
      return state.token && state.user
    },
    user(state) {
      return state.user
    }
  },

  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_USER(state, data) {
      state.user = data
    }
  },

  actions: {
    async login({ dispatch }, credentials) {
      let response = await axios.post('auth/login/', credentials)

      return dispatch('attempt', response.data.token)
    },

    logout({ commit }) {
          commit('SET_TOKEN', null)
          commit('SET_USER', null)
    }
  }
})

