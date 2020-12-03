<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use App\Models\Task;
use App\Models\Message;
use App\Models\File;

class TaskController extends Controller
{

  public function index(Request $request, $id)
  {
    $token = $request->header('authorization');
    $user = User::where('remember_token', $token);

    if($user) {

      $tasks = Task::where('project_id', $id)
        ->orderBy('updated_at', 'DESC')
        ->with('file')
        ->with('message')
        ->get();

      return response()->json($tasks, 200);

    } else {

      return response(['message' => 'Somethings wrong'], 200);
    }
  }


  public function show(Request $request, $id )
  {
    $token = $request->header('authorization');
    $user = User::where('remember_token', $token);

    if($user) {

      $task = Task::where('id', $id)
        ->where('user_id', $user->id)
        ->with('file')
        ->with('message')
        ->first();

      return response()->json($task, 201);
    }
  }


  public function update($request, $id)
  {
    $token = $request->header('authorization');
    $user = User::where('remember_token', $token);

    if($user) {

      $request = json_decode($request->getContent());


      Task::where('id',$id)
        ->where('user_id', $user->id)
        ->update(
          ['name'=> $request->name],
          ['status'=> $request->status],
          ['is_review'=> $request->is_review],
          ['is_accepted'=> $request->is_accepted],
          ['weight'=> $request->weight],
          ['description'=> $request->description]
        );

      return response()->json(['message' => 'Task updated'], 201);
    }
  }


  public function create(Request $request, $project)
  {
    $token = $request->header('authorization');
    $user = User::where('remember_token', $token)->first();

    if($user) {

      $task = new Task();
      $task->name = 'New Task';
      $task->user_id = $user->id;
      $task->project_id = $project;
      $task->client_id = 1;
      $task->save();

      return response()->json(['message' => 'New Task Created'], 201);
    }
  }


  public function delete(Request $request, $id)
  {
    $token = $request->header('authorization');
    $user = User::where('remember_token', $token);

    if($user) {

      Task::where('id',$id)->delete();
      Message::where('task_id',$id)->delete();
      File::where('task_id',$id)->delete();

      return response()->json(['message' => 'Task deleted'], 201);
    }
  }


  public function showByStatus(Request $request )
  {
    $token = $request->header('authorization');

    $user = User::where('remember_token', $token);

    if($user) {

      $request = json_decode($request->getContent());

      $task = Task::where('status', $request->status)->get();

      return response()->json($task, 201);
    }
  }


  public function updateAccepted(Request $request, $id, $accepted)
  {
    $token = $request->header('authorization');
    $user = User::where('remember_token', $token);

    if($user) {

      $task = Task::where('id', $id)
        ->where('user_id', $user->id)
        ->first();

      if($task) {

        $task->is_accepted = $accepted;
        $task->save();

        return response()->json(['message' => 'Task updated'], 201);
      }
    }
  }

}
