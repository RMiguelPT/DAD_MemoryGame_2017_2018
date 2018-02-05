/*jshint esversion: 6 */
var shuffle = require('shuffle-array');
var sleep = require('system-sleep');

class MemoryGame {
    constructor(ID, player1Name) {
        this.gameID = ID;
        this.gameEnded = false;
        this.gameStarted = false;

        this.player1 = player1Name;
        this.player2 = '';
        this.player3 = "";
        this.player4 = "";
        this.player1Score = 0;
        this.player2Score = undefined;
        this.player3Score = undefined;
        this.player4Score = undefined;
        this.player1LastMatch = 0;
        this.player2LastMatch = undefined;
        this.player3LastMatch = undefined;
        this.player4LastMatch = undefined;

        /*********************/
        let player = {
            playerName: player1Name,
            score: 0,
            lastMatch: undefined
        };

        this.players = [];
        this.playerCount = this.players.push(player);
        //console.log(this.players);
        //console.log(this.playerCount);
        /*********************/


        //this.playerCount = 1;
        this.playerTurn = 1;
        this.winner = 0;
        this.board = [];
        this.totLines = undefined;
        this.totCols = undefined;
        this.totTiles = undefined;
        this.leftPieces = undefined;
        this.clickCounter = 0;
        this.firstPiece = undefined;
        this.secondPiece = undefined;
        this.timer = undefined;
        this.defaultSize = true;
    }

    join(playerName, socketID) {

        if (this.playerCount < 4) {
            let player = {
                playerName: playerName,
                score: 0,
                lastMatch: undefined
            };
            this.playerCount = this.players.push(player);

        }
        /* switch (this.playerCount) {
            case 1:
                this.player2 = playerName;
                this.player2Score = 0;
                this.playerCount++;
                break;
            case 2:
                this.player3 = playerName;
                this.player3Score = 0;
                this.playerCount++;
                break;
            case 3:
                this.player4 = playerName;
                this.player4Score = 0;
                this.playerCount++;
                break;

            default:
                return;
        } */
    }

    startGame(totCols, totLines, defaultSize) {
        this.createBoard(totCols, totLines, defaultSize);
        this.gameStarted = true;
    }




    createBoard(totCols, totLines, defaultSize) {
        /*  console.log("Default: " + defaultSize);
         console.log("totCols: " + totCols);
         console.log("totLines: " + totLines); */
        //Board 4 x 4
        //16 pieces
        if (defaultSize) {
            if (this.playerCount == 1 || this.playerCount == 2) {
                this.totCols = 4;
                this.totLines = 4;
            } else if (this.playerCount == 3) {
                this.totCols = 6;
                this.totLines = 4;
            } else if (this.playerCount == 4) {
                this.totCols = 6;
                this.totLines = 6;
            }
        } else {
            this.totCols = totCols;
            this.totLines = totLines;
        }
        this.totTiles = this.totCols * this.totLines;
        this.leftPieces = this.totTiles;
        for (let i = 1; i <= this.totTiles; i += 2) {
            let piece1 = this.getPiece();
            let piece2 = Object.assign({}, piece1); //Copy piece data 1 into piece 2           

            this.board.push(piece1);
            this.board.push(piece2);
        }

        for (var i = 0; i < 40; i++) {
            shuffle(this.board);
        }


    }
    getPiece() {
        var piece = {
            number: undefined,
            imageToShow: "hidden",
            flipped: false,
            removed: false
        };

        let pieceNumber;

        do {
            pieceNumber = Math.floor(Math.random() * 40);

        }
        while (!this.canBePushed(pieceNumber));
        piece.number = pieceNumber;
        return piece;
    }

    //Check for duplicates
    canBePushed(number) {
        if (this.board.length == 0) {
            return true;
        }

        for (var piece of this.board) {
            if (number == piece.number) {
                return false;
            }
        }
        return true;
    }

    play(playerNumber, index) {
        var piece = this.board[index];
        //console.log(this.gameStarted);
        //console.log("Player Turn: " + this.playerTurn);
        //console.log("Player Number: " + playerNumber);
        if (playerNumber != this.playerTurn) {
            return false;
        }
        if (!this.gameStarted || piece.flipped || piece.removed) return false;

        if (this.clickCounter == 0) {
            piece.flipped = true;
            piece.imageToShow = this.board[index].number;
            this.clickCounter = 1;
            this.firstPiece = this.board[index];
            return true;
        }
        //return true;
        else if (this.clickCounter == 1) {
            piece.flipped = true;
            piece.imageToShow = this.board[index].number;
            this.clickCounter = 2;
            this.secondPiece = this.board[index];
            //this.doMatch();
            return true;
        }
    }

