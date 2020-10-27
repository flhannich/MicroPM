<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Task;
use App\Project;
use App\User;

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


Route::get('projects', 'ProjectController@index');
Route::get('projects/{project}', 'ProjectController@show');
Route::post('projects', 'ArticleController@store');
Route::put('projects/{project}', 'ArticleController@update');
Route::delete('projects/{project}', 'ArticleController@delete');
