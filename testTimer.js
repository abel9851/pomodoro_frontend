const timeDisplay = document.getElementById("timeDisplay");
const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");
const stopButton = document.getElementById("stopButton");


let minutes = 60;
let seconds = 0;

let timerInterval = null;

function updateTimeDisplay() {
    const min = String(minutes).padStart(2, "0");
    const sec = String(seconds).padStart(2, "0");

    timeDisplay.textContent = `${min}:${sec}`;

};

function startInterval() {
    if (minutes == 0 && seconds == 0) {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    if (seconds == 0) {
        seconds = 59;
        minutes--;
    } else {
        seconds--;
    }

    updateTimeDisplay();
};

// 새로 배우는 것은 3번 반복하기
function setTimer() {
    console.log(timerInterval);
    if (timerInterval) return; // Prevent multiple intervals

    // 첫번째 인자로 설정된 함수가 실행되면, 간격이 두번째를 기준으로 처리된다.
    timerInterval = setInterval(startInterval, 1000); // 1초당 한번씩 첫번째 인자의 함수를 실행하기. 실행 -> 인터벌확인 -> 실행 반복
};



// clearInterval과 timerInterval을 null로 설정하는게 정말 중요하다.
// 3 EventListener에 다 사용되니까 말이다.
startButton.addEventListener("click", setTimer);
resetButton.addEventListener("click", () => {
    minutes = 60;
    seconds = 0;
    clearInterval(timerInterval);
    timerInterval = null;
    updateTimeDisplay();
});
stopButton.addEventListener("click", () => {
    clearInterval(timerInterval);
    timerInterval = null;
});