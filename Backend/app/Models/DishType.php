<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class DishType extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public function recipes()
    {
        return $this->belongsToMany(Recipe::class, 'recipe_dish_type')
            ->withTimestamps();
    }
}
