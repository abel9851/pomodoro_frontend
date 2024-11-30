// 내가 만든 이것을 time slider, scroll timer interface, 
// scrollable time selector
// scrollable time picker
// https://codesandbox.io/examples/package/time-picker-scroll
// javascript slider
// Timer Variables
let minutes = 60;
let seconds = 0;
let timeInterval = null;

// DOM Elements
const timeDisplay = document.getElementById("timeDisplay");
const scrollArea = document.getElementById("scrollArea");
const scrollBar = document.getElementById("scrollBar");
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const resetButton = document.getElementById("resetButton");

// Function to Update Time Display
function updateTimeDisplay() {
    // padStart는 string을 덮어 쓰는 것?
    // 주어진 문자열이 첫번째 인자의 길이가 되도록 두번쨰 인자의 값을 추가한다.
    // 즉, 두번째 인자를 문자열의 첫번째부터 타겟의 길이가 되도록 덧대는 것이다.
    // https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
    const min = String(minutes).padStart(2, "0");
    const sec = String(seconds).padStart(2, "0");
    timeDisplay.textContent = `${min}:${sec}`;
}

// 60분이야.
// 60분은 60*60초야.
// 즉, 3600초야.
// tick 하나당 10초야.
// 360개의 tick이 있어야해.
// wheel을 돌리면 10초씩 움직여야해.
// 현재 px은?
// 7200px이야.
// tick 하나당 20px?
// 즉, wheel을 돌리면 20px씩 움직여야해.

function createTicks() {
    const totalTicks = 360;
    for (let i = 0; i < totalTicks; i++) {
        const tick = document.createElement("div");
        tick.classList.add("tick");
        scrollBar.appendChild(tick);
    }
}

createTicks();

let scrollPosition = 0; // scrollBar의 width과 같게 설정해야한다. ? 다르다.

