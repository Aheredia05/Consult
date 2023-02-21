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
        Schema::create('citas', function (Blueprint $table) {
             // ID para la tabla de la BDD
             $table->id();

             // columnas para la tabla de la BDD
             $table->datetime('fechac')->nullable();
             $table->string('description')->nullable();
             $table->boolean('state')->default(true);

             $table->string('sintomas')->nullable();
             $table->string('diagnostico')->nullable();
             $table->string('prescripcion')->nullable();
             $table->string('observaciones')->nullable();
             $table->integer('user_id')->nullable()->default(null);


 /*
             // Relación
             $table->unsignedBigInteger('servicio_id');
             // Un paciente puede realizar muchos citas y un cita le pertenece a un paciente            $table->unsignedBigInteger('role_id');
             $table->foreign('servicio_id')
                     ->references('id')
                     ->on('servicios')
                     ->onDelete('cascade')
                     ->onUpdate('cascade');
*/

             // Relación
             $table->integer('paciente_id')->nullable()->default(null);
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
        Schema::dropIfExists('citas');
    }
};
