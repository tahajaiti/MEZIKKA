<?php

use App\Http\Controllers\AuthController;


Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register'])->name('register');
});
