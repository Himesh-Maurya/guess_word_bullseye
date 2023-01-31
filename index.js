const allBox = document.querySelector(".all-box");
const hint = document.querySelector(".hint span");
const resetBtn = document.querySelector(".reset-btn");
const remainingGuesses = document.querySelector(".remaining-guesses span");

const wrongLetter = document.querySelector(".wrong-letter span");
const typingInput = document.querySelector(".all-typing");

let word;
let wrongLetters = [];
let TotalGuesses;

let rightLetters = [];

function fun() {
  let anyItem = wordList[Math.floor(Math.random() * wordList.length)];
  // console.log(anyItem);
  word = anyItem.word;

  TotalGuesses = 8;
  wrongLetters = [];
  rightLetters = [];

  hint.innerText = anyItem.hint;
  remainingGuesses.innerText = TotalGuesses;
  wrongLetter.innerText = wrongLetters;

  let html = " ";
  for (let i = 0; i < word.length; i++) {
    html += `<input type="text" disabled>`;
    allBox.innerHTML = html;
  }
}
fun();

function restart(e) {
  let key = e.target.value.toLowerCase();
  if (
    key.match(/^[A-Za-z]+$/) &&
    !wrongLetters.includes(` ${key}`) &&
    !rightLetters.includes(key)
  ) {
    if (word.includes(key)) {
      for (let i = 0; i < word.length; i++) {
        if (word[i] == key) {
          rightLetters += key;
          allBox.querySelectorAll("input")[i].value = key;
        }
      }
    } else {
      TotalGuesses--;
      wrongLetters.push(` ${key}`);
    }
    remainingGuesses.innerText = TotalGuesses;
    wrongLetter.innerText = wrongLetters;
  }
  typingInput.value = "";

  setTimeout(() => {
    if (rightLetters.length === word.length) {
      alert(`Congrats! You found the word ${word.toUpperCase()}`);
      return fun();
    } else if (TotalGuesses < 1) {
      alert("Game over! You don't have remaining guesses");
      for (let i = 0; i < word.length; i++) {
        allBox.querySelectorAll("input")[i].value = word[i];
      }
    }
  }, 100);
}

resetBtn.addEventListener("click", fun);
typingInput.addEventListener("input", restart);
allBox.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());
