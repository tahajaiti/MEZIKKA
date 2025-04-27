<?php

namespace Database\Seeders;

use App\Models\Profile;
use App\Models\User;
use Hash;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->count(1)->create();
        Profile::factory()->count(1)->create();

        User::factory(1)->create([
            'email' => 'admin@admin.com',
            'password' => Hash::make('password'),
            'name' => 'Admin',
            'role_id' => 1,
        ]);

        Profile::factory(1)->create([
            'user_id' => 2,
            'bio' => 'Admin user',
            'username' => 'admin',
            'avatar' => 'https://example.com/avatar.jpg',
        ]);
    }
}