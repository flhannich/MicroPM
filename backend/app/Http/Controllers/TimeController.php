<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Time;

class TimeController extends Controller
{

  public function create(Request $request)
  {
    $token = $request->header('authorization');
    $user = User::where('remember_token', $token)->first();

    if($user) {

      $time = new Time();
      $time->time = '0:00:00';
      $time->task_id = $request->task;
      $time->user_id = $user->id;
      $time->save();

      return response()->json($time, 201);
    }
  }


  public function index(Request $request, $task)
  {
    $token = $request->header('authorization');
    $user = User::where('remember_token', $token);

    if($user) {

      Time::where('task_id', $task)->get();

      return response()->json(['message' => 'Time deleted'], 201);
    }
  }


  public function delete(Request $request, $id)
  {
    $token = $request->header('authorization');
    $user = User::where('remember_token', $token);

    if($user) {

      Time::find($id)->delete();

      return response()->json(['message' => 'Time deleted'], 201);
    }
  }


  public function update(Request $request, $id)
  {
    $token = $request->header('authorization');
    $user = User::where('remember_token', $token);

    if($user) {

      $time = Time::where('id', $id)->first();
      $time->time = $request->time;
      $time->save();

      return response()->json(['message' => 'Time updated'], 201);

      // return response()->json($times, 201);
    }
  }
}
