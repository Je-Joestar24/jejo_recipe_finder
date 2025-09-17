<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RecipeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'                  => $this->id,
            'title'               => $this->title,
            'image'               => $this->image,
            'readyInMinutes'      => $this->ready_in_minutes,
            'servings'            => $this->servings,
            'dishTypes'           => $this->dishTypes->pluck('name')->toArray(),
            'summary'             => $this->summary,
            'extendedIngredients' => IngredientResource::collection($this->whenLoaded('ingredients')),
            'instructions'        => $this->instructions,
            'sourceUrl'           => $this->source_url,
        ];
    }
}
