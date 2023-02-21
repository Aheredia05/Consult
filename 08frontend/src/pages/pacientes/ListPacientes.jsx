import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const ListPacientes = () => {
  const navigate = useNavigate();
  const [pacientes, setPacientes] = useState([]);
  const [tablapacientes, setTablaPacientes] = useState([]); // AGREGAR datos estaticos
  const [busqueda, setBusqueda]= useState(""); /// busqueda
  const token = localStorage.getItem("token");

  const getPacientes = async () => {
    try {
      const response = await axios.get(
        "https://base.devitamedical.com/api/v1/paciente",
        { headers: { accept: "application/json", authorization: token } }
      );
      console.log(response.data.data.pacientes);
      setPacientes(response.data.data.pacientes);
      setTablaPacientes(response.data.data.pacientes);  //agregar tabla pacientes 
    } catch (error) {
      console.log(error);
    }
  };

  const deletePaciente = async (id) => {
    try {
      console.warn(id);
      // eslint-disable-next-line no-restricted-globals
      const confirmation = confirm("Are you sure?");
      if (confirmation) {
        await axios.get(`https://base.devitamedical.com/api/v1/paciente/${id}/destroy`, {
          headers: { accept: "application/json", authorization: token },
        });
        await getPacientes();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //busqueda
const handleChange=e=>{
  setBusqueda(e.target.value); 
  filtrar(e.target.value);
}

const filtrar=(terminoBusqueda)=>{
  var resultadosBusqueda=tablapacientes.filter((elemento)=>{
    if(elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
    || elemento.cedula.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
    ){
      return elemento;
    }
  });
  setPacientes(resultadosBusqueda);
}
//busqueda

  useEffect(() => {
    getPacientes();
  }, []);

  return (
    <div>
      <h1 className="font-black text-4xl text-sky-900">Pacientes</h1>
      <hr className="mt-3" />
      <p className="mt-3">Este módulo te permite gestionar los Pacientes del Centro Médico</p>

      

      <Link to="/pacientes/create"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Agregar Paciente
        </Link>

      <p></p>
      <div className="containerInput">
        <input
          className="form-control inputBuscar"
          value={busqueda}
          placeholder="Búsqueda por Nombre o Cédula de Identidad"
          onChange={handleChange}
        />
      </div>
      <p></p>

      <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="py-3 px-6">
                Nombre
              </th>
              <th scope="col" class="py-3 px-6">
              Cédula de Identidad 
              </th>

              <th scope="col" class="py-3 px-6">
                Fecha de Nacimiento
              </th>

              <th scope="col" class="py-3 px-6">
                Teléfono
              </th>

              <th scope="col" class="py-3 px-6">
              Acción
              </th>
            </tr>
          </thead>

          <tbody>
            {pacientes.map((paciente, index) => (
              <tr key={paciente.id} className="border-b hover:bg-gray-100">
                <td className="p-3">{paciente.name}</td>
                <td className="p-3">{paciente.cedula}</td>
                <td className="p-3">{paciente.fechan}</td>
                <td className="p-3">{paciente.personal_phone}</td>

                <td className="p-3">
                  <button
                    type="button"
                    className="bg-sky-800 block w-full text-white p-2 uppercase font-bold text-xs rounded-xl"
                    onClick={() => navigate(`/pacientes/show/${paciente.id}`)}
                  >
                    Ver
                  </button>
                  <button
                    type="button"
                    className="bg-cyan-900 block w-full text-white p-2 uppercase font-bold text-xs mt-2 mb-2 rounded-xl"
                    onClick={() => navigate(`/pacientes/edit/${paciente.id}`)}
                  >
                    Editar
                  </button>

                  <button
                          type="button"
                          className={`${
                            paciente.state ?  "bg-green-800 ":"bg-red-800" 
                          } block w-full text-white p-2 uppercase font-bold text-xs rounded-xl`}
                          onClick={() => {
                            deletePaciente(paciente.id);
                          }}
                        >
                          {paciente.state ? "Activo" : "Inactivo"}
                        </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
