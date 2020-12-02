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
use App\Models\Message;
use App\Models\File;


class ClientController extends Controller
{

  public function create(Request $request)
  {
    $request = json_decode($request->getContent());
    $user = User::where('name', $request->username)->first();

    if($user) {
      if($user->role === 'admin') {

        $newclient = Client::create([
          'name' => $request->name,
          'password' => bcrypt($request->password)
        ]);

        return response()->json($newclient);

      } else {
        return response()->json(['message' => 'Not permitted'], 201);
      }
    }
  }


  public function delete(Request $request, $id)
  {
    $request = json_decode($request->getContent());
    $user = User::where('name', $request->username)->first();

    if($user) {
      if($user->role === 'admin') {

        Client::where('id',$id)->delete();
        Project::where('user_id',$id)->delete();
        Message::where('user_id',$id)->delete();
        Task::where('user_id',$id)->delete();
        File::where('user_id',$id)->delete();

        return response()->json(['message' => 'Client Deleted'], 201);

      } else {
        return response()->json(['message' => 'Not permitted'], 201);
      }
    }
  }


  public function update($request, $id)
  {
    $token = $request->header('authorization');
    $client = Client::where('remember_token', $token);

    if($client) {

      $request = json_decode($request->getContent());

      Client::where('id',$client->id)
        ->where('user_id', $client->id)
        ->update(
          ['name'=> $request->name],
          ['email'=> $request->email]
          ['api'=> $request->api]
        );

      return response()->json(['message' => 'Task updated'], 201);
    }
  }


  public function login (Request $request) {

    $request = json_decode($request->getContent());

    $client = Client::where('name', $request->username)->first();

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
      return response(["message" =>'Client does not exist'], 422);
    }

    return response([$request], 200);

  }


  public function logout (Request $request) {

    $token = $request->header('authorization');
    $client = Client::where('remember_token', $token)->first();

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
