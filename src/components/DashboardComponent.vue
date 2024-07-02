<template>
  <div class="home-container">
    <h1 class="h1">Welcome to the Dashboard!</h1>
    <h1 class="h1">Usama!</h1>
    <!-- <router-link to="/login">Go to Login</router-link>
  <router-link to="/signup">Signup</router-link>  -->
  </div>
  <div>
    <h1>Welcome to Teresol!</h1>
    <h2>Welcome to Teresol!</h2>
    <h3>Welcome to Teresol!</h3>
  </div>
</template>

<script setup></script>

<!-- <style scoped>
.h1 {
  color: #ffee00;
  background-color: rgb(204, 30, 210);
  text-align: center;
  padding: 20px;
  margin-top: 300px;
}
</style> -->
<style scoped>
.home-container {
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
  transition:
    background-color 0.3s,
    transform 0.3s;
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
</style>
