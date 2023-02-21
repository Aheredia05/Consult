import React from 'react';
import { useLocation } from 'react-router-dom';
import { CitaForm } from '../../components/organisms/CitaForm';

export const UpdateCita= () => {
    const location = useLocation();

    return (
        <div>
            <h1 className='font-black text-4xl text-sky-900'>cita</h1>
            <hr className='mt-3' />
            {<CitaForm cita={location.state.cita} />}
        </div>
    )
}
