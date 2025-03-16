<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GenreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('genres')->insert([
            ['name' => 'Hip-Hop'],
            ['name' => 'Pop'],
            ['name' => 'Rock'],
            ['name' => 'Blues'],
            ['name' => 'Soul'],
            ['name' => 'Jazz'],
            ['name' => 'R&B'],
            ['name' => 'EDM'],
            ['name' => 'Techno'],
        ]);
    }
}
