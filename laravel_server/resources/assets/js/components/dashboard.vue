<template>
	<div>
		<nav-bar></nav-bar>
		<div class="jumbotron">
			<h1>{{ title }}</h1>
			<button v-model="label" v-on:click="countUsers()">Obter Total users</button>
			<input v-model="totUsers">

		</div>

		<user-list :users="users" @edit-click="editUser" @delete-click="deleteUser" @message="childMessage" ref="usersListRef"></user-list>

		<div class="alert alert-success" v-if="showSuccess">

			<button type="button" class="close-btn" v-on:click="showSuccess=false">&times;</button>
			<strong>{{ successMessage }}</strong>
		</div>
		<user-edit :user="currentUser" @user-saved="savedUser" @user-canceled="cancelEdit" v-if="currentUser"></user-edit>
	</div>
</template>

<script type="text/javascript">
	import UserList from './userList.vue';
	import UserEdit from './userEdit.vue';
	import NavBar from './navBar.vue';

	export default {
		data: function () {
			return {
				title: 'Dashboard',
				showSuccess: false,
				successMessage: '',
				currentUser: null,
				users: [],
				totUsers: undefined,
				label: "obter total de users"

			}
		},
		methods: {
			editUser: function (user) {
				this.currentUser = user;
				this.showSuccess = false;
			},
			deleteUser: function (user) {
				axios.delete('api/users/' + user.id)
					.then(response => {
						this.showSuccess = true;
						this.successMessage = 'User Deleted';
						this.getUsers();
					});
			},
			savedUser: function () {
				this.currentUser = null;
				this.$refs.usersListRef.editingUser = null;
				this.showSuccess = true;
				this.successMessage = 'User Saved';
			},
			cancelEdit: function () {
				this.currentUser = null;
				this.$refs.usersListRef.editingUser = null;
				this.showSuccess = false;
			},
			getUsers: function () {
				axios.get('api/users')
					.then(response => {
						this.users = response.data.data;
					});
			},
			childMessage: function (message) {
				this.showSuccess = true;
				this.successMessage = message;
			},
			 countUsers: function () {
				axios.get("api/users") 
				.then(response => {
					this.totUsers = response.data;
					
					return true;
				});

				label = this.totUsers;
				
			}

			
		},
		components: {
			'user-list': UserList,
			'user-edit': UserEdit,
			'nav-bar': NavBar,
		},
		mounted() {
			this.getUsers();

		}

	}
</script>

<style scoped>
	p {
		font-size: 2em;
		text-align: center;
	}
</style>