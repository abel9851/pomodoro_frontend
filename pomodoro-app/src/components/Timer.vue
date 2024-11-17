<script setup>
import { ref, computed } from 'vue'
const time = ref(0)
let timer = null

const startTimer = () => {
    if (!timer) {
        timer = setInterval(() => {
            time.value++
        }, 1000)
    }
}

const stopTimer = () => {
    clearInterval(timer)
    timer = null
}

const resetTimer = () => {
    time.value = 0
    stopTimer()
}

const formattedTime = computed(() => {
    const minutes = Math.floor(time.value / 60)
    const seconds = time.value % 60
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
})
</script>


<template>
    <div class="timer">
        <p>{{ formattedTime }}</p>
        <button @click="startTimer">Start</button>
        <button @click="stopTimer">Stop</button>
        <button @click="resetTimer">Reset</button>
    </div>
</template>

<style scoped>
.timer {
    display: flex;
    flex-direction: column;
    align-items: center;
}
button {
    margin: 0.5rem;
}
</style>