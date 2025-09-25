let scores, currentScore, activePlayer, playing;

function init() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  document.getElementById("score1").textContent = 0;
  document.getElementById("score2").textContent = 0;
  document.getElementById("current1").textContent = 0;
  document.getElementById("current2").textContent = 0;

  document.getElementById("player1").classList.add("active");
  document.getElementById("player2").classList.remove("active");
  document.getElementById("player1").classList.remove("winner");
  document.getElementById("player2").classList.remove("winner");

  // Default dice image
  document.getElementById("dice").src = "DICE.jpg";

  document.getElementById("message").textContent = "";

  document.getElementById("rollBtn").style.display = "inline-block";
  document.getElementById("holdBtn").style.display = "inline-block";
  document.getElementById("newGameBtn").style.display = "none";
}

function switchPlayer() {
  document.getElementById(`current${activePlayer + 1}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  document.getElementById("player1").classList.toggle("active");
  document.getElementById("player2").classList.toggle("active");
}

const diceImages = {
  1: "dice 1s.png",
  2: "dice 2.png",
  3: "dice 3.png",
  4: "dice 4.png",
  5: "dice 5.png",
  6: "dice 6.png",
};

document.getElementById("rollBtn").addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Show dice image
    document.getElementById("dice").src = diceImages[dice];

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current${activePlayer + 1}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

document.getElementById("holdBtn").addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score${activePlayer + 1}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .getElementById(`player${activePlayer + 1}`)
        .classList.add("winner");
      document.getElementById(
        "message"
      ).textContent = `🎉 Player ${activePlayer + 1} Wins!`;

      document.getElementById("rollBtn").style.display = "none";
      document.getElementById("holdBtn").style.display = "none";
      document.getElementById("newGameBtn").style.display = "inline-block";
    } else {
      switchPlayer();
    }
  }
});

document.getElementById("newGameBtn").addEventListener("click", init);

// Start game
init();
