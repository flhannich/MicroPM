<?php

namespace App\Http\Controllers;

use Auth;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

use App\Models\User;
use App\Models\Task;
use App\Models\Client;
use App\Models\Project;
use App\Models\Message;
use App\Models\Document;


class ClientController extends Controller
{

  public function index(Request $request)
  {
    $token = $request->header('authorization');
    $user = User::where('remember_token', $token)->first();

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
        $client->name = $request->name;
        $client->save();

        return response()->json($client);

      } else {
        return response()->json(['message' => 'Not permitted'], 201);
      }
    }
  }


  public function show(Request $request, $id)
  {
    $token = $request->header('authorization');
    $user = User::where('remember_token', $token)->first();

    if($user) {
      if($user->role === 'admin') {

        $client = Client::where('id', $id)->first();

        return response()->json($client);

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

        $client = Client::where('id', $id)->first();

        $client->name = $request->name;
        $client->save();

        return response()->json($request, 201);

      } else {
        return response()->json(['message' => 'Not permitted'], 201);
      }
    }
  }


  public function password(Request $request, $id)
  {
    $token = $request->header('authorization');
    $user = User::where('remember_token', $token)->first();

    if($user) {
      if($user->role === 'admin') {

        $client = Client::where('id', $id)->first();

        $password = Str::random(10);

        $client->password = bcrypt($password);
        $client->save();

        return response()->json($password, 201);

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

        Client::where('id', $id)->delete();

        return response()->json(['message' => 'Client deleted'], 201);

      } else {
        return response()->json(['message' => 'Not permitted'], 201);
      }
    }
  }


}

