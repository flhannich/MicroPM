<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\Time;

class TimesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Time::truncate();

        $faker = \Faker\Factory::create();

        for ($i = 0; $i < 5; $i++) {
            Time::create([
                'time' => '',
                'task_id' => 1,
                'user_id' => 1
            ]);
        };
    }
}
