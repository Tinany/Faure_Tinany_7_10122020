import { createStore } from 'vuex'
import axios from 'axios'


export default createStore({
  state: {

    //User

    token: null,
    user_id: null,
    user_first_name: null,
    user_last_name: null,
    user_city: null,
    user_creation_date: null,
    user_profile_picture: null,

    //Post
    post_id: null,
    post_description: null,
    post_media: null,
    post_creation_date: null,

    //Comment 
    comment_id: null,
    comment_description: null,
    comment_creation_date: null
  },

  getters: {

    //User

    authenticated(state) {
      return state.token && state.user_id
    },
    user_id(state) {
      return state.user_id
    },
    user_first_name(state) {
      return state.user_first_name
    },
    user_last_name(state) {
      return state.user_last_name
    },
    user_city(state) {
      return state.user_city
    },
    user_creation_date(state) {
      return state.user_creation_date
    },
    user_profile_picture(state) {
      return state.user_profile_picture
    },

    //Post

    post_id(state) {
      return state.post_id
    },
    post_description(state) {
      return state.post_description
    },
    post_media(state) {
      return state.post_media
    },
    post_creation_date(state) {
      return state.post_creation_date
    },

    //Comment 

    comment_id(state) {
      return state.comment_id
    },
    comment_description(state) {
      return state.comment_description
    },
    comment_creation_date(state) {
      return state.comment_creation_date
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
    SET_USER_FIRST_NAME(state, data) {
      state.user_first_name = data
    },
    SET_USER_LAST_NAME(state, data) {
      state.user_last_name = data
    },
    SET_USER_CITY(state, data) {
      state.user_city = data
    },
    SET_CREATION_DATE(state,data) {
      state.user_creation_date = data
    },
    SET_PROFILE_PICTURE(state, data) {
      state.user_profile_picture = data
    },
    SET_USER_DATAS(state,data) {
      if(data.token) {
        state.token = data.token
      }
      state.user_id = data.id
      state.user_creation_date = data.creation_date
      state.user_city = data.city
      state.user_last_name = data.last_name
      state.user_first_name = data.first_name
      state.user_profile_picture = data.profile_picture
    },

    //Post

    SET_POST_ID(state, data) {
      state.post_id = data
    },
    SET_POST_DESCRIPTION(state, data) {
      state.post_description = data
    },
    SET_POST_MEDIA(state, data) {
      state.post_media = data
    },
    SET_POST_CREATION_DATE(state, data) {
      state.post_creation_date = data
    },
    SET_POST_DATAS(state, data) {
      if(data.token) {
        state.token = data.token
      }
      state.post_id = data.id
      state.post_description = data.description
      state.post_media = data.media
      state.post_creation_date = data.creation_date
    },

    //Comment 

    SET_COMMENT_ID(state, data) {
      state.comment_id = data
    },
    SET_COMMENT_DESCRIPTION(state, data) {
      state.comment_description = data
    },
    SET_COMMENT_CREATION_DATE(state, data) {
      state.comment_creation_date = data
    },
    SET_COMMENT_DATAS(state, data) {
      if(data.token) {
        state.token = data.token
      }
      state.comment_id = data.id
      state.comment_description = data.description
      state.comment_creation_date = data.creation_date
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