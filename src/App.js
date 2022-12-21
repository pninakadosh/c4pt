import './App.css';
import React from "react";

class App extends React.Component {

    state = {
        player: false, theWinner: ' ', ifWin: false, lose: false, player1: "purple", player2: "blue",
        enoughToWin: 3, maxCol: 6, maxRow: 5, minRowCol: 0, firstRow: 0, fullBoard: 7, startCheckCol: 2,
        values: [
            ['', '', '', '', '', '', ''], ['', '', '', '', '', '', ''], ['', '', '', '', '', '', ''],
            ['', '', '', '', '', '', ''], ['', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '']
        ],
    }

    winner = (row, col) => {
        if (this.winnerByRow(row, col) || this.winnerByCol(row, col) || this.winnerBySlantRight(row, col) || this.winnerBySlantLeft(row, col)) {
            this.setState({
                ifWin: true
            })
            return true;
        }
    }
    winnerBySlantRight = (row, col) => {
        let ifTrue = false;
        let countLeft = 0;
        let countRight = 0;
        const color = this.state.values[row][col];
        let i = 1
        if (i <= row && col + i <= this.state.maxCol) {
            while (color === this.state.values[row - i][col + i]) {
                countRight++;
                if (row - i > this.state.minRowCol && col + i < this.state.maxCol) {
                    i++
                } else {
                    break;
                }
            }
        }
        i = 1;
        if (row + i <= this.state.maxRow && col - i >= this.state.minRowCol) {
            while (color === this.state.values[row + i][col - i]) {
                countLeft++;
                if (row + i < this.state.maxRow && col - i >= this.state.minRowCol) {
                    i++
                } else {
                    break;
                }
            }
        }
        if (this.checkWin(row, col, countLeft + countRight)) {
            ifTrue = true;
        }
        return ifTrue;

    }
    checkWin = (row, col, sumOfCount) => {
        if ((sumOfCount) >= this.state.enoughToWin) {
            alert(this.state.values[row][col] + "  winner")
            this.setState({
                theWinner: this.state.values[row][col]
            })
            alert(this.state.values[row][col] + " winnnnnner")
            return true;
        }
        return false;
    }
    loseGame = () => {
        let count = 0
        for (let i = 0; i <= this.state.maxCol; i++) {
            if (this.state.values[this.state.firstRow][i] === this.state.player1 || this.state.values[this.state.firstRow][i] === this.state.player2) {
                count++
            }
        }
        if (count === this.state.fullBoard) {
            this.setState({
                lose: true
            })
            return true;
        }
        return false;
    }


    winnerBySlantLeft = (row, col) => {
        let ifTrue = false;
        let countLeft = 0;
        let countRight = 0;
        const color = this.state.values[row][col];
        let i = 1
        if (row - i >= this.state.minRowCol && col - i >= this.state.minRowCol) {
            while (color === this.state.values[row - i][col - i]) {
                countLeft++;
                if (i <= row && i <= col) {
                    i++
                } else {
                    break;
                }
            }
        }
        i = 1;
        if (i + row <= this.state.maxRow && i + col <= this.state.maxCol) {
            while (color === this.state.values[row + i][col + i]) {
                countRight++;
                if (i + row < this.state.maxRow && i + col < this.state.maxCol) {
                    i++
                } else {
                    break;
                }
            }
            if (this.checkWin(row, col, countLeft + countRight)) {
                ifTrue = true;
            }
            return ifTrue;
        }
    }


    winnerByRow = (row, col) => {
        let ifTrue = false;
        let countLeft = 0;
        let countRight = 0;
        const color = this.state.values[row][col]
        let i = 1
        if (col > this.state.minRowCol) {
            while (color === this.state.values[row][col - i]) {
                countLeft++
                i++
            }
        }
        i = 1
        if (col < this.state.maxCol) {
            while (color === this.state.values[row][col + i]) {
                countRight++
                i++
            }
        }
        if (this.checkWin(row, col, countLeft + countRight)) {
            ifTrue = true;
        }
        return ifTrue;

    }


    winnerByCol = (row, col) => {
        let ifTrue = false;
        let count = 0
        const color = this.state.values[row][col]
        if (row <= this.state.startCheckCol) {
            for (let i = 1; i < 4; i++) {
                if (this.state.values[row + i][col] === color) {
                    count++
                }
            }
        }
        if (this.checkWin(row, col, count)) {
            ifTrue = true;
        }
        return ifTrue;
    }

    cellClicked = (row, col) => {
        if (!this.state.ifWin) {
            let location = 5;
            const currentValues = this.state.values;
            if (this.state.player === false) {
                while ((currentValues[location][col]) === this.state.player1 || (currentValues[location][col]) === this.state.player2) {
                    location--
                }
                currentValues[location][col] = this.state.player1
                if (this.winner(location, col)) {
                    alert(this.state.theWinner + "win")
                } else {
                    if (this.loseGame()) {
                        alert("GAME-OVER")
                    }
                }
                this.setState({
                    player: true
                })

            }
            if (this.state.player) {
                while ((currentValues[location][col]) === this.state.player1 || (currentValues[location][col]) === this.state.player2) {
                    location--
                }
                currentValues[location][col] = this.state.player2
                if (this.winner(location, col)) {
                    alert(this.state.theWinner + "win")
                } else {
                    if (this.loseGame()) {
                        alert("GAME-OVER")
                    }
                }

                this.setState({
                    player: false
                })

            }
            this.setState({
                values: currentValues
            })
        }
    }

    render() {
        return (
            <div className="App">
                <h1> CONNECT 4</h1>
                <table>
                    {
                        this.state.values.map((row, rowIndex) => {
                            return (
                                <tr>
                                    {
                                        row.map((cell, cellIndex) => {
                                            return (
                                                <td className={this.state.values[rowIndex][cellIndex]}
                                                    onClick={() => this.cellClicked(rowIndex, cellIndex)}>
                                                </td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    }

                </table>
            </div>
        );

    }
}

export default App;
