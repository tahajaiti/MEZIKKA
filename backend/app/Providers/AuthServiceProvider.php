<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\Playlist;
use App\Models\Song;
use App\Policies\PlaylistPolicy;
use App\Policies\SongPolicy;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        Gate::policy(Playlist::class, PlaylistPolicy::class);
        Gate::policy(Song::class, SongPolicy::class);
    }
}