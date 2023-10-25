const infoBar = document.querySelector(".info-bar");
const letterSlots = document.querySelectorAll(".letter-input");


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
      handleLetter(input);
    } else if (input === "Enter") {
      // TODO submit();
    } else if (input === "Backspace") {
      handleBackspace();
    }
  });

  const handleLetter = (letter) => {
    if (currentGuess.length < MAX_WORD_LENGTH) {
      letter = letter.toUpperCase();
      currentGuess += letter;
      letterSlots[
        MAX_WORD_LENGTH * currentRow + currentGuess.length - 1
      ].innerText = letter;
    }
  };

  const handleBackspace = () => {
    currentGuess = currentGuess.substring(0, currentGuess.length - 1);
    letterSlots[MAX_WORD_LENGTH * currentRow + currentGuess.length].innerText = "";
}
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
