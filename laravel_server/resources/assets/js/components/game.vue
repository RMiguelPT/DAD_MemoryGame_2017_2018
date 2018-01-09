<template>
	<div class="gameseparator">
        <div>
            <h2 class="text-center">Game {{ game.gameID }}</h2>
            <br>
        </div>
        <div class="game-zone-content">       
            <div class="alert" :class="alerttype">
                <strong>{{ message }} &nbsp;&nbsp;&nbsp;&nbsp;
                    <a v-show="game.gameEnded" v-on:click.prevent="closeGame">Close Game</a></strong>
                    <div class="btn btn-xs btn-success" v-on:click.prevent="startgame" v-if="game.player2 && !game.gameStarted">Start Game</div>
            </div>
            <div class="board" v-if="game.gameStarted">
                <div v-bind:style="{ width: maxBoardWith }">
                    <div v-for="(piece, index) of game.board">
                        <img v-bind:src="pieceImageURL(piece.imageToShow)" v-on:click.prevent="clickPiece(index)">
                    </div>
                </div>
            </div>
            <hr>
        </div>  
    </div>			
</template>

<script type="text/javascript">
	export default {
        props: ['game'],
        data: function(){
			return {

            }
        },
        computed: {
            ownPlayerNumber(){
                if (this.game.player1SocketID == this.$parent.socketId) {
                    return 1;
                } else if (this.game.player2SocketID == this.$parent.socketId) {
                    return 2;
                } else if (this.game.player3SocketID == this.$parent.socketId) {
                    return 3;
                }else if (this.game.player4SocketID == this.$parent.socketId) {
                    return 4;
                }
                    
                return 0;
            },
            ownPlayerName(){
                var ownNumber = this.ownPlayerNumber;
                if (ownNumber == 1)
                    return this.game.player1;
                if (ownNumber == 2)
                    return this.game.player2;
                if (ownNumber == 3)
                    return this.game.player3;
                if (ownNumber == 4)
                    return this.game.player4;
                    
                return "Unknown";
            },
            adversaryPlayerName(){
                var ownNumber = this.ownPlayerNumber;
                if (this.game.playerTurn == 1)
                    return this.game.player1;
                if (this.game.playerTurn == 2)
                    return this.game.player2;
                if (this.game.playerTurn == 3)
                    return this.game.player3;
                if (this.game.playerTurn == 4)
                    return this.game.player4;
                return "Unknown";
            },
            message(){
                if (!this.game.gameStarted) {
                    return "Game has not started yet";
                } else if (this.game.gameEnded) {
                    if (this.game.winner == this.ownPlayerNumber) {
                        return "Game has ended. You Win.";
                    } else if (this.game.winner == 0) {
                        return "Game has ended. There was a tie.";
                    } 
                    return "Game has ended and " + this.adversaryPlayerName + " has won. You lost.";
                } else {
                    if (this.game.playerTurn == this.ownPlayerNumber) {
                        return "It's your turn";
                    } else {
                        return "It's " + this.adversaryPlayerName + " turn";
                    }
                }
                return "Game is inconsistent";
            },
            alerttype(){
                if (!this.game.gameStarted) {
                    return "alert-warning";
                } else if (this.game.gameEnded) {
                    if (this.game.winner == this.ownPlayerNumber) {
                        return "alert-success";
                    } else if (this.game.winner == 0) {
                        return "alert-info";
                    } 
                    return "alert-danger";
                } 
                if (this.game.playerTurn == this.ownPlayerNumber) {
                    return "alert-success";    
                } else {
                    return "alert-info";
                }
                
            },
            maxBoardWith: function () {
                //console.log(this.game.totCols * 50 + "px");
                return this.game.totCols * 50 + "px";
            },
        },
        methods: {
            pieceImageURL (pieceNumber) {
                //console.log(pieceNumber);
                var imgSrc = String(pieceNumber);
                return 'img/' + imgSrc + '.png';
            },
            closeGame (){
                this.$parent.close(this.game);
            },
            startgame(){
                this.$emit("start-game", this.game);
            },
            clickPiece(index){
                //console.log(this.game);
                if (!this.game.gameEnded) {
                    if (this.game.playerTurn != this.ownPlayerNumber) {
                        alert("It's not your turn to play");
                    } else {
                        if (!this.game.board[index].flipped) {
                            this.$emit("play", this.game, index);
                        }
                    }
                }
            }
        },
    }
</script>

<style scoped>	
.gameseparator{
    border-style: solid;
    border-width: 2px 0 0 0;
    border-color: black;
}
</style>