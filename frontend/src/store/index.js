import { createStore } from 'vuex'
import axios from 'axios'


export default createStore({
  state: {
    token: null,
    user_id: null
  },

  getters: {
    authenticated(state) {
      return state.token && state.user_id
    },
    user(state) {
      return state.user_id
    }
  },

  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_USER_ID(state, data) {
      state.user_id = data
    }
  },

  actions: {
    async login({ dispatch }, credentials) {
      let response = await axios.post('auth/login/', credentials)

      return dispatch('attempt', response.data.token)
    },

    async attempt ({ commit, state }, token) {
      if(token) {
          commit('SET_TOKEN', token)
      }
      if (!state.token) {
          return
      }
      try {
          let response = await axios.get('auth/userDatas')
          commit('SET_USER_ID', response.data)
      } catch (e) {
          commit('SET_TOKEN', null)
          commit('SET_USER_ID', null)
      }
    },

    logout({ commit }) {
          commit('SET_TOKEN', null)
          commit('SET_USER_ID', null)
    }
  }
})