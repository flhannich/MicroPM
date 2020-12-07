<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Settings;

class SettingsController extends Controller
{
  public function show(Request $request)
  {
    $token = $request->header('authorization');
    $user = User::where('remember_token', $token)->first();

    if($user->role === 'admin') {

      $settings = Settings::first();

      return response()->json($settings, 201);

    }
  }

  public function update(Request $request)
  {
    $token = $request->header('authorization');
    $user = User::where('remember_token', $token)->first();

    if($user->role === 'admin') {

      $request = json_decode($request->getContent());

      $settings = Settings::first();

      $settings->fill($request);

      $settings->save();

      return response()->json($settings, 201);

    }
  }

}
