<?php

namespace App\Http\Controllers;

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

    /**
     * Search recipes from Spoonacular API with DB fallback.
     */
    public function search(Request $request)
    {
        $validated = $request->validate([
            'query' => 'required|string|max:255',
        ]);

        $query = $validated['query'];

        try {
            // Try API first
            $recipes = $this->recipeService->fetchRecipes($query, 10);

            if (!empty($recipes)) {
                $this->recipeService->saveRecipes($recipes);

                return response()->json([
                    'status'  => 'success',
                    'source'  => 'api',
                    'count'   => count($recipes),
                    'data'    => $recipes,
                ]);
            }

            // API returned empty but not an error
            Log::warning("Spoonacular returned empty results for query: {$query}");
        } catch (Throwable $e) {
            // Catch API/network/JSON errors
            Log::error("Spoonacular API error: {$e->getMessage()}");
        }

        // Fallback: search in DB
        $recipesFromDb = Recipe::with(['dishTypes', 'ingredients'])
            ->where('title', 'like', "%{$query}%")
            ->limit(10)
            ->get();

        return response()->json([
            'status'  => 'success',
            'source'  => 'database',
            'count'   => $recipesFromDb->count(),
            'data'    => $recipesFromDb,
        ]);
    }
}
