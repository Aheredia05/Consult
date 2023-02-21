import React, { useEffect, useState  } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { deleteCita } from "../../lib/citas";
import Button from "react-bootstrap/Button";
import moment from "moment";
import { useAuth } from "../../contexts/auth/AuthProvider";


export const ListCitas = () => {
  const navigate = useNavigate();
  const [citas, setCitas] = useState([]);
  const [tablacitas, setTablaCitas] = useState([]); // AGREGAR datos estaticos
  const [busqueda, setBusqueda]= useState(""); /// busqueda
  const token = localStorage.getItem("token");
  const authentication = useAuth();
  var fechaok = false;



  const getCitas = async () => {
    try {
      const response = await axios.get("https://base.devitamedical.com/api/v1/cita", {
        headers: { accept: "application/json", authorization: token },
      });
      console.log(response.data.data.citas);
      setCitas(response.data.data.citas);
      setTablaCitas(response.data.data.citas);  //agregar tabla pacientes 
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
  var resultadosBusqueda=tablacitas.filter((elemento)=>{
    if(elemento.fechac.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
    || elemento?.paciente?.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
    || elemento?.user?.full_name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
    ){
      return elemento;
    }
  });
  setCitas(resultadosBusqueda);
}
//busqueda


  useEffect(() => {
    getCitas();
  }, []);

    const [blogPosts, setBlogPosts] = useState(getCitas)

  return (
    <div>
      <h1 className="font-black text-4xl text-sky-900">Citas - Agenda Médica</h1>
      <hr className="mt-3" />
      <p className="mt-3">Este módulo te permite gestionar las citas agendadas e <b>historias clínicas</b> del Centro Médico</p>

      

      <Link to="/citas/create"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Agregar Cita
        </Link>

      <p></p>
      <div className="containerInput">
        <input
          className="form-control inputBuscar"
          value={busqueda}
          placeholder="Búsqueda por Fecha, Paciente o Médico"
          onChange={handleChange}
        />
      </div>
      <p></p>


     

      <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              
              <th className="p-2">Fecha de Cita</th>
              <th className="p-2">Paciente</th>
              <th className="p-2">Teléfono</th>
              <th className="p-2">Médico</th>
              <th className="p-2">Descripción</th>
              <th className="p-2">Acción</th>
              <td className="p-2"></td>
              
            </tr>
          </thead>


          <tbody>

            
            {citas
              .sort((a, b) => {
                const dateA = moment(a.fechac);
                const dateB = moment(b.fechac);
                return moment(dateB).diff(dateA);
              })
              .map((cita, index) => (
                <tr key={cita.id} className="border-b hover:bg-gray-100">
                  <td className="p-3">{cita.fechac}</td>
                  <td className="p-3">{cita.paciente.name}</td>
                  <td className="p-3">{cita.paciente.personal_phone || "--"}</td>
                  <td className="p-3">{cita?.user?.full_name || "--"}</td>
                  <td className="p-3">{cita.description}</td>

                  <td className="p-3">
                  <button
                    type="button"
                    className="bg-sky-800 block w-full text-white p-2 uppercase font-bold text-xs rounded-xl"
                    onClick={() => navigate(`/citas/show/${cita.id}`)}
                  >
                    historias clínicas
                  </button>
                  <button
                    type="button"
                    className="bg-cyan-900 block w-full text-white p-2 uppercase font-bold text-xs mt-2 mb-2 rounded-xl"
                    onClick={() => {
                      navigate(`/citas/edit/${cita.id}`, {
                        state: { cita },
                      });
                    }}
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    className={`${
                      cita.state ? "bg-red-800" : "bg-green-800 "
                    } block w-full text-white p-2 uppercase font-bold text-xs rounded-xl`}
                    
                    onClick={async () => {
                      
                      await deleteCita(cita.id);
                      window.location.reload();
                    }}
                  >
                    {cita.state ? "eliminar" : "Eliminar"}
                  </button>

                  {fechaok === true && (
                    <Button
                      onClick={() => navigate(`/citas/edit/${cita.id}`)}
                    >
                      Editar2
                    </Button>
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

