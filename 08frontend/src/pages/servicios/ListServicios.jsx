import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/auth/AuthProvider";

export const ListServicios = () => {
  const authentication = useAuth();

  const navigate = useNavigate();
  const [servicios, setServicios] = useState([]);
  const [tablaservicios, setTablaServicios] = useState([]); // AGREGAR datos estaticos
  const [busqueda, setBusqueda]= useState(""); /// busqueda
  const token = localStorage.getItem("token");

  const getServicios = async () => {
    try {
      const response = await axios.get(
        "https://base.devitamedical.com/api/v1/servicio",
        { headers: { accept: "application/json", authorization: token } }
      );
      console.log(response.data.data.servicios);
      setServicios(response.data.data.servicios);
      setTablaServicios(response.data.data.servicios);  //agregar tabla pacientes 
    } catch (error) {
      console.log(error);
    }
  };

  const deleteServicio = async (id) => {
    try {
      // eslint-disable-next-line no-restricted-globals
      const confirmation = confirm("Are you sure?");
      if (confirmation) {
        await axios.get(`https://base.devitamedical.com/api/v1/servicio/${id}/destroy`, {
          headers: { accept: "application/json", authorization: token },
        });
        await getServicios();
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
  var resultadosBusqueda=tablaservicios.filter((elemento)=>{
    if(elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
    || elemento.price.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
    ){
      return elemento;
    }
  });
  setServicios(resultadosBusqueda);
}
//busqueda


  useEffect(() => {
    getServicios();
  }, []);

  return (
    <div>
      <h1 className="font-black text-4xl text-sky-900">Servicios y Especialidades Médicas</h1>
      <hr className="mt-3" />
      <p className="mt-3">Este módulo te permite gestionar los diferentes Servicios y Especialidades del Centro Médico</p>

      <Link to="/servicios/create"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Agregar Especialidades
        </Link>


      <p></p>
      <div className="containerInput">
        <input
          className="form-control inputBuscar"
          value={busqueda}
          placeholder="Búsqueda por especialidad y precio"
          onChange={handleChange}
        />
      </div>
      <p></p>


      <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="py-3 px-6">
                Especialidad
              </th>
              <th scope="col" class="py-3 px-6">
              Descripción
              </th>

              <th scope="col" class="py-3 px-6">
                Precio
              </th>

              <th scope="col" class="py-3 px-6">
              Acción
              </th>
            </tr>
          </thead>

          <tbody>
            {servicios.map((servicio, index) => (
              <tr key={servicio.id} className="border-b hover:bg-gray-100">
                <td className="p-3">{servicio.name}</td>
                <td className="p-3">{servicio.description}</td>
                <td className="p-3">$ {servicio.price}</td>

                <td className="p-3">
                  <button
                    type="button"
                    className="bg-sky-800 block w-full text-white p-2 uppercase font-bold text-xs rounded-xl"
                    onClick={() => navigate(`/servicios/show/${servicio.id}`)}
                  >
                    Ver
                  </button>
                  <>
                    {authentication?.user?.role === "admin" && (
                      <>
                        <button
                          type="button"
                          className="bg-cyan-900 block w-full text-white p-2 uppercase font-bold text-xs mt-2 mb-2 rounded-xl"
                          onClick={() =>
                            navigate(`/servicios/edit/${servicio.id}`)
                          }
                        >
                          Editar
                        </button>

                        <button
                          type="button"
                          className={`${
                            servicio.state ?  "bg-green-800 ":"bg-red-800" 
                          } block w-full text-white p-2 uppercase font-bold text-xs rounded-xl`}
                          onClick={() => {
                            deleteServicio(servicio.id);
                          }}
                        >
                          {servicio.state ? "Activo" : "Inactivo"}
                        </button>
                      </>
                    )}
                  </>
                </td>

                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
