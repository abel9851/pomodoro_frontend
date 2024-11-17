<script setup>
import { ref, computed } from 'vue'

const initialTime = 25 * 60 // 25분을 초로 변환한다.
const time = ref(initialTime)
let timer = null

const startTimer = () => {
    if (!timer) {
        timer = setInterval(() => { // setInterval() 함수는 일정 시간 간격으로 작업을 수행하기 위해 사용한다.
            if (time.value > 0) {
                time.value--
            } else {
                stopTimer() // 타이머를 중지한다.
            }
        }, 1000)
    }
}

const stopTimer = () => {
    clearInterval(timer) // clearInterval() 함수는 setInterval() 함수로 설정된 타이머를 제거한다.
    timer = null // 타이머를 초기화한다. clearInterval()를 했는데 timer가 null이 아니면 startTimer()를 호출할 때 setInterval()이 중복으로 실행되는 문제가 발생할 수 있다.
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

const progress = computed( () => {
    return Math.floor((initialTime - time.value) / (initialTime / 25))
})

const getEllipsePoint = (angle, a, b) => {
    const rad = (Math.PI * angle) / 180
    return {
        x: a * Math.cos(rad),
        y: b * Math.sin(rad),
    }
}

</script>


<template>
    <div class="timer">
        <p>{{ formattedTime }}</p>
        <div class="ticks-container">
            <div class="ticks">
                <span v-for="n in 25" :key="n" class="tick" :style="{ opacity: n <= progress ? 0.2 : 1, transform: `translate(${getEllipsePoint((n - 1) * (180 / 24), 200, 100).x}px, ${getEllipsePoint((n - 1) * (180 / 24), 200, 100).y}px)` }">|</span>
            </div>
            <div class="labels">
                <span>0</span>
                <span>25</span>
            </div>
        </div>
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
.ticks-container {
    position: relative;
    width: 40rem;
    height: 20rem;
    border-radius: 50% / 100%;
    /* border: 1rem solid white; */
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}
.ticks {
    position: relative;
    width: 100%;
    height: 100%;
}
.tick {
    position: absolute;
    top: 50%;
    left: 50%;
    transform-origin: center bottom;
    font-size: 1.5rem;
    transition: opacity 0.5s;
}
.labels {
    display: flex;
    justify-content: space-between;
    width: 100%;
    position: absolute;
    top: -0.3rem;
}
button {
    margin: 0.5rem;
}
</style>