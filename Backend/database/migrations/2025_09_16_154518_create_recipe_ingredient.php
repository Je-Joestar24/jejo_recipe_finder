<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('recipe_ingredient', function (Blueprint $table) {
            $table->id(); // PK
            $table->foreignId('recipe_id')
                ->constrained('recipes')
                ->cascadeOnDelete();
            $table->foreignId('ingredient_id')
                ->constrained('ingredients');
            $table->decimal('amount', 10, 2)->nullable();
            $table->string('unit', 50)->nullable();
            $table->timestamps();
            $table->unique(['recipe_id', 'ingredient_id']); // 1 ingredient per recipe
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recipe_ingredient');
    }
};
