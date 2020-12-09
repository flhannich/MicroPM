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

        $users = User::get();

        return response()->json($users);

      } else {
        return response()->json(['message' => 'Not permitted'], 201);
      }
    }
  }


  public function create(Request $request)
  {
    $request = json_decode($request->getContent());
    $user = User::where('name', $request->username)->first();

    if($user) {
      if($user->role === 'admin') {

        $newuser = new User;
        $newuser->username = $request->username;
        $newuser->role = 'Contributor';
        $newuser->password = bcrypt($request->password);

        $newuser->save();

        return response()->json($newuser);

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

        User::find($id)->delete();

        return response()->json(['message' => 'User deleted'], 200);

      } else {
        return response()->json(['message' => 'Not permitted'], 201);
      }
    }
  }


  public function updateRole(Request $request, $id)
  {
    $token = $request->header('authorization');
    $user = User::where('remember_token', $token)->first();

    if($user) {

      $request = json_decode($request->getContent());

        $updateuser = Client::find($id);
        $updateuser->role = $request->role;
        $updateuser->save();

      return response()->json(['message' => 'User Role updated'], 201);
    }
  }


  public function update(Request $request, $id)
  {
    $token = $request->header('authorization');
    $user = User::where('remember_token', $token)->first();

    if($user) {

      $request = json_decode($request->getContent());

        $updateuser = Client::find($user->id);
        $updateuser->username = $request->username;
        $updateuser->role = $request->role;
        $updateuser->password = bcrypt($request->password);
        $updateuser->save();

      return response()->json(['message' => 'User updated'], 201);
    }
  }


  public function login(Request $request) {

    $request = json_decode($request->getContent());

    $user = User::where('name', $request->username)->first();

    if ($user) {
      if (Hash::check($request->password, $user->password)) {

        $token = $user->createToken('authToken')->accessToken;

        $user->remember_token = $token;
        $user->save();

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

    return response([$request], 200);

  }


  public function logout(Request $request) {

    $token = $request->header('authorization');
    $user = User::where('remember_token', $token)->first();

    if($user) {

      $user->remember_token = '';
      $user->save();

      return response(['message' => 'You have been successfully logged out!'], 200);
    }
    else {
      return false;
    }

    return response([$user], 200);

  }

}
