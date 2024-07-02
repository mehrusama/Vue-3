import { createStore } from 'vuex'
import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default createStore({
  state: {
    user: null
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    clearUser(state) {
      state.user = null
    }
  },
  actions: {
    async login({ commit }, { username, password }) {
      try {
        const response = await apiClient.get(`/users?name=${username}`)
        const users = response.data
        if (users.length > 0) {
          const user = users.find((user) => user.password === password)
          console.log(user)

          if (user) {
            commit('setUser', { name: username, password: password })
            return user
          }
          return null
        }
      } catch (error) {
        console.log(error)
      }
    },
    logout({ commit }) {
      commit('clearUser')
    },
    async signup({ commit }, { email, username, password }) {
      const response = await apiClient.post(`/users`, {
        email: email,
        name: username,
        password: password
      })
      commit('setUser', { email: email, name: username, password: password })
      return response.data
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.user
  }
})
