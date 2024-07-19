<!-- <template>
  <header>
    

    <div class="wrapper">
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<script setup>
import { useRouter, RouterView } from 'vue-router'
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()
const router = useRouter()


</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style> -->

<template>
  <header>
  <div id="app">
    <nav class="nav">
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/login">Login</router-link></li>
        <li><router-link to="/signup">Signup</router-link></li>
        <li v-if="isAuthenticated"><button  @click="logout" class="logout-button">Logout</button></li>
    </ul>
    </nav>
  </div>
  </header>

  <RouterView />
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, RouterView } from 'vue-router'

const store = useStore()
const router = useRouter()

const isAuthenticated = computed(() => store.getters.isAuthenticated)

const logout = () => {
  store.dispatch('logout')
  router.push('/login')
}
</script>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
}
ul {
  list-style-type: none;
  display: flex;
  gap: 10px;
}
.logout-button {
  background-color: #2d85bd6c;
  color: white;
  border: none;
  padding: 16px 17px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.logout-button:hover {
  background-color: #5a6a885d;
}
.logout-button:focus {
  outline: none;
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
</style>
