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
        Schema::create('recipes', function (Blueprint $table) {
            $table->id(); // PK
            $table->unsignedBigInteger('spoonacular_id')->unique();
            $table->string('title');
            $table->string('image')->nullable();
            $table->integer('ready_in_minutes');
            $table->integer('servings')->nullable();
            $table->text('summary')->nullable();
            $table->longText('instructions')->nullable();
            $table->string('source_url')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recipes');
    }
};
