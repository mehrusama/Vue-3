<template>
  <div class="container">
    <div class="sidebar">
      <h2>Add Book</h2>
      <!-- <button @click="toggleForm" class="toggle-button">
         {{ showForm ? 'Hide' : 'Add Book' }} 
      </button> -->
      <!-- <div v-if="showForm"> -->
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
    </div>
    <div class="home-container">
      <div>
        <h1 class="dashboard-title">User Dashboard</h1>
        <ul class="book-list">
          <li class="book-list-item" v-for="book in books" :key="book._id">
            <div v-if="book.userId === store.state.user._id">
              <span class="book-detail book-title">{{ book.title }}</span>
              <span class="book-detail book-author">{{ book.author }}</span>
              <span class="book-detail book-date">{{ book.publishedDate }}</span>
              <span class="book-detail book-genre">{{ book.genre }}</span>
              <span class="book-detail book-description">{{ book.description }}</span>
              <button class="delete-button" @click="deleteBook(book._id)">Delete Book</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

  <script setup>
  import { computed, ref, onMounted } from 'vue';
  import { useStore } from 'vuex';
  
  const store = useStore()
  const newBook = ref({ title: '', author: '', publishedDate: '', genre: '', description: '', userId: store.state.user });

  const books = computed(() => store.getters.getBooks);
  
  const showForm = ref(false);

// const toggleForm = () => {
//   showForm.value = !showForm.value;
// };
  const fetchBooks = () => {
  store.dispatch('fetchBooks');
};
  const deleteBook = async (bookId) => {
  try {
    await store.dispatch('deleteBook', bookId);
  } catch (error) {
    console.error('Failed to delete book:', error);
  }
};
const addBook = async () => {
  try {
        await store.dispatch('addBook', newBook.value);
        fetchBooks(); // Refresh the list of books
        newBook.value.title = newBook.value.author = newBook.value.description = newBook.value.genre = newBook.value.publishedDate = ''
      } catch (error) {
        console.error('Error adding book:', error);
      }
    };
// const updateBook = async (book) => {
//       try {
//         await store.dispatch('updateBook', book);
//         book.value = null;
//         fetchBooks();
//       } catch (error) {
//         console.error('Error updating book:', error);
//       }
//     };
  onMounted(() => {
    fetchBooks();
  });
  </script>
  
  <style scoped>
.container {
  display: flex;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(135deg, #a2c2e8, #c2e8f2);
}

.sidebar {
  width: 300px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  height: 100vh;
  overflow-y: auto;
  margin-top: 40px;
}

/* .hidden-sidebar {
  transform: translateX(-100%);
}

.toggle-button {
  padding: 12px 18px;
  margin-bottom: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
}

.toggle-button:hover {
  background-color: #0056b3;
} */

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

.home-container {
  flex: 1;
  padding: 20px;
  margin-left: 350px;
  overflow-y: auto;
}

.dashboard-title {
  text-align: center;
  font-size: 30px;
  margin-bottom: 20px;
  color: #333;
  font-weight: bold;
  animation: slideIn 2s ease-out;
}

.book-list {
  list-style: none;
  padding: 0;
}

.book-list-item {
  margin-bottom: 15px;
  padding: 15px;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.book-list-item:hover {
  transform: scale(1.03);
}

.book-detail {
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  color: #555;
}

.book-title {
  font-size: 18px;
  font-weight: bold;
  color: #007bff;
}

.book-author,
.book-date,
.book-genre,
.book-description {
  color: #6c757d;
}

.delete-button {
  padding: 8px 12px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.delete-button:hover {
  background-color: #c82333;
}
@keyframes slideIn {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>