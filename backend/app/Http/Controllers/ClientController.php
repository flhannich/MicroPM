<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Client;
use App\Models\Project;

class ClientController extends Controller
{
  public function index(Request $request, $secret)
  {
      $client = Client::where('secret', $secret)
      ->with('project')
      ->get();

      //
      // $projects = Project::with('task')->where('client_id', $client->id)->get();

      return response()->json($client[0], 201);
  }
}
