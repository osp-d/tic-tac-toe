let gameBoard = (function () {
  let board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  const getBoard = () => board;

  return { getBoard };
})();

const player = {
  player1: {
    name: 'Player 1',
    mark: 'X',
  },
  player2: {
    name: 'Player 2',
    mark: 'O',
  },
};

let turnCount = 0;

let game = function (board) {
  let activePlayer = player.player1;

  let winCondition = checkWinner(board);

  console.log(`${activePlayer.name}'s turn.`);

  const switchPlayer = () => {
    activePlayer =
      activePlayer === player.player2 ? player.player1 : player.player2;
  };

  const makeMove = (first, second) => {
    if (board[first][second] === 0) {
      board[first].splice(second, 1, activePlayer.mark);
      switchPlayer();
      turnCount++;
    }

    console.log(`${activePlayer.name}'s turn.`);
    console.log(gameBoard.getBoard()[0]);
    console.log(gameBoard.getBoard()[1]);
    console.log(gameBoard.getBoard()[2]);
    winCondition = checkWinner(board);
  };

  while (turnCount < 9) {
    if (winCondition === true) {
      console.log('Round is finished');
      return;
    }

    makeMove(
      prompt('Enter the X coordinate'),
      prompt('Enter the Y coordinate')
    );
  }

  console.log('Tie');
  return;
};

function checkWinner(board) {
  let counter = 0;
  let numNought;
  let numCross;
  let boardColumn = [[], [], []];
  let boardDiagonal = [[], []];

  boardColumn[0].push(board[0][0], board[1][0], board[2][0]);
  boardColumn[1].push(board[0][1], board[1][1], board[2][1]);
  boardColumn[2].push(board[0][2], board[1][2], board[2][2]);

  boardDiagonal[0].push(board[0][0], board[1][1], board[2][2]);
  boardDiagonal[1].push(board[0][2], board[1][1], board[2][0]);

  function checkCombination(line, j) {
    for (let i = 0; i < j; i++) {
      numCross = line[i].filter((item) => item === 'X');
      numNought = line[i].filter((item) => item === 'O');

      if (numCross.length == 3) {
        counter = 1;
      } else if (numNought.length == 3) {
        counter = 2;
      }
    }
  }

  checkCombination(board, 3);
  if (counter == 0) {
    checkCombination(boardColumn, 3);
    if (counter == 0) {
      checkCombination(boardDiagonal, 2);
      if (counter == 0) {
        return false;
      } else {
        console.log(`Column ${counter}`);
        return true;
      }
    } else {
      console.log(`Diagonal ${counter}`);
      return true;
    }
  } else {
    console.log(`Row ${counter}`);
    return true;
  }
}

function playRound() {
  game(gameBoard.getBoard());
}
