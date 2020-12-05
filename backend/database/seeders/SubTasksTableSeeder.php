<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

use App\Models\SubTask;

class SubtasksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        SubTask::truncate();

        $faker = \Faker\Factory::create();

        for ($i = 0; $i < 5; $i++) {
            SubTask::create([
                'name' => $faker->sentence,
                'status' => 0,
                'task_id' => 1,
            ]);
        };
    }
}
