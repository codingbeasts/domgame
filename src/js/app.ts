import "../css/style.css";
//                  dom pig game starts from here

import roll from "./rollDice"; // roll dice b/w 1-6
import { changeDice } from "./changeDice"; //use to change dice image
import { defaultParameter } from "./setDefaultParam"; // set all param 0
// import { switchPlayer } from "./switchPlayer"; // switch between player 1 and 2
import { genricParam } from "./genericFunc";
import { classRemover } from "./genericClassRemove";
/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
let gamePlaying: boolean,
  activePlayer: number,
  score: [number, number],
  roundScore: number,
  dice: HTMLImageElement,
  p_diceVal: number;

newGame();

//created event listener for each function and their callbacks
actionBtn("btn-roll", startGame);

actionBtn("btn-hold", holdGame);

actionBtn("btn-new", newGame);

function actionBtn(btnName: string, call: Function) {
  document
    .getElementsByClassName(btnName)[0]
    .addEventListener("click", () => call());
}
function newGame() {
  score = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  genricParam("score-0", "0");
  dice = document.querySelector(".dice") as HTMLImageElement;
  dice.style.display = "none";
  genricParam("score-0", "0");
  genricParam("score-1", "0");
  defaultParameter(activePlayer);
  genricParam("name-0", "Player 1");
  genricParam("name-1", "Player 2");
  classRemover(".player-0-panel", "winner");
  classRemover(".player-1-panel", "winner");
  classRemover(".player-0-panel", "active");
  classRemover(".player-1-panel", "active");
  document
    .getElementsByClassName("player-" + activePlayer + "-panel")[0]
    .classList.add("active");
}
function startGame() {
  if (gamePlaying) {
    var diceVal: number = roll(); //storing dice value
    console.log("Current Dice : "+diceVal);
    changeDice(diceVal); //display dice with their respective rolled dice image

    // console.log(p_diceVal);
    if (p_diceVal === diceVal && p_diceVal === 6) {
      score[activePlayer] = 0;

      genricParam("score-" + activePlayer, score[activePlayer]);
      nextPlayer();
    } else if (diceVal !== 1) {
      roundScore += diceVal;
      genricParam("current-" + activePlayer, roundScore);
    } else {
      nextPlayer();
    }
    p_diceVal = diceVal;
    console.log("Previous Dice : "+p_diceVal);
  }
}
function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  defaultParameter(activePlayer);
  document.querySelector(".player-0-panel")?.classList.toggle("active");
  document.querySelector(".player-1-panel")?.classList.toggle("active");
}

function holdGame() {
  if (gamePlaying) {
    score[activePlayer] += roundScore;
    genricParam("score-" + activePlayer, score[activePlayer]);
    winner();
  }
}

function winner() {
  if (score[activePlayer] >= 20) {
    genricParam("name-" + activePlayer, "Winner");
    dice.style.display = "none";
    document
      .getElementsByClassName("player-" + activePlayer + "-panel")[0]
      .classList.add("winner");
    classRemover(".player-" + activePlayer + "-panel", "active");
    // document.getElementsByClassName("player-" + activePlayer + "-panel")[0].classList.remove("active");
    gamePlaying = false;
  } else {
    nextPlayer();
  }
}
