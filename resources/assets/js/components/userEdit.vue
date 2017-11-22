<template>
  <div class="jumbotron">
    <h2>Edit User</h2>
    <div class="form-group">
        <label for="inputName">Name</label>
        <input
            type="text" class="form-control" v-model="currentUser.name"
            name="name" id="inputName" 
            placeholder="Fullname" value="" />
    </div>
    <div class="form-group">
        <label for="inputEmail">Email</label>
        <input
            type="email" class="form-control" v-model="currentUser.email"
            name="email" id="inputEmail"
            placeholder="Email address" value=""/>
    </div>

    <div class="form-group">
        <a class="btn btn-default" v-on:click.prevent="saveUser()">Save</a>
        <a class="btn btn-default" v-on:click.prevent="cancelEdit()">Cancel</a>
    </div>

</div>
</template>

<script>
    export default {
      data: function () {
        return {

        }
      },
      props: ['currentUser', 'editingUser'],
      methods: {
        saveUser: function () {
    
        },
        cancelEdit: function () {
    
        }
      }
    }
</script>