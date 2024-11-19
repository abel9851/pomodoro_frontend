<script setup>
import { ref, computed } from 'vue'

// 초기 설정
const totalMinutes = ref(25) // 기본값: 25분
const initialTime = computed(() => totalMinutes.value * 60)
const time = ref(initialTime.value)
let timer = null

// 현재 회전 각도 (눈금 이동용)
const currentAngle = ref(0)

// 타이머 시작/멈춤/리셋
const startTimer = () => {
    if (!timer) {
        timer = setInterval(() => {
            if (time.value > 0) {
                time.value--
                currentAngle.value += 360 / initialTime.value // 1초마다 각도 이동
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
    currentAngle.value = 0
    stopTimer()
}

// 숫자를 클릭하여 시간 설정
const selectMinutes = (index) => {
    const minutes = index * 5 // 클릭한 숫자를 분으로 변환
    totalMinutes.value = minutes || 1 // 최소 1분
    resetTimer()
}

// 포맷된 시간
const formattedTime = computed(() => {
    const minutes = Math.floor(time.value / 60)
    const seconds = time.value % 60
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
})

// 각도 계산 (눈금 및 숫자 배치용)
const tickAngles = Array.from({ length: 12 }, (_, i) => (i * 360) / 12) // 12개 눈금을 원형 배치
</script>

<template>
    <div class="timer">
        <!-- 중앙 시간 -->
        <p class="time-display">{{ formattedTime }}</p>

        <!-- 눈금 및 숫자 -->
        <div class="ticks-container">
            <!-- 눈금 -->
            <div
                class="ticks"
                :style="{ transform: `rotate(${currentAngle.value}deg)` }"
            >
                <span
                    v-for="(angle, index) in tickAngles"
                    :key="'tick-' + index"
                    class="tick"
                    :style="{
                        transform: `rotate(${angle}deg) translateY(-180px)`
                    }"
                ></span>
            </div>

            <!-- 숫자 -->
            <div
                class="labels"
                :style="{ transform: `rotate(${currentAngle.value}deg)` }"
            >
                <span
                    v-for="(angle, index) in tickAngles"
                    :key="'label-' + index"
                    class="label"
                    @click="selectMinutes(index)"
                    :style="{
                        transform: `rotate(${angle}deg) translateY(-220px) rotate(-${angle}deg)`
                    }"
                >
                    {{ index * 5 }}
                </span>
            </div>

            <!-- 삼각형 (현재 시간 표시) -->
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

/* 눈금 컨테이너 */
.ticks-container {
    position: relative;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    cursor: pointer;
}

/* 눈금 */
.tick {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2px;
    height: 20px;
    background-color: rgba(255, 255, 255, 0.5);
    transform-origin: center bottom;
}

/* 숫자 */
.label {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 1.2rem;
    font-weight: bold;
    color: white;
    transform-origin: center bottom;
    cursor: pointer;
}

/* 삼각형 (현재 시간 표시) */
.triangle {
    position: absolute;
    bottom: -10px;
    left: 50%;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 15px solid white;
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
