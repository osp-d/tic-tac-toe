let gameBoard = (function () {
  let board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  let boardColumn = [[], [], []];
  let boardDiagonal = [[], []];

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      boardColumn[i].push(board[j][i]);
      if (i === j) boardDiagonal[0].push(board[i][j]);
      if (i + j === 2) boardDiagonal[1].push(board[i][j]);
    }
  }

  const getBoard = () => board;
  const getBoardColumn = () => boardColumn;
  const getBoardDiagonal = () => boardDiagonal;

  return { getBoard, getBoardColumn, getBoardDiagonal };
})();

let game = function (board) {
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

  let activePlayer = player.player1;
  let turnCount = 0;
  let winCondition;

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

    checkWinner.checkCombination(gameBoard.getBoard(), 3);
    winCondition = checkWinner.checkWinCondition();
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

let checkWinner = (function () {
  let winner = 0;
  let numNought;
  let numCross;

  let checkCombination = (line, j) => {
    for (let i = 0; i < j; i++) {
      numCross = line[i].filter((item) => item === 'X');
      numNought = line[i].filter((item) => item === 'O');

      if (numCross.length == 3) {
        winner = 1;
      } else if (numNought.length == 3) {
        winner = 2;
      }
    }
  };

  let checkWinCondition = () => {
    checkCombination(gameBoard.getBoard(), 3);
    if (winner == 0) {
      checkCombination(gameBoard.getBoardColumn(), 3);
      if (winner == 0) {
        checkCombination(gameBoard.getBoardDiagonal(), 2);
        if (winner == 0) {
          return false;
        } else {
          console.log(`Diagonal ${winner}`);
          return true;
        }
      } else {
        console.log(`Column ${winner}`);
        return true;
      }
    } else {
      console.log(`Row ${winner}`);
      return true;
    }
  };

  return { checkCombination, checkWinCondition };
})();

function playRound() {
  game(gameBoard.getBoard());
}
