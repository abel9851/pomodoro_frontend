import { createRouter, createWebHistory } from 'vue-router'
import Item from '@/views/Item.vue'

const routes = [
    { path: "/projects/", name: "projects", component: Item },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router