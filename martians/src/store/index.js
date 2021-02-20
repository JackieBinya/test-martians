import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"

Vue.use(Vuex)

const API_BASE_URL = "https://dummyapi.io/data/api"
const API_ID = "602fa7bd48912226d33beb71"

export default new Vuex.Store({
  state: {
    users: null,
    user: null,
    isLoadingUsers: false,
    isLoadingUser: false,
  },
  mutations: {
    SET_USERS(state, result) {
      state.users = result
    },
    SET_USER(state, result) {
      state.user = result
    },
    SET_LOADING_USERS(state, status) {
      state.isLoadingUsers = status
    },
    SET_LOADING_USER(state, status) {
      state.isLoadingUser = status
    },
  },
  actions: {
    loadUsers({ commit }, payload) {
      commit("SET_LOADING_USERS", true)
      axios
        .get(`${API_BASE_URL}/user?page=${payload.page}&limit=12`, {
          headers: { "app-id": API_ID },
        })
        .then(response => {
          commit("SET_USERS", response.data.data)
          commit("SET_LOADING_USERS", false)
        })
        .catch(error => {
          throw error
        })
    },
    loadUser({ commit }, payload) {
      commit("SET_LOADING_USER", true)

      axios
        .get(`${API_BASE_URL}/user/${payload.id}`, {
          headers: { "app-id": API_ID },
        })
        .then(response => {
          const result = response.data
          commit("SET_USER", result)
          commit("SET_LOADING_USER", false)
        })
        .catch(error => console.log(error))
    },
  },
  modules: {},
})
