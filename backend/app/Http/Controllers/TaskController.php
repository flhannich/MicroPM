<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use App\Models\Task;
use App\Models\Project;
use App\Models\Message;

class TaskController extends Controller
{

  public function index(Request $request, $project)
  {
    $token = $request->header('authorization');

    $user = User::where('remember_token', $token);

    if($user) {

      $tasks = Task::where('project_id', $project)->with('file')->with('message')->get();

      return response()->json($tasks, 201);

    } else {

      return response(['message' => 'Somethings wrong'], 200);

    }
  }


  public function show(Request $request, $id )
  {
      $token = $request->header('authorization');

      $user = User::where('remember_token', $token);

      if($user) {

        $task = Task::where('id', $id)->with('file')->with('message')->first();

        return response()->json($task, 201);

      } else {

        return response(['message' => 'Somethings wrong'], 200);

      }
  }



  public function updateTaskStatus(Request $request, $id, $status)
  {
      $token = $request->header('authorization');

      $user = User::where('remember_token', $token);

      if($user) {

        $task = Task::where('id', $id)->first();

        if($task) {

          $task->is_accepted = $status;
          $task->save();

          return response()->json(['message' => 'Stored'], 201);

        } else
        {
          return false;
        }

      } else
      {
        return false;
      }
  }

}
