<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Task;
use App\Models\Client;
use App\Models\File;

class Project extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'description'
    ];

    public function tasks()
    {
        return $this->hasMany(Task::class)->with('file');
    }

    public function files()
    {
        return $this->hasMany(File::class);
    }

    public function client()
    {
        return $this->belongsTo(Client::class);
    }
}
