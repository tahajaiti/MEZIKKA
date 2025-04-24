<?php

use App\Http\Controllers\SearchController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\SongController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PlaylistController;
use App\Http\Controllers\PlaylistItemController;

// Auth Routes
Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register'])->name('register');
    Route::post('login', [AuthController::class, 'login'])->name('login');
    Route::post('refresh', [AuthController::class, 'refresh'])->name('refresh');

    Route::middleware('jwt')->group(function () {
        Route::post('logout', [AuthController::class, 'logout'])->name('logout');
    });
});

// Protected Routes
Route::middleware('jwt')->group(function () {

    // Search
    Route::get('/search', [SearchController::class, 'search'])->name('search');
    Route::get('/search/user', [SearchController::class, 'userSearch'])->name('userSearch');

    // File Access
    Route::get('/files/{path}', [FileController::class, 'serve'])
        ->where('path', '.*')
        ->name('files.serve');

    // Profile Management
    Route::prefix('profile')->group(function () {
        Route::get('/', [ProfileController::class, 'show'])->name('profile.show');
        Route::put('/', [ProfileController::class, 'update'])->name('profile.update');
    });

    // Songs
    Route::apiResource('songs', SongController::class);
    Route::get('/songs/user/{id}', [SongController::class, 'userSongs'])->name('songs.user');
    Route::get('/songs/genre/{genre}', [SongController::class, 'getByGenre'])->name('songs.genre');

    // Genres
    Route::apiResource('genres', GenreController::class);
    Route::get('/genres/image/{genre}', [GenreController::class, 'getImage'])->name('genres.image');

    // Playlists
    Route::apiResource('playlists', PlaylistController::class);
    Route::get('/playlists/{id}/songs', [PlaylistController::class, 'showSongs'])->name('playlists.songs');
    Route::get('/playlists/user/{id}', [PlaylistController::class, 'userPlaylists'])->name('playlists.user');
    Route::post('/playlists/{playlist}/songs/{song}', [PlaylistItemController::class, 'add']);
    Route::delete('/playlists/{playlist}/songs/{song}', [PlaylistItemController::class, 'remove']);

    // Likes
    Route::prefix('likes')->group(function () {
        Route::get('/', [LikeController::class, 'index']);
        Route::get('/songs', [LikeController::class, 'getLikedSongs']);
        Route::get('/{type}/{id}/count', [LikeController::class, 'getLikeCount'])
            ->whereIn('type', ['song', 'playlist']);
        Route::post('/{type}/{id}', [LikeController::class, 'toggleLike'])
            ->whereIn('type', ['song', 'playlist']);
    });

    // Follows
    Route::prefix('follow')->group(function () {
        Route::post('/{id}', [FollowController::class, 'follow'])->name('follow');
        Route::delete('/{id}', [FollowController::class, 'unfollow'])->name('unfollow');
        Route::get('/{id}', [FollowController::class, 'follows'])->name('follows');
    });

    // Users
    Route::get('/users/{id}', [UserController::class, 'show'])->name('user.show');
});