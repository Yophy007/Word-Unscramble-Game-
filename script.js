window.onload = () => {
  const wordBanks = {
    1: ["cat", "dog", "sun", "car", "map"],
    2: ["tree", "milk", "frog", "book", "lamp"],
    3: ["plane", "stone", "clock", "dress", "fruit"],
    4: ["banana", "turtle", "window", "orange", "guitar"],
    5: ["laptop", "button", "pencil", "coffee", "gloves"],
    6: ["blanket", "diamond", "holiday", "monster", "weather"],
    7: ["elephant", "mountain", "sandwich", "umbrella", "children"],
    8: ["chocolate", "developer", "vegetable", "snowflake", "adventure"],
    9: ["dictionary", "generation", "understand", "motorcycle", "horizontal"],
    10: ["encyclopedia", "congratulate", "responsibility", "architecture", "conversation"]
  };

  let currentLevel = 1;
  let score = 0;
  let timer;
  let timeLeft = 30;
  let currentWord = "";
  let scrambledWord = "";
  let hintGiven = false;

  const startScreen = document.getElementById("start-screen");
  const gameScreen = document.getElementById("game-screen");
  const gameOverScreen = document.getElementById("game-over-screen");

  const startBtn = document.getElementById("start-btn");
  const submitBtn = document.getElementById("submit-btn");
  const restartBtn = document.getElementById("restart-btn");
  const hintBtn = document.getElementById("hint-btn");

  const levelDisplay = document.getElementById("level");
  const scoreDisplay = document.getElementById("score");
  const timerDisplay = document.getElementById("timer");
  const scrambledDisplay = document.getElementById("scrambled-word");
  const input = document.getElementById("user-input");
  const hintText = document.getElementById("hint-text");

  const finalScoreDisplay = document.getElementById("final-score");
  const gameOverTitle = document.getElementById("game-over-title");

  startBtn.onclick = startGame;
  submitBtn.onclick = checkAnswer;
  restartBtn.onclick = startGame;
  hintBtn.onclick = showHint;

  function startGame() {
    currentLevel = 1;
    score = 0;
    timeLeft = 30;
    hintGiven = false;

    startScreen.classList.remove("active");
    gameOverScreen.classList.remove("active");
    gameScreen.classList.add("active");

    loadLevel();
  }

  function loadLevel() {
    const words = wordBanks[currentLevel];
    currentWord = words[Math.floor(Math.random() * words.length)];
    scrambledWord = shuffleWord(currentWord);
    scrambledDisplay.textContent = scrambledWord;
    input.value = "";
    levelDisplay.textContent = currentLevel;
    scoreDisplay.textContent = score;
    hintText.textContent = "";
    hintGiven = false;

    resetTimer();
  }

  function shuffleWord(word) {
    let arr = word.split("");
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join("");
  }

  function checkAnswer() {
    if (input.value.toLowerCase() === currentWord) {
      score += 10;
      if (currentLevel < 10) {
        currentLevel++;
        loadLevel();
      } else {
        endGame(true);
      }
    } else {
      input.classList.add("shake");
      setTimeout(() => input.classList.remove("shake"), 300);
    }
  }

  function resetTimer() {
    clearInterval(timer);
    timeLeft = 30;
    timerDisplay.textContent = timeLeft;
    timer = setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = timeLeft;
      if (timeLeft <= 0) {
        endGame(false);
      }
    }, 1000);
  }

  function showHint() {
    if (!hintGiven) {
      hintText.textContent = `Hint: The word starts with "${currentWord[0]}"`;
      hintGiven = true;
    }
  }

  function endGame(won) {
    clearInterval(timer);
    gameScreen.classList.remove("active");
    gameOverScreen.classList.add("active");

    gameOverTitle.textContent = won ? "🎉 You Win!" : "⏰ Time's Up!";
    finalScoreDisplay.textContent = score;
  }
};

