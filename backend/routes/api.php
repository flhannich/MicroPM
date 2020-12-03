<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ApiAuthController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\MessageController;

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

  Route::get('/projects', [ProjectController::class, 'index']);
  Route::post('/projects/{id}', [ProjectController::class, 'show']);
  Route::post('/projects/create', [ProjectController::class, 'create']);
  Route::post('/projects/{id}/delete', [ProjectController::class, 'delete']);

  Route::post('/tasks/project/{id}', [TaskController::class, 'index']);




  Route::post('/tasks/{id}', [TaskController::class, 'show']);
  Route::post('/tasks/create/{project}', [TaskController::class, 'create']);
  Route::post('/tasks/{id}/delete', [TaskController::class, 'delete']);

  // Route::post('/tasks/status', [TaskController::class, 'showByStatus']);
  //
  //
  //
  //
  // Route::post('/task/{id}/{status}', [TaskController::class, 'updateStatus']);
  // Route::post('/task/{id}/{accepted}', [TaskController::class, 'updateAccepted']);

  Route::post('/message/create', [MessageController::class, 'create']);
  // Route::get('/message/delete/{message}', [TaskController::class, 'delete']);

  Route::post('/login', [UserController::class, 'login']);
  Route::post('/logout', [UserController::class, 'logout']);

});
