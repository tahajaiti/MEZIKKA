<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SongController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\ProfileController;



Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register'])->name('register');
    Route::post('login', [AuthController::class, 'login'])->name('login');
    Route::middleware('jwt')->post('logout', [AuthController::class, 'logout'])->name('logout');
});

Route::middleware('jwt')->group(function () {

    Route::prefix('profile')->group(function () {
        Route::get('/', [ProfileController::class, 'show'])->name('profile.show');
        Route::put('/', [ProfileController::class, 'update'])->name('profile.update');
    });

    Route::apiResource('songs', SongController::class);
    Route::apiResource('genres', GenreController::class);

    Route::post('/follow/{id}', [FollowController::class, 'follow'])->name('follow');
    Route::delete('/follow/{id}', [FollowController::class, 'unfollow'])->name('unfollow');
    Route::get('/followings', [FollowController::class, 'myFollows'])->name('followings');
    Route::get('/followers', [FollowController::class, 'myFollowers'])->name('followers');


});
