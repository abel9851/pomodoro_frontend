// Timer Variables
let minutes = 60;
let seconds = 0;

// DOM Elements
const timeDisplay = document.getElementById("timeDisplay");
const scrollArea = document.getElementById("scrollArea");
const scrollBar = document.getElementById("scrollBar");

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

function createTicks() {
    const totalTicks = 360;
    for (let i = 0; i < totalTicks; i++) {
        const tick = document.createElement("div");
        tick.classList.add("tick");
        scrollBar.appendChild(tick);
    }
}

createTicks();

let scrollPosition = 0;

// Event Listener for Scrolling
let lastY = 0;
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

    scrollPosition += delta;
    console.log("현재 scrollPosition의 값:", { scrollPosition })
    // Ensure the scroll position is within bounds (0 to 7200px range)
    // 전제가 틀렸다. delta의 상한선을 정하면 안되는 거였다.
    // delta는 wheel의 세기에 따라 올라가는 폭이 다르기 때문에
    // 00:00에 도달하는 수치가 제각각이기 때문이다.
    if (scrollPosition > 1923) { // 7200px corresponds to 60:00
        // wheel을 아래로 내리면 여기가 실행된다.
        console.log("7200이상일 때", { scrollPosition })
        // scrollPosition = 0;
    } else if (scrollPosition < 0) { // 0px corresponds to 00:00
        // wheel을 위로 올리면, 여기가 실행된다.
        console.log("0이하 일때", { scrollPosition })
        scrollPosition = 0;

    }

    // Update the scrollBar transform to move the scroll position
    // scrollPosition만큼, 이동하는건데, 0이되면 0px움직인다는것으로, 움직이 않아야해.
    // 그런데 scroll down을 해서 position 7200이상이 되면, 7200px을 계속 움직인다는거니까
    // 이건 말이 안되거든? 
    scrollBar.style.transform = `translateX(${-scrollPosition}px)`; // scroll을 위로 올리면  - * - 로, +가 된다. 7200까지 도달하면, 60분에 tick이 멈춘다.
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
});
// Initial Display Update
// updateTimeDisplay();
