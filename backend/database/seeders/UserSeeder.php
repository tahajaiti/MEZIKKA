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
        User::factory()->create([
            'email' => 'admin@admin.com',
            'password' => Hash::make('password'),
            'name' => 'Admin',
            'role_id' => 1,
            'created_at' => now()->subDays(rand(1, 365)),
            'updated_at' => now()->subDays(rand(1, 365)),
        ]);

        Profile::factory()->create([
            'user_id' => 1,
            'bio' => 'Admin user',
            'username' => 'admin',
            'avatar' => 'hehe',
            'created_at' => now()->subDays(rand(1, 365)),
            'updated_at' => now()->subDays(rand(1, 365)),
        ]);

        User::factory(40)->create();

        foreach (range(1, 40) as $i) {
            Profile::factory()->create([
                'user_id' => $i + 1,
                'created_at' => now()->subDays(rand(1, 365)),
                'updated_at' => now()->subDays(rand(1, 365)),
            ]);
        }


    }
}
