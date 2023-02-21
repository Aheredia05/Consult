import React, { useContext } from 'react';
import { HashRouter, Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../contexts';

import Button from "react-bootstrap/Button";



export const DashboardTemplate = () => 
{

    const { user, logout } = useContext(AuthContext);
    const location = useLocation();
    const urlActual = location.pathname;
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const onLogout = async () => 
    {
        try {
            await axios.post(
                'https://base.devitamedical.com/api/v1/logout',
                {}, { headers: { 'accept': 'application/json', 'authorization': token } }
            );
            navigate('/login', { replace: true });
            logout();
        } catch (error) {
            console.log(error);
        }
    };

    

    return (
      <div>

<div className='md:flex md:min-h-screen'>

<aside class="w-64" aria-label="Sidebar">
  
   <div class="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800">

   <h5 className='text-4xl font-black text-center text-white underline'>Devita Medical</h5>
<center>
   <img class="mr-3 mb-3 w-12 h-12 rounded-full sm:mb-0" src="https://devitamedical.com/wp-content/uploads/2021/10/cropped-WhatsApp-Image-2021-10-01-at-11.27.44-1.jpeg" alt="Devita Medical"/>
   </center>
  <center>
 
  <Link to="/citas2/show/" >
            <h4 className='text-2xl font-black text-center text-white'>{user.username}</h4>
            </Link>
</center>

                <h5 className='text-xl font-black text-center text-white'>{user.role}</h5>
                <hr className="mt-5 text-orange-900" />

      <ul class="space-y-2">
   
         <li>
         <Link to="/citas2" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
               <svg aria-hidden="true" class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
               <span class="ml-3">Dashboard</span>
               </Link>
         </li>
       
           
         
         <li>
         <Link to="/directors" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
               <span class="flex-1 ml-3 whitespace-nowrap">Médico</span>
               </Link>
         </li>

         <li>
         <Link to="/servicios" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
               <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"></path></svg>
               <span class="flex-1 ml-3 whitespace-nowrap">Servicios</span>
               </Link>
         </li>

         <li>
         <Link to="/citas"  class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
               <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clip-rule="evenodd"></path></svg>
               <span class="flex-1 ml-3 whitespace-nowrap">Citas</span>
               </Link>
         </li>

         


         <li>
         <Link to="/pacientes" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
               <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
               <span class="flex-1 ml-3 whitespace-nowrap">Pacientes</span>
               </Link>
         </li>

         
         <li>
               <button type="button" onClick={onLogout} className="m-auto text-white text-xl block mt-4 hover:text-red-300 text-center bg-red-900 p-2 rounded-lg">Salir</button>
           
         </li>
        
         
      </ul>
   </div>
</aside>




            <div className='md:w-3/4 p-10 md:h-screen overflow-y-scroll'>
                <Outlet />
            </div>


            
        </div>

        


<footer class="p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
    <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022-Alberto Alfonso heredia Iza <a href="https://devitamedical.com" class="hover:underline">DevitaMedical™</a>. All Rights Reserved.
    </span>
    <ul class="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
            <a href="devitamedical.com" class="mr-4 hover:underline md:mr-6 ">Pagina Web</a>
        </li>
        <li>
            <a href="#" class="mr-4 hover:underline md:mr-6">Soporte</a>
        </li>
        
    </ul>
</footer>
</div>
    );
}
