<template>
    <div>
        <div>
            <h3 class="text-center">{{ title }}</h3>
            <br>
            <!-- <h2>Current Player : {{ currentPlayer }}</h2> -->
            <br>
        </div>
        <div class="game-zone-content">
            <div class="alert alert-success" v-if="showSuccess">
                <button type="button" class="close-btn" v-on:click="showSuccess=false">&times;</button>
                <strong>{{ successMessage }} &nbsp;&nbsp;&nbsp;&nbsp;</strong>
            </div>
            <div class="alert alert-danger" v-if="showFailure">
                <button type="button" class="close-btn" v-on:click="showFailure=false">&times;</button>
                <strong>{{ failMessage }} &nbsp;&nbsp;&nbsp;&nbsp;</strong>
            </div>
            <div class="alert alert-primary" v-if="showGameEndedMessage">
                <button type="button" class="close-btn" v-on:click="showGameEndedMessage=false">&times;</button>
                <strong>{{ gameEndedMessage }} &nbsp;&nbsp;&nbsp;&nbsp;</strong>
            </div>
            <!-- <div class="alert alert-success">
                <button type="button" class="close-btn">&times;</button>

             --></div>
            <form action="#" method="get" id="id_form">
                <div>
                    <label for="idLines">Total Lines:</label>
                    <input type="text" id="idLines" name="Lines" v-model="totLines" v-bind:disabled="gameStarted">
                    <span class="error" id="msgError_Lines"></span>
                </div>
                <div>
                    <label for="idCols">Total Columns:</label>
                    <input type="text" id="idCols" name="cols" v-model="totCols" v-bind:disabled="gameStarted">
                    <span class="error" id="msgError_Cols"></span>
                </div>
                <div>
                    <a class="btn btn-default" v-if="!gameStarted" v-on:click.prevent="startGame()">Start Game</a>
                    <a class="btn btn-default" v-if="gameStarted" v-on:click.prevent="stopGame()">Stop Game</a>
                </div>
            </form>

            <div class="header" id="gameScore">

                <!-- <div>
                        <span>Moves:</span>
                        <span id="movesLabel"> 0</span>
                    </div> -->
                <div>
                    <span>Total Tiles:</span>
                    <span id="totTilesLabel"> {{totTiles}}</span>
                </div>
                <div v-if="gameStarted">
                    <span>Total Tiles:</span>
                    <span id="tilesLeftLabel"> {{tilesLeft}}</span>
                </div>
            </div>


            <div class="board" v-if="gameStarted">
                <div v-bind:style="{ width: maxBoardWith }">
                    <div v-for="(piece, key) of board">
                        <img v-bind:src="pieceImageURL(piece.imageToShow)" v-on:click.prevent="clickPiece(key)">
                    </div>
                </div>
            </div>
            <hr>
        </div>
    </div>
</template>

<script type="text/javascript">
    export default {
        data: function () {
            return {
                //Variables
                title: 'MemoryGame',
                totLines: 4,
                totCols: 4,
                validGame: 0,
                //remaningTiles: undefined,
                totMoves: undefined,
                gameStatus: 0,
                gameStarted: false,
                clickCounter: 0,
                firstPiece: undefined,
                secondPiece: undefined,
                timer: undefined,
                board: [],
                showSuccess: false,
                showFailure: false,
                successMessage: '',
                failMessage: '',
                gameEndedMessage: '',
                showGameEndedMessage: false,
                
            }
        },
        methods: {
            pieceImageURL: function (piece) {
                var imgSrc = String(piece);
                return 'img/' + imgSrc + '.png';
            },

            startGame: function () {
                console.log(this.totLines);
                console.log(this.totCols);
                console.log("Game Started");
                if (this.totTiles % 2 == 0 && this.totTiles <= 80) {
                    this.createBoard();
                    this.gameStarted = true;
                    this.successMessage = "Game started";
                    this.showSuccess = true;
                } else {
                    this.failMessage = "Columns x Rows must be even and less than 80";
                    this.showFailure = true;

                    //console.log("Cols or rows invalid");
                }

            },
            stopGame: function () {
                this.gameStarted = false;
                this.board = [];
                console.log("Game STOPED");
            },

            createBoard: function(){
                for(var i = 1; i <= this.totTiles; i+=2)
                {
                    var piece1 = {                   
                        number: undefined,
                        imageToShow: "hidden",
                        flipped: false,
                        removed: false
                    }                  
                   
                    var number = undefined;
                    
                    do{
                        number = Math.floor(Math.random()*40);
                        
                    }
                    while (!this.canBePushed(number));
                    
                    piece1.number = number;
                    var piece2 = Object.assign({}, piece1); //Copy piece data 1 into piece 2           
                   
                    this.board.push(piece1);
                    this.board.push(piece2);
                   
                   
                   
                }
                for (var i = 0; i < 40; i++){
                    shuffle(this.board);
                }
                
                console.table(this.board);                
            },

            clickPiece: function(index) {
                var piece=this.board[index];
                //console.log(this.gameStarted);
                if(!this.gameStarted || piece.flipped || piece.removed) return;
                if (this.clickCounter == 0){
                    piece.flipped=true;
                    piece.imageToShow = this.board[index].number;
                    this.clickCounter = 1;
                    this.firstPiece = this.board[index];
                }
                else if(this.clickCounter == 1){
                    piece.flipped=true;
                    piece.imageToShow = this.board[index].number;
                    this.clickCounter = 2;
                    this.secondPiece = this.board[index]
                    this.doMatch();
                }               
            },
            doMatch: function(){                   
                    if (this.firstPiece.number==this.secondPiece.number)
                    {   
                        this.timer = setInterval(this.removePieces, 500);
                    }
                    else{
                        
                        this.timer = setInterval(this.hidePieces, 2000);
                    }
                    
            },
            //Check for duplicates
            canBePushed: function(number){
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
            },
            removePieces: function(){
                this.firstPiece.imageToShow = "empty" 
                this.secondPiece.imageToShow = "empty"  
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
            },
            hidePieces: function(){
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
            },

            
        },
        computed: {
            totTiles: function () {
                return this.totLines * this.totCols;
            },
            maxBoardWith: function () {
                return this.totCols * 50 + "px";
            },
            tilesLeft: function (){
                var count = this.totTiles;

                for(var piece of this.board){
                    if(piece.removed == true)
                    {
                        count--;
                    }
                }
                return count;
            }
           


        },
        mounted() {
            this.board = [];
            //INIT
            //this.totTiles = this.totLines * this.totCols;

            // for (var i = 0; i < this.totTiles; i++) {
            //     this.board.push(0);
            // }
        }
    }
