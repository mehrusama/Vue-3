<!-- <template>
  <form name="Signup-form" @submit.prevent="handleSignup">
    <div class="signup-container">
      <label for="username">Username: </label>
      <input id="username" type="text" v-model="username" required />
      <label for="password">Password: </label>
      <input id="password" type="password" v-model="password" required />
      <label for="confirmpassword">Confirm Password: </label>
      <input id="confirmpassword" type="password" v-model="confirmpassword" required />
    </div>
    <button class="btn btn-outline-dark" type="submit">Signup</button>
  </form>
  <p v-if="error">{{ error }}</p>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Api from '../Api.js'

const username = ref('')
const password = ref('')
const confirmpassword = ref('')
const error = ref('')
const router = useRouter()
const handleSignup = async () => {
  try {
    const user = await Api.signup(username.value, password.value)
    if (user) {
      alert('Signup Successful!')
      router.push('/login')
    } else {
      error.value('Invalid Username or Password')
    }
  } catch (e) {
    console.error('Error during Signup', e)
    error.value('Error occured, please try again!')
  }
}
</script>


<style scoped>
.signup-container {
  max-width: 400px;
  width: 100%;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  text-align: center;
}

.signup-container h1 {
  margin-bottom: 20px;
  color: #333;
}

.signup-form {
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
</style> -->

<template>
  <div class="signup-container">
    <form name="signup-form" @submit.prevent="handleSignup" class="signup-form">
      <div class="form-group">
        <label for="username">Username:</label>
        <input id="username" type="text" v-model="form.username" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input id="password" type="password" v-model="form.password" required />
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirm Password:</label>
        <input id="confirmPassword" type="password" v-model="form.confirmpassword" required />
      </div>
      <button class="btn" type="submit">Signup</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'

const error = ref('');
const router = useRouter();
const store = useStore();

const form = reactive({
  username: '',
  password: '',
  confirmpassword: ''
});

const handleSignup = async () => {
  if (form.password !== form.confirmpassword) {
    error.value = 'Passwords do not match';
    return;
  }

  try {
    const user = await store.dispatch('signup', form);
    if (user) {
      router.push('/dashboard');
    } else {
      error.value = 'Signup failed. Please try again.';
    }
  } catch (e) {
    console.error('Error during signup:', e);
    error.value = 'An error occurred. Please try again.';
  }
};
</script>

<style scoped>
.signup-container {
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

.signup-container h1 {
  margin-bottom: 20px;
  color: #333;
}

.signup-form {
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
