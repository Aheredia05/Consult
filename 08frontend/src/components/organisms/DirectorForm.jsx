import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import DatePicker from "react-datepicker";
import moment from "moment";
import { getRoles } from "../../lib/directors";
import { errorMessage } from "../../utils/parser";

export const DirectorForm = ({ director }) => {
  const navigate = useNavigate();
  const [date, setDate] = useState();
  const [error, setError] = useState(false);
  const [form, setForm] = useState({
    first_name: director?.first_name ?? "",
    last_name: director?.last_name ?? "",
    username: director?.username ?? "",
    cedula: director?.cedula ?? "",
    birthdate: director?.birthdate ?? "",
    email: director?.email ?? "",
    password: director?.password ?? "",
    password_confirmation: director?.password_confirmation ?? "",
    personal_phone: director?.personal_phone ?? "",
    home_phone: director?.home_phone ?? "",
    address: director?.address ?? "",
  });
  const token = localStorage.getItem("token");
  const [roles, setRoles] = useState(null);

  useEffect(() => {
    (async () => {
      const roles = await getRoles();
      if (!roles) return;
      setRoles(roles);
    })();
  }, []);

  useEffect(() => {
    if (!roles) return;
    if (director?.role) {
      console.log("director.role", director.role);
      setForm((currentForm) => {
        return { ...currentForm, role: director.role };
      });
    }
  }, [director, roles]);

  const handleChange = (e) => {
    setForm((currentForm) => {
      return {
        ...currentForm,
        [e.target.name]: e.target.value,
      };
    });
  };

  const [servicios, setServicios] = useState(null);

  const getServicios = async () => {
    try {
      const response = await axios.get(
        "https://base.devitamedical.com/api/v1/servicio",
        { headers: { accept: "application/json", authorization: token } }
      );
      console.log(response.data.data.servicios);
      setServicios(response.data.data.servicios);
    } catch (error) {
      console.log(error);
    }
  };

  // eslint-disable-next-line no-undef
  useEffect(() => {
    getServicios();
  }, []);

  //inicializa servicio actual en caso de que se este editando
  useEffect(() => {
    if (director?.servicio?.id) {
      setForm((currentForm) => {
        return { ...currentForm, servicio: director.servicio.id };
      });
    }
  }, [director]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (director?.id) {
        await axios.post(
          `https://base.devitamedical.com/api/v1/director/${director.id}/update`,
          { ...form },
          { headers: { accept: "application/json", authorization: token } }
        );
      } else {
        await axios.post(
          `https://base.devitamedical.com/api/v1/director/create`,
          { ...form },
          { headers: { accept: "application/json", authorization: token } }
        );
      }
      navigate("/directors");
    } catch (error) {
      alert(errorMessage(error));
    }
  };

//sync date
useEffect(() => {
  if (!date) return;

  setForm((currentForm) => {
    return {
      ...currentForm,
      birthdate: moment(date).format("YYYY-MM-DD HH:mm:ss"),
    };
  });
}, [date]);

  useEffect(() => {
    if (!director) return;
    setDate(new Date(director.birthdate));
  }, [director]);


  return (
    
    <div className="bg-white mt-10 px-5 py-10 rounded-lg shadow-lg md:w-3/4 mx-auto">
       <p className='mt-3'> En este módulo es necesario asignar un servicio y un rol de usuario, en caso de crearse una nueva cuenta tendría como contraseña: secretDev123. Por este motivo es obligatorio que el nuevo usuario cambie la contraseña.</p>
     
      <form onSubmit={handleSubmit}>
      <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 mb-6 w-full group">
            <input
              type="text"
              name="first_name"
              id="first_name"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-1 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={form.first_name}
              onChange={handleChange}
            />
            <label
              for="floating_first_name"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Nombres
            </label>
          </div>

          <div class="relative z-0 mb-6 w-full group">
            <input
              type="text"
              name="last_name"
              id="last_name"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-1 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={form.last_name}
              onChange={handleChange}
            />
            <label
              for="floating_last_name"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Apellidos
            </label>
          </div>

        </div>


        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="grid md:grid-cols-2 md:gap-6">
            <DatePicker
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-1 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              selected={date}
              showTimeSelect
              placeholderText="Fecha y Hora"
              onChange={(date) => {
                setDate(date);
              }}
            />
          </div>

          <div class="relative z-0 mb-6 w-full group">
            <input
              type="tel"
              name="cedula"
              id="cedula"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-1 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={form.cedula}
              onChange={handleChange}
            />
            <label
              for="floating_phone"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Cedula (CI)
            </label>
          </div>
        </div>


        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 mb-6 w-full group">
            <input
              type="text"
              name="username"
              id="username"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-1 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={form.username}
              onChange={handleChange}
            />
            <label
              for="floating_first_name"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              username
            </label>
          </div>

          

        </div>
        

        <div class="relative z-0 mb-6 w-full group">
          <input
            type="email"
            name="email"
            id="email"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-1 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={form.email}
            onChange={handleChange}
          />
          <label
            for="floating_email"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email
          </label>
        </div>


        <div class="grid md:grid-cols-2 md:gap-6">
        <div class="relative z-0 mb-6 w-full group">

<FloatingLabel controlId="servicio" label="Especialidad">
   <Form.Select
     name="servicio"
     value={form.servicio}
     onChange={handleChange}
     disabled={!servicios}
     laceholder="Especialidad"
     aria-label="Default select example"
   >
     <option value={"unset"}>--</option>
     {servicios &&
       servicios.map((servicio) => {
         if (servicio.state==1)
           {
             return (
               <option key={servicio.id} value={servicio.id}>
                 {servicio.name}
               </option>
           )
           }
       })}
   </Form.Select>
 </FloatingLabel>
        </div>

        <div class="relative z-0 mb-6 w-full group">
          <FloatingLabel controlId="role" label="Rol">
            <Form.Select
              name="role"
              value={form.role}
              onChange={handleChange}
              disabled={!roles}
              placeholder="Rol"
              aria-label="Default select example"
            >
              <option value={null}>--</option>
              {roles &&
                roles.map((role) => {
                  return (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  );
                })}
            </Form.Select>
          </FloatingLabel>
        </div>
        </div>


        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 mb-6 w-full group">
            <input
              type="tel"
              name="personal_phone"
              id="personal_phone"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-1 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={form.personal_phone}
              onChange={handleChange}
            />
            <label
              for="floating_first_name"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Número Celular
            </label>
          </div>

          <div class="relative z-0 mb-6 w-full group">
            <input
              type="tel"
              name="home_phone"
              id="home_phone"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-1 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={form.home_phone}
              onChange={handleChange}
            />
            <label
              for="floating_last_name"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Número de Casa
            </label>
          </div>
        </div>


        <div class="relative z-0 mb-6 w-full group">
          <input
            type="text"
            name="address"
            id="address"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-1 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={form.address}
            onChange={handleChange}
          />
          <label
            for="floating_last_name"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Dirección
          </label>
        </div>

        <input
          type="submit"
          className="bg-sky-800 w-full p-3 text-white uppercase font-bold rounded-lg hover:bg-sky-900 cursor-pointer transition-all"
          value={director?.id ? "Actualizar" : "Guardar"}
        />
      </form>
    </div>
  );
};
