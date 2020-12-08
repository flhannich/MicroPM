<?php

namespace App\Http\Controllers;

use Auth;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

use App\Models\User;
use App\Models\Task;
use App\Models\Project;
use App\Models\Message;
use App\Models\Document;


class UserController extends Controller
{

  public function index(Request $request)
  {
    $request = json_decode($request->getContent());
    $user = User::where('name', $request->username)->first();

    if($user) {
      if($user->role === 'admin') {

        $clients = Client::get();

        return response()->json($clients);

      } else {
        return response()->json(['message' => 'Not permitted'], 201);
      }
    }
  }


  public function create(Request $request)
  {
    $token = $request->header('authorization');
    $user = User::where('remember_token', $token)->first();

    if($user) {
      if($user->role === 'admin') {

        $client = new Client;
        $client->username = $request->username;
        $client->password = bcrypt($request->password);

        $client->save();

        return response()->json($client, 200);

      } else {
        return response()->json(['message' => 'Not permitted'], 201);
      }
    }
  }


  public function delete(Request $request, $id)
  {
    $token = $request->header('authorization');
    $user = User::where('remember_token', $token)->first();

    if($user) {
      if($user->role === 'admin') {

        Client::find($id)->delete();

        return response()->json(['message' => 'Client deleted'], 200);

      } else {
        return response()->json(['message' => 'Not permitted'], 201);
      }
    }
  }


  public function update(Request $request, $id)
  {
    $token = $request->header('authorization');
    $user = User::where('remember_token', $token)->first();

    if($user) {
      if($user->role === 'admin') {

        $request = json_decode($request->getContent());

        $client =  Client::find($id)
        $client->username = $request->username;
        $client->password = bcrypt($request->password);
        $client->save();

        return response()->json(['message' => 'Client updated'], 200);
      }
      else {
        return response()->json(['message' => 'Not Permitted'], 200);
      }
    }
  }


  public function login(Request $request) {

    $request = json_decode($request->getContent());

    $client = Client::where('username', $request->username)->first();

    if ($client) {
      if (Hash::check($request->password, $client->password)) {

        $token = $client->createToken('authToken')->accessToken;

        $client->remember_token = $token;
        $client->save();

        $response = ['remember_token' => $token];

        return response($response, 200);
      }
      else {
        return response(["message" => "Password mismatch"], 422);
      }
    }
    else {
      return response(["message" =>'User does not exist'], 422);
    }
  }


  public function logout(Request $request) {

    $token = $request->header('authorization');
    $client = User::where('remember_token', $token)->first();

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

}
