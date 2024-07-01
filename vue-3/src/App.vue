<!-- <script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div id="app" >
    <nav class="navbar">
      <ul>
        <li><router-link class="active" to="/dashboard">Dashboard</router-link></li>
        <li><router-link to="/login">Login</router-link></li>
        <li><router-link to="/signup">SignUp</router-link></li>
      </ul>
      <RouterView />
    </nav>
  </div>
</template>

<style scoped>
/* .home-container {
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
} */
 template {
  margin: 0;
  padding: 0;
} 

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
  position: fixed;
  top: 0;
  width: 100%;
}

li {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: left;
  padding: 14px 16px;
  text-decoration: none;
}

li a:hover:not(.active) {
  background-color: #111;
}

.active {
  background-color: #04aa6d;
}
</style> -->


<template>
  <nav class="navbar">
    <ul>
      <li><router-link to="/dashboard">Dashboard</router-link></li>
      <li><router-link to="/login">Login</router-link></li>
      <li><router-link to="/signup">Signup</router-link></li>
      <li v-if="isAuthenticated"><button @click="logout">Logout</button></li>
    </ul>
  </nav>
  <RouterView />
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter, RouterView } from 'vue-router';

const store = useStore();
const router = useRouter();

const isAuthenticated = computed(() => store.getters.isAuthenticated);

const logout = () => {
  store.dispatch('logout');
  router.push('/login');
};
</script>

<style scoped>
/* Add your styles here */
nav {
  display: flex;
  justify-content: space-between;
}
ul {
  list-style-type: none;
  display: flex;
  gap: 10px;
}
button {
  background: none;
  border: none;
  color: blue;
  cursor: pointer;
}
</style>
