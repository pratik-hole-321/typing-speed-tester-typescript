// Sentence List
const sentences: string[] = [
  "The quick brown fox jumps over the lazy dog.",
  "TypeScript makes JavaScript development safer.",
  "Practice typing every day to improve your speed.",
  "Frontend development requires both logic and design.",
  "React is a powerful library for building UIs.",
];

// DOM elements
const sentenceDisplay = document.getElementById(
  "sentence"
) as HTMLParagraphElement;
const input = document.getElementById("input") as HTMLTextAreaElement;
const resultDisplay = document.getElementById("result") as HTMLParagraphElement;
const restartBtn = document.getElementById("restart") as HTMLButtonElement;

// State variables
let currentSentence = "";
let startTime = 0;
let timerStarted = false;

function loadSentence(): void {
  const randomIndex = Math.floor(Math.random() * sentences.length);
  currentSentence = sentences[randomIndex];
  sentenceDisplay.textContent = currentSentence;
  input.value = "";
  resultDisplay.textContent = "";
  timerStarted = false;
}

// Function to calculate result
function calculateResults(): void {
  const endTime = new Date().getTime();
  const timeTaken = (endTime - startTime) / 1000; // in seconds
  const typedText = input.value.trim();

  const wordCount = typedText.split(" ").filter((word) => word !== "").length;
  const wpm = Math.round((wordCount / timeTaken) * 60);

  let correctChars = 0;
  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] === currentSentence[i]) {
      correctChars++;
    }
  }

  // const accuracy = Math.round((correctChars / currentSentence.length) * 100);
  // resultDisplay.textContent = `Speed : ${wpm} WPM | Accuracy: ${accuracy}%`;
  resultDisplay.textContent = `Speed : ${wpm} WPM`;
}

// input event to start timer and check completion
input.addEventListener("input", () => {
  if (!timerStarted) {
    startTime = new Date().getTime();
    timerStarted = true;
  }
  if (input.value.trim() === currentSentence) {
    calculateResults();
  }
});

// Restart Button
restartBtn.addEventListener("click", loadSentence);

// Initialize on page load
loadSentence();
