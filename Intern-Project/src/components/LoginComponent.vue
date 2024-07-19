<template>
    <div class="login-container">
      <div class="login-box">
      <form name="login-form" @submit.prevent="handleLogin">
        <div class="input-group">
          <label for="email">Email:</label>
          <input v-model="form.email" type="email" required />
        </div>
        <div class="input-group">
          <label for="password">Password:</label>
          <input v-model="form.password" type="password" required />
        </div>
        <button type="submit" class="login-button">Login</button>
        <div class="additional-links">
          <a href="#" class="forgot-password">Forgot Password?</a>
          <a href="#" class="sign-up">Sign Up</a>
        </div>
        <p v-if="error">{{ error }}</p>
      </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
  
  const error = ref('')
  const store = useStore()
  const router = useRouter()

  const form = reactive({
  email: '',
  password: ''
})

const handleLogin = async () => {
  try {
    await store.dispatch('login', form)
    if (store.getters.getError) {
      alert(store.getters.getError)
    } else if (store.getters.isAdminAuthenticated) {
      router.push('/admin')
    } else if (store.getters.isAuthenticated) {
      router.push('/')
    }
  } catch (error) {
    alert('An error occurred while logging in. Please try again.');
  }
};
  </script>
  
  <style scoped>
body {
  margin: 0;
  padding: 0;
  font-family: 'Arial', sans-serif;
  background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

/* Container Style */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

/* Box Style */
.login-box {
  background: #ffffff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  animation: fadeIn 1s ease-in-out;
}

/* Title Style */
.login-title {
  margin-bottom: 20px;
  font-size: 30px;
  color: #333333;
}

/* Input Group Style */
.input-group {
  margin-bottom: 20px;
  text-align: left;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555555;
}

.input-group input {
  width: 100%;
  padding: 12px;
  border: 2px solid #dddddd;
  border-radius: 6px;
  box-sizing: border-box;
  transition: border-color 0.3s;
}

.input-group input:focus {
  border-color: #ff9a9e;
}

/* Button Style */
.login-button {
  width: 100%;
  padding: 12px;
  background: linear-gradient(to right, #ff758c, #ff7eb3);
  border: none;
  border-radius: 6px;
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: background 0.3s;
}

.login-button:hover {
  background: linear-gradient(to right, #ff7eb3, #ff758c);
}

/* Additional Links Style */
.additional-links {
  margin-top: 15px;
}

.additional-links a {
  color: #ff758c;
  text-decoration: none;
  margin: 0 10px;
  transition: color 0.3s;
}

.additional-links a:hover {
  color: #ff7eb3;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
  </style>
  