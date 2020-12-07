<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ApiAuthController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\SubTaskController;
use App\Http\Controllers\SettingsController;

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
  Route::get('/projects/{id}', [ProjectController::class, 'show']);
  Route::post('/projects', [ProjectController::class, 'create']);
  Route::delete('/projects/{id}', [ProjectController::class, 'delete']);


  Route::get('/project/{id}/tasks', [TaskController::class, 'index']);
  Route::get('/tasks/{id}', [TaskController::class, 'show']);
  Route::post('/tasks/{project}', [TaskController::class, 'create']);
  Route::delete('/tasks/{id}', [TaskController::class, 'delete']);

  Route::get('/status/tasks', [TaskController::class, 'showByStatus']);

  Route::post('/subtasks/{task}', [SubTaskController::class, 'create']);
  Route::delete('/subtasks/{id}', [SubTaskController::class, 'delete']);


  Route::get('/settings', [SettingsController::class, 'show']);
  Route::delete('/settings', [SettingsController::class, 'update']);




  Route::post('/message/create', [MessageController::class, 'create']);
  // Route::get('/message/delete/{message}', [TaskController::class, 'delete']);

  Route::post('/login', [UserController::class, 'login']);
  Route::post('/logout', [UserController::class, 'logout']);

});
