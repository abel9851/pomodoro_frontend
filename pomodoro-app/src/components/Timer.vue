<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const totalMinutes = ref(25) // 기본값 25분
const initialTime = computed(() => totalMinutes.value * 60)
const time = ref(initialTime.value)
let timer = null

// 드래그 상태
const isDragging = ref(false)
const dragPosition = ref(0) // 드래그 위치 추적

// 타이머 시작/멈춤/리셋
const startTimer = () => {
    if (!timer) {
        timer = setInterval(() => {
            if (time.value > 0) {
                time.value--
            } else {
                stopTimer()
            }
        }, 1000)
    }
}

const stopTimer = () => {
    clearInterval(timer)
    timer = null
}

const resetTimer = () => {
    time.value = initialTime.value
    stopTimer()
}

// 드래그 시작
const startDrag = (event) => {
    isDragging.value = true
    dragPosition.value = event.clientX // 시작 위치 저장
}

// 드래그 중
const onDrag = (event) => {
    if (!isDragging.value) return
    const deltaX = event.clientX - dragPosition.value // 드래그 거리 계산
    const newMinutes = Math.round(totalMinutes.value + deltaX / 10) // 이동 거리 -> 분 변환
    totalMinutes.value = Math.max(1, Math.min(newMinutes, 60)) // 1~60분 제한
}

// 드래그 종료
const stopDrag = () => {
    if (!isDragging.value) return
    isDragging.value = false
}

// 포맷된 시간 계산
const formattedTime = computed(() => {
    const minutes = Math.floor(time.value / 60)
    const seconds = time.value % 60
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
})

// 전역 이벤트 리스너 추가/제거
onMounted(() => {
    window.addEventListener('mousemove', onDrag)
    window.addEventListener('mouseup', stopDrag)
})

onUnmounted(() => {
    window.removeEventListener('mousemove', onDrag)
    window.removeEventListener('mouseup', stopDrag)
})
</script>

<template>
    <div class="timer">
        <!-- 중앙 시간 -->
        <p class="time-display">{{ formattedTime }}</p>

        <!-- 숫자와 막대 가로 배치 -->
        <div class="ticks-container" @mousedown="startDrag">
            <div class="tick" v-for="n in 60" :key="n">
                <span :class="{ active: n === totalMinutes.value }" class="tick-number">
                    {{ n }}
                </span>
                <div :class="{ active: n === totalMinutes.value }" class="tick-bar"></div>
            </div>
            <!-- 정삼각형 눈금 -->
            <div class="triangle"></div>
        </div>

        <!-- 컨트롤 버튼 -->
        <div class="controls">
            <button @click="startTimer">Start</button>
            <button @click="stopTimer">Stop</button>
            <button @click="resetTimer">Reset</button>
        </div>
    </div>
</template>

<style scoped>
/* 타이머 전체 */
.timer {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #d32f2f;
    color: white;
    height: 100vh;
    justify-content: center;
    font-family: Arial, sans-serif;
}

/* 중앙 시간 */
.time-display {
    font-size: 3.5rem;
    margin-bottom: 2rem;
    font-weight: bold;
}

/* 숫자와 막대 컨테이너 */
.ticks-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    overflow-x: auto;
    width: 100%;
    padding: 1rem 0;
    cursor: grab;
}

/* 숫자 */
.tick {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 1rem;
}

.tick-number {
    font-size: 1.5rem;
    font-weight: bold;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 0.5rem;
    transition: color 0.2s;
}

.tick-number.active {
    color: white;
}

/* 막대 */
.tick-bar {
    width: 4px;
    height: 16px; /* 막대 길이 */
    background-color: rgba(255, 255, 255, 0.5);
    transition: background-color 0.2s;
}

.tick-bar.active {
    background-color: white;
}

/* 정삼각형 눈금 */
.triangle {
    position: absolute;
    top: 100%; /* 막대 컨테이너 아래로 배치 */
    left: 50%;
    width: 0;
    height: 0;
    border-bottom: 10px solid white;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    transform: translateX(-50%);
}

/* 컨트롤 버튼 */
.controls button {
    margin: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: black;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 1rem;
}

.controls button:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
}
</style>