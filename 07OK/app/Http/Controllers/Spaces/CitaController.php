<?php

namespace App\Http\Controllers\Spaces;

use App\Http\Controllers\Controller;
use App\Http\Resources\CitaResource;
use App\Http\Resources\SpaceResource;
use App\Models\Cita;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class CitaController extends Controller
{

    // Creación del constructor
    public function __construct()
    {
        // Uso del gate para que pueda gestionar las cárceles a partir del rol establecido
        $this->middleware('can:manage-citas');
    }

    // Métodos del Controlador
    // Listar las cárceles
    public function index()
    {
        // Obtener la colección de cárceles
        $citas = Cita::orderBy('fechac', 'asc')->get();

        // Invoca el controlador padre para la respuesta json
        // El moldeo de la información por el Resource
        return $this->sendResponse(message: 'Cita list generated successfully', result: [
            'citas' => CitaResource::collection($citas)
        ]);
    }

    // Crear una nueva cita
    public function store(Request $request)
    {
        $bodyParams = $request->all();

        $start_time1 = Carbon::createFromFormat('Y-m-d H:i:s', $bodyParams["fechac"]);
        $end_time1 = Carbon::createFromFormat('Y-m-d H:i:s', $bodyParams["fechac"])->addMinutes(30);
        $citas = Cita::query()->where('user_id',$bodyParams["user"])->get();
        $counter = 0;

        foreach ($citas as $item) {
            $start_time2 = Carbon::createFromFormat('Y-m-d H:i:s', $item->fechac);
            $end_time2 = Carbon::createFromFormat('Y-m-d H:i:s', $item->fechac)->addMinutes(30);
            if ($start_time1->between($start_time2, $end_time2) || $end_time1->between($start_time2, $end_time2) ||
                ($start_time1->lt($start_time2) && $end_time1->gt($end_time2))) {
                // Time intervals are overlapping
                return response()->json(['error' => "Médico seleccionado no disponible en la fecha seleccionada"], 400);
            }
            $counter++;
        }


         // Validación de los datos de entrada
         // Crear un array asociativo de clave y valor
        $cita_data = $request -> validate([
            'fechac' => ['nullable', 'string', 'date_format:Y-m-d H:i:s'],
            'description' => ['nullable', 'string', 'min:3', 'max:255'],
            'sintomas' => ['nullable', 'string', 'min:3', 'max:255'],
            'diagnostico' => ['nullable', 'string', 'min:3', 'max:255'],
            'prescripcion' => ['nullable', 'string', 'min:3', 'max:255'],
            'observaciones' => ['nullable', 'string', 'min:3', 'max:255'],
            'paciente' => ['required', 'numeric', 'exists:pacientes,id'],
            'user' => ['required', 'numeric', 'exists:users,id'],
        ]);

        // https://laravel.com/docs/9.x/eloquent#inserts
        $cita = new Cita();
        $cita->fill($cita_data);
        $cita->user_id = $bodyParams["user"];
        $cita->paciente_id = $bodyParams["paciente"];
        $cita->save();

        // Invoca el controlador padre para la respuesta json
        return $this->sendResponse(message: 'Cita stored successfully');
    }

    // Mostrar la información de la cárcel
    public function show(Cita $cita)
    {
        // Invoca el controlador padre para la respuesta json
        // El moldeo de la información por el Resource
        return $this->sendResponse(message: 'Cita details', result: [
            'cita' => new CitaResource($cita)
        ]);
    }

    // Actualizar la información de la cárcel
    public function update(Request $request, Cita $cita)
    {
        $bodyParams = $request->all();

        $start_time1 = Carbon::createFromFormat('Y-m-d H:i:s', $bodyParams["fechac"]);
        $end_time1 = Carbon::createFromFormat('Y-m-d H:i:s', $bodyParams["fechac"])->addMinutes(30);

        $citas = Cita::query()->where('user_id',$bodyParams["user"])->where('id', '!=', $cita->id)->get();

        $counter = 0;

        $medico = User::find($bodyParams["user"]);

        $f = $start_time1->format('H:i');
        $e = $end_time1->format('H:i');

        foreach ($citas as $item) {
            $start_time2 = Carbon::createFromFormat('Y-m-d H:i:s', $item->fechac)->subMinutes(1);
            $end_time2 = Carbon::createFromFormat('Y-m-d H:i:s', $item->fechac)->addMinutes(29);
            if ($start_time1->between($start_time2, $end_time2) || $end_time1->between($start_time2, $end_time2) ||
                ($start_time1->lt($start_time2) && $end_time1->gt($end_time2))) {
                // Time intervals are overlapping
                return response()->json(['error' => "Médico $medico->first_name $medico->last_name no disponible en el horario $f - $e"], 400);
            }
            $counter++;
        }

         // Validación de los datos de entrada
         // Crear un array asociativo de clave y valor
        $cita_data = $request -> validate([


            'fechac' => ['nullable', 'string', 'date_format:Y-m-d H:i:s'],
            'description' => ['nullable', 'string', 'min:3', 'max:255'],
            'sintomas' => ['nullable', 'string', 'min:3', 'max:255'],
            'diagnostico' => ['nullable', 'string', 'min:3', 'max:255'],
            'prescripcion' => ['nullable', 'string', 'min:3', 'max:255'],
            'observaciones' => ['nullable', 'string', 'min:3', 'max:255'],
            'paciente' => ['required', 'numeric', 'exists:pacientes,id'],
            'user' => ['required', 'numeric', 'exists:users,id'],
        ]);

        // Actaliza los datos de la cárcel
        $cita->fill($cita_data);
        $cita->user_id = $bodyParams["user"];
        $cita->paciente_id = $bodyParams["paciente"];
        $cita->save();
        // Invoca el controlador padre para la respuesta json
        return $this->sendResponse(message: 'Cita updated successfully');
    }

    // Dar de baja a una cárcel
    public function destroy(Cita $cita)
    {
        // Obtener el estado de la carcel
        $cita_state = $cita->state;

        // Almacenar un string con el mensaje
        $message = $cita_state ? 'inactivated' : 'activated';

        // Verifica que la carcel tiene prisioneros
        if ($cita->users->isNotEmpty())
        {
            // Invoca el controlador padre para la respuesta json
            return $this->sendResponse(message: 'This cita has assigned prisoner(s)', code: 403);
        }

        // Cambia el estado de la cárcel
        $cita->state = !$cita_state;

        // Guardar en la BDD
        $cita->save();

        // Invoca el controlador padre para la respuesta json
        return $this->sendResponse(message: "Cita $message successfully");
    }

    public function remove(Cita $cita)
    {
        $cita->delete();
    }

}


