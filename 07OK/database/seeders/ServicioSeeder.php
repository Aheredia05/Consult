<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Servicio;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ServicioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void 
     */
    public function run()
    {
        Servicio::factory()->count(5)->create();

        $users_director = User::where('role_id', 2)->get();

        $servicios=Servicio::all();

    }
}



