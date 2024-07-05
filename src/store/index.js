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
    user: JSON.parse(localStorage.getItem('user')) || null,
    tasks: [],
    error: null
  },
  mutations: {
    setUser(state, user) {
      state.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    setTasks(state, tasks) {
      state.tasks = tasks
    },
    addTask(state, task) {
      state.tasks.push(task)
    },
    updateTask(state, updatedTask) {
      const index = state.tasks.findIndex((task) => task.id === updatedTask.id)
      if (index !== -1) {
        state.tasks[index] = updatedTask
      }
    },
    deleteTask(state, taskId) {
      state.tasks = state.tasks.filter((task) => task.id !== taskId)
    },
    clearUser(state) {
      state.user = null
      localStorage.removeItem('user')
    },
    setError(state, error) {
      state.error = error
    }
  },
  actions: {
    async fetchTasks({ commit }) {
      try {
        const response = await apiClient.get('/tasks')
        commit('setTasks', response.data)
      } catch (error) {
        commit('setError', error)
      }
    },
    async addTask({ commit }, task) {
      try {
        const response = await apiClient.post('/tasks', task)
        commit('addTask', response.data)
      } catch (error) {
        commit('setError', error)
      }
    },
    async updateTask({ commit }, task) {
      try {
        const response = await apiClient.put(`/tasks/${task.id}`, task)
        console.log(task)
        commit('updateTask', response.data)
      } catch (error) {
        commit('setError', error)
      }
    },
    async deleteTask({ commit }, taskId) {
      try {
        await apiClient.delete(`/tasks/${taskId}`)
        commit('deleteTask', taskId)
      } catch (error) {
        commit('setError', error)
      }
    },
    async login({ commit }, { username, password }) {
      try {
        const response = await apiClient.get(`/users?name=${username}`)
        const users = response.data
        if (users.length > 0) {
          const user = users.find((user) => user.password === password)
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
    isAuthenticated: (state) => !!state.user,
    allTasks: (state) => state.tasks,
    getError: (state) => state.error
  }
})
