<!-- <template>
  <form name="login-form" @submit.prevent="handleLogin" class="login-form">
    <div class="login-container">
      <label for="username">Username: </label>
      <input id="username" type="text" v-model="username" required />
      <label for="password">Password: </label>
      <input id="password" type="password" v-model="password" required />
    </div>
    <button class="btn" type="submit">Login</button>
  </form>
  <p v-if="error">{{ error }}</p>
</template>

<script setup>
import { ref } from 'vue'
import Api from '../Api.js'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const handleLogin = async () => {
  try {
    const user = await Api.login(username.value, password.value)
    if (user) {
      alert('Login successful!')
      router.push('/dashboard')
      // Handle successful login (e.g., redirect, store user data, etc.)
    } else {
      error.value = 'Invalid username or password'
    }
  } catch (e) {
    console.error('Error during login:', e)
    error.value = 'An error occurred. Please try again.'
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 70px ;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  margin-left: 0px;
}

.logo {
  width: 100px;
  margin-bottom: 20px;
}

.login-form {
  display: flow-root ;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px ;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  background-color: blueviolet;
  color: chartreuse;
  font-size: 16px;
  cursor: pointer;
}

.btn:hover {
  background-color: darkviolet;
}

.error {
  margin-top: 15px;
  color: red;
  font-weight: bold;
}
</style> -->

<template>
  <div class="login-container">
     <h1>Login</h1>
    <form name="login-form" @submit.prevent="handleLogin" class="login-form">
      <div class="form-group">
        <label for="username">Username:</label>
        <input id="username" type="text" v-model="form.username" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input id="password" type="password" v-model="form.password" required />
      </div>
      <button class="btn" type="submit">Login</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import {useStore} from 'vuex';

const error = ref('');
const router = useRouter();
const store = useStore();

const form = reactive({
  username: '',
  password: ''
})

const handleLogin = async () => {
  try {
    const user = await store.dispatch('login', form);
    if (user) {
      router.push('/dashboard');
    } else {
      error.value = 'Invalid username or password';
    }
  } catch (e) {
    console.error('Error during login:', e);
    error.value = 'An error occurred. Please try again.';
  }
};
</script>

<style scoped>
template {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f0f0f5;
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-container {
  display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(to right, #6a11cb, #2575fc);
    color: #fff;
    text-align: left;
    padding: 20px;
    box-sizing: border-box;
}

/* h1 {
  margin-bottom: 20px;
  color: #333;
} */

.login-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #0056b3;
}

.error {
  margin-top: 15px;
  color: red;
  font-weight: bold;
}
</style> 

<!-- <template>
  <div class="login-container">
    <h1>Login</h1>
    <form name="login-form" @submit.prevent="handleLogin" class="login-form">
      <div class="form-group">
        <label for="username">Username:</label>
        <input id="username" type="text" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input id="password" type="password" v-model="password" required />
      </div>
      <button class="btn" type="submit">Login</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const username = ref('');
const password = ref('');

const handleLogin = async () => {
  await store.dispatch('login', { username: username.value, password: password.value });
  if (store.getters.getError) {
    alert(store.getters.getError);
  } else {
    alert('Login successful!');
    router.push('/');
  }
};

const error = store.getters.getError;
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to right, #6a11cb, #2575fc);
  color: #fff;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
}

h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
  animation: fadeIn 2s ease-in-out;
}

p {
  font-size: 1.2em;
  margin-bottom: 30px;
  animation: fadeIn 2s ease-in-out;
}

.interactive-btn {
  padding: 10px 20px;
  font-size: 1em;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.interactive-btn:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.interactive-btn:active {
  background-color: #003d82;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style> -->
