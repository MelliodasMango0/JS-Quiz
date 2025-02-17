document.addEventListener("DOMContentLoaded", () => {
  const playButton = document.getElementById("play-button");
  const homeScreen = document.getElementById("home-screen");
  const gameScreen = document.getElementById("game-screen");
  const gameOverScreen = document.getElementById("game-over-screen");
  const higherButton = document.getElementById("higher-btn");
  const lowerButton = document.getElementById("lower-btn");
  const restartButton = document.getElementById("restart-btn");
  const menuButton = document.getElementById("menu-btn");
  const playAgainButton = document.getElementById("play-again-btn");
  const currentCharacter = document.getElementById("current-character");
  const currentPlayRate = document.getElementById("current-rate");
  const nextCharacter = document.getElementById("next-character");
  const scoreDisplay = document.getElementById("score");
  const finalScoreDisplay = document.getElementById("final-score");

  let score = 0;
  let currentIndex = 0;
  let nextIndex = 1;

  let characters = [
    { name: "Iron Man", playRate: 15 },
    { name: "Captain America", playRate: 10 },
    { name: "Black Widow", playRate: 5 },
    { name: "Thor", playRate: 20 },
    { name: "Hulk", playRate: 25 },
    { name: "Spiderman", playRate: 30 },
    { name: "Black Panther", playRate: 35 },
    { name: "Doctor Strange", playRate: 40 },
    { name: "Scarlet Witch", playRate: 50 },
  ];

  playButton.addEventListener("click", () => {
    homeScreen.style.display = "none";
    gameScreen.style.display = "block";
    updateGame();
  });

  function updateGame() {
    if (nextIndex >= characters.length) nextIndex = 0;
    currentCharacter.innerText = characters[currentIndex].name;
    currentPlayRate.innerText = characters[currentIndex].playRate + "%";
    nextCharacter.innerText = characters[nextIndex].name;
  }

  function showGameOverScreen() {
    gameScreen.style.display = "none";
    gameOverScreen.style.display = "flex";
    finalScoreDisplay.innerText = score;
  }

  function checkGuess(isHigher) {
    if (
      (isHigher &&
        characters[nextIndex].playRate > characters[currentIndex].playRate) ||
      (!isHigher &&
        characters[nextIndex].playRate < characters[currentIndex].playRate)
    ) {
      score++;
      scoreDisplay.innerText = score;
      currentIndex = nextIndex;
      nextIndex = (nextIndex + 1) % characters.length;
      updateGame();
    } else {
      showGameOverScreen();
    }
  }

  higherButton.addEventListener("click", () => checkGuess(true));
  lowerButton.addEventListener("click", () => checkGuess(false));

  restartButton.addEventListener("click", () => {
    score = 0;
    scoreDisplay.innerText = score;
    currentIndex = 0;
    nextIndex = 1;
    restartButton.style.display = "none";
    updateGame();
  });

  playAgainButton.addEventListener("click", () => {
    score = 0;
    scoreDisplay.innerText = score;
    currentIndex = 0;
    nextIndex = 1;
    gameOverScreen.style.display = "none";
    gameScreen.style.display = "block";
    updateGame();
  });

  menuButton.addEventListener("click", () => {
    score = 0;
    gameOverScreen.style.display = "none";
    homeScreen.style.display = "block";
  });

  updateGame();
});

// API Fetch
const apiUrl = "https://mrapi.org/api/heroes";
//const proxyUrl = 'https://corsproxy.io/';

const requestOptions = {
  method: "GET",
  headers: {
    "X-API-Key": `${API_KEY}`,
  },
};

fetch(/*proxyUrl +*/ apiUrl, requestOptions)
  .then((response) => {
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Data not found");
      } else if (response.status === 500) {
        throw new Error("Server error");
      } else {
        throw new Error("Network response was not ok");
      }
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
