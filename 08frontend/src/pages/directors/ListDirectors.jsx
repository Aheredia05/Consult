import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { useAuth } from "../../contexts/auth/AuthProvider";

export const ListDirectors = () => {
  const navigate = useNavigate();
  const [directors, setDirectors] = useState([]);
  const [tabladirectors, setTablaDirectors] = useState([]); // AGREGAR datos estaticos
  const [busqueda, setBusqueda]= useState(""); /// busqueda
  const token = localStorage.getItem("token");
  const authentication = useAuth();

  const getDirectors = async () => {
    try {
      const response = await axios.get(
        "https://base.devitamedical.com/api/v1/director",
        { headers: { accept: "application/json", authorization: token } }
      );
      console.log(response.data.data.users);
      setDirectors(response.data.data.users);
      setTablaDirectors(response.data.data.users);  //agregar tabla pacientes 
    } catch (error) {
      console.log(error);
    }
  };

  
  const deleteDirector = async (id) => {
    try {
      // eslint-disable-next-line no-restricted-globals
      const confirmation = confirm("Are you sure?");
      if (confirmation) {
        await axios.get(`https://base.devitamedical.com/api/v1/director/${id}/destroy`, {
          headers: { accept: "application/json", authorization: token },
        });
        await getDirectors();
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
  var resultadosBusqueda=tabladirectors.filter((elemento)=>{
    if(elemento.full_name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
    || elemento?.servicio?.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
    ){
      return elemento;
    }
  });
  setDirectors(resultadosBusqueda);
}
//busqueda


  useEffect(() => {
    getDirectors();
  }, []);

  return (
    <div>
      <h1 className="font-black text-4xl text-sky-900">Gestión de Médicos</h1>
      <hr className="mt-3" />
      <p className="mt-3">Este módulo te permite gestionar los médicos que pertenecen al Centro Médico</p>

      {authentication?.user?.role === "admin" && (
                    
                    <Link to="/directors/create"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Agregar Médico
                    </Link>
                  )}
     

      <p></p>
      <div className="containerInput">
        <input
          className="form-control inputBuscar"
          value={busqueda}
          placeholder="Búsqueda por Nombre o Especialidad"
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
                Teléfono
              </th>

              <th scope="col" class="py-3 px-6">
                Especialidad
              </th>

              <th scope="col" class="py-3 px-6">
              Acción
              </th>
            </tr>
          </thead>

          <tbody>
            {directors.map((director, index) => (
              <tr key={director.id} className="border-b hover:bg-gray-100">
                <td className="p-3">{director.full_name}</td>
                <td className="p-3">{director.personal_phone}</td>
                <td className="p-3">{director?.servicio?.name || "--"}</td>
                
                <td className="p-3">
                  <button
                    type="button"
                    className="bg-sky-800 block w-full text-white p-2 uppercase font-bold text-xs rounded-xl"
                    onClick={() => navigate(`/directors/show/${director.id}`)}
                  >
                    Ver
                  </button>

                  {authentication?.user?.role === "admin" && (
                    <>
                    <button
                    type="button"
                    className="bg-cyan-900 block w-full text-white p-2 uppercase font-bold text-xs mt-2 mb-2 rounded-xl"
                    onClick={() => navigate(`/directors/edit/${director.id}`)}
                  >
                    Editar
                  </button>

                  <button
                          type="button"
                          className={`${
                            director.state ?  "bg-red-800": "bg-green-800 "
                          } block w-full text-white p-2 uppercase font-bold text-xs rounded-xl`}
                          onClick={() => {
                            deleteDirector(director.id);
                          }}
                        >
                          {director.state ?  "Inactivo":"Activo" }
                        </button>

                  </>
                  )}
                  

                </td>


              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
