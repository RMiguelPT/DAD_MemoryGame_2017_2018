<template>
    <div class="gameseparator">
        <div>
            <h2 class="text-center">Game {{ game.gameID }}</h2>
            <br>
        </div>
        <div class="game-zone-content">
            <div class="alert text-center" :class="alerttype">
                <strong>{{ message }} &nbsp;&nbsp;&nbsp;&nbsp; Your score: {{ownScore}}
                    <a v-show="game.gameEnded" v-on:click.prevent="closeGame">Close Game</a>
                </strong>
                <form action="#" method="get" id="id_form" v-if="game.player1==ownPlayerName">




                    




                    <div>
                        <label for="idLines">Total Lines:</label>
                        <input type="text" id="idLines" name="Lines" v-model="game.totLines" v-bind:disabled="disableForm">
                        <span class="error" id="msgError_Lines"></span>
                    </div>
                    <div>
                        <label for="idCols">Total Columns:</label>
                        <input type="text" id="idCols" name="cols" v-model="game.totCols" v-bind:disabled="disableForm">
                        <span class="error" id="msgError_Cols"></span>
                    </div>
                    <div>
                        <label for="defaultSize">Default size?</label>
                        <input type="checkbox" id="defaultSize" name="size" v-model="game.defaultSize" v-bind:disabled="game.gameStarted">
                        <span class="error" id="msgError_Cols"></span>
                    </div>
                    <div>
                        <div class="btn btn-xs btn-success" v-on:click.prevent="startgame" v-if="game.players[1] && !game.gameStarted && game.players[0].playerName==ownPlayerName">Start Game</div>
                    </div>
                </form>
            </div>
            <div class="container" v-if="game.gameStarted">
                    <div class="row">
                    <div class="col-sm-3 chatBox" v-bind:style="{ height: chatHeight }">
                        <ul class="messages">  
                            <!-- Chat MESSAGES -->                      
                            <!-- <li v-for="message in messages">{{message.playerName}}: {{message.message}}</li> -->
                            <li v-for="message in messages">{{message.playerName}}: {{message.message}}</li>
                        </ul>
                    </div>
                    <div class="col-sm-6">
                        <div class="board text-center col-md">
                            <div v-bind:style="{ width: maxBoardWith }">
                                <div v-for="(piece, index) of game.board">
                                    <img v-bind:src="pieceImageURL(piece.imageToShow)" v-on:click.prevent="clickPiece(index)">
                                </div>
                            </div>
                        </div>
                    </div>
                     <div class="col-sm-6"> </div>
                </div>
                <div class="row">
                    <div class="col-sm">
                        <form action="">
                            <input v-model="input" autocomplete="off" />
                            <button class="btn btn-success" v-on:click.prevent="sendMessage()">
                                <span class="glyphicon glyphicon-send" aria-hidden="true"></span>
                            </button>
                        </form>
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
        data: function () {
            return {
                input: "",
                messages: [],
                pieceToFlip: undefined,
            }
        },
        sockets: {
            message_received(data) {
                var date = new Date();
                var formatedDate = date.getHours() + ":" + date.getMinutes();
                if (this.game.gameID == data.gameID) {
                    let playerAndMessage = {
                        playerName: data.playerName,
                        message: data.message,
                        time: Date.now(),
                    }
                    this.messages.push(playerAndMessage);
                }
            }

        },
        computed: {
            ownScore() {
                switch (this.ownPlayerNumber) {
                    case 1:
                        return this.game.players[0].score;
                        break;
                    case 2:
                        return this.game.players[1].score;
                        break;
                    case 3:
                        return this.game.players[2].score;
                        break;
                    case 4:
                        return this.game.players[3].score;
                        break;
                    default:
                        break;
                }
            },
            disableForm() {
                if (this.game.defaultSize || this.game.gameStarted) return true;
                else return false;
            },

            totTiles() {
                return this.game.totCols * this.game.totLines;
            },
            isValidGame() {
                if (this.totTiles % 2 == 0 && this.totTiles <= 80) return true;
                else return false;
            },



            ownPlayerNumber() {
                if (this.game.player1SocketID == this.$parent.socketId) {
                    return 1;
                } else if (this.game.player2SocketID == this.$parent.socketId) {
                    return 2;
                } else if (this.game.player3SocketID == this.$parent.socketId) {
                    return 3;
                } else if (this.game.player4SocketID == this.$parent.socketId) {
                    return 4;
                }

                return 0;
            },
            ownPlayerName() {
                var ownNumber = this.ownPlayerNumber;
                if (ownNumber == 1)
                    return this.game.players[0].playerName;
                if (ownNumber == 2)
                    return this.game.players[1].playerName;
                if (ownNumber == 3)
                    return this.game.players[2].playerName;
                if (ownNumber == 4)
                    return this.game.players[3].playerName;

                return "Unknown";
            },
            adversaryPlayerName() {
                var ownNumber = this.ownPlayerNumber;
                if (this.game.playerTurn == 1)
                    return this.game.players[0].playerName;
                if (this.game.playerTurn == 2)
                    return this.game.players[1].playerName;
                if (this.game.playerTurn == 3)
                    return this.game.players[2].playerName;
                if (this.game.playerTurn == 4)
                    return this.game.players[3].playerName;
                return "Unknown";
            },
            message() {
                if (!this.game.gameStarted) {
                    return "Game has not started yet";
                } else if (this.game.gameEnded) {
                    if (this.game.winner == this.ownPlayerNumber) {
                        return "Game has ended. You Win.";
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
            alerttype() {
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
                return this.game.totCols * 50 + "px";
            },
            chatHeight: function () {
                return this.game.totLines * 50 + "px";
            }
        },
        methods: {
            pieceImageURL(pieceNumber) {
                var imgSrc = String(pieceNumber);
                return 'img/' + imgSrc + '.png';
            },
            closeGame() {
                this.$parent.close(this.game);
            },
            startgame() {
                console.log("player[0] name:" + this.game.players[0].playerName);
                console.log("own:" + this.ownPlayerName);
                this.$emit("start-game", this.game);
            },
            clickPiece(index) {
                if (!this.game.gameEnded) {
                    if (this.game.playerTurn != this.ownPlayerNumber) {
                        alert("It's not your turn to play");
                    } else {
                        if (!this.game.board[index].flipped) {
                            this.$emit("play", this.game, index);
                        }
                    }
                }

            },

            


            sendMessage() {
                let data = {
                    gameID: this.game.gameID,
                    playerName: this.ownPlayerName,
                    message: this.input
                    
                }
                this.$emit("send-message", data);
                this.input = "";
            }
        },
    }
</script>

<style scoped>
    .gameseparator {
        border-style: solid;
        border-width: 2px 0 0 0;
        border-color: black;
    }
</style>