<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Message;

class MessageController extends Controller
{

  public function index(Request $request, $task, $status)
  {
    $token = $request->header('authorization');
    $user = User::where('remember_token', $token);

    if($user) {

      $messages = Message::where('task_id', $task)
        ->where('is_read', $status)
        ->with('user')
        ->get();

      return response()->json($messages, 200);
    }
  }


  public function create(Request $request)
  {
    $token = $request->header('authorization');

    $user = User::where('remember_token', $token)->first();

    if($user) {

      $request = json_decode($request->getContent());

      $message = new Message;
      $message->message = $request->message;
      $message->task_id = $request->task;
      $message->user_id = $user->id;
      $message->save();

      return response()->json('Created', 201);

    } else {

      return response(['message' => 'Somethings wrong'], 200);

    }
  }


  public function delete($request, $id)
  {
    $token = $request->header('authorization');
    $user = User::where('remember_token', $token);

    if($user) {

      Message::where('id',$id)
        ->where('user_id', $user->id)
        ->delete();

      return response()->json(['message' => 'Task deleted'], 201);
    }
  }

}
