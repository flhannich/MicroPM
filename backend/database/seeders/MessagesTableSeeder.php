<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

use App\Models\Message;

class MessagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

     public function run()
     {
         Message::truncate();

         $faker = \Faker\Factory::create();

         for ($i = 0; $i < 5; $i++) {
             Message::create([
                 'message' => $faker->paragraph,
                 'user_id' => '',
                 'task_id' => '',
             ]);
         };
     }
}
