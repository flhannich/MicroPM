<?php

namespace App\Http\Controllers;

use Auth;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

use App\Models\Client;
use App\Models\Task;
use App\Models\Project;



class ClientController extends Controller
{

  // public function register(Request $request)
  // {
  //     $request->validate([
  //         'name' => 'required',
  //         'password' => 'required|min:6',
  //     ]);
  //
  //
  //     $user = Client::create([
  //         'name' => $request->name,
  //         'password' => bcrypt($request->password),
  //         'remember_token' => Str::random(10),
  //     ]);
  //
  //     return response()->json($user);
  // }


  public function login (Request $request) {

    $request = json_decode($request->getContent());

      $client = Client::where('name', $request->username)->first();

      if ($client) {
        if (Hash::check($request->password, $client->password)) {

          $token = $client->createToken('authToken')->accessToken;

          $client->remember_token = $token;
          $client->save();

          $response = ['remember_token' => $token];

          return response($client, 200);
        } else {
          return response(["message" => "Password mismatch"], 422);
        }
      }

      return response([$request], 200);

  }


  // public function logout (Request $request) {
  //
  //   $token = $request->user()->token();
  //   $token->revoke();
  //   $response = ['message' => 'You have been successfully logged out!'];
  //
  //   return response($response, 200);
  //
  // }
  //

  public function index(Request $request, $secret)
  {
      $client = Client::where('secret', $secret)
      ->with('projects')
      ->with('reviews')
      ->get();

      // generate and return token here..
      // fetch data on home screen.
      return response()->json($client[0], 201);
  }

//   public function login(Request $request, $secret)
//   {
//
//       $token = $client->createToken('Laravel Password Grant Client')->accessToken;
//
//       return response()->json($client[0], 201);
//   }

}
