import React from 'react';
import { PacienteForm } from '../../components/organisms';

export const CreatePaciente = () => {
    return (
        <div>
            <h1 className='font-black text-4xl text-sky-900'>Paciente</h1>
            <hr className='mt-3' />
            <PacienteForm />
        </div>
    );
}