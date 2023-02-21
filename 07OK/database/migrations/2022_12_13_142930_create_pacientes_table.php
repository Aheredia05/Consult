<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pacientes', function (Blueprint $table) {
           
               // ID para la tabla de la BDD
               $table->id();

               // columnas para la tabla de la BDD
               $table->string('name', 70);
               $table->string('cedula',10);
               $table->enum('sex', ['Masculino', 'Femenino']);
               $table->date('fechan')->nullable();
               $table->string('personal_phone', 10);
               $table->string('address', 50);
               $table->string('email')->unique();
               $table->boolean('state')->default(true);
   
               // columnas que seran podran aceptar regitros null para la tabla de la BDD
               $table->string('alergias')->nullable();
   
               // columnas especiales para la tabla de la BDD
               $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pacientes');
    }
};
