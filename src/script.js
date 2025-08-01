const timerInput = document.getElementById("timer-inp");
const timeOutput = document.getElementById("output-time");
const timerBtn = document.getElementById("timer-btn");
let timerId = null;
let timeCounter = 0;

timerBtn.addEventListener("click", startCountdown);

function startCountdown() {
    timeCounter = Number(timerInput.value);
    if (timerId !== null) {
        clearInterval(timerId);
        timeOutput.textContent = "Timer stopped!";
        timerBtn.textContent = "Set time";
        timerId = null;
        setTimeout(() => {
            timeOutput.textContent = "";
        }, 2000);
        return;
    };

    if (timerInput.value === "" || isNaN(timerInput.value)) {
        setTimeout(() => {
            timeOutput.textContent = "";
        }, 2000);
        timeOutput.textContent = "Error";
        return;
    };

    timerBtn.textContent = "Stop timer";

    timerId = setInterval(() => {
        timeCounter--;
        timeOutput.textContent = `Sec: ${timeCounter}`;

        if (timeCounter === 0) {
            timeOutput.textContent = "";
            timerBtn.textContent = "Set time";
            clearInterval(timerId);
            timerId = null;
            return;
        }
    }, 1000);
    timerInput.value = "";
}

const hourInp = document.getElementById("hour-input");
const minInp = document.getElementById("min-input");
const secInp = document.getElementById("sec-input");
const outputTime2 = document.getElementById("output-time2");
const setTimeBtn = document.getElementById("b1");
const pauseBtn = document.getElementById("b2");
const clearBtn = document.getElementById("b3");

let timerId2 = null;
let hours = 0;
let minutes = 0;
let seconds = 0;
let isPaused = false;

outputTime2.textContent = `00:00:00`;

function timeFormatter(time) {
    return time.toString().padStart(2, "0");
};

function updateDisplay() {
    outputTime2.textContent = `${timeFormatter(hours)}:${timeFormatter(minutes)}:${timeFormatter(seconds)}`;
};

setTimeBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseResume);
clearBtn.addEventListener("click", clearTimer);

function startTimer() {

    isPaused = false;

    if (timerId2 !== null) return;

    hours = parseInt(hourInp.value) || 0;
    minutes = parseInt(minInp.value) || 0;
    seconds = parseInt(secInp.value) || 0;

    if (seconds <= 0 && minutes <= 0 && hours <= 0) {
        outputTime2.textContent = "Invalid time!";
        return;
    };

    if (
        seconds < 0 ||
        seconds > 59 ||
        minutes < 0 ||
        minutes > 59 ||
        hours < 0 ||
        hours > 99
    ) {
        outputTime2.textContent = "Invalid time!";
        return;
    };

    hourInp.value = "";
    minInp.value = "";
    secInp.value = "";

    updateDisplay();

    timerId2 = setInterval(timerLoop, 1000);
};

function timerLoop() {
    if (hours === 0 && minutes === 0 && seconds === 0) {
        clearInterval(timerId2);
        timerId2 = null;
        hours = 0;
        minutes = 0;
        seconds = 0;
        hourInp.value = "";
        minInp.value = "";
        secInp.value = "";
        outputTime2.textContent = "Time is up!";

        setTimeout(() => {
            outputTime2.textContent = "00:00:00";
        }, 2000);

        return;

    };

    if (seconds === 0) {
        if (minutes === 0) {
            if (hours >= 1) {
                hours--;
                minutes = 59;
                seconds = 59;
            };
        } else {
            minutes--;
            seconds = 59;
        };
    } else {
        seconds--;
    };

    updateDisplay();

};

function pauseResume() {
    if (hours === 0 && minutes === 0 && seconds === 0) return;

    if (!isPaused) {
        isPaused = true;
        clearInterval(timerId2);
        timerId2 = null;
        pauseBtn.textContent = "Resume";
    } else {
        isPaused = false;
        timerId2 = setInterval(timerLoop, 1000);
        pauseBtn.textContent = "Pause";
    };
};

function clearTimer() {

    clearInterval(timerId2);
    timerId2 = null;
    hours = 0;
    minutes = 0;
    seconds = 0;
    hourInp.value = "";
    minInp.value = "";
    secInp.value = "";
    outputTime2.textContent = "00:00:00";
    return;
};

const windClockBtn = document.getElementById("set-clock-btn");
const stopClockBtn = document.getElementById("stop-clock-btn");
const clockOutput = document.getElementById("clock-output");
const hInput = document.getElementById("h-input");
const mInput = document.getElementById("m-input");
const sInput = document.getElementById("s-input");

let clockId = null;
let hrs = 0;
let mins = 0;
let secs = 0;

clockOutput.textContent = `00:00:00`;

function clockTimeFormatter(time) {
    return time.toString().padStart(2, "0");
};

