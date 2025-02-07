<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\Task;

class TasksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Task::truncate();

        $faker = \Faker\Factory::create();

        for ($i = 0; $i < 5; $i++) {
            Task::create([
                'status' => 'not_started',
                'name' => $faker->sentence,
                'description' => $faker->paragraph,
                'is_review' => 0,
                'is_accepted' => 0,
                'weight' => 1,
                'project_id' => '',
                'user_id' => '',
                'client_id' => '',
            ]);
        };
    }
}
