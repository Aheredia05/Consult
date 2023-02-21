<?php

namespace App\Http\Resources;

use App\Models\Servicio;

use Illuminate\Http\Resources\Json\JsonResource;

class ProfileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $servicio = $this->servicio;

        // Se procede a definir la estructura de la respuesta de la petición
        // https://laravel.com/docs/9.x/eloquent-resources#introduction
        return [
            'id' => $this->id,
            'username' => $this->username,
            'full_name' => $this->getFullName(),
            'email' => $this->email,
            'role' => $this->role->name,
            'birthdate' => $this->birthdate,
            'home_phone' => $this->home_phone,
            'personal_phone' => $this->personal_phone,
            'address' => $this->address,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'servicio' => $servicio ? new ServicioResource($servicio) : null,
        ];
    }
}
