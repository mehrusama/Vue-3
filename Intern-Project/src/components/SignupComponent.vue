<template>
    <div class="signup-container">
    <form name="signup-form" @submit.prevent="handleSignup">
      <div>
        <label for="email">Email:</label>
        <input id="email" type="email" placeholder="Enter Email" v-model="form.email" required />
      </div>
      <div>
      <label for="username">Username:</label>
        <input id="username" type="text" placeholder="Enter Username" v-model="form.username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input id="password" type="password" v-model="form.password" required />
      </div>
      <div>
        <label for="confirmPassword">Confirm Password:</label>
        <input id="confirmPassword" type="password" v-model="form.confirmpassword" required />
      </div>
      <button class="button" type="submit">Signup</button>
      <p v-if="error">{{ error }}</p>
    </form>
  </div> 
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  
  const error = ref('')
  const store = useStore()
  const router = useRouter()
  
  const form = reactive({
     email: '',
     username: '',
     password: '',
     confirmpassword: ''
})

  const handleSignup = async () => {
    if (form.password !== form.confirmpassword) {
      alert('Passwords do not match!');
      return
    }
    try{
    const user = await store.dispatch('signup', form);
    if (user) {
      console.log(user)
      router.push('/')
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
    text-align: center;
    padding: 20px;
    box-sizing: border-box;
  }
  
  h1 {
    font-size: 2.5em;
    margin-bottom: 20px;
    animation: fadeIn 2s ease-in-out;
  }
  
  form div {
    margin-bottom: 10px;
  }
  
  button {
    padding: 10px 20px;
    font-size: 1em;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
  }
  
  button:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }
  
  button:active {
    background-color: #003d82;
  }
  
  .error {
    color: red;
    margin-top: 10px;
  }
  </style>
  