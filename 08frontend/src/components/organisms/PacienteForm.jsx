import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import DatePicker from "react-datepicker";
import moment from "moment";
import { errorMessage } from "../../utils/parser";

export const PacienteForm = ({ paciente }) => {
  const navigate = useNavigate();
  const [date, setDate] = useState();
  const [form, setForm] = useState({
    name: paciente?.name ?? "",
    cedula: paciente?.cedula ?? "",
    sex: paciente?.sex ?? "",
    fechan: paciente?.fechan ?? "",
    personal_phone: paciente?.personal_phone ?? "",
    address: paciente?.address ?? "",
    alergias: paciente?.alergias ?? "",
    email: paciente?.email ?? "",
  });
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (paciente?.id) {
        await axios.post(
          `https://base.devitamedical.com/api/v1/paciente/${paciente.id}/update`,
          { ...form },
          { headers: { accept: "application/json", authorization: token } }
        );
      } else {
        await axios.post(
          `https://base.devitamedical.com/api/v1/paciente/create`,
          { ...form },
          { headers: { accept: "application/json", authorization: token } }
        );
      }
      navigate("/pacientes");
    } catch (error) {
      console.log(error);
      alert(errorMessage(error));
    }
  };

  //sync date
  useEffect(() => {
    if (!date) return;

    setForm((currentForm) => {
      return {
        ...currentForm,
        fechan: moment(date).format("YYYY-MM-DD HH:mm:ss"),
      };
    });
  }, [date]);

  useEffect(() => {
    if (!paciente) return;
    setDate(new Date(paciente.fechan));
  }, [paciente]);

  return (
    <div className="bg-white mt-10 px-5 py-10 rounded-lg shadow-lg md:w-3/4 mx-auto">
      <h1 className="text-gray-800 font-bold uppercase text-center text-xl mb-4">
        {paciente?.id ? "Editar" : "Crear"} Paciente
      </h1>

      <form onSubmit={handleSubmit}>
        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 mb-6 w-full group">
            <input
              type="text"
              name="name"
              id="name"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-1 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={form.name}
              onChange={handleChange}
            />
            <label
              for="floating_first_name"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Nombre Completo
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
            for="floating_phone"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Celular (0911112222)
          </label>
        </div>

        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 mb-6 w-full group">
            <FloatingLabel controlId="sex" label="Sexo">
              <Form.Select
                {...(paciente?.sex && { defaultValue: paciente.sex })}
                name="sex"
                onChange={handleChange}
                laceholder="Sexo"
                aria-label="Default select example"
              >
                <option>--</option>
                <option key={"Masculino"} value={"Masculino"}>
                  Masculino
                </option>
                <option key={"Femenino"} value={"Femenino"}>
                  Femenino
                </option>
              </Form.Select>
            </FloatingLabel>
          </div>

          <div class="relative z-0 mb-6 w-full group">
            <input
              type="text"
              name="alergias"
              id="alergias"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-1 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={form.alergias}
              onChange={handleChange}
            />
            <label
              for="floating_last_name"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Alergias (Ninguna)
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
            Email address
          </label>
        </div>
        <input
          type="submit"
          className="bg-sky-800 w-full p-3 text-white uppercase font-bold rounded-lg hover:bg-sky-900 cursor-pointer transition-all"
          value={paciente?.id ? "Actualizar" : "Guardar"}
        />
      </form>
    </div>
  );
};
