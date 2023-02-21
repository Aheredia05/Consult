<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cita extends Model
{
    use HasFactory;


    protected $fillable = ['fechac',  'description', 'sintomas', 'diagnostico', 'prescripcion', 'observaciones','paciente_id', 'user_id'];


   // Relación de uno a muchos
    // Una cárcel le pertenece a un pabellón
    public function paciente()
    {
        return $this->belongsTo(Paciente::class);
    }

    public function servicio()
    {
        return $this->belongsTo(Servicio::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }


}


