<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator,Redirect,Response,File;
use App\Models\User;
use App\Models\Document;

class DocumentController extends Controller
{

  public function store(Request $request, $task)
  {
    $token = $request->authorization;
    $user = User::where('remember_token', $token);

    if($user) {

      $files = $request->file('documents');
      // $path = base_path('public/upload/' . $task . '/');
      $path = 'public/upload/' . $task . '/';

      foreach ($files as $file) {
          $file->move($path, $file->getClientOriginalName());

          $document = new Document();

          $document->name = $file->getClientOriginalName();
          $document->type = $file->getClientMimeType();
          $document->path = $path;
          $document->task_id = $task;
          $document->project_id = 0;
          $document->save();

      };


        return response(['message' => 'Files uploaded'], 200);
    }

    return response(['message' => 'No Permission'], 200);

  }

}
