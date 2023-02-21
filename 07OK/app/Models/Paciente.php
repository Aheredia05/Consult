<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paciente extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'cedula', 'sex', 'birthdate', 'personal_phone', 'address', 'email', 'alergias', 'fechan'];

   // Relación de uno a muchos
    // Un pabellón puede tener muchas cárceles
    public function citas()
    {
        return $this->hasMany(Cita::class);
    }

    // Relación de muchos a muchos
    // Un pabellón puede tener muchos usuarios
    public function users()
    {
        return $this->belongsToMany(User::class)->withTimestamps();
    }

 

}


