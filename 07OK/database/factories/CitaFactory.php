<?php

namespace Database\Factories;

use App\Models\Cita;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Cita>
 */
class CitaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Cita::class;

    public function definition()
    {
        return [
           
            //'role_id'=>$this->faker->randomElement([1,2,3,4]),
            'fechac' => $this->faker->dateTimeBetween('-5 years', 'now'),
            'description' => $this->faker->text(255),
            'sintomas' => $this->faker->text(255),
            'diagnostico' => $this->faker->text(255),
            'prescripcion' => $this->faker->text(255),
            'observaciones' => $this->faker->text(255),

        ];
    }

    
}


