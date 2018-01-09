/*jshint esversion: 6 */
var shuffle = require('shuffle-array');
var sleep = require('sleep');

class MemoryGame {
    constructor(ID, player1Name) {
        this.gameID = ID;
        this.gameEnded = false;
        this.gameStarted = false;
        this.player1 = player1Name;
        this.player2 = '';
        this.player3 = "";
        this.player4 = "";
        this.playerCount = 1;
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
    }

    join(playerName, socketID) {
        switch (this.playerCount) {
            case 1:
                this.player2 = playerName;
                this.playerCount++;
                break;
            case 2:
                this.player3 = playerName;
                this.playerCount++;
                break;
            case 3:
                this.player4 = playerName;
                this.playerCount++;
                break;

            default:
                return;
        }
    }

    startGame(){
        this.createBoard();
        this.gameStarted = true;
    }




    createBoard() {
        if (this.playerCount == 1 || this.playerCount == 2){
            this.totCols = 4;
            this.totLines = 4;
            this.totTiles = this.totCols*this.totLines;
            this.leftPieces = this.totTiles;
            for(let i=1; i<=this.totTiles; i+=2){
                let piece1 = this.getPiece();
                let piece2 = Object.assign({}, piece1); //Copy piece data 1 into piece 2           
           
            this.board.push(piece1);
            this.board.push(piece2);

            

            }
            //Board 4 x 4
            //16 pieces
        }else if(this.playerCount == 3){
            this.totCols = 6;
            this.totLines = 4;
            this.totTiles = this.totCols*this.totLines;
            this.leftPieces = this.totTiles;
            for(let i=1; i<=this.totTiles; i+=2){
                let piece1 = this.getPiece();
                let piece2 = Object.assign({}, piece1); //Copy piece data 1 into piece 2           
           
            this.board.push(piece1);
            this.board.push(piece2);
            }
            //Board 4 x 6
            //32 pieces
        }else if(this.playerCount == 4){
            this.totCols = 6;
            this.totLines = 6;
            this.totTiles = this.totCols*this.totLines;
            this.leftPieces = this.totTiles;
            for(let i=1; i<=this.totTiles; i+=2){
                let piece1 = this.getPiece();
                let piece2 = Object.assign({}, piece1); //Copy piece data 1 into piece 2           
           
            this.board.push(piece1);
            this.board.push(piece2);
            }
            //Board 6 x 6
            //64 pieces
        }

        for (var i = 0; i < 40; i++){
            shuffle(this.board);
        }


    }
        getPiece(){
            var piece = {                   
                number: undefined,
                imageToShow: "hidden",
                flipped: false,
                removed: false
            };                  
           
            var number = undefined;
            
            do{
                number = Math.floor(Math.random()*40);
                
            }
            while (!this.canBePushed(number));
            piece.number = number;
            return piece;
        }

        //Check for duplicates
        canBePushed(number){
            if(this.board.lenght==0)
            {
                return true;
            }

            for(var piece of this.board)
            {
                if (number==piece.number)
                {
                    return false;
                }
            }
            return true;
        }

        play(playerNumber, index){
            var piece=this.board[index];
            console.log(this.gameStarted);
            console.log("Player Turn: " + this.playerTurn);
            console.log("Player Number: " + playerNumber);
            if (playerNumber != this.playerTurn){
                return false;
            }
            if(!this.gameStarted || piece.flipped || piece.removed) return false;
            
            if (this.clickCounter == 0){
                piece.flipped=true;
                piece.imageToShow = this.board[index].number;
                this.clickCounter = 1;
                this.firstPiece = this.board[index];
                return true;
            }
            //return true;
            
            else if(this.clickCounter == 1){
                piece.flipped=true;
                piece.imageToShow = this.board[index].number;
                this.clickCounter = 2;
                this.secondPiece = this.board[index];
                //this.doMatch();
                return true;
            }              



          /*   if (!this.gameStarted) {
                return false;
            }
            if (this.gameEnded) {
                return false;
            }
            if (playerNumber != this.playerTurn) {
                return false;
            }
            if (this.board[index].number !== 0) {
                return false;
            }
            this.board[index] = playerNumber;
            if (!this.checkGameEnded()) {
                this.playerTurn = this.playerTurn == 1 ? 2 : 1;
            }
            return true; */
        }

