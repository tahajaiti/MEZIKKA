<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\SongController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PlaylistController;
use App\Http\Controllers\PlaylistItemController;



Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register'])->name('register');
    Route::post('login', [AuthController::class, 'login'])->name('login');
    Route::middleware('jwt')->post('logout', [AuthController::class, 'logout'])->name('logout');
});

Route::middleware('jwt')->group(function () {

    Route::get('/files/{path}', [FileController::class, 'serve'])
        ->where('path', '.*')
        ->name('files.serve');

    Route::prefix('profile')->group(function () {
        Route::get('/', [ProfileController::class, 'show'])->name('profile.show');
        Route::put('/', [ProfileController::class, 'update'])->name('profile.update');
    });

    Route::apiResource('songs', SongController::class);
    Route::apiResource('genres', GenreController::class);
    Route::apiResource('playlists', PlaylistController::class);

    Route::post('/playlists/{playlist}/songs/{song}', [PlaylistItemController::class, 'add']);
    Route::delete('/playlists/{playlist}/songs/{song}', [PlaylistItemController::class, 'remove']);

    // Like routes
    Route::get('/likes', [LikeController::class, 'getLikes']);
    Route::get('/likes/{type}/{id}', [LikeController::class, 'getLikeCount'])
        ->whereIn('type', ['song', 'playlist']);
    Route::post('/like/{type}/{id}', [LikeController::class, 'toggleLike'])
        ->whereIn('type', ['song', 'playlist']);

    // Follow routes
    Route::post('/follow/{id}', [FollowController::class, 'follow'])->name('follow');
    Route::delete('/follow/{id}', [FollowController::class, 'unfollow'])->name('unfollow');
    Route::get('/follow/{id}', [FollowController::class, 'follows'])->name('follows');

    Route::get('/users/{id}', [UserController::class, 'show'])->name('user.show');

});
