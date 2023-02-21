import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ServicioForm } from '../../components/organisms/ServicioForm';

export const UpdateServicio = () => {
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
                setServicio({ ...response.data.data.servicio, id });
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
            {
                Object.keys(servicio).length > 0 ?
                    (
                        <ServicioForm servicio={servicio} />
                    )
                    :
                    (
                        <p className="bg-yellow-600 border-t border-b border-yellow-900 text-white px-4 py-3 m-5 text-center rounded-lg">No data for this servicio</p>
                    )
            }
        </div>
    )
}


