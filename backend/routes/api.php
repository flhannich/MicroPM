<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ApiAuthController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ClientController;

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

  Route::post('/login', [ApiAuthController::class, 'login']);
  Route::post('/register', [ApiAuthController::class, 'register']);

  Route::post('/register', [ApiAuthController::class, 'register']);

  // Route::get('/projects', [ProjectController::class, 'index']);

  Route::get('/client/{secret}', [ClientController::class, 'index']);

  // Route::get('/client/{id}', function ($secret) {
  //     return 'nbr '.$secret;
  // });

  // Route::get('projects', 'ProjectController@index');
  // Route::get('projects/{project}', 'ProjectController@show');
  // Route::post('projects', 'ArticleController@store');
  // Route::put('projects/{project}', 'ArticleController@update');
  // Route::delete('projects/{project}', 'ArticleController@delete');


});
