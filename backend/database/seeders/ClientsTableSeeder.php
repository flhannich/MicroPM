<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Seeders\Hash;
use App\Models\Client;

class ClientsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Client::truncate();

        $faker = \Faker\Factory::create();

        for ($i = 0; $i < 3; $i++) {
            Client::create([
                'name' => $faker->name,
                'password' => '1234',
            ]);
        };
    }
}
