import React from 'react';
import { Link } from 'react-router-dom'
import { ShieldIcon } from '../atoms'

export const Cover = () => {
  return (
    <>
      <div className='hidden md:flex justify-center items-center min-h-screen bg-gradient-to-r from-cyan-500 to-violet-500'>
        <div className='text-center text-white space-y-3 p-8'>
          <img src="https://lh3.googleusercontent.com/p/AF1QipP02gKDRYgdW2rzFT-CFITBX_-aG8xhbIdvKDxc=s680-w680-h510" alt="" />
          <h2 className='text-3xl font-extrabold'>Control Pacientes</h2>
        </div>

      </div>
    </>
  )
}
