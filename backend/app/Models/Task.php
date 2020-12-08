<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Project;
use App\Models\Document;
use App\Models\User;
use App\Models\Message;
use App\Models\SubTask;

class Task extends Model
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
        'is_accepted',
        'is_review',
        'weight',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function document()
    {
        return $this->hasMany(Document::class)->orderBy('type', 'DESC');
    }

    public function subtask()
    {
        return $this->hasMany(SubTask::class);
    }

    public function message()
    {
        return $this->hasMany(Message::class)->orderBy('updated_at', 'DESC')->with('user');
    }

    public function unread_message()
    {
        return $this->hasMany(Message::class)->where('is_read', '0');
    }

}
