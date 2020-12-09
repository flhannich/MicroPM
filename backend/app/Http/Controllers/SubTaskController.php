<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SubTask;
use App\Models\User;

class SubTaskController extends Controller
{
  public function index(Request $request, $id)
  {
    $token = $request->header('authorization');
    $user = User::where('remember_token', $token);

    if($user) {

      $subtasks = SubTask::where('task_id', $id)->get();

      return response()->json($subtasks, 200);

    } else {

      return response(['message' => 'Somethings wrong'], 200);
    }
  }

  public function update(Request $request, $id)
  {
    $token = $request->header('authorization');
    $user = User::where('remember_token', $token);

    if($user) {

      $request = json_decode($request->getContent());
      $update = $request->subtask;

      // return response()->json($request, 201);

      $subtask = SubTask::where('id', $id)->first();

      $subtask->name = $update->name;
      $subtask->status = $update->status;

      $subtask->save();

      return response()->json(['message' => 'Sub Task Updated'], 201);
    }
  }


  public function create(Request $request, $task)
  {
    $token = $request->header('authorization');
    $user = User::where('remember_token', $token)->first();

    if($user) {

      $request = json_decode($request->getContent());

      $subtask = new SubTask();

      if(isset($request->name)) {
        $subtask->name = $request->name;
      } else {
        $subtask->name = 'New Task';
      }

      $subtask->status = 0;
      $subtask->task_id = $task;
      $subtask->save();

      return response()->json(['message' => 'New Sub Task Created'], 201);
    }
  }


  public function delete(Request $request, $id)
  {
    $token = $request->header('authorization');
    $user = User::where('remember_token', $token)->first();

    if($user) {

      SubTask::where('id',$id)->delete();

      return response()->json(['message' => 'Sub Task deleted'], 201);

    }
  }

}
