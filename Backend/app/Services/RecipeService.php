<?php

namespace App\Services;

use App\Models\Recipe;
use App\Models\DishType;
use App\Models\Ingredient;
use Illuminate\Support\Facades\Http;

class RecipeService
{
    protected string $baseUrl = "https://api.spoonacular.com";
    protected string $apiKey;

    public function __construct()
    {
        $this->apiKey = config('services.spoonacular.key'); // store your key in config/services.php
    }

    /**
     * Fetch recipes from Spoonacular API.
     */
    public function fetchRecipes(?string $query = null, int $number = 10): array
    {
        $params = [
            'number' => $number,
            'apiKey' => $this->apiKey,
        ];

        $url = $query
            ? "{$this->baseUrl}/recipes/complexSearch"
            : "{$this->baseUrl}/recipes/random";

        if ($query) {
            $params['query'] = $query;
            $params['addRecipeInformation'] = 'true';
        }

        $response = Http::get($url, $params);

        if (!$response->successful()) {
            return [];
        }

        $data = $response->json();

        return $data['results'] ?? $data['recipes'] ?? [];
    }

    /**
     * Save recipes to DB (with checks).
     */
    public function saveRecipes(array $recipes): void
    {
        foreach ($recipes as $recipeData) {
            $this->saveRecipe($recipeData);
        }
    }

    /**
     * Save single recipe (skip if exists).
     */
    public function saveRecipe(array $data): Recipe
    {
        $recipe = Recipe::firstOrCreate(
            ['spoonacular_id' => $data['id']],
            [
                'title' => $data['title'] ?? '',
                'image' => $data['image'] ?? null,
                'ready_in_minutes' => $data['readyInMinutes'] ?? null,
                'servings' => $data['servings'] ?? null,
                'summary' => $data['summary'] ?? '',
                'instructions' => $data['instructions'] ?? '',
                'source_url' => $data['sourceUrl'] ?? '',
            ]
        );

        $this->attachDishTypes($recipe, $data['dishTypes'] ?? []);
        $this->attachIngredients($recipe, $data['extendedIngredients'] ?? []);

        return $recipe;
    }

    /**
     * Attach Dish Types.
     */
    protected function attachDishTypes(Recipe $recipe, array $dishTypes): void
    {
        if (empty($dishTypes)) return;

        $ids = [];
        foreach ($dishTypes as $type) {
            $dishType = DishType::firstOrCreate(['name' => $type]);
            $ids[] = $dishType->id;
        }

        $recipe->dishTypes()->syncWithoutDetaching($ids);
    }

    /**
     * Attach Ingredients.
     */
    protected function attachIngredients(Recipe $recipe, array $ingredients): void
    {
        if (empty($ingredients)) return;

        $syncData = [];

        foreach ($ingredients as $ingredientData) {
            $ingredient = Ingredient::firstOrCreate(
                ['spoonacular_id' => $ingredientData['id']],
                ['name' => $ingredientData['name']]
            );

            $syncData[$ingredient->id] = [
                'amount' => $ingredientData['amount'] ?? null,
                'unit' => $ingredientData['unit'] ?? null,
            ];
        }

        $recipe->ingredients()->syncWithoutDetaching($syncData);
    }
}