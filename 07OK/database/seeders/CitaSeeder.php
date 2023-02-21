<?php

namespace Database\Seeders;

use App\Models\Cita;
use App\Models\Paciente;
use App\Models\Servicio;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
 
class CitaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

         // Los pabellones pueden tener muchas carceles
         $pacientes = Paciente::all();

         $pacientes->each(function($paciente)
         {
             Cita::factory()->count(1)->for($paciente)->create();
         });
/*
         // Los pabellones pueden tener muchas carceles
         $servicios = Servicio::all();

         $servicios->each(function($servicio)
         {
             Cita::factory()->count(10)->for($servicio)->create();
         });
*/

         
    }
}


