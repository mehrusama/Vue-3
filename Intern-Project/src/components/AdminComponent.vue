<template>
  <div class="admin-dashboard-container">
    <h1 class="h1">Library Management System</h1>
    <div class="admin-actions">
      <h2>Admin Dashboard</h2>
      <button @click="fetchBooks" class="fetch-books-button">All Books</button>
      <ul v-if="book.length" class="book-list">
      <li v-for="book in book" :key="book._id" class="book-item">
        <span class="book-info">{{ book.title }} by {{ book.author }} - {{ getUser(book.userId) }}</span>
      </li>
    </ul>
      <button class="button" @click="fetchAllUsers">All Users</button>
      <ul v-if="user.length" class="user-list">
      <li v-for="user in user" :key="user._id" class="user-item">
        <span class="user-info"> {{ user.username }} - {{ user.email }} </span>
      </li>
    </ul>
      <ul class="book-list">
        <li v-for="book in books" :key="book._id" class="book-item">
          <span class="book-title">{{ book.title }} by {{ book.author }}</span>  
          <button @click="editBook(book)">Edit</button>
          <button class="delete-button" @click="deleteBook(book._id)">Delete Book</button> </li>
          <div v-if="editBookData._id">  
            <h3>Edit Book</h3>
      <form @submit.prevent="updateBook" class="add-book-form">
        <input type="hidden" v-model="editBookData._id" />
        <div>
          <label for="updateTitle">Title:</label>
          <input v-model="editBookData.title" type="text" id="updateTitle" class="form-group" required />
        </div>
        <label for="updateAuthor">Author:</label>
          <input v-model="editBookData.author" type="text" id="updateAuthor" class="form-group" required />
        <div>
          <label for="updateDescription">Description:</label>
          <textarea v-model="editBookData.description" id="updateDescription" class="form-group" required></textarea>
        </div>
        <button type="submit">Update</button>
      </form>
    </div>   
      </ul>
    </div>
      <h2>Add Book</h2>
    <form @submit.prevent="addBook" class="add-book-form">
      <div class="form-group">
        <label for="title">Title:</label>
        <input v-model="newBook.title" type="text" id="title" required />
      </div>
      <div class="form-group">
        <label for="author">Author:</label>
        <input v-model="newBook.author" type="text" id="author" required />
      </div>
      <div class="form-group">
        <label for="publishedDate">Published Date:</label>
        <input v-model="newBook.publishedDate" type="date" id="publishedDate" required />
      </div>
      <div class="form-group">
        <label for="genre">Genre:</label>
        <input v-model="newBook.genre" type="text" id="genre" required />
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea v-model="newBook.description" id="description" required></textarea>
      </div>
      <button type="submit" class="submit-button">Add Book</button>
    </form>
    <button class="logout-button" @click="logout">Logout</button>
    
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore()
const router = useRouter()
const user = ref([])
const book = ref({})
const books = computed(() => store.getters.getBooks);
const newBook = ref({ title: '', author: '', publishedDate: '', genre: '', description: '', userId: store.state.user });

const editBookData = ref({
      id: '',
      title: '',
      author: '',
      year: '',
      genre: ''
    });

  const deleteBook = (bookId) => {
    store.dispatch('deleteBook', bookId )
  };
  const fetchAllUsers = () => {
    store.dispatch('fetchAllUsers')
    user.value = store.getters.getAllUsers;
  };
//   const adminDeleteBook = async (userId, bookId) => {
//   try {
//     await store.dispatch('adminDeleteBook', { userId, bookId });
//   } catch (error) {
//     console.error('Failed to delete user\'s book:', error);
//   }
// };
const addBook = async () => {
      try {
        console.log(newBook.value)
        await store.dispatch('addBook', newBook.value);
        fetchBooks(); // Refresh the list of books
        newBook.value.title = newBook.value.author = newBook.value.description = newBook.value.genre = newBook.value.publishedDate = ''
      } catch (error) {
        console.error('Error adding book:', error);
      }
    };
    
const editBook = (book) => {
      editBookData.value = { ...book };
    };

    const updateBook = async () => {
      if (editBookData.value._id && editBookData.value.title && editBookData.value.author && editBookData.value.description) {
        try {
          await store.dispatch('updateBook', editBookData.value);
          editBookData.value = { _id: '', title: '', author: '', description: '' };
          await fetchBooks(); // Refresh the book list after update
        } catch (error) {
          console.error('Failed to update book:', error);
        }
      } else {
        console.error('All fields are required');
      }
    };
  // const fetchBooks = () => {
  //   store.dispatch('fetchBooks');
  // };
  const fetchBooks = () => {
  store.dispatch('fetchBooks')
  book.value = store.getters.getBooks
};
  const logout = () => {
  store.dispatch('logout')
  router.push('/login')
};

const getUser = (userId) => {
  
  const allUsers = store.getters.getAllUsers
  const user = allUsers.filter(user => user._id == userId)
  return user[0].username
}

onMounted(() => {
  store.dispatch('fetchAllUsers')
  store.dispatch('fetchBooks')
})
</script>

<style scoped>
.admin-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.fetch-users-button {
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10px 2px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.fetch-users-button:hover {
  background-color: #45a049;
}

.user-list {
  list-style-type: none;
  padding: 0;
  width: 100%;
  max-width: 600px;
}

.user-item {
  background-color: #f9f9f9;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease;
}

.user-item:hover {
  background-color: #f1f1f1;
}

.user-info {
  font-size: 16px;
  color: #333;
}
.admin-dashboard-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  background: linear-gradient(to bottom right, #f0f4f8, #d9e2ec);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 20px;
}

.admin-actions {
  margin-bottom: 20px;
  text-align: center;
}

.button {
  margin: 10px;
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: #2980b9;
}

.book-list, .user-list, .user-detail-list {
  list-style-type: none;
  padding: 0;
}

.book-item, .user-item, .user-detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.book-item:hover, .user-item:hover, .user-detail-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.book-title, .user-username, .user-email, .user-book-title, .user-book-author, .user-book-date, .user-book-genre {
  flex: 1;
  margin: 0 5px;
}

.delete-button {
  padding: 5px 10px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.delete-button:hover {
  background-color: #c0392b;
}

.logout-button {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-button:hover {
  background-color: #c0392b;
}

.user-detail-item {
  margin-top: 20px;
}

.user-book-list {
  list-style-type: none;
  padding: 0;
}

.user-book-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f1f1f1;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
}
.add-book-form {
  display: flex;
  flex-direction: column;
  background: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  background: #ffffff;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.submit-button {
  padding: 12px 18px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
}

.submit-button:hover {
  background-color: #218838;
}
</style>
