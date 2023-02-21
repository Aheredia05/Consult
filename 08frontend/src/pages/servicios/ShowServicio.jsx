import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const ShowServicio = () => {
    const { id } = useParams();
    const [servicio, setServicio] = useState({});
    const token = localStorage.getItem('token');

    useEffect(() => {
        const getServicio = async () => {
            try {
                const response = await axios.get(
                    `https://base.devitamedical.com/api/v1/servicio/${id}`,
                    { headers: { 'accept': 'application/json', 'authorization': token } }
                )
                const user = { ...response.data.data.servicio, id }
                setServicio(user);
            } catch (error) {
                console.log(error);
            }
        }
        getServicio()
    }, [])

    return (
        <div>
            <h1 className='font-black text-4xl text-sky-900'>Servicio</h1>
            <hr className='mt-3' />

            <a href="javascript:history.back()"> Volver Atrás</a>
            {
                Object.keys(servicio).length > 0 ?
                    (
                        <div className='m-5 flex justify-between'>
                            <div>
                                <p className="text-2xl text-gray-00 mt-4">
                                    <span className="text-gray-600 uppercase font-bold">*  Nombre: </span>
                                    {servicio.name}
                                </p>
                                <p className="text-2xl text-gray-00 mt-4">
                                    <span className="text-gray-600 uppercase font-bold">* Descripción: </span>
                                    {servicio.description}
                                </p>
                                <p className="text-2xl text-gray-00 mt-4">
                                    <span className="text-gray-600 uppercase font-bold">* Precio: </span>
                                    $ {servicio.price}
                                </p>
                                <p className="text-2xl text-gray-00 mt-4">
                                    <span className="text-gray-600 uppercase font-bold">* State: </span>
                                    {servicio.state ? 'Activo' : 'Inactivo'}
                                </p>
                               
                            </div>
                           
                        </div>
                    )
                    :
                    (
                        <p className="bg-yellow-600 border-t border-b border-yellow-900 text-white px-4 py-3 m-5 text-center rounded-lg">No data for this servicio</p>
                    )
            }
        </div>
    )
}