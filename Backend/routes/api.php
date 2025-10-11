<?php

use App\Http\Controllers\user\ProfileController;
use App\Http\Controllers\auth\LoginController;
use App\Http\Controllers\auth\RegisterUserController;
use App\Http\Controllers\recipe\RecipeController;
use App\Http\Controllers\Recipe\FavoriteController;
use Illuminate\Support\Facades\Route;


Route::prefix('auth')->group(function () {
    Route::post('/register', [RegisterUserController::class, 'store']);
    Route::post('/login', [LoginController::class, 'login']);
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/update', [ProfileController::class, 'update']);
        Route::post('/logout', [LoginController::class, 'logout']);
    });
});

Route::prefix('recipe')
    ->middleware('auth:sanctum')
    ->group(function () {
        Route::get('/', [RecipeController::class, 'index']);
    });

Route::prefix('favorites')
    ->middleware('auth:sanctum')
    ->group(function () {
        Route::post('/', [FavoriteController::class, 'store']);
        Route::get('/', [FavoriteController::class, 'fetchFavorites']);
        Route::delete('/', [FavoriteController::class, 'destroy']);
        Route::get('/check', [FavoriteController::class, 'check']);
    });