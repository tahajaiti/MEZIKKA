<?php

namespace App\Providers;

use App\Models\Playlist;
use App\Policies\PlaylistPolicy;
use App\Services\JwtService;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton('JWT', function () {
            return new JwtService();
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Gate::policy(Playlist::class, PlaylistPolicy::class);
    }
}
