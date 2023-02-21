<?php

namespace App\Http\Controllers\Spaces;

use App\Http\Controllers\Controller;
use App\Http\Resources\SpaceResource;
use App\Http\Resources\PacienteResource;
use App\Models\Paciente;
use Illuminate\Http\Request;

class PacienteController extends Controller
{

    // Creación del constructor
    public function __construct()
    {
        // Uso del gate para que pueda gestionar las cárceles a partir del rol establecido
        $this->middleware('can:manage-pacientes');
    }

    // Métodos del Controlador
    // Listar los pabellones
    public function index()
    {
        // Obtener la colección de pabellones
        $pacientes = Paciente::orderBy('name', 'asc')->get();
        // Invoca el controlador padre para la respuesta json
        // El moldeo de la información por el Resource
        return $this->sendResponse(message: 'Paciente list generated successfully', result: [
            'pacientes' => SpaceResource::collection($pacientes)
        ]);
    }


    // Crear un nuevo pabellon
    public function store(Request $request)
    {
        $allowed_date_range =[
           //'max' => date('Y-m-d', strtotime('-110 years')),
           //'min' => date('Y-m-d', strtotime('-1 week')),
          'max' => date('Y-m-d', strtotime('-110 year')),
           'min' => date('Y-m-d', strtotime('+1 wek')),
        ];
         // Validación de los datos de entrada
         // Crear un array asociativo de clave y valor
        $paciente_data = $request -> validate([
            'name' => ['required', 'string', 'min:3', 'max:70'],
            'cedula' => ['required', 'numeric', 'digits:10'],
            'sex' => ['required', 'string'],
            'fechan' => ['required', 'string'],
            'personal_phone' => ['required', 'numeric', 'digits:10'],
            'address' => ['required', 'string', 'min:5', 'max:50'],
            'email' => ['required', 'string', 'email', 'max:255','unique:pacientes'],
            'alergias' => ['nullable', 'string', 'min:5', 'max:255'],
        ],[
            'name.required' => 'El nombre es obligatorio',
            'name.string' => 'Nombre debe ser texto',
            'name.min' => 'Nombre debe tener un mínimo de 70 caracteres',
            'name.max' => 'Nombre debe tener maximo 70 caracteres',
            'cedula.required' => 'Cédula obligatoria',
            'cedula.numeric' => 'Cédula no debe incluir letras',
            'cedula.digits' => 'Cédula debe tener 10 dígitos',
            'cedula.unique' => 'El número de cédula ya existe',
            'personal_phone.required' => 'Número Celular obligatorio',
            'personal_phone.numeric' => 'Número Celular debe ser un número',
            'personal_phone.digits' => 'Número personal debe tener 9 dígitos',
        ]);

        // https://laravel.com/docs/9.x/eloquent#inserts
        Paciente::create($paciente_data);
        // Invoca el controlador padre para la respuesta json
        return $this->sendResponse(message: 'Paciente stored successfully');
    }

    // Mostrar la información del pabellon
    public function show(Paciente $paciente)
    {
        // Invoca el controlador padre para la respuesta json
        // El moldeo de la información por el Resource
        return $this->sendResponse(message: 'Paciente details', result: [
            'paciente' => new PacienteResource($paciente)
        ]);
    }

    // Actualizar la información del pabellon
    public function update(Request $request, Paciente $paciente)
    {

        $allowed_date_range =[
            //'max' => date('Y-m-d', strtotime('-110 years')),
            //'min' => date('Y-m-d', strtotime('-1 week')),
           'max' => date('Y-m-d', strtotime('day')),
            'min' => date('Y-m-d', strtotime('+1 wek')),
         ];

         
         // Validación de los datos de entrada
         // Crear un array asociativo de clave y valor
        $paciente_data = $request -> validate([
            'name' => ['required', 'string', 'min:3', 'max:70'],
            'cedula' => ['required', 'numeric', 'digits:10'],
            'sex' => ['required', 'string'],
            'fechan' => ['nullable', 'string', 'date_format:Y-m-d H:i:s'],
            'personal_phone' => ['required', 'numeric', 'digits:10'],
            'address' => ['required', 'string', 'min:5', 'max:50'],
            'email' => ['required', 'string', 'email', 'max:255'],
            'alergias' => ['nullable', 'string', 'min:5', 'max:255'],
        ],[
            'name.required' => 'Nombre obligatorio',
            'name.string' => 'Nombre debe ser un string',
            'name.min' => 'Nombre debe tener un mínimo de 70 caracteres',
            'name.max' => 'Nombre debe tener maximo 70 caracteres',
            'cedula.required' => 'Cédula obligatoria',
            'cedula.numeric' => 'Cédula no debe incluir letras',
            'cedula.digits' => 'Cédula debe tener 10 dígitos',
            'cedula.unique' => 'El número de cédula ya existe',
            'personal_phone.required' => 'Número Celular obligatorio',
            'personal_phone.numeric' => 'Número Celular debe ser un número',
            'personal_phone.digits' => 'Número personal debe tener 9 dígitos',
            'alergias.required' => 'En caso de no tener alergia ponga Ninguna',

        ]);

        // Actaliza los datos del pabellon
        $paciente->fill($paciente_data)->save();

        // Invoca el controlador padre para la respuesta json
        return $this->sendResponse(message: 'Paciente updated successfully');
    }

    // Dar de baja a un pabellon
    public function destroy(Paciente $paciente)
    {
        // Obtener el estado del pabellon
        $paciente_state = $paciente->state;

        // Almacenar un string con el mensaje
        $message = $paciente_state ? 'inactivated' : 'activated';

        // Verifica que el pabellon tiene guardias
        if ($paciente->users->isNotEmpty())
        {
            return $this->sendResponse(message: 'This paciente has assigned guard(s)', code: 403);
        }
        // Cambia el estado del pabellon
        $paciente->state = !$paciente_state;

        // Guardar en la BDD
        $paciente->save();

        // Invoca el controlador padre para la respuesta json
        return $this->sendResponse(message: "Paciente $message successfully");
    }
}


