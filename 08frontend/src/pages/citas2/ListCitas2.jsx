import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { deleteCita } from "../../lib/citas";
import Button from "react-bootstrap/Button";
import moment from "moment";

import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

export const ListCitas2 = () => {
  const navigate = useNavigate();
  const [citas, setCitas] = useState([]);
  const [tablacitas, setTablaCitas] = useState([]); // AGREGAR datos estaticos
  const [busqueda, setBusqueda]= useState(""); /// busqueda
  const token = localStorage.getItem("token");
  var datee;

  const [dateState, setDateState] = useState(new Date())
  const changeDate = (e) => {
    setDateState(e);
    console.log("asasfdsfsdfsd====================================");
  }

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
  console.log("busqueda====================================");
  //console.log(value);
}


const filtrar=(terminoBusqueda)=>{
  var resultadosBusqueda=tablacitas.filter((elemento)=>{
    datee=moment(dateState).format('YYYY-MM-DD');
    console.log("ini here+++++++++++++++++++++");
    console.log(datee);
    console.log("fin here+++++++++++++++++++++");

    console.log(elemento.fechac.toString());
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

  return (
    <div>
      <h1 className="font-black text-4xl text-sky-900">Dashboard</h1>
      <hr className="mt-3" />

      <div class="flex flex-row">


  <div class="basis-1/2">
  <div class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img class="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
    </a>
    <div class="p-5">
       
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-balck">AGENDA MÉDICA</h5>
  
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">AQUI PODRAS APRECIAR DE MEJOR FORMA COMO ESTA LA AGENDA MÉDICA</p>
        <a href="/citas" class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Citas Medicas
            <svg aria-hidden="true" class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </a>
    </div>

    <div class="overflow-scroll ..."></div>
</div>

<div class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img class="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
    </a>
    <div class="p-5">
      
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-balck">SERVICIOS</h5>
        
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">AQUI PODRA VER LOS SERVICIOS DEL CENTRO MEDICO.</p>
        <a href="#" class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Servicios
            <svg aria-hidden="true" class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </a>
    </div>

    <div class="overflow-scroll ..."></div>
</div>
  </div>
  
  
  <div class="basis-1/4">

  <>
  <center>
      <Calendar 
      value={dateState}
      onChange= {changeDate}
      addOnChange={handleChange}
      datee={moment(dateState).format('YYYY-MM-DD')}
      
      />
    
    <p>Haga clic en la barra espaciadora donde está <b>{moment(dateState).format('YYYY-MM-DD')}</b></p>
    </center>
    <div className="containerInput">
        <input
          className="form-control inputBuscar"
          value={moment(dateState).format('YYYY-MM-DD')}
          placeholder={moment(dateState).format('YYYY-MM-DD')}
          name={moment(dateState).format('YYYY-MM-DD')}
          onChange={handleChange}
        />
      </div>
    </>
    <p></p>
     



        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="p-2">Fecha de Cita</th>
              <th className="p-2">Paciente</th>
              <th className="p-2">Médico</th>
              
              
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
                  <td className="p-3">{cita?.user?.full_name || "--"}</td>
                  

                  
                </tr>
              ))}
          </tbody>
        </table>
      
  </div>
</div>

     
      <p></p>
      
    </div>
  );
};
