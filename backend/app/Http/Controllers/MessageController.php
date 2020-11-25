<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Message;

class MessageController extends Controller
{
  public function store(Request $request)
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
}
