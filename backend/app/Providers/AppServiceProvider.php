<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind('App\Contracts\ISongService', 'App\Services\SongService');
        $this->app->bind('App\Contracts\IPlaylistService', 'App\Services\PlaylistService');
        $this->app->bind('App\Contracts\ISearchService', 'App\Services\SearchService');
        $this->app->bind('App\Contracts\IAuthService', 'App\Services\AuthService');
        $this->app->bind('App\Contracts\IProfileService', 'App\Services\ProfileService');
        $this->app->bind('App\Contracts\IPlaylistService', 'App\Services\PlaylistService');
        $this->app->bind('App\Contracts\IPlaylistItemService', 'App\Services\PlaylistItemService');
        $this->app->bind('App\Contracts\IGenreService', 'App\Services\GenreService');
        $this->app->bind('App\Contracts\IFollowService', 'App\Services\FollowService');
        $this->app->bind('App\Contracts\IStatisticsService', 'App\Services\StatisticsService');
        $this->app->bind('App\Contracts\ILikeService', 'App\Services\LikeService');
        $this->app->bind('App\Contracts\IUserService', 'App\Services\UserService');


    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {

    }
}
