<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Task;
use App\Models\User;
use App\Models\Document;
use App\Models\Client;

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
        'description',
        'status',
        'is_sync',
        'client_id',
    ];

    public function tasks()
    {
        return $this->hasMany(Task::class);    }

    public function documents()
    {
        return $this->hasMany(Document::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function client()
    {
        return $this->belongsTo(Client::class);
    }
}
