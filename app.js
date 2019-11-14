/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, dice, gamePlaying, six, input;
init();

document.querySelector(".btn-roll").addEventListener("click", function() {
  //1.round number
  if (gamePlaying) {
    var dice = Math.floor(Math.random() * 6) + 1;
    var dice1 = Math.floor(Math.random() * 6) + 1;
    //2.display the result
    document.querySelector(".final-score").disable = true;
    var diceDom = document.querySelector(".dice");
    diceDom.style.display = "block";
    diceDom.src = "dice-" + dice + ".png";
    var diceDom1 = document.querySelector(".dice-1");
    diceDom1.style.display = "block";
    diceDom1.src = "dice-" + dice1 + ".png";
    if (dice != 1 && dice1 != 1) {
      roundScore += dice + dice1;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
      doubleSix(dice, dice1);
    }
    //3. update
    else {
      nextPlayer();
    }
  }
});
document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    scores[activePlayer] += roundScore;
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];
    input = document.querySelector(".final-score").value;

    if (scores[activePlayer] >= input) {
      document.querySelector("#name-" + activePlayer).textContent = "winner";
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});
function nextPlayer() {
  activePlayer == 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  // toggle  if exist,. else add on
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  document.querySelector(".dice").style.display = "none";
  document.querySelector(".dice-1").style.display = "none";
  six[activePlayer] = 0;
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  six = [0, 0];
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;
  input = 100;
  document.querySelector(".final-score").disable = false;
  document.querySelector(".final-score").value = "100";
  // don't have to use # when using get element by id
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.querySelector(".dice").style.display = "none";
  document.querySelector(".dice-1").style.display = "none";
  document.querySelector("#name-0").textContent = "player 1";
  document.querySelector("#name-1").textContent = "player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");

  document.querySelector(".player-1-panel").classList.remove("active");
}
//check double six in row
function doubleSix(dice, dice1) {
  if (dice == 6 || dice1 == 6) {
    six[activePlayer] += 1;
    if (six[activePlayer] == 2) {
      scores[activePlayer] = 0;
      roundScore = 0;
      document.querySelector("#score-" + activePlayer).textContent = "0";
      nextPlayer();
    }
  } else {
    six[activePlayer] = 0;
  }
}
//use DOM(document object model to cross platform for HTML)
//document.querySelector("#current-" + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice +'<em>'
//var x = document.querySelector("#score-0").textContent;
