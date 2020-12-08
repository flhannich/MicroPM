<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator,Redirect,Response,File;
use App\Models\User;
use App\Models\Document;

class DocumentController extends Controller
{

  public function delete(Request $request, $id)
  {

    $token = $request->header('authorization');
    $user = User::where('remember_token', $token);

    if($user) {

      $document = Document::where('id', $id)->first();
      File::delete($document->path . '/' . $document->name);
      $document->delete();


      return response(['message' => 'File deleted'], 200);
    }
  }


  public function store(Request $request, $task)
  {
    $token = $request->authorization;
    $user = User::where('remember_token', $token);

    if($user) {

      $files = $request->file('documents');
      // $path = base_path('public/upload/' . $task . '/');
      $path = 'public/upload/' . $task . '/';

      foreach ($files as $file) {

          $name = str_replace(' ', '-', $file->getClientOriginalName());
          $file->move($path, $name);

          $document = new Document();

          $document->name = $name;
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
