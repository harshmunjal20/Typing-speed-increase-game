const startBtn = document.getElementById("startBtn");
const textDisplay = document.getElementById("textDisplay");
const inputArea = document.getElementById("inputArea");
const timerDisplay = document.getElementById("timer");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");

const sentences = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing fast requires a lot of practice and focus.",
  "JavaScript can make web pages interactive and dynamic.",
  "Practice makes perfect when learning new skills.",
  "Frontend development includes HTML, CSS, and JavaScript.",
  "Coding every day improves your logical thinking.",
  "Never give up, great things take time to build.",
  "Debugging is twice as hard as writing the code in the first place.",
  "Keep your code clean and well-commented.",
  "Every programmer was once a beginner."
];

let timer;
let startTime;
let interval;
let currentSentence = "";

startBtn.addEventListener("click", startGame);

function startGame() {
  currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
  inputArea.disabled = false;
  inputArea.value = "";
  textDisplay.innerHTML = "";

  currentSentence.split("").forEach(char => {
    const span = document.createElement("span");
    span.innerText = char;
    textDisplay.appendChild(span);
  });

  inputArea.focus();
  startTime = Date.now();
  timerDisplay.innerText = 0;
  clearInterval(interval);
  interval = setInterval(updateTimer, 1000);
}

inputArea.addEventListener("input", () => {
  const input = inputArea.value.split("");
  const spanElements = textDisplay.querySelectorAll("span");
  let correct = 0;
  let total = input.length;

  spanElements.forEach((span, i) => {
    const char = input[i];
    if (!char) {
      span.classList.remove("correct", "incorrect");
    } else if (char === span.innerText) {
      span.classList.add("correct");
      span.classList.remove("incorrect");
      correct++;
    } else {
      span.classList.add("incorrect");
      span.classList.remove("correct");
    }
  });

  const timeElapsed = (Date.now() - startTime) / 1000 / 60;
  const wpm = Math.round((correct / 5) / timeElapsed);
  const accuracy = Math.round((correct / total) * 100);

  wpmDisplay.innerText = isFinite(wpm) ? wpm : 0;
  accuracyDisplay.innerText = isFinite(accuracy) ? accuracy + "%" : "0%";

  if (input.join("") === currentSentence) {
    clearInterval(interval);
    inputArea.disabled = true;
  }
});

function updateTimer() {
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  timerDisplay.innerText = elapsed;
}