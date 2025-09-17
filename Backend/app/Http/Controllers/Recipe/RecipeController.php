<?php

namespace App\Http\Controllers;

use App\Http\Resources\RecipeResource;
use App\Models\Recipe;
use App\Services\RecipeService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Throwable;

class RecipeController extends Controller
{
    protected RecipeService $recipeService;

    public function __construct(RecipeService $recipeService)
    {
        $this->recipeService = $recipeService;
    }

    public function search(Request $request)
    {
        $validated = $request->validate([
            'query' => 'required|string|max:255',
        ]);

        $query = $validated['query'];

        try {
            $recipes = $this->recipeService->fetchRecipes($query, 10);

            if (!empty($recipes)) {
                $this->recipeService->saveRecipes($recipes);

                // Return DB models so we can transform them with resources
                $recipesFromDb = \App\Models\Recipe::with(['dishTypes', 'ingredients'])
                    ->where('title', 'like', "%{$query}%")
                    ->limit(10)
                    ->get();

                return response()->json([
                    'status' => 'success',
                    'source' => 'api',
                    'count'  => $recipesFromDb->count(),
                    'data'   => RecipeResource::collection($recipesFromDb),
                ]);
            }
        } catch (\Throwable $e) {
            \Log::error("Spoonacular API error: {$e->getMessage()}");
        }

        // Fallback: DB
        $recipesFromDb = \App\Models\Recipe::with(['dishTypes', 'ingredients'])
            ->where('title', 'like', "%{$query}%")
            ->limit(10)
            ->get();

        return response()->json([
            'status' => 'success',
            'source' => 'database',
            'count'  => $recipesFromDb->count(),
            'data'   => RecipeResource::collection($recipesFromDb),
        ]);
    }
}
