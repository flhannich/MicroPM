<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

use App\Models\Project;
use App\Models\Task;
use App\Models\File;

class Client extends Model
{
  use HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = [
        'name',
        'email',
        'secret',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'id',
        'secret',
        'created_at',
        'updated_at',
        'password',
        'updated_at',
        'email',
        'remember_token',
    ];


    public function projects()
    {
        return $this->hasMany(Project::class)->with('tasks');
    }

    // public function reviews()
    // {
    //     return $this->hasMany(Task::class)->where('is_review', 1)->with('project')->with('file');
    // }

}
