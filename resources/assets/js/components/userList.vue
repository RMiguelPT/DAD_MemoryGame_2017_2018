<template>
    <table class="table table-striped">
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in users"  :key="user.id" :class="{active: currentUser === user}">
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>
                    <a class="btn btn-xs btn-primary" v-on:click.prevent="editUser(user)">Edit</a>
                    <a class="btn btn-xs btn-danger" v-on:click.prevent="deleteUser(user)">Delete</a>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<<script>
export default {
  data: function()
{
    return{
        currentUser: {}
    }
},
  props: ["users"],
  methods: {
      editUser: function(user){
          this.currentUser = user;
          this.$emit("edit-user");

      },
      deleteUser: function(user) {
          this.$emit("delete-user", user);
          
      }
  }
}
</script>
