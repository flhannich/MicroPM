<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\User;
use App\Models\Task;
use App\Models\Message;

class ProjectController extends Controller
{

    public function index(Request $request)
    {
        $token = $request->header('authorization');
        $user = User::where('remember_token', $token);

      if($user) {

        $projects = Project::with('tasks')
          ->with('client')
          ->orderBy('updated_at', 'DESC')
          ->get();

        return response()->json($projects, 201);

      }
    }


    public function show(Request $request, $id )
    {
      $token = $request->header('authorization');
      $user = User::where('remember_token', $token);

      if($user) {

        $project = Project::where('id', $id)
          ->with('client')
          ->first();

        return response()->json($project, 200);
      }
    }


    public function update(Request $request, $id)
    {
      $token = $request->header('authorization');
      $user = User::where('remember_token', $token);

      if($user) {

        $request = json_decode($request->getContent());


        Project::where('id',$id)
          ->where('user_id', $user->id)
          ->update(
            ['name'=> $request->name],
            ['description'=> $request->description]
          );

        return response()->json(['message' => 'Project Updated'], 201);
      }
    }


    public function create(Request $request)
    {
      $token = $request->header('authorization');
      $user = User::where('remember_token', $token)->first();

      if($user) {

        $project = new Project();
        $project->name = 'New Project';
        $project->status = 'not_started';
        $project->user_id = $user->id;
        $project->save();

        return response()->json(['message' => 'New Project Created'], 201);
      }
    }


    public function delete(Request $request, $id)
    {
      $token = $request->header('authorization');
      $user = User::where('remember_token', $token)->first();

      if($user) {
        if($user->role === 'admin') {

          Project::where('id',$id)->delete();

          return response()->json(['message' => 'Project deleted'], 201);

        } else {
          return response()->json(['message' => 'Not permitted'], 201);
        }
      }
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
