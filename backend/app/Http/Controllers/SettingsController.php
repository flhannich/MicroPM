<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SettingsController extends Controller
{
  public function index(Request $request)
  {
    $token = $request->header('authorization');
    $user = User::where('remember_token', $token)->first();

    if($user->role === 'admin') {

      $settings = Settings::->get()

      return response()->json($settings, 201);

    }
  }

  public function update(Request $request)
  {
    $token = $request->header('authorization');
    $user = User::where('remember_token', $token)->first();

    if($user->role === 'admin') {

      $request = json_decode($request->getContent());

      $settings = Settings::first()

      $settings->fill($request);

      $settings->save();

      return response()->json($settings, 201);

    }
  }

}
