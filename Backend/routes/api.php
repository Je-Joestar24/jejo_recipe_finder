<?php

use App\Http\Controllers\auth\LoginController;
use App\Http\Controllers\auth\RegisterUserController;
use Illuminate\Support\Facades\Route;


Route::prefix('auth')->group(function () {
    Route::post('/register', [RegisterUserController::class, 'store']);
    Route::post('/login', [LoginController::class, 'login']);
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [LoginController::class, 'logout']);
        Route::get('/me', function () {
            return response()->json(app()->version());
        });
    });
});
