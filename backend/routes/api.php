<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ApiAuthController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\UserController;

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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
// });
// Route::middleware('auth:api')->group(function () {
// });


Route::group(['middleware' => ['cors', 'json.response']], function () {

  Route::get('/projects', [UserController::class, 'projects']);
  Route::get('/projects/{project}/tasks', [UserController::class, 'tasks']);

  Route::get('/task/{id}', [UserController::class, 'task']);
  Route::get('/task/{id}/messages', [UserController::class, 'messages']);
  Route::post('/task/{id}/{status}', [UserController::class, 'updateTaskStatus']);

  Route::post('/login', [UserController::class, 'login']);
  Route::post('/logout', [UserController::class, 'logout']);

});
