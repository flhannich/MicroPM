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



class UserController extends Controller
{

  // public function register(Request $request)
  // {
  //     $request->validate([
  //         'name' => 'required',
  //         'password' => 'required|min:6',
  //     ]);
  //
  //
  //     $user = User::create([
  //         'name' => $request->name,
  //         'password' => bcrypt($request->password),
  //         'remember_token' => Str::random(10),
  //     ]);
  //
  //     return response()->json($user);
  // }


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
    //
    $user = User::where('remember_token', $token)->first();
    //
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


  public function projects(Request $request)
  {
      $token = $request->header('authorization');

      $user = User::where('remember_token', $token)
      ->with('projects')
      ->first();

      return response()->json($user, 201);
  }

  // public function projects(Request $request)
  // {
  //     $token = $request->header('authorization');
  //
  //     $user = User::where('remember_token', $token)->first();
  //
  //     if($user) {
  //
  //       $projects = Project::where('client_id', $user->id)->get();
  //
  //       return response()->json($projects, 201);
  //
  //     } else {
  //
  //       return response(['message' => 'Somethings wrong'], 200);
  //
  //     }
  //
  // }

    public function tasks(Request $request, $project)
    {
      $token = $request->header('authorization');

      $user = User::where('remember_token', $token);

      if($user) {

        $tasks = Task::where('project_id', $project)->with('file')->get();

        return response()->json($tasks, 201);

      } else {

        return response(['message' => 'Somethings wrong'], 200);

      }
    }




    public function task(Request $request, $id )
    {
        $token = $request->header('authorization');

        $user = User::where('remember_token', $token);

        if($user) {

          $task = Task::where('id', $id)->with('file')->first();

          return response()->json($task, 201);

        } else {

          return response(['message' => 'Somethings wrong'], 200);

        }
    }



  // public function reviews(Request $request)
  // {
  //     $token = $request->header('authorization');
  //
  //     $user = User::where('remember_token', $token)
  //     if($user) {
  //       $reviews = Task::where(
  //         ['client_id', $user->id]
  //         ['is_review', '1']
  //       )->get();
  //
  //     return response()->json($reviews, 201);
  // }


  public function updateTaskStatus(Request $request, $id, $status)
  {
      $token = $request->header('authorization');

      $user = User::where('remember_token', $token);

      if($user) {

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
//       $token = $user->createToken('Laravel Password Grant Client')->accessToken;
//
//       return response()->json($user[0], 201);
//   }

}