</script>

<style>

</style>

<!--<script type="text/javascript">
	export default {
        data: function(){
			return {
                title: 'MemoryGame',
                showSuccess: false,
                showFailure: false,
                successMessage: '',
                failMessage: '',
                currentValue: 1,
                gameEnded:false,
                player1User: undefined,
                player2User: undefined,
                board: [0,0,0,0,0,0,0,0,0]
            }
        },
        methods: {
            pieceImageURL: function (piece) {
                var imgSrc = String(piece);
                return 'img/' + imgSrc + '.png';
            },
            clickPiece: function(index) {
                if(this.board[index] || this.gameEnded) return;
                this.board[index] = this.currentValue;
                this.successMessage = this.currentPlayer+' has Played';
                this.showSuccess = true;
                this.currentValue = (this.currentValue == 1)? 2 : 1;
                this.checkGameEnded();
            },
            restartGame:function(){
                console.log('restartGame');
                this.board= [0,0,0,0,0,0,0,0,0];
                this.showSuccess= false;
                this.showFailure= false;
                this.successMessage= '';
                this.failMessage= '';
                this.currentValue= 1;
                this.gameEnded= false;
            },
            // ----------------------------------------------------------------------------------------
            // GAME LOGIC - START
            // ----------------------------------------------------------------------------------------
            hasRow: function(value){
                return  ((this.board[0]==value) && (this.board[1]==value) && (this.board[2]==value)) || 
                ((this.board[3]==value) && (this.board[4]==value) && (this.board[5]==value)) || 
                ((this.board[6]==value) && (this.board[7]==value) && (this.board[8]==value)) || 
                ((this.board[0]==value) && (this.board[3]==value) && (this.board[6]==value)) || 
                ((this.board[1]==value) && (this.board[4]==value) && (this.board[7]==value)) || 
                ((this.board[2]==value) && (this.board[5]==value) && (this.board[8]==value)) || 
                ((this.board[0]==value) && (this.board[4]==value) && (this.board[8]==value)) || 
                ((this.board[2]==value) && (this.board[4]==value) && (this.board[6]==value));
            },
            checkGameEnded: function(){
                if (this.hasRow(1)) {
                    this.successMessage = this.playerName(1) + ' won the Game';
                    this.showSuccess = true;
                    this.gameEnded = true;
                }
                if (this.hasRow(2)) {
                    this.successMessage = this.playerName(2) + ' won the Game';
                    this.showSuccess = true;
                    this.gameEnded = true;
                }
                if (this.isBoardComplete()) {
                    this.successMessage = 'The Game ended in a Tie';
                    this.showSuccess = true;
                    this.gameEnded = true;
                }
                return false;
            },
            isBoardComplete:function(){
                var returnValue = true;
                this.board.forEach(function(element) {
                    if (element === 0) {
                        returnValue = false;
                        return;
                    }
                });
                return returnValue;
            },
            // ----------------------------------------------------------------------------------------
            // GAME LOGIC - END
            // ----------------------------------------------------------------------------------------        
            playerName: function(playerNumber){
                console.log(playerNumber);
                console.log(this.player1User);
                if(this.player1User != undefined && playerNumber == 1){
                    return this.player1User.name;                
                }
                if(this.player2User != undefined && playerNumber == 2){
                    return this.player2User.name;
                }
                return 'Player '+playerNumber;
            }
        },
        computed:{
            currentPlayer: function(){ 
                console.log(this.currentValue);
                console.log(this.playerName(this.currentValue));
                return this.playerName(this.currentValue);
            }
        },
        mounted(){
            if(this.$root.$data.player1){
                this.player1User = this.$root.$data.player1;
            }
            if(this.$root.$data.player2 ){
                this.player2User = this.$root.$data.player2;
            }
        }
    }
</script>

<style>	
    
</style> -->