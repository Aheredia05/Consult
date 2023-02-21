import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { errorMessage } from "../../utils/parser";

export const ServicioForm = ({ servicio }) => {
  const navigate = useNavigate();

  const [error, setError] = useState(false);

  const [form, setForm] = useState({
    name: servicio?.name ?? "",
    description: servicio?.description ?? "",
    price: servicio?.price ?? "",
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

    if (Object.values(form).includes("")) {
      console.log("error");
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2500);
      return;
    }

    try {
      if (servicio?.id) {
        await axios.post(
          `https://base.devitamedical.com/api/v1/servicio/${servicio.id}/update`,
          { ...form },
          { headers: { accept: "application/json", authorization: token } }
        );
      } else {
        await axios.post(
          `https://base.devitamedical.com/api/v1/servicio/create`,
          { ...form },
          { headers: { accept: "application/json", authorization: token } }
        );
      }
      navigate("/servicios");
    } catch (error) {
      console.log(error);
      alert(errorMessage(error));
    }
  };

  return (
    <div className="bg-white mt-10 px-5 py-10 rounded-lg shadow-lg md:w-3/4 mx-auto">
      <h1 className="text-gray-800 font-bold uppercase text-center text-xl mb-4">
        {servicio?.id ? "Editar" : "Crear"} Servicio
      </h1>

      {error && (
        <p className="text-red-700 font-semibold text-xl">
          Todos los campos son obligatorios
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div class="relative z-0 mb-6 w-full group">
          <input
            type="text"
            name="name"
            id="name"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-1 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={form.name}
            onChange={handleChange}
            required
          />
          <label
            for="floating_last_name"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Especialidad{" "}
          </label>
        </div>

        <div class="relative z-0 mb-6 w-full group">
          <input
            type="text"
            name="description"
            id="description"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-1 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={form.description}
            onChange={handleChange}
            required
          />
          <label
            for="floating_email"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Descripción
          </label>
        </div>

        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 mb-6 w-full group">
            <input
              type="text"
              name="price"
              id="price"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-1 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value= {form.price}
              onChange={handleChange}
              required
            />
            <label
              for="floating_phone"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Precio (10) Sin decimales
            </label>
          </div>
        </div>
        <p></p>
        <input
          type="submit"
          className="bg-sky-800 w-full p-3 text-white uppercase font-bold rounded-lg hover:bg-sky-900 cursor-pointer transition-all"
          value={servicio?.id ? "Actualizar" : "Guardar"}
        />
      </form>
    </div>
  );
};
