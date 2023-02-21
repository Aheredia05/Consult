import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const ShowPaciente = () => {
    const { id } = useParams();
    const [paciente, setPaciente] = useState({});
    const token = localStorage.getItem('token');

    useEffect(() => {
        const getPaciente = async () => {
            try {
                const response = await axios.get(
                    `https://base.devitamedical.com/api/v1/paciente/${id}`,
                    { headers: { 'accept': 'application/json', 'authorization': token } }
                )
                const user = { ...response.data.data.paciente, id }
                setPaciente(user);
            } catch (error) {
                console.log(error);
            }
        }
        getPaciente()
    }, [])

    return (
        <div>
            <h1 className='font-black text-4xl text-sky-900'>Paciente</h1>
            <hr className='mt-3' />

            <a href="javascript:history.back()"> Volver Atrás</a>
            {
                Object.keys(paciente).length > 0 ?
                    (
                        <div className='m-5 flex justify-between'>
                            <div>
                                <p className="text-2xl text-gray-00 mt-4">
                                    <span className="text-gray-600 uppercase font-bold">* Nombre: </span>
                                    {paciente.name}
                                </p>
                                <p className="text-2xl text-gray-00 mt-4">
                                    <span className="text-gray-600 uppercase font-bold">* Cedula: </span>
                                    {paciente.cedula}
                                </p>
                                <p className="text-2xl text-gray-00 mt-4">
                                    <span className="text-gray-600 uppercase font-bold">* Email: </span>
                                    {paciente.email}
                                </p>
                                <p className="text-2xl text-gray-00 mt-4">
                                    <span className="text-gray-600 uppercase font-bold">* cedula: </span>
                                    {paciente.cedula}
                                </p>
                                <p className="text-2xl text-gray-00 mt-4">
                                    <span className="text-gray-600 uppercase font-bold">* State: </span>
                                    {paciente.state ? 'Active' : 'Inactive'}
                                </p>
                                <p className="text-2xl text-gray-00 mt-4">
                                    <span className="text-gray-600 uppercase font-bold">* sex: </span>
                                    {paciente.sex }
                                </p>
                                <p className="text-2xl text-gray-00 mt-4">
                                    <span className="text-gray-600 uppercase font-bold">* Direccion: </span>
                                    {paciente.address }
                                </p>
                            </div>
                            
                        </div>
                    )
                    :
                    (
                        <p className="bg-yellow-600 border-t border-b border-yellow-900 text-white px-4 py-3 m-5 text-center rounded-lg">No data for this paciente</p>
                    )
            }
        </div>
    )
}


