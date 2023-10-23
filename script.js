const infoBar = document.querySelector(".info-bar");

const MAX_WORD_LENGTH = 5;
const MAX_TRIES = 5;

const init = async () => {
  // Set state for the game
  let currentRow = 0;
  let currentGuess = "";
  let gameOver = false;
  let isLoading = true;
  setLoading(true);

  // Fetch word of the day
  const wordOfTheDay = await fetchWordOfTheDay();
  const lettersOfTheDay = wordOfTheDay.split("");
  isLoading = false;
  setLoading(isLoading);
  console.log(wordOfTheDay);

  window.addEventListener("keydown", (event) => {
    // If loading, do nothing
    if (isLoading || gameOver) {
      return;
    }
    const input = event.key;

    if (isLetter(input)) {
      // TODO handleLetter(input);
    } else if (input === "Enter") {
      // TODO submit();
    } else if (input === "Backspace") {
      // TODO handleBackspace();
    }
  });
};

const fetchWordOfTheDay = async () => {
  try {
    const response = await fetch("https://words.dev-apis.com/word-of-the-day");
    if (!response.ok) {
      throw new Error(`Network response was not OK. Status ${response.status}`);
    }
    const { word } = await response.json();
    return word.toUpperCase();
  } catch (error) {
    console.error("Fetch error: ", error);
  }
};

const setLoading = (isLoading) => {
  infoBar.classList.toggle("hidden", !isLoading);
};

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

init();
