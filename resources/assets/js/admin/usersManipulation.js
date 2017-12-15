/*jshint esversion: 6 */

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./../bootstrap.js');

window.Vue = require('vue');

const app = new Vue({
  el: '#app',
  data: {
    title: 'List Users',
    editingUser: false,
    showSuccess: false,
    showFailure: false,
    successMessage: '',
    failMessage: '',
    currentUser: {},
    users: [],
    departments: [],
    originalUser: {}
  },
  methods: {
    editUser: function (user) {
      this.editingUser = true;
      this.currentUser = user;
      this.originalUser = Object.assign({}, this.currentUser)
    },
    deleteUser: function(user){

      var self=this;
      axios.delete('/api/users/'+user.id)
        .then(function(){
          self.showSuccessMessage("User Deleted");                
          axios.get("/api/users")
            .then(function(result){
              //console.table(result.data.data);
              self.users = result.data.data;
            })
            .catch(console.log);

        });
           
    },
    saveUser: function(){

      var self = this;

      axios.put("/api/users/" + this.currentUser.id, this.currentUser)
        .then(function(result){
          self.showSuccessMessage("User Saved");
               

          axios.get("/api/users")
            .then(function(result){
              //console.table(result.data.data);
              self.users = result.data.data;
            })
            .catch(console.log);
        })
        .catch(console.log);

    },
    cancelEdit: function(){
      this.currentUser = this.originalUser;
      this.editUser = false;
        
    },
    showSuccessMessage: function(message){
      var self = this;
      self.successMessage = message;
      self.showSuccess = true;
      setTimeout(function(){
        self.showSuccess = false;
        self.successMessage = "";
      }, 2000);
    }
  },
  mounted() {

    var self = this;

    axios.get("/api/users")
      .then(function(result){
        //console.table(result.data.data);
        self.users = result.data.data;
      })
      .catch(console.log);
  }
});
