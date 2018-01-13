<template>
    <div class="container navbar navbar-toggleable-md navbar-light bg-faded">
        <div class="row">
            <div class="col-md-1">
                <router-link to="/users">Users</router-link>
            </div>
            <div class="col-md-1">
                <router-link to="/singleplayer">SinglePlayer</router-link>
            </div>
            <div class="col-md-1">
                <router-link to="/multiplayer">Multiplayer</router-link>
            </div>
            <div class="col-md-7"> </div>

            <div class="col-md-2 text-right">Place Username/login/logout Here </div>

        </div>




    </div>
</template>
<script>
    export default {

    }
</script>