<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ApiAuthController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ClientController;
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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::middleware('auth:api')->group(function () {
    // protected  routes will go in here
    Route::post('/logout', [ApiAuthController::class, 'logout']);

});


Route::group(['middleware' => ['cors', 'json.response']], function () {
  // public routes will go in here

  //CLIENT
  // Route::post('/login', [ApiAuthController::class, 'login']);
  Route::get('/client/projects', [ClientController::class, 'projects']);
  Route::post('/client/task/{id}/{status}', [ClientController::class, 'task']);
  // Route::get('/project/{client}', [ClientController::class, 'index']);
  Route::post('/client/login', [ClientController::class, 'login']);
  Route::post('/client/logout', [ClientController::class, 'logout']);

  //ADMIN
  // Route::post('/user/register/{client}', [ClientController::class, 'register']);
  // Route::post('/user/register', [UserController::class, 'register']);
  // Route::post('/user/login', [UserController::class, 'login']);
  //
  // Route::post('/project/{client}/{project}', [ProjectController::class, 'store']);


});
