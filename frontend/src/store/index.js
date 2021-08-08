import { createStore } from 'vuex'
import axios from 'axios'


export default createStore({
  state: {

    //User

    token: null,
    user_id: null,
    user_name: null,
    user_city: null,

    //Post

  },

  getters: {

    //User

    authenticated(state) {
      return state.token && state.user_id
    },
    user_id(state) {
      return state.user_id
    },
    user_name(state) {
      return state.user_name
    },
    user_city(state) {
      return state.user_city
    }
  },

  mutations: {

    //User

    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_USER_ID(state, data) {
      state.user_id = data
    },
    SET_USER_NAME(state, data) {
      state.user_name = data
    },
    SET_USER_CITY(state, data) {
      state.user_city = data
    }
  },

  actions: {

    //Login & logout

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
    },

    logout({ commit }) {
          commit('SET_TOKEN', null)
          commit('SET_USER_ID', null)
    }
  }
})