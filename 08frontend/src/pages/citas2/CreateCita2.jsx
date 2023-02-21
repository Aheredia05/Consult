import React from 'react';
import { CitaForm } from '../../components/organisms';

export const CreateCita = () => {
    return (
        <div>
            <h1 className='font-black text-4xl text-sky-900'>Cita</h1>
            <hr className='mt-3' />
            <CitaForm />
        </div>
    );
}