    doMatch() {
        //console.log(Date.now());
        if (this.clickCounter == 2) {
            if (this.firstPiece.number == this.secondPiece.number) {
                if (this.playerTurn == 1) {
                    this.players[0].score++;
                    this.players[0].lastMatch = Date.now();
                } else if (this.playerTurn == 2) {
                    this.players[1].score++;
                    this.players[1].lastMatch = Date.now();
                } else if (this.playerTurn == 3 && this.playerCount > 2) {
                    this.players[2].score++;
                    this.players[2].lastMatch = Date.now();
                } else if (this.playerTurn == 4 && this.playerCount > 3) {
                    this.players[3].score++;
                    this.players[3].lastMatch = Date.now();
                }


                this.leftPieces = this.leftPieces - 2;
                sleep(1000); // sleep for one second
                this.removePieces();
                if (this.gameIsOver()) {
                    this.gameEnded = true;
                    this.setWinner();
                }
            } else {
                sleep(1000);
                this.hidePieces(); //sleep for one second
                this.nextPlayer();
            }
        }
    }

    nextPlayer() {
        this.playerTurn++;

        if (this.playerTurn > this.playerCount) {
            this.playerTurn = 1;
        }
    }

    removePieces() {
        this.firstPiece.imageToShow = "empty";
        this.secondPiece.imageToShow = "empty";
        this.clickCounter = 0;
        this.firstPiece.removed = true;
        this.secondPiece.removed = true;
        this.firstPiece = undefined;
        this.secondPiece = undefined;
    }
    hidePieces() {
        this.firstPiece.imageToShow = "hidden";
        this.secondPiece.imageToShow = "hidden";
        this.firstPiece.flipped = false;
        this.firstPiece = undefined;
        this.secondPiece.flipped = false;
        this.secondPiece = undefined;
        this.clickCounter = 0;

    }
    gameIsOver() {
        if (this.leftPieces == 0) return true;
        else return false;

    }

    setWinner() {
        let maxScore = this.getMaxScore();
        console.log("maxScore: "+ maxScore);

        let arrayOfDraws = [];
        arrayOfDraws = this.getArrayOfDraws(maxScore);
        console.log("arrayOfDraws: " + arrayOfDraws);

        if (arrayOfDraws.length == 1) {
            this.winner = arrayOfDraws[0] + 1;
        } else {
            this.winner = this.getIndexOfMinTime(arrayOfDraws);
        }

        // this.winner = this.getIndexOfMaxScore();

    }

    getIndexOfMaxScore() {
        let index = 0;
        let value = 0;
        for (let i = 0; i < this.playerCount; i++) {
            //console.log(this.players[i].score);
            if (this.players[i].score > value) {
                value = this.players[i].score;
                index = i + 1;
            }
        }
        //console.log("The winner is: " + index);
        return index;

    }
    getIndexOfMinTime(arrayOfDraws) {
        let minTime = Date.now();
        let winner = 0;

        for (let i = 0; i < arrayOfDraws.length; i++) {
            console.log("Player " + (arrayOfDraws[i] +1) + "last match: " + this.players[arrayOfDraws[i]].lastMatch);
            if (this.players[arrayOfDraws[i]].lastMatch < minTime) {
                console.log(arrayOfDraws[i]);
                winner = arrayOfDraws[i] + 1;
            }
        }
        return winner;

    }
    getArrayOfDraws(maxScore) {
        let arrayOfDraws = [];

        for (let i = 0; i < this.playerCount; i++) {
            if (this.players[i].score == maxScore) {
                arrayOfDraws.push(i);
            }
        }
        return arrayOfDraws;
    }
    getMaxScore() {
        let maxScore = 0;
        for (let i = 0; i < this.playerCount; i++) {
            if (this.players[i].score > maxScore) {
                maxScore = this.players[i].score;
            }
        }
        return maxScore;
    }

    








    
}

module.exports = MemoryGame;