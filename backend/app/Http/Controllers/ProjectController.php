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
        $user = User::where('remember_token', $token);

      if($user) {

        $projects = Project::where('user_id', $user->id)
          ->width('tasks');
          ->get();

        return response()->json($projects, 201);

      }
    }


    public function show(Request $request, $id )
    {
      $token = $request->header('authorization');
      $user = User::where('remember_token', $token);

      if($user) {

        $task = Project::where('id', $id)
          ->where('user_id', $user->id)
          ->width('tasks');
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


        Project::where('id',$id)
          ->where('user_id', $user->id)
          ->update(
            ['name'=> $request->name],
            ['description'=> $request->description]
          );

        return response()->json(['message' => 'Project Updated'], 201);
      }
    }


    public function create($request)
    {
      $token = $request->header('authorization');
      $user = User::where('remember_token', $token);

      if($user) {

        $project = new Project();
        $project->save();

        return response()->json(['message' => 'New Project Created'], 201);
      }
    }


    public function delete($request, $id)
    {
      $token = $request->header('authorization');
      $user = User::where('remember_token', $token);

      if($user) {

        Project::where('id',$id)
          ->where('user_id', $user->id)
          ->delete();

        return response()->json(['message' => 'Project deleted'], 201);
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
