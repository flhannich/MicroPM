<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

use App\Models\Project;
use App\Models\Task;
use App\Models\Document;
use App\Models\Message;

class User extends Model
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
        'secret',
        'created_at',
        'email_verified_at',
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

    public function tasks()
    {
        return $this->hasMany(Task::class)->orderBy('type', 'DESC');
    }

    public function message()
    {
        return $this->hasMany(Message::class)->orderBy('type', 'DESC');
    }

}
