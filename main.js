document.addEventListener("DOMContentLoaded", () => {
  const playButton = document.getElementById("play-button");
  const homeScreen = document.getElementById("home-screen");
  const gameScreen = document.getElementById("game-screen");
  const gameOverScreen = document.getElementById("game-over-screen");
  const higherButton = document.getElementById("higher-btn");
  const lowerButton = document.getElementById("lower-btn");
  const playAgainButton = document.getElementById("play-again-btn");
  const currentCharacter = document.getElementById("current-character");
  const currentPlayRate = document.getElementById("current-rate");
  const nextCharacter = document.getElementById("next-character");
  const scoreDisplay = document.getElementById("score");
  const highScoreDisplay = document.getElementById("high-score");
  const finalScoreDisplay = document.getElementById("final-score");
  const currentImage = document.getElementById("current-image");
  const nextImage = document.getElementById("next-image");
  const gameOverImage = document.getElementById("game-over-image");

  let score = 0;
  let highScore = localStorage.getItem("highScore") || 0;
  highScoreDisplay.innerText = highScore;
  let currentIndex, nextIndex;

  let characters = [
    { name: "Iron Man", playRate: 15, image: "images/IronMan.jpeg" },
    { name: "Captain America", playRate: 10, image: "images/CaptainAmerica.jpeg" },
    { name: "Black Widow", playRate: 5, image: "images/BlackWidow.jpeg" },
    { name: "Thor", playRate: 20, image: "images/Thor.jpeg" },
    { name: "Hulk", playRate: 25, image: "images/Hulk.jpeg" },
    { name: "Spiderman", playRate: 30, image: "images/SpiderMan.jpeg" },
    { name: "Black Panther", playRate: 35, image: "images/BlackPanther.jpeg" },
    { name: "Doctor Strange", playRate: 40, image: "images/DrStrange.jpeg" },
    { name: "Scarlet Witch", playRate: 50, image: "images/ScarletWitch.jpeg" }
  ];

  let availableCharacters = [...characters]; // Clone the array to track available choices

  function getRandomIndex() {
    if (availableCharacters.length === 0) {
      availableCharacters = [...characters]; // Reset when all characters have been used
    }
    let randomIdx = Math.floor(Math.random() * availableCharacters.length);
    let selectedCharacter = availableCharacters.splice(randomIdx, 1)[0]; // Remove from available pool
    return characters.findIndex(char => char.name === selectedCharacter.name);
  }

  playButton.addEventListener("click", () => {
    homeScreen.style.display = "none";
    gameScreen.style.display = "block";
    currentIndex = getRandomIndex();
    nextIndex = getRandomIndex();
    updateGame();
  });

  function updateGame() {
    currentCharacter.innerText = characters[currentIndex].name;
    currentPlayRate.innerText = characters[currentIndex].playRate + "%";
    currentImage.src = characters[currentIndex].image;
    nextCharacter.innerText = characters[nextIndex].name;
    nextImage.src = characters[nextIndex].image;
  }

  function checkGuess(isHigher) {
    if (
      (isHigher && characters[nextIndex].playRate > characters[currentIndex].playRate) ||
      (!isHigher && characters[nextIndex].playRate < characters[currentIndex].playRate)
    ) {
      score++;
      scoreDisplay.innerText = score;
      if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
        highScoreDisplay.innerText = highScore;
      }
      currentIndex = nextIndex;
      nextIndex = getRandomIndex(); // Get a new unique character
      updateGame();
    } else {
      showGameOverScreen();
    }
  }

  function showGameOverScreen() {
    gameScreen.style.display = "none";
    gameOverScreen.style.display = "flex";
    gameOverImage.src = "images/Jeff.jpeg";
    finalScoreDisplay.innerText = score;
  }

  higherButton.addEventListener("click", () => checkGuess(true));
  lowerButton.addEventListener("click", () => checkGuess(false));

  playAgainButton.addEventListener("click", () => {
    score = 0;
    scoreDisplay.innerText = score;
    availableCharacters = [...characters]; // Reset available characters
    gameOverScreen.style.display = "none";
    gameScreen.style.display = "block";
    currentIndex = getRandomIndex();
    nextIndex = getRandomIndex();
    updateGame();
  });

  updateGame();
});


//API Fetch
const API_KEY = 'dd9201c40ef9783960c5416f8adbf51ab7f9c4796b05497b53206efce184923c';
const apiUrl = "https://mrapi.org/api/heroes-stats/pc?filter=competitiveSummary.name,competitiveSummary.pickRate";
const proxyUrl = 'https://corsproxy.io/?url=';

const requestOptions = {
  method: "GET",
  headers: {
    "X-API-Key": `${API_KEY}`,
  },
};

fetch(proxyUrl + apiUrl, requestOptions)
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
