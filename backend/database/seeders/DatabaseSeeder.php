<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
     public function run()
      {
          $this->call(ProjectsTableSeeder::class);
          $this->call(TasksTableSeeder::class);
          $this->call(DocumentsTableSeeder::class);
          $this->call(UsersTableSeeder::class);
          $this->call(ClientsTableSeeder::class);
          $this->call(SubTasksTableSeeder::class);
          $this->call(MessagesTableSeeder::class);
          $this->call(TimesTableSeeder::class);
      }
}
