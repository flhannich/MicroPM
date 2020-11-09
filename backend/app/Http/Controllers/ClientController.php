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
        }
        else {
          return response(["message" => "Password mismatch"], 422);
        }
      }
      else {
        return response(["message" =>'User does not exist'], 422);
      }

      return response([$request], 200);

  }


  public function logout (Request $request) {

    $token = $request->header('authorization');
    //
    $client = Client::where('remember_token', $token)->first();
    //
    if($client) {

      $client->remember_token = '';
      $client->save();

      return response(['message' => 'You have been successfully logged out!'], 200);
    }
    else {
      return false;
    }

    return response([$client], 200);

  }


  public function projects(Request $request)
  {
      $token = $request->header('authorization');

      $client = Client::where('remember_token', $token)
      ->with('projects')
      ->with('reviews')
      ->first();

      return response()->json($client, 201);
  }


  public function task(Request $request, $id, $status)
  {
      $token = $request->header('authorization');

      $client = Client::where('remember_token', $token);

      if($client) {

        $task = Task::where('id', $id)->first();

        if($task) {

          $task->is_accepted = $status;
          $task->save();
          // return response()->json([$task], 201);

          if($status === '1') {
            return response()->json(['message' => 'Accepted'], 201);
          }

          if($status === '0') {
            return response()->json(['message' => 'Revoked'], 201);
          }

        } else
        {
          return false;
        }

      } else
      {
        return false;
      }

  }

//   public function login(Request $request, $secret)
//   {
//
//       $token = $client->createToken('Laravel Password Grant Client')->accessToken;
//
//       return response()->json($client[0], 201);
//   }

}
