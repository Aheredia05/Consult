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
        Schema::create('paciente_user', function (Blueprint $table) {
            
             // ID para la tabla de la BDD
             $table->id();

             // columnas para la tabla de la BDD
             $table->unsignedBigInteger('paciente_id');
             $table->unsignedBigInteger('user_id');
             $table->boolean('state')->default(true);
 
             // Relación
             //Un usuario puede estar en varios servicios y un servicio puede tener muchos usuarios
             $table->foreign('user_id')
                 ->references('id')
                 ->on('users')
                 ->onDelete('cascade')
                 ->onUpdate('cascade');
         //Un usuario puede estar en varios servicios y un servicios puede tener muchos usuarios
             $table->foreign('paciente_id')
                 ->references('id')
                 ->on('pacientes')
                 ->onDelete('cascade')
                 ->onUpdate('cascade');
 
    
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
        Schema::dropIfExists('paciente_user');
    }
};
