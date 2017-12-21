<!--@extends('home')-->

@section('title', 'Vue.js App')

@section('content')

    <div class="jumbotron">
        <h1></h1>
    </div>
    <table class="table table-striped">
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user of users">
                <td>@{{user.name}}</td>
                <td>@{{user.email}}</td>
                <td>
                    <a v-on:click.prevent="editUser(user)" class="btn btn-info">Edit</a>
                    <a v-on:click.prevent="deleteUser(user)" class="btn btn-danger">Delete</a>
                </td>
            </tr>
        </tbody>
    </table>

    <div class=" alert alert-success" v-if="showSuccess">
        <button type="button" class="close-btn" >&times;</button>
        <strong>@{{successMessage}}</strong>
    </div>

    <div class="jumbotron" v-if="editingUser">
        <h2>Edit User</h2>


        <!---->

        <div class="form-group">
        <label for="inputName">Name</label>
        <input
            type="text" class="form-control"
            name="name" id="inputName"
            placeholder="Fullname"  v-model="currentUser.name"/>
    </div>
    <div class="form-group">
        <label for="inputEmail">Email</label>
        <input
            type="email" class="form-control"
            name="email" id="inputEmail"
            placeholder="Email address"  v-model="currentUser.email"/>
    </div>
    <a v-on:click.prevent="saveUser()" class="btn btn-success">Save</a>
    <a v-on:click.prevent="cancelEdit()" class="btn btn-danger">Delete</a>

    <!---->



</div>

@endsection

<!-- @section('pagescript')
    <script src="js/usersManipulation.js"></script>
    <script src="{{ asset('js/usersManipulation.js') }}"></script>
@stop  
 -->


 @section('scripts')
 <script src="{{ asset('js/usersManipulation.js') }}"></script>
@stop