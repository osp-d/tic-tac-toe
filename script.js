const gameBoard = (function () {
  let board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  let boardColumn = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  let boardDiagonal = [
    [0, 0, 0],
    [0, 0, 0],
  ];

  const updateBoards = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        boardColumn[i].splice(j, 1, board[j][i]);
        if (i === j) boardDiagonal[0].splice(j, 1, board[i][j]);
        if (i + j === 2) boardDiagonal[1].splice(j, 1, board[i][j]);
      }
    }
  };

  const getBoard = () => board;
  const getBoardColumn = () => boardColumn;
  const getBoardDiagonal = () => boardDiagonal;

  return { getBoard, getBoardColumn, getBoardDiagonal, updateBoards };
})();

const game = (function () {
  const board = gameBoard.getBoard();
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

  const getActivePlayer = () => activePlayer;
  const getTurnCount = () => turnCount;

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

    console.log(board[0]);
    console.log(board[1]);
    console.log(board[2]);

    checkWinner.checkCombination(board, 3);
    checkWinner.checkWinCondition();
  };

  return { getActivePlayer, getTurnCount, switchPlayer, makeMove };
})();

const checkWinner = (function () {
  let winner = 0;
  let numNought;
  let numCross;
  const getWinner = () => winner;

  const checkCombination = (line, j) => {
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

  const checkWinCondition = () => {
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

  return { checkCombination, checkWinCondition, getWinner };
})();

function playRound() {
  while (game.getTurnCount() < 9 && checkWinner.checkWinCondition() !== true) {
    console.log(`${game.getActivePlayer().name}'s turn.`);
    game.makeMove(
      prompt('Enter the X coordinate'),
      prompt('Enter the Y coordinate')
    );
    gameBoard.updateBoards();
  }

  if (checkWinner.getWinner() !== 0) {
    console.log('Round is finished');
    return;
  }

  console.log('Tie');
  return;
}
