console.log("swag");

function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i]=[];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const markCell = (row, column, player) => {
        targetCell = board[row][column];
        if (targetCell.getValue() != 0) return;
        targetCell.addMark(player);
    }

    const printBoard = () => {
        const boardWithCellValues = 
        board.map((row) => row.map((cell) => 
        cell.getValue()))
        console.table(boardWithCellValues);
    };

    const getWinner = () => {
        const compareArrays = (a, b) => {
            return a.toString() === b.toString();
          };
        console.log("get winner")
        
        let winner;

        const getWinnerMark = () => {

        const topRow = board[0].map((cell) => cell.getValue());
        console.log(compareArrays(topRow, [1, 1, 1]))
        if (compareArrays(topRow, [1, 1, 1]) === true ||
        compareArrays(topRow, [2, 2, 2]) === true) {
        console.log("Top row winner");
        winner = topRow[0];
        }

        const middleRow = board[1].map((cell) => cell.getValue());
        if (compareArrays(middleRow, [1, 1, 1]) === true ||
        compareArrays(middleRow, [2, 2, 2]) === true ) {
            console.log("Middle row winner");
        winner = middleRow[0];
        }

        const bottomRow = board[2].map((cell) => cell.getValue());
        if (compareArrays(bottomRow, [1, 1, 1]) === true ||
        compareArrays(bottomRow, [2, 2, 2]) === true) {
            console.log("Bottom row winner");
            winner = bottomRow[0];
        }

        const leftColumn = board.map((row) => row[0].getValue());
        if (compareArrays(leftColumn, [1, 1, 1]) === true ||
        compareArrays(leftColumn, [2, 2, 2]) === true) {
            console.log("Left column winner");
            winner = leftColumn[0];
        }

        const middleColumn = board.map((row) => row[1].getValue());
        if (compareArrays(middleColumn, [1, 1, 1]) === true ||
        compareArrays(middleColumn, [2, 2, 2]) === true) {
            console.log("Middle column winner");
            winner = middleColumn[0];
        }

        const rightColumn = board.map((row) => row[2].getValue());
        if (compareArrays(rightColumn, [1, 1, 1]) === true ||
        compareArrays(rightColumn, [2, 2, 2]) === true) {
            console.log("Right column winner");
            winner = rightColumn[0];
        }

        const topDiagonal = [board[0][0].getValue(), 
                            board[1][1].getValue(),
                            board[2][2].getValue()];
        if (compareArrays(topDiagonal, [1, 1, 1]) === true ||
        compareArrays(topDiagonal, [2, 2, 2]) === true) {
            console.log("Top diagonal winner");
            winner = topDiagonal[0];
        }

        const bottomDiagonal = [board[2][0].getValue(), 
                            board[1][1].getValue(),
                            board[0][2].getValue()];
        if (compareArrays(bottomDiagonal, [1, 1, 1]) === true ||
        compareArrays(bottomDiagonal, [2, 2, 2]) === true) {
            console.log("Bottom diagonal winner");
            winner = bottomDiagonal[0];
        }

        const tie = board.map((row) => row.map((cell) => cell.getValue()));
        if (compareArrays((tie.map((row) => row.includes(0))), [false, false, false]) === true &&
            winner === undefined) {
            console.log("A tie game")
            winner = "tie";
        }
        console.log(tie.map((row) => row.includes(0)))
        console.log(tie);
        console.log(winner);

        }

        getWinnerMark();
        console.log(winner);
        return winner;
    }

    return { getBoard, markCell, printBoard, getWinner }
}

function Cell() {
    let value = 0;

    const addMark = (player) => {
        value = player;
    };

    const getValue = () => value;

    return {
        addMark,
        getValue
    };
}

function GameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
    ) {
        const board = Gameboard();

        const players = [
            {
                name: playerOneName,
                mark: 1
            },
            {
                name: playerTwoName,
                mark: 2
            }
        ];

        let activePlayer = players[0];

        const switchPlayerTurn = () => {
            activePlayer = activePlayer === players[0] ? 
            players[1] : players[0];
        };
        const getActivePlayer = () => activePlayer;

        const printNewRound = () => {
            board.printBoard();
            console.log(`${getActivePlayer().name}'s turn.`)
        };

        const checkForWinner = () => {
            let winner = board.getWinner();
            console.log("checked for winner");
            if (winner === undefined) {
                return;
            } else { 
                console.log(`Player ${winner} wins!`)
                return winner;
            }       
        }

        const playRound = (row, column) => {
            console.log(
                `Marking ${getActivePlayer().name}'s symbol at 
                ${row}, ${column}...`
            );
            board.markCell(row, column, getActivePlayer().mark);

    
            checkForWinner()
            switchPlayerTurn();
            printNewRound();
        };
    
    printNewRound();

    return {
    playRound,
    getActivePlayer,
    getBoard: board.getBoard,
    checkForWinner
    };
}

function ScreenController() {
    const game = GameController();
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');

    const updateScreen = () => {
        boardDiv.textContent = '';
        
        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();
        const winner = game.checkForWinner();

        if (winner === undefined) {
            playerTurnDiv.textContent = `${activePlayer.name}'s turn...`
        } else if (winner === "tie") {
            playerTurnDiv.textContent = `A tie game!`;
        } else {
            playerTurnDiv.textContent = `Player ${winner} wins!`
        };

        const marker = (cell) => {
            if (cell.getValue() === 0) {
                return '';
            } else if (cell.getValue() === 1) {
                return "X";
            } else if (cell.getValue() === 2) {
                return "O";
            }
        }

        board.forEach((row, rowIndex) => {
            row.forEach((cell, columnIndex) => {
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");
                cellButton.dataset.column = columnIndex;
                cellButton.dataset.row = rowIndex;
                cellButton.textContent = marker(cell);
                boardDiv.appendChild(cellButton);
            })
        })
    }

    function clickHandlerBoard(e) {
        const selectedColumn = e.target.dataset.column;
        const selectedRow = e.target.dataset.row;
        if (!selectedColumn) return;

        game.playRound(selectedRow, selectedColumn);
        updateScreen();
    }

    boardDiv.addEventListener('click', clickHandlerBoard);

    updateScreen();
}

ScreenController();