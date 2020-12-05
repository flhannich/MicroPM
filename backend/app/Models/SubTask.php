<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Task;

class SubTask extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'status',
        'task_id',
        'name'
    ];

    public function task()
    {
        return $this->belongsTo(Task::class);
    }

}
