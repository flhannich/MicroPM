<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Project;
use App\Models\File;
use App\Models\User;
use App\Models\Message;

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
        'status',
        'is_accepted',
        'is_review',
        'description'
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function file()
    {
        return $this->hasMany(File::class)->orderBy('type', 'DESC');
    }

    public function message()
    {
        return $this->hasMany(Message::class)->orderBy('updated_at', 'DESC')->with('user');
    }

}
