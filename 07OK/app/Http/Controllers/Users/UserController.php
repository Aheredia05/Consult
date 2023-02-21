<?php

namespace App\Http\Controllers\Users;

use App\Helpers\PasswordHelper;
use App\Http\Controllers\Controller;
use App\Http\Resources\ProfileResource;
use App\Http\Resources\UserResource;
use App\Models\Role;
use App\Models\Servicio;
use App\Models\User;
use App\Notifications\UserStoredNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController extends Controller
{

    // Atributo para controlar los roles
    protected string $role_slug;

    // Atributo para enviar notificaciones
    protected bool $can_receive_notifications;


    // Creación del constructor
    public function __construct(string $role_slug, bool $can_receive_notifications = false)
    {
        // https://laravel.com/docs/9.x/controllers#controller-middleware
        // Verifica si el usuario esta activo para hacer el update
        $this->middleware('is.user.active')->only('update');

        // Verifica dependiendo del rol para acceder a los metodos del controlador
        // https://laravel.com/docs/9.x/middleware#middleware-parameters
        $this->middleware("verify.user.role:$role_slug")->only('show', 'update', 'destroy');

        // Inicializar el atributo de la clase
        $this->role_slug = $role_slug;

        // Inicializar el atributo de la clase
        $this->can_receive_notifications = $can_receive_notifications;
    }
    
    // Métodos del Controlador
    // Listar todos los usuarios
    public function index()
    {
        // Obtener el rol del usuario
        $role = Role::where('slug', $this->role_slug)->first();
        // Obtener los usuarios en base a la relación
        $users = $role->users;
        // Invoca el controlador padre para la respuesta json
        return $this->sendResponse(message: 'User list generated successfully', result: [
            'users' => ProfileResource::collection($users),
        ]);
    }

    public function list(){
        // Obtener el rol del usuario
       
        $servicio = Servicio::where('name', $this->name)->first();
        // Obtener los usuarios en base a la relación
        $users = $servicio->users;
        // Invoca el controlador padre para la respuesta json
        return $this->sendResponse(message: 'User list generated successfully', result: [
            'users' => UserResource::collection($users),
        ]);
    }

    // Crear un nuevo usuario
    public function store(Request $request)
    {
         // Validación de los datos de entrada
        $request -> validate([
            'first_name' => ['required', 'string', 'min:3', 'max:35'],
            'last_name' => ['required', 'string', 'min:3', 'max:35'],
            'username' => ['required', 'string', 'min:3', 'max:20', 'unique:users'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'personal_phone' => ['required', 'numeric', 'digits:10'],
            'home_phone' => ['required', 'numeric', 'digits:9'],
            'address' => ['required', 'string', 'min:5', 'max:50'],
            'servicio' => ['required', 'numeric', 'exists:servicios,id'],
        ], [
            'personal_phone.required' => 'Número Celular obligatorio',
            'personal_phone.numeric' => 'Número Celular debe ser un número',
            'personal_phone.digits' => 'Número personal debe tener 9 dígitos',
            'home_phone.required' => 'Número de casa obligatorio',
            'home_phone.numeric' => 'Número de casa debe ser un número',
            'home_phone.digits' => 'Número de casa debe teber exactamente 9 dígitos.',
            'username.required' => 'UserName Obligatorio',
            'username.min' => 'Username debe tener minimo 3 letras',
            'username.max' => 'El nombre de usuario no debe tener más de 20 caracteres.', 
            'username.unique' => 'El nombre de usuario ya esta en uso.',
        ]);

        $bodyParams = $request->all();

        // Obtiene el rol del usuario
        $role = Role::where('slug', $this->role_slug)->first();
        // Crear una instancia del usuario
        $user = new User($bodyParams);
        // Añadir servicio
        $user->servicio_id = $bodyParams["servicio"];
        // Crear el password
        $temp_password = PasswordHelper::generatePassword();
        // Se setea el paasword al usuario
        $user->password = Hash::make($temp_password);
        // Se almacena el usuario en la BDD
        $role->users()->save($user);
        // Se establece si puede recibir notificaión
        if ($this->can_receive_notifications)
        {
            // Se procede a invocar la función para en envío de una notificación
            $this->sendNotifications($user, $temp_password);
        }
        // Invoca el controlador padre para la respuesta json
        return $this->sendResponse(message: 'User stored successfully');
    }




    // Mostrar la información personal del usuario
    public function show(User $user)
    {
        // Invoca el controlador padre para la respuesta json
        return $this->sendResponse(message: 'User profile', result: [
            'user' => new ProfileResource($user),
        ]);
    }




    // Actualizar el usuario
    public function update(Request $request, User $user)
    {
         // Validación de los datos de entrada
        $user_data=$request -> validate([
            'first_name' => ['required', 'string', 'min:3', 'max:35'],
            'last_name' => ['required', 'string',  'min:3', 'max:35'],
            'username' => ['required', 'string',  'min:3', 'max:20',
                Rule::unique('users')->ignore($user), 
            ],
            'email' => ['required', 'string', 'email', 'max:255',
                Rule::unique('users')->ignore($user),
            ],
            'personal_phone' => ['required', 'numeric', 'digits:10'],
            'home_phone' => ['required', 'numeric', 'digits:9'],
            'address' => ['required', 'string', 'min:5', 'max:50'],
            'servicio' => ['required', 'numeric', 'exists:servicios,id'],
        ],[
            'personal_phone.required' => 'Numero personal obligatorio',
            'personal_phone.numeric' => 'Numero personal debe ser un número',
            'personal_phone.digits' => 'Numero personal debe tener 9 dígitos',
            'home_phone.required' => 'Numero de casa obligatorio',
            'home_phone.numeric' => 'Numero de casa debe ser un número',
            'home_phone.digits' => 'Numero de casa debe teber exactamente 9 dígitos.',
            'username.required' => 'UserName Obligatorio',
            'username.min' => 'Username debe tener minimo 3 letras',
            'username.max' => 'El nombre de usuario no debe tener más de 20 caracteres.',
            'username.unique' => 'El nombre de usuario ya esta en uso.',
        ]);

        $bodyParams = $request->all();

        // Obtiene el email del usuario
        $old_user_email = $user->email;
        // Actaliza los datos del usuario
        $user->fill($user_data);
        // Añadir servicio
        $user->servicio_id = $bodyParams["servicio"];
        // Guardar en la BDD
        $user->save();
        // Mandar la notificación si en el caso del que el correo sea diferente
        if ($this->can_receive_notifications && $old_user_email !== $user->email)
        {
            $temp_password = PasswordHelper::generatePassword();
            $user->password = Hash::make($temp_password);
            $user->save();
            $this->sendNotifications($user, $temp_password);
        }
        // Invoca el controlador padre para la respuesta json
        return $this->sendResponse(message: 'User updated successfully');
    }



    // Dar de baja a un usuario
    public function destroy(User $user)
    {
        // Obtiene el estado del usuario
        $user_state = $user->state;
        // Crear un mensaje en base al estado del usuario
        $message = $user_state ? 'inactivated' : 'activated';
        // Cambiar el estado
        $user->state = !$user_state;
        // Guardar en la BDD
        $user->save();
        // Invoca el controlador padre para la respuesta json
        return $this->sendResponse(message: "User $message successfully");
    }




    // Función para enviar notificaciones para el usuario registrado
    private function sendNotifications(User $user, string $temp_password)
    {
        // https://laravel.com/docs/9.x/notifications#sending-notifications
        $user->notify(
            new UserStoredNotification(
                user_name: $user->getFullName(),
                role_name: $user->role->name,
                temp_password: $temp_password
            )
        );
    }
}
