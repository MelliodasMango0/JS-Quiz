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
	const nextNextCharacter = document.getElementById("next-next-character");
  const scoreDisplay = document.getElementById("score");
  const highScoreDisplay = document.getElementById("high-score");
  const finalScoreDisplay = document.getElementById("final-score");
  const currentImage = document.getElementById("current-image");
  const nextImage = document.getElementById("next-image");
	const nextNextImage = document.getElementById("next-next-image");
  const gameOverImage = document.getElementById("game-over-image");
	const characterContainer = document.getElementById("character-container");
	const versusText = document.getElementById("vs");

  let score = 0;
  let highScore = localStorage.getItem("highScore") || 0;
  highScoreDisplay.innerText = highScore;
  let currentIndex, nextIndex, nextNextIndex;

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
		nextNextIndex = getRandomIndex();
    updateGame();
  });

	characterContainer.addEventListener("transitionend", () => {
		characterContainer.classList.remove("moved");
		versusText.classList = "";
		updateGame();
	});

  function updateGame() {
    currentCharacter.innerText = characters[currentIndex].name;
    currentPlayRate.innerText = characters[currentIndex].playRate + "%";
    currentImage.src = characters[currentIndex].image;
    nextCharacter.innerText = characters[nextIndex].name;
    nextImage.src = characters[nextIndex].image;
		nextNextCharacter.innerText = characters[nextNextIndex].name;
		nextNextImage.src = characters[nextNextIndex].image;
		// higherButton.classList = "";
		// lowerButton.classList = "";
  }

  function checkGuess(isHigher) {
		// higherButton.classList.add("hidden");
		// lowerButton.classList.add("hidden");
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
			nextIndex = nextNextIndex;
      nextNextIndex = getRandomIndex(); // Get a new unique character
			versusText.classList = "hidden";
			characterContainer.classList.add("moved");
      //updateGame();
    } else {
      showGameOverScreen();
    }
  }

  function showGameOverScreen() {
    gameScreen.style.display = "none";
    gameOverScreen.style.display = "flex";
    gameOverImage.src = "images/loss.jpeg";
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