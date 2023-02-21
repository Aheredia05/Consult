<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ServicioResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {


        // Se procede a definir la estructura de la respuesta de la petición
        // https://laravel.com/docs/9.x/eloquent-resources#introduction
        return [
            'id' => $this->id,
            'name' => $this->name,
            'state' => $this->state,
            'price' => $this->price,
            'description' => $this->description,
            'state' => $this->state,
            // https://carbon.nesbot.com/docs/
            'created_at' => $this->created_at->toDateTimeString(),
            // https://laravel.com/docs/9.x/eloquent-resources#resource-collections
            'users' => UserResource::collection($this->users)
        ];

    }
}
