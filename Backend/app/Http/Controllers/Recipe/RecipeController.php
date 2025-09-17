<?php

namespace App\Http\Controllers\Recipe;

use App\Http\Controllers\Controller;
use App\Http\Resources\RecipeResource;
use App\Services\RecipeService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Throwable;

class RecipeController extends Controller
{
    protected RecipeService $recipeService;

    public function __construct(RecipeService $recipeService)
    {
        $this->recipeService = $recipeService;
    }

    public function index(Request $request)
    {
        $query = $request->input('query'); // optional
        $limit = 10;

        try {
            $recipes = $this->recipeService->fetchRecipes($query, $limit);

            if (!empty($recipes)) {
                // Save recipes first
                $this->recipeService->saveRecipes($recipes);

                // Load from DB by spoonacular_id (ensures we return exactly what API gave)
                $recipesFromDb = \App\Models\Recipe::with(['dishTypes', 'ingredients'])
                    ->whereIn('spoonacular_id', collect($recipes)->pluck('id'))
                    ->get();

                return response()->json([
                    'status' => 'success',
                    'source' => 'api',
                    'count'  => $recipesFromDb->count(),
                    'data'   => RecipeResource::collection($recipesFromDb),
                ]);
            }
        } catch (\Throwable $e) {
            Log::error("Spoonacular API error: {$e->getMessage()}");
        }

        // 🔻 Fallback: DB only
        $dbQuery = \App\Models\Recipe::with(['dishTypes', 'ingredients']);

        if ($query) {
            $dbQuery->where('title', 'like', "%{$query}%");
        } else {
            $dbQuery->inRandomOrder();
        }

        $recipesFromDb = $dbQuery->limit($limit)->get();

        return response()->json([
            'status' => 'success',
            'source' => 'database',
            'count'  => $recipesFromDb->count(),
            'data'   => RecipeResource::collection($recipesFromDb),
        ]);
    }
}
