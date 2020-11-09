<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;


class ApiAuthController extends Controller
{

  public function register(Request $request)
  {
      $request->validate([
          'name' => 'required',
          'email' => 'required|email',
          'password' => 'required|min:6',
          'role' => 'required',
      ]);


      $user = User::create([
          'name' => $request->name,
          'email' => $request->email,
          'role' => $request->role,
          'password' => bcrypt($request->password),
          'remember_token' => Str::random(10),
      ]);

      return response()->json($user);
  }


  public function register (Request $request) {

    $validator = Validator::make($request->all(), [
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'password' => 'required|string|min:6|confirmed',
        'role' => 'required',
    ]);

    if ($validator->fails())
    {
        return response(['errors'=>$validator->errors()->all()], 422);
    }

    $request['password'] = Hash::make($request['password']);
    $request['remember_token'] = Str::random(10);

    $user = User::create($request->toArray());


    $token = $user->createToken('Laravel Password Grant Client')->accessToken;
    $response = ['token' => $token];

    return response($response, 200);
}



  public function login (Request $request) {

      $validator = Validator::make($request->all(), [
          'email' => 'required|string|email|max:255',
          'password' => 'required|string|min:6',
      ]);

      if ($validator->fails())
      {
          return response(['errors'=>$validator->errors()->all()], 422);
      }

      $user = User::where('email', $request->email)->first();

      if ($user) {
          if (Hash::check($request->password, $user->password)) {

              $token = $user->createToken('Laravel Password Grant Client')->accessToken;
              $response = ['token' => $token];

              return response($response, 200);
          } else {
              return response(["message" => "Password mismatch"], 422);
          }
      } else {
          return response(["message" =>'User does not exist'], 422);
      }
  }


  public function logout (Request $request) {

    $token = $request->user()->token();
    $token->revoke();
    $response = ['message' => 'You have been successfully logged out!'];

    return response($response, 200);

  }

}
