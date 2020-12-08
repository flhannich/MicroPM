<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Document;

class DocumentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Document::truncate();

        $faker = \Faker\Factory::create();

        for ($i = 0; $i < 5; $i++) {
            Document::create([
                'name' => $faker->firstNameFemale,
                'description' => $faker->paragraph,
                'path' => $faker->url,
                'type' => $faker->fileExtension,
                'task_id' => 1,
                'user_id' => 1,
            ]);
        };
    }
}
