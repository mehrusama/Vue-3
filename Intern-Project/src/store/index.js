import { createStore } from 'vuex'
import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
}
})
const store = createStore({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    admin: JSON.parse(localStorage.getItem('admin')) || false,
    error: null,
    books: [],
    users: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    setAdmin(state, admin) {
      state.admin = admin
      localStorage.setItem('admin', JSON.stringify(admin))
    },
    clearAdmin(state) {
      state.admin = null
      localStorage.removeItem('admin')
    },
    clearUser(state) {
      state.user = null
      localStorage.removeItem('user')
    },
    setError(state, error) {
      state.error = error;
    },
    setBooks(state, books) {
      state.books = books;
    },
    clearBooks(state) {
      state.books = []
    },
    setUsers(state, users) {
      state.users = users;
    },
    addBook(state, book) {
      state.books.push(book);
    },
    // updateBook(state, updatedBook) {
    //   const index = state.books.findIndex(book => book.id === updatedBook.id);
    //   if (index !== -1) {
    //     state.books[index] = updatedBook;
    //   }
    // },
    updateBook(state, updatedBook) {
      const index = state.books.findIndex(book => book._id === updatedBook._id);
      if (index !== -1) {
        state.books.splice(index, 1, updatedBook);
      }
    },
    deleteBook(state, bookId) {
      state.books = state.books.filter(book => book._id !== bookId);
    },
    deleteBookFromUser(state, { userId, bookId }) {
      const user = state.users.find(user => user._id === userId);
      if (user) {
        user.books = user.books.filter(id => id !== bookId);
      }
    },
  },
  actions: {
    async login({ commit }, { email, password }) {
        try {
          const response = await apiClient.post(`/users/login`, {email, password})
          const user = response.data
          console.log(user)
          if (user.username === 'admin') {
            commit('setAdmin', true);
          } else {
            commit('setAdmin', false);
          }
          commit('setError', null);
          commit('setUser', user);
        } catch (error) {
          commit('setError', );
        }
      },      
    // async signup({ commit }, email, username, password) {
    //   try {
    //     const response = await apiClient.post(`/users/signup`, {
    //     email: email,
    //     username: username,
    //     password: password
    //     })
    //     commit('setUser', response.data);
    //     commit('setError', null);
    //   } catch (error) {
    //     commit('setError', 'An error occurred. Please try again.');
    //   }
    // },
    async signup({ commit }, { email, username, password }) {
      try {
        const response = await apiClient.post(`/users/signup`, {
          email: email,
          username: username,
          password: password
        });
        commit('setUser', response.data);
        commit('setError', null);
        return response.data
      } catch (error) {
        console.error('Signup error:', error);
        commit('setError', 'An error occurred. Please try again.');
      }
    },    
    logout({ commit }) {
      commit('clearAdmin')
      commit('clearUser');
      commit('clearBooks');
    },
    async fetchBooks({ commit }, bookId) {
      try {
        const response = await apiClient.get(`/books`)
        commit('setBooks', response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    },
    // async fetchBooks({ commit, state }) {
    //   if (state.user) {
    //       try { 
    //       const response = await apiClient.get(`/books`, {
    //         params: { userId: state.user._id }
    //       });
    //       commit('setBooks', response.data);
    //     } catch (error) {
    //       console.error('Error fetching books:', error);
    //     }
    //   } else {
    //     console.error('User not found in state.');
    //   }
    // },
    async addBook({ commit }, book) {
      try {
        const response = await apiClient.post('/books', book);
        commit('addBook', response.data);
      } catch (error) {
        console.error('An error occurred while adding the book:', error);
      }
    },
    // async updateBook({ commit }, book) {
    //   try {
    //     const response = await apiClient.put(`/books/${book._id}`, book);
    //     commit('updateBook', response.data);
    //   } catch (error) {
    //     console.error('An error occurred while updating the book:', error);
    //   }
    // },
    async updateBook({ commit }, book) {
      try {
        const response = await apiClient.put(`/books/${book._id}`, book);
        commit('updateBook', response.data);
      } catch (error) {
        console.error('Failed to update book:', error);
      }
    },
    async deleteBook({ commit }, bookId) {
      try {
        await apiClient.delete(`/books/${bookId}`);
        commit('deleteBook', bookId);
      } catch (error) {
        commit('setError', error);
        throw error; // Throw error to be caught in the component
      }
    },
    clearAdmin({commit}) {
      commit('clearAdmin')
    },
    async fetchAllUsers({ commit }) {
      try {
        const response = await apiClient.get('/users');
        commit('setUsers', response.data);
      } catch (error) {
        console.error('An error occurred while fetching users:', error);
      }
    },
    async adminDeleteBook({ commit }, { userId, bookId }) {
      try {
        await apiClient.delete(`/books/${bookId}`);
        commit('deleteBookFromUser', { userId, bookId });
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    isAdminAuthenticated: (state) => !!state.admin,
    getError: (state) => state.error,
    getBooks: (state) => state.books,
    getAllUsers: (state) => state.users
    }
  })
export default store