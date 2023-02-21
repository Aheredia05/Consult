import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { PacienteForm } from '../../components/organisms/PacienteForm';

export const UpdatePaciente = () => {
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
                console.log(user);
            } catch (error) {
                console.log(error);
            }
        }
        getPaciente()
    }, [])

    return (
        <div>
            <h1 className='font-black text-4xl text-sky-900'>paciente</h1>
            <hr className='mt-3' />
            {
                Object.keys(paciente).length > 0 ?
                    (
                        <PacienteForm paciente={paciente} />
                    )
                    :
                    (
                        <p className="bg-yellow-600 border-t border-b border-yellow-900 text-white px-4 py-3 m-5 text-center rounded-lg">No data for this paciente</p>
                    )
            }
        </div>
    )
}
