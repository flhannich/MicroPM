<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

use App\Models\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
     public function run()
       {
           User::truncate();

           $faker = \Faker\Factory::create();

           $password = Hash::make('1234');

           User::create([
               'name' => 'admin',
               'email' => 'admin@test.com',
               'role' => 'admin',
               'password' => $password,
           ]);

           for ($i = 0; $i < 3; $i++) {
               User::create([
                   'name' => $faker->name,
                   'email' => $faker->email,
                   'role' => 'user',
                   'password' => $password,
               ]);
           };
       }
}
