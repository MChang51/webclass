// 取得畫面元素
var timerDisplay    = document.getElementById("timerDisplay");
var durationSelect  = document.getElementById("durationSelect");
var startButton     = document.getElementById("startButton");
var pauseButton     = document.getElementById("pauseButton");
var resetButton     = document.getElementById("resetButton");
var statusText      = document.getElementById("statusText");
var animalImage     = document.getElementById("animalImage");

var dogButton       = document.getElementById("dogButton");
var catButton       = document.getElementById("catButton");
var rabbitButton    = document.getElementById("rabbitButton");
var sheepButton     = document.getElementById("sheepButton");

// 狀態變數
var totalSeconds     = Number(durationSelect.value);
var remainingSeconds = totalSeconds;
var timerId          = null;
var currentAnimal    = "dog";
var currentState     = "focus";

// 動物名稱
function getAnimalName(animal) {
    if (animal === "dog")    return "波波";
    if (animal === "cat")    return "米米";
    if (animal === "rabbit") return "球球";
    return "多多";
}

// 動物圖片 alt 文字
function getAnimalAlt(animal, state) {
    var action = "戴著眼鏡認真讀書";
    if (state === "sleep") {
        action = "閉眼趴著睡覺";
    }
    return getAnimalName(animal) + action;
}

// 更新動物圖片與名稱
function updateAnimal() {
    animalImage.src = "images/" + currentAnimal + "-" + currentState + ".png";
    animalImage.alt = getAnimalAlt(currentAnimal, currentState);
}

// 更新倒數顯示
function updateTimerDisplay() {
    var minutes = Math.floor(remainingSeconds / 60);
    var seconds = remainingSeconds % 60;
    var secondsText;
    if (seconds < 10) {
        secondsText = "0" + seconds;
    } else {
        secondsText = seconds;
    }
    timerDisplay.textContent = minutes + ":" + secondsText;
}

// 時間到
function finishTimer() {
    clearInterval(timerId);
    timerId = null;
    remainingSeconds = 0;
    currentState = "sleep";
    updateTimerDisplay();
    updateAnimal();

    statusText.textContent = "時間到！辛苦了，放鬆休息一下吧。";
    alert("專注時間結束！休息一下吧。");
}

// 開始計時
function startTimer() {
    if (timerId !== null) {
        return;
    }

    if (remainingSeconds === 0) {
        remainingSeconds = totalSeconds;
    }

    currentState = "focus";
    updateAnimal();
    statusText.textContent = "專注中...";

    timerId = setInterval(function () {
        remainingSeconds = remainingSeconds - 1;
        updateTimerDisplay();

        if (remainingSeconds <= 0) {
            finishTimer();
        }
    }, 1000);
}

// 暫停計時
function pauseTimer() {
    if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
        statusText.textContent = "暫停中，準備好了再繼續。";
    }
}

// 重設計時
function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    totalSeconds     = Number(durationSelect.value);
    remainingSeconds = totalSeconds;
    currentState     = "focus";
    statusText.textContent = "準備好了嗎？選一個適合你的專注時長。";
    updateTimerDisplay();
    updateAnimal();
}

// 切換動物
function changeAnimal(animalName, activeButton) {
    currentAnimal = animalName;

    dogButton.classList.remove("selected");
    catButton.classList.remove("selected");
    rabbitButton.classList.remove("selected");
    sheepButton.classList.remove("selected");

    activeButton.classList.add("selected");
    updateAnimal();
}

// 綁定計時器事件
startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);
durationSelect.addEventListener("change", resetTimer);

// 綁定動物切換事件
dogButton.addEventListener("click", function () {
    changeAnimal("dog", dogButton);
});
catButton.addEventListener("click", function () {
    changeAnimal("cat", catButton);
});
rabbitButton.addEventListener("click", function () {
    changeAnimal("rabbit", rabbitButton);
});
sheepButton.addEventListener("click", function () {
    changeAnimal("sheep", sheepButton);
});

// 初始化畫面
updateTimerDisplay();
updateAnimal();
