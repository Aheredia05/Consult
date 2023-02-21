import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const ShowCita = () => {
    const { id } = useParams();
    const [cita, setCita] = useState({});
    const token = localStorage.getItem('token');

    useEffect(() => {
        const getCita = async () => {
            try {
                const response = await axios.get(
                    `https://base.devitamedical.com/api/v1/cita/${id}`,
                    { headers: { 'accept': 'application/json', 'authorization': token } }
                )
                const user = { ...response.data.data.cita, id }
                setCita(user);
            } catch (error) {
                console.log(error);
            }
        }
        getCita()
    }, [])

    return (
        <div>
            <h1 className='font-black text-4xl text-sky-900'>Historia Clínica </h1>
            <hr className='mt-3' />
            <a href="javascript:history.back()"> Volver Atrás</a>
            {
                Object.keys(cita).length > 0 ?
                    (
                        <div className='m-5 flex justify-between'>
                            <div>
                                <p className="text-2xl text-gray-00 mt-4">
                                    <span className="text-gray-600 uppercase font-bold">* Nombre del Paciente: </span>
                                    {cita.paciente.name}
                                </p>
                                <p className="text-2xl text-gray-00 mt-4">
                                    <span className="text-gray-600 uppercase font-bold">* fecha de Nacimiento: </span>
                                    {cita.paciente.fechan}
                                </p>
                                <p className="text-2xl text-gray-00 mt-4">
                                    <span className="text-gray-600 uppercase font-bold">* Sexo: </span>
                                    {cita.paciente.sex}
                                </p>

                                <p className="text-2xl text-gray-00 mt-4">
                                    <span className="text-gray-600 uppercase font-bold">* Alergias: </span>
                                    {cita.paciente.alergias ? cita.paciente.alergias : 'N/A'}
                                </p>
                                <p className="text-2xl text-gray-00 mt-4">
                                    <span className="text-gray-600 uppercase font-bold">* F/H de Cita: </span>
                                    {cita.fechac}
                                </p>
                                
                                <hr />
                                <p className="text-2xl text-gray-00 mt-4">
                                    <span className="text-gray-600 uppercase font-bold">* Descricion: </span>
                                    {cita.description}
                                </p>
                                <hr />
                                <p className="text-2xl text-gray-00 mt-4">
                                    <span className="text-gray-600 uppercase font-bold">* Sintomas: </span>
                                    {cita.sintomas}
                                </p>
                                <hr />
                                <p className="text-2xl text-gray-00 mt-4">
                                    <span className="text-gray-600 uppercase font-bold">* Diagnostico: </span>
                                    {cita.diagnostico}
                                </p>
                                <hr />
                                <p className="text-2xl text-gray-00 mt-4">
                                    <span className="text-gray-600 uppercase font-bold">* Prescripcion: </span>
                                    {cita.prescripcion}
                                </p>
                                <hr />
                                <p className="text-2xl text-gray-00 mt-4">
                                    <span className="text-gray-600 uppercase font-bold">* Observaciones: </span>
                                    {cita.observaciones}
                                </p>


                                
                            </div>
                            
                        </div>
                    )
                    :
                    (
                        <p className="bg-yellow-600 border-t border-b border-yellow-900 text-white px-4 py-3 m-5 text-center rounded-lg">No data for this cita</p>
                    )
            }
        </div>
    )
}


