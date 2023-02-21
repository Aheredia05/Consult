<?php

namespace Database\Factories;

use App\Models\Paciente;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Paciente>
 */
class PacienteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Paciente::class;

    public function definition()
    {
        return [
          	
         
            //'role_id'=>$this->faker->randomElement([1,2,3,4]),
            'name' => $this->faker->firstName(),
            'cedula' => $this->faker->randomNumber(),
            'sex' => $this->faker->randomElement(['masculino', 'femenino']),
            'fechan' => $this->faker->dateTimeBetween('-50 years', 'now'),
            'personal_phone' => '02' . $this->faker->randomNumber(7),
            'address' => $this->faker->streetAddress,
            'email' => $this->faker->unique()->safeEmail(),
            'alergias' => $this->faker->text($maxNbChars = 10),
        ];
    }

   
}


