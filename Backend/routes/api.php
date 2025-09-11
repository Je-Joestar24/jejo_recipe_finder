<?php

use App\Http\Controllers\auth\LoginController;
use App\Http\Controllers\auth\RegisterUserController;
use Illuminate\Support\Facades\Route;


Route::prefix('auth')->group(function () {
    Route::post('/register', [RegisterUserController::class, 'store']);
    Route::post('/login', [LoginController::class, 'login']);
});