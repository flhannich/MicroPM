<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Project;
use App\Models\File;

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
        'description',
        'files'
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function files()
    {
        return $this->hasMany(File::class);
    }

}
