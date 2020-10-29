<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\File;

class FilesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        File::truncate();

        $faker = \Faker\Factory::create();

        for ($i = 0; $i < 5; $i++) {
            File::create([
                'name' => $faker->firstNameFemale,
                'path' => $faker->url,
                'type' => $faker->fileExtension,
                'task_id' => '',
                'project_id' => '',
            ]);
        };
    }
}
