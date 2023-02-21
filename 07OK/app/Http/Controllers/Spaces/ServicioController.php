<?php

namespace App\Http\Controllers\Spaces;

use App\Http\Controllers\Controller;
use App\Http\Resources\SpaceResource;
use App\Http\Resources\ServicioResource;
use App\Models\Servicio;
use Illuminate\Http\Request;

class ServicioController extends Controller
{

    // Creación del constructor
    public function __construct()
    {
        // Uso del gate para que pueda gestionar las cárceles a partir del rol establecido
        $this->middleware('can:manage-servicios');
    }

    // Métodos del Controlador
    // Listar los pabellones
    public function index()
    {
        // Obtener la colección de pabellones
        $servicios = Servicio::orderBy('name', 'asc')->get();
        // Invoca el controlador padre para la respuesta json
        // El moldeo de la información por el Resource
        return $this->sendResponse(message: 'Servicio list generated successfully', result: [
            'servicios' => ServicioResource::collection($servicios)
        ]);
    }

    // Listar usuarios por servicio
    public function providers(Servicio $servicio)
    {
        $servicio->users();
        return $this->sendResponse(message: 'User list generated successfully', result: [
            'users' => $servicio->users(),
        ]);
    }

    // Crear un nuevo pabellon
    public function store(Request $request)
    {
         // Validación de los datos de entrada
         // Crear un array asociativo de clave y valor
        $servicio_data = $request -> validate([
            'name' => ['required', 'string', 'min:3', 'max:45'],
            'description' =>  ['required', 'string', 'min:3', 'max:255'],
            'price' => ['required', 'numeric', 'min:1', 'max:900'],
        ],[
            'name.required' => 'En nombre es obligatorio',
            'name.string' => 'Nombre debe ser un solo texto',
            'name.min' => 'Nombre debe tener un mínimo de 3 caracteres',
            'name.max' => 'Nombre debe tener maximo 45 caracteres',
            'description.required' => 'En nombre es obligatorio',
            'description.string' => 'Nombre debe ser un solo texto',
            'description.min' => 'Nombre debe tener un mínimo de 3 caracteres',
            'description.max' => 'Nombre debe tener maximo 255 caracteres',
            'price.required' => 'El precio es obligatoria',
            'price.numeric' => 'El precio debe ser un número y no contener decimales.',
        ]);


        // https://laravel.com/docs/9.x/eloquent#inserts
        Servicio::create($servicio_data);
        // Invoca el controlador padre para la respuesta json
        return $this->sendResponse(message: 'Servicio stored successfully');
    }

    // Mostrar la información del pabellon
    public function show(Servicio $servicio)
    {
        // Invoca el controlador padre para la respuesta json
        // El moldeo de la información por el Resource
        return $this->sendResponse(message: 'Servicio details', result: [
            'servicio' => new ServicioResource($servicio)
        ]);
    }

    // Actualizar la información del pabellon
    public function update(Request $request, Servicio $servicio)
    {
         // Validación de los datos de entrada
         // Crear un array asociativo de clave y valor
        $servicio_data = $request -> validate([
            'name' => ['required', 'string', 'min:3', 'max:45'],
            'description' => ['required', 'string', 'min:3', 'max:255'],
            'price' => ['required', 'numeric',  'min:1', 'max:1000'],
        ],[
            'name.required' => 'En nombre es obligatorio',
            'name.string' => 'Nombre debe ser un solo texto',
            'name.min' => 'Nombre debe tener un mínimo de 3 caracteres',
            'name.max' => 'Nombre debe tener maximo 45 caracteres',
            'description.required' => 'En nombre es obligatorio',
            'description.string' => 'Nombre debe ser un solo texto',
            'description.min' => 'Nombre debe tener un mínimo de 3 caracteres',
            'description.max' => 'Nombre debe tener maximo 255 caracteres',
            'price.required' => 'El precio es obligatoria',
            'price.numeric' => 'El precio debe ser un número y no contener decimales.',
        ]);

        // Actaliza los datos del pabellon
        $servicio->fill($servicio_data)->save();

        // Invoca el controlador padre para la respuesta json
        return $this->sendResponse(message: 'Servicio updated successfully');
    }

    // Dar de baja a un pabellon
    public function destroy(Servicio $servicio)
    {
        // Obtener el estado del pabellon
        $servicio_state = $servicio->state;

        // Almacenar un string con el mensaje
        $message = $servicio_state ? 'inactivated' : 'activated';

        // Verifica que el pabellon tiene guardias
        if ($servicio->users->isNotEmpty())
        {
            return $this->sendResponse(message: 'This servicio has assigned guard(s)', code: 403);
        }
        // Cambia el estado del pabellon
        $servicio->state = !$servicio_state;

        // Guardar en la BDD
        $servicio->save();

        // Invoca el controlador padre para la respuesta json
        return $this->sendResponse(message: "Servicio $message successfully");
    }
}


