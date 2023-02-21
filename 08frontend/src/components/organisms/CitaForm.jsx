import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getServicios } from "../../lib/servicios";
import { getPacientes } from "../../lib/pacientes";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import DatePicker from "react-datepicker";

import { errorMessage } from "../../utils/parser";

import "react-datepicker/dist/react-datepicker.css";

import moment from "moment";

export const CitaForm = ({ cita }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [form, setForm] = useState({
    name: cita?.name ?? "",
    fechac: cita?.fechac ?? "",
    //  user: cita?.user.name ?? "",
    //especialidad: cita?.especialidad.especialidad ?? "",
    description: cita?.description ?? "",
    sintomas: cita?.sintomas ?? "",
    diagnostico: cita?.diagnostico ?? "",
    prescripcion: cita?.prescripcion ?? "",
    observaciones: cita?.observaciones ?? "",
  });
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setForm((currentForm) => {
      return {
        ...currentForm,
        [e.target.name]: e.target.value,
      };
    });
  };

  const [servicios, setServicios] = useState(null);
  const [pacientes, setPacientes] = useState(null);
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(null);
  const [date, setDate] = useState();

  //sincronizar usuarios que proveen el servicio
  useEffect(() => {
    (async () => {
      setLoading(true);
      const servicios = await getServicios();
      setLoading(false);
      if (servicios) {
        setServicios(servicios);
      }
    })();
  }, []);

  useEffect(() => {
    console.log("form", form);
    if (!form) {
      setUsers(null);
      return;
    }
    if (!form.servicio) {
      setUsers(null);
      return;
    }
    if (!servicios) {
      setUsers(null);
      return;
    }
    if (form.servicio === "unset") {
      setUsers(null);
      return;
    }
    const currentService = servicios.find((servicio) => {
      return Number(servicio.id) === Number(form.servicio);
    });
    if (!currentService) {
      setUsers(null);
      return;
    }

    if (currentService.users.length === 0) {
      setUsers(null);
      return;
    }
    setUsers(currentService.users);
  }, [form, servicios]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const pacientes = await getPacientes();
      setLoading(false);
      if (pacientes) {
        setPacientes(pacientes);
      }
    })();
  }, []);

  //inicializa servicio
  useEffect(() => {
    if (cita?.user?.servicio) {
      setForm((currentForm) => {
        return { ...currentForm, servicio: cita.user.servicio.id };
      });
    }
  }, [cita]);

  //inicializa medico/usuario
  useEffect(() => {
    if (!servicios) return;
    if (cita?.user) {
      setForm((currentForm) => {
        return { ...currentForm, user: cita.user.id };
      });
    }
  }, [cita, servicios]);

  //inicializa paciente
  useEffect(() => {
    if (cita?.paciente?.id) {
      setForm((currentForm) => {
        return { ...currentForm, paciente: cita.paciente.id };
      });
    }
  }, [cita, pacientes]);

  //inicializa date
  useEffect(() => {
    if (!cita) return;
    setDate(new Date(cita.fechac));
  }, [cita]);

  //sync date
  useEffect(() => {
    if (!date) return;

    setForm((currentForm) => {
      return {
        ...currentForm,
        fechac: moment(date).format("YYYY-MM-DD HH:mm:ss"),
      };
    });
  }, [date]);

  useEffect(() => {
    console.log("form", form);
  }, [date]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form", form);
    try {
      if (cita?.id) {
        await axios.post(
          `https://base.devitamedical.com/api/v1/cita/${cita.id}/update`,
          { ...form },
          { headers: { accept: "application/json", authorization: token } }
        );
      } else {
        await axios.post(
          `https://base.devitamedical.com/api/v1/cita/create`,
          { ...form },
          { headers: { accept: "application/json", authorization: token } }
        );
      }
      navigate("/citas");
    } catch (error) {
      console.log(error);
      alert(errorMessage(error));
    }
  };

  return (
    <div className="bg-white mt-10 px-5 py-10 rounded-lg shadow-lg md:w-3/4 mx-auto">
      <h1 className="text-gray-800 font-bold uppercase text-center text-xl mb-4">
        {cita?.id ? "Editar" : "Crear"} CITA
      </h1>

      {error && (
        <p className="text-red-700 font-semibold text-xl">
          Todos los campos son obligatorios
        </p>
      )}

      <form onSubmit={handleSubmit}>
       
        <div class="relative z-0 mb-6 w-full group">
          <FloatingLabel controlId="paciente" label="Paciente">
            <Form.Select
              value={form.paciente}
              name="paciente"
              onChange={handleChange}
              disabled={loading}
              laceholder="Paciente"
              aria-label="Default select example"
            >
              <option value={"unset"}>--</option>
              {pacientes &&
                pacientes.map((paciente) => {
                
                        return (
                          <option key={paciente.id} value={Number(paciente.id)}>
                            {paciente.name}
                          </option>
                    )
                    
                 
                })}
            </Form.Select>
          </FloatingLabel>
        </div>

        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 mb-6 w-full group">
            <FloatingLabel controlId="servicio" label="Especialidad">
              <Form.Select
                name="servicio"
                value={form.servicio}
                onChange={handleChange}
                disabled={loading}
                placeholder="Especialidad"
                aria-label="Default select example"
              >
                <option value={"unset"}>--</option>
                {servicios &&
                  servicios.map((servicio) => {
                    
                      return(
                      <option key={servicio.id} value={servicio.id}>
                        {servicio.name}
                      </option>
                    )
                    
                  })}
              </Form.Select>
            </FloatingLabel>
          </div>
          <div class="relative z-0 mb-6 w-full group">
            <FloatingLabel controlId="user" label="Medico">
              <Form.Select
                value={form.user}
                name="user"
                onChange={handleChange}
                disabled={loading || !users}
                aria-label="Default select example"
              >
                <option value={"unset"}>
                  {users ? "Seleccionar" : "Seleccione una especialidad"}
                </option>
                {users &&
                  users.map((user) => {
                  
                      return (
                        <option key={user.id} value={user.id}>
                          {user.full_name}
                        </option>
                    )
                    
                  })}
              </Form.Select>
            </FloatingLabel>
          </div>
        </div>

        <div class="grid md:grid-cols-2 md:gap-6">
          <DatePicker
          customInput={
            <div>
              {form?.fechac ? (
                <>{form.fechac}</>
              ) : (
                <div style={{ color: "gray" }}>Fecha y Hora</div>
              )}
            </div>
          }
            selected={date}
            showTimeSelect
            placeholderText="Fecha y Hora"
            onChange={(date) => {
              setDate(date);
            }}
          />
        </div>
<br />
        <div class="relative z-0 mb-6 w-full group">
          <input
            type="text"
            name="description"
            id="description"
            class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={form.description}
            onChange={handleChange}
            placeholder="Descripción"
            required
          />
        </div>
        
        <p></p>
        <input
          type="submit"
          className="bg-sky-800 w-full p-3 text-white uppercase font-bold rounded-lg hover:bg-sky-900 cursor-pointer transition-all"
          value={cita?.id ? "Actualizar" : "Guardar"}
        />
<br />
<hr />
        <h1 className="text-gray-800 font-bold uppercase text-center text-xl mb-4">
          {cita?.id ? "Editar" : "Crear"} HISTORIA MEDICA
        </h1>
  

        <label
          for="message"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
        >
          Signos y Síntomas
        </label>
        <textarea
          id="sintomas"
          name="sintomas"
          type="text"
          rows="4"
          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={form.sintomas}
          onChange={handleChange}
          placeholder="Escriba los Signos y Síntomas..."
        ></textarea>

        <label
          for="message"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
        >
          Diagnóstico
        </label>
        <textarea
          id="diagnostico"
          name="diagnostico"
          type="text"
          rows="4"
          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={form.diagnostico}
          onChange={handleChange}
          placeholder="Escriba el Diagnostico..."
        ></textarea>

        <label
          for="message"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
        >
          Prescripcion
        </label>
        <textarea
          id="prescripcion"
          name="prescripcion"
          type="text"
          rows="4"
          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={form.prescripcion}
          onChange={handleChange}
          placeholder="Escriba la Prescripcion o Receta..."
        ></textarea>

        <label
          for="message"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
        >
          Observaciones
        </label>
        <textarea
          id="observaciones"
          name="observaciones"
          type="text"
          rows="4"
          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={form.observaciones}
          onChange={handleChange}
          placeholder="Escriba las observaciones (opcional)..."
        ></textarea>
        
        <p></p>
        <input
          type="submit"
          className="bg-sky-800 w-full p-3 text-white uppercase font-bold rounded-lg hover:bg-sky-900 cursor-pointer transition-all"
          value={cita?.id ? "Actualizar" : "Guardar"}
        />
      </form>
    </div>
  );
};
