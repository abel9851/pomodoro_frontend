<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import ItemList from './components/ItemList.vue'
</script>

<template>
  <div class="container"> <!-- what is class, container?-->
    <aside class="sidebar">  <!-- what is aside tag? -->
      <ItemList />
    </aside>
    <main class="main-content">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" class="logo" alt="Vite logo" />
        </a>
        <a href="https://vuejs.org/" target="_blank">
          <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
        </a>
      </div>
      <HelloWorld msg="Vite + Vue" />
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
.container {
  display: flex; /* what is flex? */
}
.sidebar {
  width: 250px; /* what is width? */
  padding: 1rem; /* what is padding, rem? */
}
.main-content {
  flex: 1;
  padding: 1rem;
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
