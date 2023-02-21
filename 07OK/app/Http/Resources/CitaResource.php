<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CitaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {

        $user = $this->user;

        // Se procede a definir la estructura de la respuesta de la petición
        // https://laravel.com/docs/9.x/eloquent-resources#introduction
        return [
            'id' => $this->id,
            'name' => $this->name,
            'state' => $this->state,
            'description' => $this-> description,
            'price' => $this->price,
            'fechac' => $this->fechac,
            'fechan' => $this->fechan,
            'cedula' => $this->cedula,
            'personal_phone' => $this->personal_phone,
            'sintomas' => $this-> sintomas,
            'diagnostico' => $this-> diagnostico,
            'prescripcion' => $this-> prescripcion,
            'observaciones' => $this->observaciones,
            'state' => $this->state,

            'paciente' => $this->paciente,

            // https://carbon.nesbot.com/docs/
            'created_at' => $this->created_at->toDateTimeString(),
            'user' => $user ? new ProfileResource($user) : null


 ];
    }
}


