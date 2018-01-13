<template>
    <div class="container navbar navbar-toggleable-md navbar-light bg-faded">
        <div class="row">
            <div class="col-md-1" v-if="$store.state.user.admin">
                <router-link to="/dash">Dashboard</router-link>
            </div>
            <div class="col-md-1">
                <router-link to="/singleplayer">SinglePlayer</router-link>
            </div>
            <div class="col-md-1">
                <router-link to="/multiplayer">Multiplayer</router-link>
            </div>
            <div class="col-md-7"> </div>

            <div class="col-md-2 text-right">{{$store.state.user.nickname}}</div>

        </div>




    </div>
</template>
<script>
    export default {
     
    
     methods: {

     },
     computed: {

     },
     mounted(){

                 console.log("dash");
                      }
    }
</script>