// wheel이라는 이벤트가 안맞는듯 하다.
// TODO: wheel말고도 잡아끌기를 했을때에도 동작하게 할 것
scrollArea.addEventListener("wheel", (e) => {
    // 브라우저의 스크롤 바의 행동을 막는 듯 하다.
    // 여기에 나온 e는 무엇을 뜻하는가? <div class="scroll-area" id="scrollArea">를 뜻하는건가?
    // 이 div에 관해서는 브라우저의 스크롤 바의 행동을 막는건가?
    // 확인해보니까 이 요소에 대해 wheel의 동작이 되지 않도록 막는 것이다.
    // https://developer.mozilla.org/ko/docs/Web/API/Event/preventDefault
    e.preventDefault();

    // to capture the vertical scroll amount from wheel event?
    // why vertical? i don't understand.
    // i think there must be horizon(?)
    // e is event object that is passed to ther event handler.
    // A positive value indicates that the user is scrolling down.
    // A negative value indicates taht thee user is scrolling up.
    // https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent/deltaY
    // delta는 여기서 변화량
    // 일반적으로 두 값의 차이를 의믜한다.
    const delta = e.deltaY;
    // Adjust minutes
    // A positive value indicates that the user is scrolling down.
    // when the user is scrolling down, delta value is 오른다.

    // scrollPosition += delta; // scrollbar를 wheel의 세기만큼 움직이게 해선 안된다. 균등하게 해야한다.
    // delta +가 감지되면, wheel을 아래로 한다는 뜻이다. -> 그러면 minutes가 줄어든다.
    // delta -가 감지되면, wheel을 위로 올린다는 뜻이다.
    // wheel은, 돌리면 그게 console단위당, 값이 강도에 따라 엄청 변하는데
    // console.log의 단위가 어떤 기준인지는 몰라도, 거기에 맞춰서 px을 균등하게 연산할 수 있어.
    let scrollStep = 7; // Define a fixed scroll step, 20px씩 더하거나 뺀다.


    // scroll을 위로 올리면  - * - 로, +가 된다. 7200까지 도달하면, 60분에 tick이 멈춘다.

    // Ensure the scroll position is within bounds (0 to 7200px range)
    // 전제가 틀렸다. delta의 상한선을 정하면 안되는 거였다.
    // delta는 wheel의 세기에 따라 올라가는 폭이 다르기 때문에
    // 00:00에 도달하는 수치가 제각각이기 때문이다.

    // wheel의 delta는 wheel의 강도에 따라 변화가 너무 심하니까 이걸 사용하면 안될거 같다.


    // Update the scrollBar transform to move the scroll position
    // scrollPosition만큼, 이동하는건데, 0이되면 0px움직인다는것으로, 움직이 않아야해.
    // 그런데 scroll down을 해서 position 7200이상이 되면, 7200px을 계속 움직인다는거니까
    // 이건 말이 안되거든? 
    // scrollBar.style.transform = `translateX(${-}px)`;
    // https://developer.mozilla.org/en-US/docs/Web/CSS/transform

    if (delta > 0) {
        // Scrolling down (decrease time)
        // Is || mean OR operation? 
        if (minutes > 0 || seconds > 0) {
            seconds -= 10;
            if (seconds < 0) {
                seconds = 50;
                minutes--;
            }
        }
    } else {
        // Scrolling up (increase time)
        if (minutes < 60) {
            seconds += 10;
            if (seconds >= 60) {
                seconds = 0;
                minutes++;
            }
        }
    }

    // 움직이지 않았던 이유는 index.html의 script의 파일에 지정된 js명이 달랐기 때문이다...
    if (minutes > 60) {
        // BUG: wheel event를 해서 59분에 도달하면 휠 동작이 멈추지만 초는 멈추지 않는다.
        // FIXME: 초도 멈추도록 고정한다.
        // FIXED: 초가 멈추도록 seconds = 0;을 했다.
        minutes = 60;
        seconds = 0;
    };
    if (minutes < 0) {
        minutes = 0;
        seconds = 0;
    }

    // Update the time display and the scroll position
    updateTimeDisplay();

    if (minutes == 60) { // 7200px corresponds to 60:00
        // wheel을 아래로 내리면 여기가 실행된다.
        console.log("minutes 60이상일 때", { scrollPosition })
        scrollPosition = 7; // 어느 한쪽을 0으로 해서는 안된다. 7200px에 도달해야한다. 
        // scrollPosition이 +가 되는 경우는 언제인가?
        // wheel을 아래로 내리면 발생한다.
        // - * - 로 해서 translateX으로 인해 움직인다. 즉, 왼쪽을 향해 움직인다.
        // 오른쪽으로 빈칸이 발생한다.
        // 이 전제는 flex-start여야한다.
    } else if (minutes == 0 && seconds == 0) { // 0px corresponds to 00:00
        // wheel을 위로 올리면, 여기가 실행된다.
        console.log("minutes 일때", { scrollPosition })
        // scrollPosition이 -가 되는 경우는 언제인가?
        // wheel을 위로 올리면 발생한다.
        // - * + 로해서 translateX로 인해, tick들이 오른쪽을 향해 움직인다. |||| ->
        // 왼쪽으로 빈칸이 발생한다.
        scrollPosition = 2507; // start가 0일때 위치가 scroll-area의 오른쪽 가장자리니까 2880px만큼 다 빼버리면 결국 start지점까지 빼도록 되어버린다. 그렇기 때문에 scroll-area의 폭만큼을 남겨야하기때문에 2507(tick의 위치조정을 위해 미묘하게 조정)이 된것이다.
    }

    if (delta > 0) {
        // Scrolling down
        console.log("scroll down delta:", { delta });
        scrollStep = scrollStep; // tick이 오른쪽으로 움직인다.
    } else {
        // Scrolling up
        console.log("scroll up delta:", { delta });
        scrollStep = -scrollStep; // tick이 왼쪽으로 움직인다.
    }
    console.log("현재 scrollPosition의 값:", { scrollPosition })
    scrollPosition += scrollStep;
    scrollBar.style.transform = `translateX(${scrollPosition}px)`; // 누적이 아니다.

});
// Initial Display Update
// updateTimeDisplay();

function startInterval() {

    if (minutes == 0 && seconds == 0) {
        clearInterval(timeInterval);
        timeInterval = null;
    }

    if (seconds == 0) {
        scrollPosition += 0.7;
        scrollBar.style.transform = `translateX(${scrollPosition}px)`;
        seconds = 59;
        minutes--;
    } else {
        seconds--;
        scrollPosition += 0.7;
        scrollBar.style.transform = `translateX(${scrollPosition}px)`;

    }

    updateTimeDisplay();
}

function setTimer() {
    if (timeInterval) return; // Prevent multiple intervals
    timeInterval = setInterval(startInterval, 1000);
};



function stopInterval() {
    clearInterval(timeInterval);
    timeInterval = null;
};

function resetInterval() {
    clearInterval(timeInterval);
    timeInterval = null;
    minutes = 60;
    seconds = 0;

    scrollPosition = 0;
    // translateX는 대상을 주어진 인자의 숫자만큼 한번만 이동시키는 것이지, 주기적으로 이동시키는게 아니다.
    // 주기적으로 이동시키려면 setInterval같은 걸 사용하면 된다.
    scrollBar.style.transform = `translateX(${scrollPosition}px)`;
    updateTimeDisplay();
}

startButton.addEventListener("click", setTimer);
stopButton.addEventListener("click", stopInterval);
resetButton.addEventListener("click", resetInterval);