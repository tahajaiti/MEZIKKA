<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;



Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register'])->name('register');
    Route::post('login', [AuthController::class, 'login'])->name('login');
    Route::post('logout', [AuthController::class, 'logout'])->name('logout');
});


Route::group(['prefix' => 'profile', 'middleware' => ['jwt']], function () {
    Route::get('/', [ProfileController::class, 'show'])->name('profile.show');
    Route::put('/', [ProfileController::class, 'update'])->name('profile.update');
});