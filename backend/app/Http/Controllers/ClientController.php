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
}

