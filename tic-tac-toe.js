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
        const topRow = board[0].map((cell) => cell.getValue());
        console.table(topRow);
        console.log(compareArrays(topRow, [1, 1, 1]))
        if (compareArrays(topRow, [1, 1, 1]) === true) {
        console.log("Top row winner");
    }
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

        const playRound = (row, column) => {
            console.log(
                `Marking ${getActivePlayer().name}'s symbol at 
                ${row}, ${column}...`
            );
            board.markCell(row, column, getActivePlayer().mark);

            const checkForWinner = () => {
                board.getWinner();
                console.log("checked for winner");
            }
    
        checkForWinner()
        switchPlayerTurn();
        printNewRound();
    };
    
    printNewRound();

    return {
    playRound,
    getActivePlayer,
    getBoard: board.getBoard
    };
}

const game = GameController();
