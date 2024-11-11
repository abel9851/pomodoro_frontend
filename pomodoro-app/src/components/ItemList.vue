<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

const items = ref([])

onMounted(async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/items/')
        items.value = response.data
    } catch (error) {
        console.error(error)
    }
})
</script>

<template>
    <div>
        <h2>Item List</h2>
        <ul>
            <li v-for="item in items" :key="item.id">{{ item.name }}: {{ item.description }}</li>
        </ul>
    </div>
</template>

<style scoped>
ul {
    list-style-type: none;
    padding: 0;
}
li {
    margin: 0.5em 0;
}
</style>