        doMatch(){
            if (this.clickCounter == 2){
                if (this.firstPiece.number==this.secondPiece.number)
                {   
                    /* this.timer = setInterval(this.removePieces, 500); */
                    /* if (this.timer){
                        console.log("Timer Created MATCHED");
                    } */
    
                    
                    sleep.sleep(1); // sleep for one second
                    this.removePieces();
                }
                else{
                    /* this.timer = setInterval(this.hidePieces, 2000); */
                    /* if (this.timer){
                        console.log("Timer Created");
                    } */
                    
                    sleep.sleep(1);
                    this.hidePieces(); //sleep for one second
                    this.nextPlayer();
                }
            }
           
        }
        nextPlayer(){
            if (this.playerTurn == 1 && this.player2){
                this.playerTurn = 2;
                return;
            }

            if (this.playerTurn == 2 && this.player3){
                this.playerTurn = 3;
                return;
            }else{
                this.playerTurn = 1;
                return;
            } 

            if (this.playerTurn == 3 && this.player4){
                this.playerTurn = 4;
                return;
            }else{
                this.playerTurn = 1;
                return;
            } 
            if(this.playerTurn == 4) this.playerTurn = 1;
        }

            removePieces(){
                this.firstPiece.imageToShow = "empty";
                this.secondPiece.imageToShow = "empty";  
                this.clickCounter = 0;
                this.firstPiece.removed = true;
                this.secondPiece.removed = true;
                this.firstPiece = undefined;
                this.secondPiece = undefined;
                if(this.timer)
                {
                    clearInterval(this.timer);
                    this.timer=undefined;
                }
                if (this.tilesLeft == 0)
                {
                    this.gameEnded = true;
                    this.gameStarted = false;
                    this.gameEndedMessage = "Game Ended";
                    this.showGameEndedMessage = true;
                }
            }
            hidePieces(){
                this.firstPiece.imageToShow = "hidden";
                this.secondPiece.imageToShow = "hidden";
                this.firstPiece.flipped = false;
                this.firstPiece = undefined;
                this.secondPiece.flipped = false;                        
                this.secondPiece = undefined;
                this.clickCounter = 0;
                if(this.timer)
                {
                    clearInterval(this.timer);
                    this.timer=undefined;
                }
            }
            
    /* constructor(ID, player1Name) {
        this.gameID = ID;
        this.gameEnded = false;
        this.gameStarted = false;
        this.player1= player1Name;
        this.player2= '';
        this.playerTurn = 1;
        this.winner = 0;
        this.board = [0,0,0,0,0,0,0,0,0];
    }

    join(player2Name){
        this.player2= player2Name;
        this.gameStarted = true;
    }

    hasRow(value){
        return  ((this.board[0]==value) && (this.board[1]==value) && (this.board[2]==value)) || 
                ((this.board[3]==value) && (this.board[4]==value) && (this.board[5]==value)) || 
                ((this.board[6]==value) && (this.board[7]==value) && (this.board[8]==value)) || 
                ((this.board[0]==value) && (this.board[3]==value) && (this.board[6]==value)) || 
                ((this.board[1]==value) && (this.board[4]==value) && (this.board[7]==value)) || 
                ((this.board[2]==value) && (this.board[5]==value) && (this.board[8]==value)) || 
                ((this.board[0]==value) && (this.board[4]==value) && (this.board[8]==value)) || 
                ((this.board[2]==value) && (this.board[4]==value) && (this.board[6]==value));
    }  

    checkGameEnded(){
        if (this.hasRow(1)) {
            this.winner = 1;
            this.gameEnded = true;
            return true;
        } else if (this.hasRow(2)) {
            this.winner = 2;
            this.gameEnded = true;
            return true;
        } else if (this.isBoardComplete()) {
            this.winner = 0;
            this.gameEnded = true;
            return true;
        }
        return false;
    }

    isBoardComplete(){
        for (let value of this.board) {
            if (value === 0) {
                return false;
            }
        }
        return true;
    }

    play(playerNumber, index){
        if (!this.gameStarted) {
            return false;
        }
        if (this.gameEnded) {
            return false;
        }
        if (playerNumber != this.playerTurn) {
            return false;
        }
        if (this.board[index] !== 0) {
            return false;
        }
        this.board[index] = playerNumber;
        if (!this.checkGameEnded()) {
            this.playerTurn = this.playerTurn == 1 ? 2 : 1;
        }
        return true;
    } */

}

module.exports = MemoryGame;