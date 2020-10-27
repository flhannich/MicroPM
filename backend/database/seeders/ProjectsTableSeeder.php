<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

use App\Models\Project;

class ProjectsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

     public function run()
     {
         Project::truncate();

         $faker = \Faker\Factory::create();

         for ($i = 0; $i < 5; $i++) {
             Project::create([
                 'name' => $faker->sentence,
                 'description' => $faker->paragraph,
                 'client_id' => '',
                 'user_id' => '',
             ]);
         };
     }
}
