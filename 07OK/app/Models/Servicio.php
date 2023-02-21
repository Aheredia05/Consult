<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Servicio extends Model 
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'price'];


   // Relación de uno a muchos
    // Un pabellón puede tener muchas cárceles
    public function citas()
    {
        return $this->hasMany(Cita::class);
    }

    // Relación de muchos a muchos
    // Un pabellón puede tener muchos usuarios
    // public function users()
    // {
    //     return $this->belongsToMany(User::class)->withTimestamps();
    // }

    public function users()
    {
        return $this->hasMany(User::class);
    }

}


