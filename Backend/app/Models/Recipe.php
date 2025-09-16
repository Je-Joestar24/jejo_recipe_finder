<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Recipe extends Model
{
    use HasFactory;

    protected $fillable = [
        'spoonacular_id',
        'title',
        'image',
        'ready_in_minutes',
        'servings',
        'summary',
        'instructions',
        'source_url',
    ];

    /**
     * Dish types (many-to-many).
     */
    public function dishTypes()
    {
        return $this->belongsToMany(DishType::class, 'recipe_dish_type')
            ->withTimestamps();
    }

    /**
     * Ingredients (many-to-many with pivot data).
     */
    public function ingredients()
    {
        return $this->belongsToMany(Ingredient::class, 'recipe_ingredient')
            ->withPivot(['amount', 'unit'])
            ->withTimestamps();
    }

    /**
     * Users who favorited this recipe.
     */
    public function favorites()
    {
        return $this->hasMany(Favorite::class);
    }

    public function favoritedByUsers()
    {
        return $this->belongsToMany(User::class, 'favorites');
    }
}
