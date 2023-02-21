<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Paciente;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PacienteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void 
     */
    public function run()
    {
        Paciente::factory()->count(50)->create();

        $users_director = User::where('role_id', 2)->get();
        // dd($users_guards);
        // dd(count($users_guards));

        $pacientes=Paciente::all();

        // Los guardias pueden estar en varios pabellones
        // https://laravel.com/docs/9.x/collections#macro-arguments
        $pacientes->each(function($paciente) use ($users_director)
        {
            // https://laravel.com/docs/9.x/collections#method-shift
            $paciente->users()->attach($users_director->shift(100));
        });

    }
}


