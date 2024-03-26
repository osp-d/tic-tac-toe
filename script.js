let gameBoard = (function () {
  let board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  const getBoard = () => board;

  //Console print method
  const printBoard = () => console.log(board);

  return { getBoard, printBoard };
})();

const player = {
  player1: {
    mark: 'X',
  },
  player2: {
    mark: 'O',
  },
};

let game = (function (board) {
  let activePlayer = player.player1;

  const switchPlayer = (activePlayer) => {
    activePlayer =
      activePlayer === player.player1 ? player.player2 : player.player1;
  };

  const makeMove = (first, second) => {
    switchPlayer();
    if (board[first][second] === 0) {
      board[first].splice(second, 1, activePlayer.mark);
    }
  };

  return { makeMove };
})(gameBoard.getBoard());

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
      console.log(`Diagonal ${counter}`);
    } else {
      console.log(`Column ${counter}`);
    }
  } else {
    console.log(`Row ${counter}`);
  }
}

checkWinner(gameBoard.getBoard());
