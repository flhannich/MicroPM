<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Project;
use App\Models\Task;

class Client extends Model
{
    use HasFactory;

    public function project()
    {
        return $this->hasMany(Project::class)->with('task');
    }

}
