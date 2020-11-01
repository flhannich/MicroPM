<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Client;
use App\Models\Task;
use App\Models\Project;

class ClientController extends Controller
{
  public function index(Request $request, $secret)
  {

      $client = Client::where('secret', $secret)
      ->with('projects')
      ->with('reviews')
      ->get();

      return response()->json($client[0], 201);
  }
}
