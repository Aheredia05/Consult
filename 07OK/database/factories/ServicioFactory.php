<?php

namespace Database\Factories;

use App\Models\Servicio;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class ServicioFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Servicio::class;

    public function definition()
    { 
        return [
            //'role_id'=>$this->faker->randomElement([1,2,3,4]),
            
            'name' => $this->faker->name(),
            'description' => $this->faker->text(255),
            'price' => $this->faker->numberBetween($min = 10, $max = 50),
            
        ];
    }

  
}
