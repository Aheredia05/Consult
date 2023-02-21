import React from 'react';
import { ServicioForm } from '../../components/organisms';

export const CreateServicio = () => {
    return (
        <div>
            <h1 className='font-black text-4xl text-sky-900'>Servicios</h1>
            <hr className='mt-3' />
            <ServicioForm />
        </div>
    );
}