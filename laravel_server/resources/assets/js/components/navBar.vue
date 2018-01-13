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

          <div class="dropdown col-md-2">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {{$store.state.user.nickname}}
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                     <a class="dropdown-item" v-on:click.prevent="logout()">Logout</a>
                </div>
          </div>


        </div>

    </div>
</template>
<script>
    export default {
     
    
     methods: {

            logout: function(){

                console.log("Logging Out");
                console.log(this.$store.state.user.headers.Authorization);

                 var config = {
            headers: {
              Authorization: this.$store.state.user.headers.Authorization,
              Accept: "application/json"
            }
          };
                 console.log("Logging Out");
                console.log(config);



                axios.post('api/logout', config).then(response=>{
                    console.log(response.data);
                   
                    this.$store.state.user.nickname = "";
                    this.$store.state.user.id = "";
                    this.$store.state.user.refresh = "";
                    this.$store.state.user.headers.Accept = "";
                    this.$store.state.user.headers.Authorization = "";
                    sessionStorage.clear();

                    return this.$router.push("/index");
            });
            }

     },
     computed: {

     },
     mounted(){
     }
    }
</script>