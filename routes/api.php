<?php

use Illuminate\Http\Request;
use Illuminate\Contracts\Support\Jsonable;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


/******************** USERS *********************/
Route::get('users', 'UserControllerAPI@getUsers');
Route::get('users/emailavailable', 'UserControllerAPI@emailAvailable');
Route::get('users/{id}', 'UserControllerAPI@getUser');
Route::post('users', 'UserControllerAPI@store');
Route::put('users/{id}', 'UserControllerAPI@update');
Route::delete('users/{id}', 'UserControllerAPI@delete');

/******************Login/Logout********************/
Route::post('login', 'LoginControllerAPI@login');
Route::middleware('auth:api')->post('logout', 'LoginControllerAPI@logout');

Route::middleware('auth:api')->get('teste', function () {
    return response()->json(['msg'=>'Só um teste'], 200);
   });