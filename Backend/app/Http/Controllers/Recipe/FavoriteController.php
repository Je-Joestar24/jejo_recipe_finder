<?php

namespace App\Http\Controllers\Recipe;

use App\Http\Controllers\Controller;
use App\Http\Resources\RecipeResource;
use App\Models\Favorite;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class FavoriteController extends Controller
{
    /**
     * Store a favorite recipe for the authenticated user.
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'recipe_id' => 'required|integer|exists:recipes,id'
            ]);

            $userId = Auth::id();
            $recipeId = $request->input('recipe_id');

            // Check if already favorited
            $existingFavorite = Favorite::where('user_id', $userId)
                ->where('recipe_id', $recipeId)
                ->first();

            if ($existingFavorite) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Recipe is already in your favorites'
                ], 409);
            }

            // Create new favorite
            $favorite = Favorite::create([
                'user_id' => $userId,
                'recipe_id' => $recipeId
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Recipe added to favorites successfully',
                'data' => $favorite
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Throwable $e) {
            Log::error("Error storing favorite: {$e->getMessage()}");
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to add recipe to favorites'
            ], 500);
        }
    }

    /**
     * Fetch all favorite recipes for the authenticated user.
     */
    public function fetchFavorites(Request $request): JsonResponse
    {
        try {
            $userId = Auth::id();
            $limit = $request->input('limit', 20);
            $page = $request->input('page', 1);
            $search = $request->input('search'); // optional search query
            $sortByName = $request->input('sort_by_name', false); // optional sort by name toggle

            // Get favorite recipes with relationships
            $query = Recipe::whereHas('favorites', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })
            ->with(['dishTypes', 'ingredients']);

            // Add search functionality
            if ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                      ->orWhere('summary', 'like', "%{$search}%");
                });
            }

            // Add sorting functionality
            if ($sortByName) {
                $query->orderBy('title', 'asc');
            } else {
                $query->orderBy('created_at', 'desc');
            }

            $favoriteRecipes = $query->paginate($limit, ['*'], 'page', $page);

            return response()->json([
                'status' => 'success',
                'count' => $favoriteRecipes->count(),
                'total' => $favoriteRecipes->total(),
                'current_page' => $favoriteRecipes->currentPage(),
                'last_page' => $favoriteRecipes->lastPage(),
                'search' => $search,
                'sort_by_name' => $sortByName,
                'data' => RecipeResource::collection($favoriteRecipes->items())
            ]);

        } catch (\Throwable $e) {
            Log::error("Error fetching favorites: {$e->getMessage()}");
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch favorite recipes'
            ], 500);
        }
    }

    /**
     * Remove a recipe from favorites.
     */
    public function destroy(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'recipe_id' => 'required|integer|exists:recipes,id'
            ]);

            $userId = Auth::id();
            $recipeId = $request->input('recipe_id');

            $favorite = Favorite::where('user_id', $userId)
                ->where('recipe_id', $recipeId)
                ->first();

            if (!$favorite) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Recipe not found in your favorites'
                ], 404);
            }

            $favorite->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Recipe removed from favorites successfully'
            ]);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Throwable $e) {
            Log::error("Error removing favorite: {$e->getMessage()}");
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to remove recipe from favorites'
            ], 500);
        }
    }

    /**
     * Check if a recipe is favorited by the authenticated user.
     */
    public function check(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'recipe_id' => 'required|integer|exists:recipes,id'
            ]);

            $userId = Auth::id();
            $recipeId = $request->input('recipe_id');

            $isFavorited = Favorite::where('user_id', $userId)
                ->where('recipe_id', $recipeId)
                ->exists();

            return response()->json([
                'status' => 'success',
                'is_favorited' => $isFavorited
            ]);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Throwable $e) {
            Log::error("Error checking favorite: {$e->getMessage()}");
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to check favorite status'
            ], 500);
        }
    }
}
