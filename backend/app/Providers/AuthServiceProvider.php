<?php

namespace App\Providers;

use App\Models\Song;
use App\Models\User;
use App\Models\Playlist;
use App\Policies\SongPolicy;
use App\Policies\PlaylistPolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

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
        Gate::policy(User::class, SongPolicy::class);
    }
}
