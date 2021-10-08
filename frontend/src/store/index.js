import { createStore } from 'vuex'

export default createStore({
  state: {

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

  }
})