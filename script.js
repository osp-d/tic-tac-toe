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

  const cleanBoards = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        board[i].splice(j, 1, 0);
        boardColumn[i].splice(j, 1, 0);
        if (i === j) boardDiagonal[0].splice(j, 1, 0);
        if (i + j === 2) boardDiagonal[1].splice(j, 1, 0);
      }
    }
  };

  const getBoard = () => board;
  const getBoardColumn = () => boardColumn;
  const getBoardDiagonal = () => boardDiagonal;

  return {
    getBoard,
    getBoardColumn,
    getBoardDiagonal,
    updateBoards,
    cleanBoards,
  };
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
  const resetActivePlayer = () => (activePlayer = player.player1);
  const getTurnCount = () => turnCount;
  const resetTurnCount = () => (turnCount = 0);

  const switchPlayer = () => {
    activePlayer =
      getActivePlayer() === player.player2 ? player.player1 : player.player2;
  };

  const makeMove = (element) => {
    const id = element;

    if (id >= 0 && id <= 2 && board[0][id] === 0) {
      board[0].splice(id, 1, activePlayer.mark);
      display.cell[id].textContent = activePlayer.mark;
      switchPlayer();
      turnCount++;
    } else if (id >= 3 && id <= 5 && board[1][id - 3] === 0) {
      board[1].splice(id - 3, 1, activePlayer.mark);
      display.cell[id].textContent = activePlayer.mark;
      switchPlayer();
      turnCount++;
    } else if (id >= 6 && id <= 8 && board[2][id - 6] === 0) {
      board[2].splice(id - 6, 1, activePlayer.mark);
      display.cell[id].textContent = activePlayer.mark;
      switchPlayer();
      turnCount++;
    }

    gameBoard.updateBoards();

    if (game.getTurnCount() <= 9 && checkWinner.checkWinCondition() !== true) {
      display.result.textContent = `${game.getActivePlayer().name}'s turn.`;
    }
  };

  return {
    getActivePlayer,
    getTurnCount,
    switchPlayer,
    makeMove,
    resetTurnCount,
    resetActivePlayer,
  };
})();

const checkWinner = (function () {
  let winner = 0;
  let numNought;
  let numCross;
  const resetWinner = () => (winner = 0);

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
    checkCombination(gameBoard.getBoardColumn(), 3);
    checkCombination(gameBoard.getBoardDiagonal(), 2);

    if (winner == 0) {
      if (game.getTurnCount() == 9) {
        display.result.textContent = 'Tie!';
        return true;
      } else {
        return false;
      }
    } else {
      game.switchPlayer();
      display.result.textContent = `${game.getActivePlayer().name} has won!`;
      return true;
    }
  };

  return { checkWinCondition, resetWinner };
})();

const display = (function () {
  const cell = document.querySelectorAll('.cell');
  const startBtn = document.querySelector('button');
  const result = document.querySelector('p.result');

  cell.forEach((item) => {
    item.addEventListener('click', () =>
      game.makeMove(item.getAttribute('id'))
    );
  });

  startBtn.addEventListener('click', () => {
    cell.forEach((item) => {
      item.textContent = '';
    });
    checkWinner.resetWinner();
    game.resetTurnCount();
    game.resetActivePlayer();
    result.textContent = `${game.getActivePlayer().name}'s turn.`;
    startBtn.textContent = 'New game';
    gameBoard.cleanBoards();
  });

  return { cell, result };
})();
