<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Project;
use App\Models\Task;
use App\Models\File;

class Client extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'secret'
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
        'updated_at',
        'email',
    ];


    public function projects()
    {
        return $this->hasMany(Project::class)->with('tasks');
    }

    public function reviews()
    {
        return $this->hasMany(Task::class)->where('status', 'review')->with('project')->with('file');
    }

}
