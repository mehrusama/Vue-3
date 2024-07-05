<template>
  <div class="task-container">
    <div>
      <h1>To-Do List</h1>
      <ul>
        <li v-for="task in tasks" :key="task.id">
          <span v-for="prop in displayedProps">{{ task[prop] }}</span>
          <button style="background-color: green" @click="editTask(task)">Update</button>
          <button style="background-color: red" @click="deleteTask(task.id)">Delete</button>
        </li>
      </ul>
      <form v-if="addtask" @submit.prevent="addTask">
        <input v-model="newTask.title" placeholder="Title" required />
        <input v-model="newTask.description" placeholder="Description" required />
        <input v-model="newTask.dueDate" type="date" required />
        <select v-model="newTask.priority" required>
          <option disabled value="">Select Priority</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <button class="add-btn" type="submit">Add Task</button>
      </form>
      <button v-if='!addtask' @click="addtask=true" class="add-btn" type="submit">Add Task</button>
      <form v-if="isEditing" @submit.prevent="updateTask">
        <input v-model="currentTask.title" placeholder="Title" required />
        <input v-model="currentTask.description" placeholder="Description" required />
        <input v-model="currentTask.dueDate" type="date" required />
        <select v-model="currentTask.priority" required>
          <option disabled value="">Select Priority</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <button class="update-btn" type="submit">Update Task</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const tasks = ref(store.getters.allTasks)
const displayedProps = ref(['title', 'description', 'dueDate', 'priority'])
const newTask = reactive({
  title: '',
  description: '',
  dueDate: '',
  priority: '',
  completed: false
})
let currentTask = reactive({title: '', description: '', dueDate: '', priority:'' })
const isEditing = ref(false)
const addtask = ref(false)
onMounted(async () => {
  await store.dispatch('fetchTasks')
  tasks.value = store.getters.allTasks
})

const addTask = async () => {
  await store.dispatch('addTask', newTask)
  addtask.value = false
  tasks.value = store.getters.allTasks
}

const editTask = (task) => {
  currentTask =  task 
  isEditing.value = true
}
const updateTask = async () => {
  await store.dispatch('updateTask', currentTask)
  currentTask = { id: null, title: '', description: '', dueDate: '', priority: '' }
  isEditing.value = false
  tasks.value = store.getters.allTasks
}

const deleteTask = async (task) => {
  await store.dispatch('deleteTask', task)
  tasks.value = store.getters.allTasks
}

</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

button {
  margin: 10px;
}

h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
  animation: fadeIn 2s ease-in-out;
}

button {
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

button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

button:active {
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
  box-sizing: content-box;
}
</style>
