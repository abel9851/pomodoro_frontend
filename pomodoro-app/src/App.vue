<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import TaskList from './components/TaskList.vue'
import Timer from './components/Timer.vue'
</script>

<template>
  <div class="container"> <!-- what is class, container?-->
    <main class="main-content">
      <div>
        <Timer />
      </div>
      <!-- <HelloWorld msg="Vite + Vue" /> -->
      <!-- <router-view></router-view> -->
      <TaskList />
    </main>
  </div>
</template>

<style scoped>
.container {
  display: flex; /* what is flex? */
}
.main-content {
  flex: 1;
  padding: 3rem;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
