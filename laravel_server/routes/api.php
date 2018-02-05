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


Route::post('login', 'LoginControllerAPI@login');

Route::post('logout', 'LoginControllerAPI@logout');
Route::get('users/getuserbymail/{email}', 'UserControllerAPI@getUserByMail')->middleware('auth:api');


Route::get('users/getblockedusers/', 'UserControllerAPI@getBlockedUsers');
Route::get('users/getadminusers/', 'UserControllerAPI@getAdminUsers');

Route::get('users', 'UserControllerAPI@getUsers');
Route::get('users/emailavailable', 'UserControllerAPI@emailAvailable');
Route::get('users/{id}', 'UserControllerAPI@getUser');
Route::post('users', 'UserControllerAPI@store');
Route::put('users/{id}', 'UserControllerAPI@update');
Route::delete('users/{id}', 'UserControllerAPI@delete');
Route::get('users/count', 'UserControllerAPI@count');
Route::get('games', 'GameControllerAPI@index');
Route::get('games/lobby', 'GameControllerAPI@lobby');
Route::get('games/status/{status}', 'GameControllerAPI@gamesStatus');
Route::get('games/{id}', 'GameControllerAPI@getGame');
Route::post('games', 'GameControllerAPI@store');
Route::patch('games/{id}/join-start', 'GameControllerAPI@joinAndStart');
Route::patch('games/{id}/endgame/{winner}', 'GameControllerAPI@endgame');



Route::get('games/winner/{id}', 'GameControllerAPI@gamesByWinner');

Route::delete('games/delete/', 'GameControllerAPI@deleteAllGames');
Route::delete('games/deletestatus/{status}','GameControllerAPI@deleteGamesByStatus');