function updateClockDisplay() {
    clockOutput.textContent = `${clockTimeFormatter(hrs)}:${clockTimeFormatter(mins)}:${clockTimeFormatter(secs)}`;
};

windClockBtn.addEventListener("click", windClock);
stopClockBtn.addEventListener("click", stopClock);

function windClock() {

    if (clockId !== null) return;

    hrs = parseInt(hInput.value) || 0;
    mins = parseInt(mInput.value) || 0;
    secs = parseInt(sInput.value) || 0;

    if (
        secs < 0 ||
        secs > 59 ||
        mins < 0 ||
        mins > 59 ||
        hrs < 0 ||
        hrs > 23
    ) {
        clockOutput.textContent = "Invalid time!";
        return;
    };

    hInput.value = "";
    mInput.value = "";
    sInput.value = "";

    updateClockDisplay();

    clockId = setInterval(clockLoop, 1000);
};

function clockLoop() {
    if (secs === 59) {
        if (mins === 59) {
            if (hrs === 23) {
                hrs = 0;
                mins = 0;
                secs = 0;
            } else {
                hrs++;
                mins = 0;
                secs = 0;
            };
        } else {
            mins++;
            secs = 0;
        };
    } else {
        secs++;
    };

    updateClockDisplay();

};

function stopClock() {
    clearInterval(clockId);
    clockId = null;
    hrs = 0;
    mins = 0;
    secs = 0;
    hInput.value = "";
    mInput.value = "";
    sInput.value = "";
    clockOutput.textContent = "00:00:00";
    return;
};

const stopwatchOutput = document.getElementById("stopwatch-output");
const stopwatchStartBtn = document.getElementById("stopwatch-start-btn");
const stopwatchStopBtn = document.getElementById("stopwatch-stop-btn");
const secWarning = document.getElementById("stopwatch-warning");
let stopwatchId = null;
let sec = 10;
let ms = 0;

stopwatchOutput.textContent = "10.00"

stopwatchStartBtn.addEventListener("click", startStopwatch);
stopwatchStopBtn.addEventListener("click", stopStopwatch);

function stopwatchSecFormatter() {
    return sec.toString().padStart(2, "0");
};

function stopwatchMsFormatter() {
    return ms.toString().padStart(2, "0");
};

function stopwatchUpdate() {
    stopwatchOutput.textContent = `${stopwatchSecFormatter()}:${stopwatchMsFormatter()}`;
};

function resetStopwatch() {
    clearInterval(stopwatchId);
    stopwatchId = null;
    sec = 10;
    ms = 0;
    stopwatchOutput.classList.remove("warning-active");

    stopwatchOutput.textContent = "10.00";
};

function startStopwatch() {
    if (stopwatchId !== null) return;

    resetStopwatch();
    stopwatchUpdate();

    stopwatchId = setInterval(() => {
        if (sec === 0 && ms === 0) {

            resetStopwatch();
            return;
        };

        if (sec <= 4) {
            stopwatchOutput.classList.add("warning-active");
        };

        if (ms === 0) {
            if (sec > 0) {
                sec--;
                ms = 99;
            }
        } else {
            ms--;
        }

        stopwatchUpdate();
    }, 10);
};

function stopStopwatch() {
    resetStopwatch();
    stopwatchOutput.textContent = "10.00";
};

const animatedBox = document.getElementById("animated-box");
const animationBtn = document.getElementById("animation-button");
const stopAnimationBtn = document.getElementById("stop-animating");
const countdownOutput = document.getElementById("countdown-output");
let animationId = null, countdownId = null;
let countdown;

animationBtn.addEventListener("click", startAnimationLoop);
stopAnimationBtn.addEventListener("click", stopAnimationLoop);

function startAnimationLoop() {
    if (animationId !== null || countdownId !== null) return;

    countdown = 5;
    countdownOutput.innerText = countdown;

    countdownId = setInterval(() => {
        countdown--;
        countdownOutput.innerText = countdown;

        if (countdown <= 0) {
            clearInterval(countdownId);
            countdownId = null;
            countdownOutput.innerText = "";

            pulseBox();

            animationId = setInterval(pulseBox, 5000);

        };
    }, 1000);

};

function pulseBox() {
    if (countdownId !== null) return;

    animatedBox.animate([
        { transform: "scale(1)", backgroundColor: "red", offset: 0 },
        { transform: "scale(1.3)", backgroundColor: "red", offset: 0.5 },
        { transform: "scale(1)", backgroundColor: "red", offset: 1 }
    ],
        {
            duration: 2000,
            iterations: 1,
            easing: "ease-in-out"
        });
};

function stopAnimationLoop() {
    if (animationId !== null) {
        clearInterval(animationId);
        animationId = null;
    };

    if (countdownId !== null) {
        clearInterval(countdownId);
        countdownId = null;
    };
};