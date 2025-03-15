<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class FreshMigrate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fresh';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Refresh migrations and seed the database';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->call('migrate:refresh', ['--seed' => true]);
        $this->info('Database refreshed and seeded successfully!');
    }
}
