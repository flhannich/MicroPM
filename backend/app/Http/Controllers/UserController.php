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

  public function create(Request $request)
  {
    $request = json_decode($request->getContent());
    $user = User::where('name', $request->username)->first();

    if($user) {
      if($user->role === 'admin') {

        $newuser = User::create([
          'name' => $request->name,
          'password' => bcrypt($request->password)
        ]);

        return response()->json($newuser);

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

        User::where('id',$id)->delete();
        Project::where('user_id',$id)->delete();
        Message::where('user_id',$id)->delete();
        Task::where('user_id',$id)->delete();
        Document::where('user_id',$id)->delete();

        return response()->json($newuser);

      } else {
        return response()->json(['message' => 'Not permitted'], 201);
      }
    }
  }


  public function update($request, $id)
  {
    $token = $request->header('authorization');
    $user = User::where('remember_token', $token);

    if($user) {

      $request = json_decode($request->getContent());

      User::where('id',$user->id)
        ->where('user_id', $user->id)
        ->update(
          ['name'=> $request->name],
          ['email'=> $request->email],
          ['api'=> $request->api]
        );

      return response()->json(['message' => 'Task updated'], 201);
    }
  }


  public function login (Request $request) {

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


  public function logout (Request $request) {

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
