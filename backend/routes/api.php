<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\PlaylistController;
use App\Http\Controllers\PlaylistItemController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\SongController;
use App\Http\Controllers\StatisticsController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
*/
Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register'])->name('register');
    Route::post('login', [AuthController::class, 'login'])->name('login');
    Route::post('refresh', [AuthController::class, 'refresh'])->name('refresh');

    Route::middleware('jwt')->post('logout', [AuthController::class, 'logout'])->name('logout');
});

/*
|--------------------------------------------------------------------------
| Protected Routes
|--------------------------------------------------------------------------
*/
Route::middleware('jwt')->group(function () {
    /*
    |----------------------
    | Search Routes
    |----------------------
    */
    Route::prefix('search')->group(function () {
        Route::get('/', [SearchController::class, 'search'])->name('search');
        Route::get('user', [SearchController::class, 'userSearch'])->name('user.search');
        Route::get('playlist', [SearchController::class, 'playlistSearch'])->name('playlist.search');
    });

    /*
    |----------------------
    | File Routes
    |----------------------
    */
    Route::get('files/{path}', [FileController::class, 'serve'])
        ->where('path', '.*')
        ->name('files.serve');

    /*
    |----------------------
    | Profile Routes
    |----------------------
    */
    Route::prefix('profile')->group(function () {
        Route::get('/', [ProfileController::class, 'show'])->name('profile.show');
        Route::put('/', [ProfileController::class, 'update'])->name('profile.update');
    });

    /*
    |----------------------
    | Song Routes
    |----------------------
    */
    Route::apiResource('songs', SongController::class);
    Route::get('songs/liked/most', [SongController::class, 'getMostLiked'])->name('songs.most_liked');
    Route::get('songs/user/{id}', [SongController::class, 'userSongs'])->name('songs.user');
    Route::get('songs/genre/{genre}', [SongController::class, 'getByGenre'])->name('songs.genre');

    /*
    |----------------------
    | Genre Routes
    |----------------------
    */
    Route::prefix('genres')->group(function () {
        Route::get('/', [GenreController::class, 'index'])->name('genres.index');
        Route::get('image/{genre}', [GenreController::class, 'getImage'])->name('genres.image');
    });

    //Playlist
    Route::apiResource('playlists', PlaylistController::class);
    Route::get('playlists/{id}/songs', [PlaylistController::class, 'showSongs'])->name('playlists.songs');
    Route::get('playlists/user/{id}', [PlaylistController::class, 'userPlaylists'])->name('playlists.user');
    Route::post('playlists/{playlist}/songs/{song}', [PlaylistItemController::class, 'add']);
    Route::delete('playlists/{playlist}/songs/{song}', [PlaylistItemController::class, 'remove']);

    //Like
    Route::prefix('likes')->group(function () {
        Route::get('/', [LikeController::class, 'index']);
        Route::get('songs', [LikeController::class, 'getLikedSongs']);
        Route::get('{type}/{id}/count', [LikeController::class, 'getLikeCount'])
            ->whereIn('type', ['song', 'playlist']);
        Route::post('{type}/{id}', [LikeController::class, 'toggleLike'])
            ->whereIn('type', ['song', 'playlist']);
    });

    //Follow
    Route::prefix('follow')->group(function () {
        Route::post('{id}', [FollowController::class, 'follow'])->name('follow');
        Route::delete('{id}', [FollowController::class, 'unfollow'])->name('unfollow');
        Route::get('{id}', [FollowController::class, 'follows'])->name('follows');
    });

    //User
    Route::get('users/{id}', [UserController::class, 'show'])->name('user.show');

    //Admin
    Route::middleware('role:admin')->group(function () {
        Route::prefix('stats')->group(function () {
            Route::get('user/{period}', [StatisticsController::class, 'getUserStats'])->name('statistics.index');
            Route::get('song/{period}', [StatisticsController::class, 'getSongStats'])->name('statistics.song');
            Route::get('playlist/{period}', [StatisticsController::class, 'getPlaylistStats'])->name('statistics.playlist');
            Route::get('like/{period}', [StatisticsController::class, 'getLikeStats'])->name('statistics.like');
            Route::get('top/genres', [StatisticsController::class, 'getTopGenres'])->name('statistics.top.genres');
            Route::get('top/songs', [StatisticsController::class, 'getTopSongs'])->name('statistics.top.songs');
        });

        Route::apiResource('genres', GenreController::class)->except(['index', 'show']);

        Route::get('users', [UserController::class, 'index'])->name('user.index');
        Route::delete('users/{id}', [UserController::class, 'destroy'])->name('user.delete');

        Route::get('song/paginated', [SongController::class, 'getPaginated'])->name('songs.paginated');
    });
});
