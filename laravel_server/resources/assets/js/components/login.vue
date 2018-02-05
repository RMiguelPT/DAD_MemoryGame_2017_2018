<template>
	<div>
		<div class="container">
    	<div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Login</div>

                <div class="panel-body">
                <!-- <form class="form-horizontal" method="POST" action="{{ route('login') }}"> -->
                    <form class="form-horizontal">
                        

                        <div class="form-group">
                            <label for="email" class="col-md-4 control-label">E-Mail Address</label>

                            <div class="col-md-6">
                                <input input id="userEmail" v-model="email" type="email" class="form-control" name="email" value="" required autofocus>

                              
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="password" class="col-md-4 control-label" >Password</label>

                            <div class="col-md-6">
                                <input id="userPass" v-model="password" type="password" class="form-control" name="password" required>

                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox" name="remember" > Remember Me
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-8 col-md-offset-4">
                                <button type="submit" class="btn btn-primary" v-on:click.prevent="loginUser">
                                    Login
                                </button>

                                <a class="btn btn-link" href="">
                                    Forgot Your Password?
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    	</div>
		</div>
	</div>	   
</template>



<script type="text/javascript">
import UserList from "./userList.vue";
import UserEdit from "./userEdit.vue";

import VueRouter from "vue-router";

var router = new VueRouter();


export default {
  data: function() {
    return {
      email: undefined,
      password: undefined
    };
  },
  methods: {
    loginUser: function() {
  
// Get Tokens and store in window localstorage and Vuex store
      axios
        .post("api/login", { email: this.email, password: this.password })
        .then(response => {
          var token = response.data.access_token;
          var refreshToken = response.data.refresh_token;

          window.localStorage.setItem("authToken", token);
          window.localStorage.setItem("resfreshToken", refreshToken);
          window.localStorage.setItem("isUserLogin", true);
         
         // store tockens vuex
         this.$store.state.user.headers.Authorization = 'Bearer ' + window.localStorage.getItem("authToken");
         this.$store.state.user.refresh = window.localStorage.getItem("resfreshToken");

// Get and store user data by unique email and redirect to default page
          axios
            .get("api/users/getuserbymail/" + this.email, { headers: this.$store.state.user.headers})
            .then(response => {

              this.$store.state.user.nickname =  response.data[0].nickname;
              window.localStorage.setItem("userName", response.data[0].nickname);

              if (response.data[0].admin == "1") {
                this.$store.state.user.admin = true;
                return this.$router.push("/dash");
              } else {
                this.$store.state.user.admin = false;
                return this.$router.push("/singleplayer");
              }



            })
            .catch(error => {
              if (error.response.status == 401) {
                alert("Invalid");
                return this.$router.push("/dash");
              }
              alert(error);
            });
        });
    }
  },
  components: {
    "user-list": UserList,
    "user-edit": UserEdit
  },
  mounted() {}
};
</script>


