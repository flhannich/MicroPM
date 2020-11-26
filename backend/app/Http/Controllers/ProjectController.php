<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\User;

class ProjectController extends Controller
{

    public function index(Request $request)
    {
        $token = $request->header('authorization');

        $user = User::where('remember_token', $token)
        ->with('projects')
        ->first();

        return response()->json($user, 201);
    }

    //
    // public function store(Request $request)
    // {
    //
    //   $token = $request->header('authorization');
    //
    //   $user = User::where('remember_token', $token)
    //
    //   if($user) {
    //
    //     $project = Project::create($request->all());
    //
    //     return response()->json($project, 201);
    //   }
    //
    // }
    //
    //
    // public function update(Request $request, Project $project)
    // {
    //   $token = $request->header('authorization');
    //
    //   $user = User::where('remember_token', $token)
    //
    //   if($user) {
    //
    //     $project = Project::update($request->all());
    //
    //     return response()->json($project, 201);
    //   }
    //
    //     return response()->json($project, 200);
    // }
    //
    //
    //
    // public function delete(Project $project)
    // {
    //
    //   $token = $request->header('authorization');
    //
    //   $user = User::where('remember_token', $token)
    //
    //   if($user) {
    //
    //     $project->delete();
    //
    //     return response()->json(null, 204);
    //
    //   }
    //
    // }
}
