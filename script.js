function createPlayer(name) {
  name: name, (getName = () => name);
  return { name, getName };
}

const gameBoard = (() => {
  function checkForWin(arr, player) {
    if (
      (arr.includes('1') && arr.includes('2') && arr.includes('3')) ||
      (arr.includes('4') && arr.includes('5') && arr.includes('6')) ||
      (arr.includes('7') && arr.includes('8') && arr.includes('9')) ||
      (arr.includes('1') && arr.includes('4') && arr.includes('7')) ||
      (arr.includes('2') && arr.includes('5') && arr.includes('8')) ||
      (arr.includes('3') && arr.includes('6') && arr.includes('9')) ||
      (arr.includes('1') && arr.includes('5') && arr.includes('9')) ||
      (arr.includes('3') && arr.includes('5') && arr.includes('7'))
    ) {
      displayControl.heading.textContent = `${player} is the winner!`;
      //give last winner the first move
      player === displayControl.playerObj.p1.getName()
        ? (gameFlow.p1Turn = true)
        : player === displayControl.playerObj.p2.getName()
        ? (gameFlow.p1Turn = false)
        : null;
      //stops gameflow
      gameFlow.isPlaying = false;
      //update score
      player === displayControl.playerObj.p1.getName()
        ? (gameFlow.lastWin = true)
        : player === displayControl.playerObj.p2.getName()
        ? (gameFlow.lastWin = false)
        : null;
      //check for tie
    } else if (arr.length === 5) {
      displayControl.heading.textContent = "It's a tie!";
      gameFlow.isPlaying = false;
    }
  }

  const gameFlow = {
    p1Turn: true,
    isPlaying: true,
    lastWin: undefined,
    firstArr: [],
    secondArr: [],
    nextTurn() {
      this.p1Turn ? (this.p1Turn = false) : (this.p1Turn = true);
    },
  };

  return {
    gameFlow,
    checkForWin,
  };
})();

const displayControl = (() => {
  const heading = document.querySelector('.heading');
  const cells = document.querySelectorAll('.cell');
  const resetBtn = document.querySelector('.reset');
  const nextRoundBtn = document.querySelector('.next-round');
  const playBtn = document.querySelector('.play');
  const popup = document.querySelector('.popup');
  const container = document.querySelector('.container');
  const p1Name = document.querySelector('.player-one-name');
  const p2Name = document.querySelector('.player-two-name');
  const firstInput = document.querySelector('.first-input');
  const secondInput = document.querySelector('.second-input');
  let p1ScoreDisplay = document.querySelector('.p1-score');
  let p2ScoreDisplay = document.querySelector('.p2-score');
  let roundDisplay = document.querySelector('.round-num');
  let p1Score, p2Score, round;
  const playerObj = {};

  playBtn.addEventListener('click', function () {
    let first, second;
    if (firstInput.value) {
      first = firstInput.value;
    } else {
      first = 'Player One';
    }
    if (secondInput.value) {
      second = secondInput.value;
    } else {
      second = 'Player Two';
    }
    playerObj.p1 = createPlayer(first);
    playerObj.p2 = createPlayer(second);
    popup.style.display = 'none';
    container.style.display = 'block';
    p1Name.textContent = displayControl.playerObj.p1.getName();
    p2Name.textContent = displayControl.playerObj.p2.getName();
  });

  resetBtn.addEventListener('click', init);

  nextRoundBtn.addEventListener('click', function () {
    if (!gameBoard.gameFlow.isPlaying) {
      round++;
      roundDisplay.textContent = round;
      //add score
      if (gameBoard.gameFlow.lastWin) {
        p1Score++;
      } else if (gameBoard.gameFlow.lastWin === false) {
        p2Score++;
      }
      p1ScoreDisplay.textContent = p1Score;
      p2ScoreDisplay.textContent = p2Score;
      heading.textContent = 'Tic-Tac-Toe';
      //reset board
      cells.forEach((cell) => (cell.textContent = ''));
      gameBoard.gameFlow.firstArr = [];
      gameBoard.gameFlow.secondArr = [];
      gameBoard.gameFlow.isPlaying = true;
      gameBoard.gameFlow.lastWin = undefined;
    }
  });

  cells.forEach((cell) =>
    cell.addEventListener('click', function (e) {
      if (!e.target.innerHTML && gameBoard.gameFlow.isPlaying) {
        if (gameBoard.gameFlow.p1Turn) {
          e.target.innerHTML = '<h1>X</h1>';
          gameBoard.gameFlow.firstArr.push(this.dataset.num);
          gameBoard.gameFlow.nextTurn();
          gameBoard.checkForWin(
            gameBoard.gameFlow.firstArr,
            playerObj.p1.getName()
          );
        } else {
          e.target.innerHTML = '<h1>O</h1>';
          gameBoard.gameFlow.secondArr.push(this.dataset.num);
          gameBoard.gameFlow.nextTurn();
          gameBoard.checkForWin(
            gameBoard.gameFlow.secondArr,
            playerObj.p2.getName()
          );
        }
      }
    })
  );

  function init() {
    p1Score = 0;
    p2Score = 0;
    round = 1;
    p1ScoreDisplay.textContent = p1Score;
    p2ScoreDisplay.textContent = p2Score;
    roundDisplay.textContent = round;
    gameBoard.gameFlow.firstArr = [];
    gameBoard.gameFlow.secondArr = [];
    gameBoard.gameFlow.p1Turn = true;
    gameBoard.gameFlow.isPlaying = true;
    heading.textContent = 'Tic-Tac-Toe';
    cells.forEach((cell) => (cell.textContent = ''));
  }
  return { init, playerObj, heading };
})();

displayControl.init();
