<template>
	<div>
        <div>
            <h3 class="text-center">{{ title }}</h3>
            <br>
            <!-- <h2>Current Player : {{ currentPlayer }}</h2> -->
            <br>
        </div>
        <div class="game-zone-content">       
            <!-- <div class="alert alert-success" v-if="showSuccess">
                <button type="button" class="close-btn" v-on:click="showSuccess=false">&times;</button>
                <strong>{{ successMessage }} &nbsp;&nbsp;&nbsp;&nbsp;<a v-show="gameEnded" v-on:click.prevent="restartGame">Restart</a></strong>
            </div> -->
            <div class="alert alert-success">
                <button type="button" class="close-btn" >&times;</button>
            
            </div>

            
                



                <form action="#" method="get" id="id_form">
                    <div>
                        <label for="idLines">Total Lines:</label>
                        <input type="text" id="idLines" name="Lines" v-model="totLines">
                        <span class="error" id="msgError_Lines"></span>
                    </div>
                    <div>
                        <label for="idCols">Total Columns:</label>
                        <input type="text" id="idCols" name="cols" v-model="totCols">
                        <span class="error" id="msgError_Cols"></span>
                    </div>
                    <div>
                        <a class="btn btn-default" v-if="!gameStarted" v-on:click.prevent="startGame()">Start Game</a>
                        <a class="btn btn-default" v-if="gameStarted" v-on:click.prevent="stopGame()">Stop Game</a>
                    </div>
			    </form>
		
                <div class="header" id="gameScore">
                    <div>
                        <span>Time:</span>
                        <span id="timeLabel"> 0 sec</span>
                    </div>
                    <div>
                        <span>Moves:</span>
                        <span id="movesLabel"> 0</span>
                    </div>
                    <div>
                        <span>Remaining Tiles:</span>
                        <span id="tilesLabel"> {{totTiles}}</span>
                    </div>
                </div>


            <div class="board" v-if="gameStarted">


                <!-- <div v-for="(piece, key) of board" >
                    <img v-bind:src="pieceImageURL(piece)" v-on:click="clickPiece(key)">
                </div> -->
                <div v-for="lines in totLines">
                    <!-- <div v-for="(piece, key) of board" >
                        <img v-bind:src="pieceImageURL(piece)" v-on:click="clickPiece(key)">
                </div> -->
                    <div v-for="cols in totCols" >
                            <img v-bind:src="pieceImageURL(0)">
                    </div>
                </div>
            </div>
            <hr>
        </div>  
    </div>			
</template>

<script type="text/javascript">
	export default {
        data: function(){
			return {
                //Variables
                title: 'MemoryGame',
                totLines: 4,
                totCols: 4,
                totTiles: undefined,
                validGame: 0,
                remaningTiles: undefined,
                totMoves: undefined, 
                gameStatus: 0,
                gameStarted: false,
                clickCounter: 0,
                board: []                
            }
        },
        methods: {
            validateLines: function(){

            },

            pieceImageURL: function (piece) {
            var imgSrc = String(piece);
            return 'img/' + imgSrc + '.png';
            },
        
            startGame: function(){
                console.log(this.totLines);
                console.log(this.totCols);
                console.log("Game Started");
                this.gameStarted = true;
            },
            stopGame: function(){
                this.gameStarted = false;
                console.log("Game STOPED");
            },

            

            
        },
        computed:{

           
        },
        mounted(){
            //INIT
            this.totTiles = this.totLines * this.totCols;

            for (var i=0; i<this.totTiles; i++){
                this.board.push(0);
            }
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