import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Label, Button } from '../../components'

import { useNavigate } from "react-router-dom";

import { errorMessage } from "../../utils/parser";

export const ShowProfile = ({ user }) => { 
    const { id } = useParams();
    const [profile, setProfile] = useState({});
    const token = localStorage.getItem('token');

    const navigate = useNavigate();

    const [error, setError] = useState(false);


    const [showPwd, setShowPwd] = useState(false)
  
    const [form, setForm] = useState({
        password: user?.password ?? "",
        password_confirmation: user?.password_confirmation?? ""
    });

    const handleChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value,
        });
      };

    useEffect(() => {
        const getProfile = async () => {
            try {
                const response = await axios.get(
                    `https://base.devitamedical.com/api/v1/profile`,
                    { headers: { 'accept': 'application/json', 'authorization': token } }
                )
                const user = { ...response.data.data.user, id }
                setProfile(user);
            } catch (error) {
                console.log(error);
            }
        }
        getProfile()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (Object.values(form).includes("")) {
          console.log("error");
          setError(true);
          setTimeout(() => {
            setError(false);
          }, 2500);
          return;
        }
    
        try {
          if (user?.id) {

            await axios.post(
                `https://base.devitamedical.com/api/v1/update-password`,
                { ...form },
                { headers: { accept: "application/json", authorization: token } }
              );
          } else {
            await axios.post(
                `https://base.devitamedical.com/api/v1/update-password`,
                { ...form },
                { headers: { accept: "application/json", authorization: token } }
              );
          }
          navigate("/citas2");
        } catch (error) {
          console.log(error);
          alert(errorMessage(error));
        }
      };

    return (
<div>
      <h1 className="font-black text-4xl text-sky-900">Usuario</h1>
      <hr className="mt-3" />
      <p className="mt-3">En este módulo encontrarás los datos del Usuario y podrás cambiar la contraseña</p>
      <a href="javascript:history.back()"> Volver Atrás</a>
      <div class="flex flex-row">
  
  <div class="basis-1/2">
  
    <>
    <div>

            {
                Object.keys(profile).length > 0 ?
                    (
                        <div className='m-5 flex justify-between'>
                            <div>
                                <p className="text-2xl text-gray-00 mt-4">
                                    <span className="text-gray-600 uppercase font-bold">* Nombres </span>
                                    {profile.first_name}
                                </p>
                                <p className="text-2xl text-gray-00 mt-4">
                                    <span className="text-gray-600 uppercase font-bold">* Apellidos: </span>
                                    {profile.last_name}
                                </p>
                                <p className="text-2xl text-gray-00 mt-4">
                                    <span className="text-gray-600 uppercase font-bold">* Email: </span>
                                    {profile.email}
                                </p>
                                <p className="text-2xl text-gray-00 mt-4">
                                    <span className="text-gray-600 uppercase font-bold">* Número Celular: </span>
                                    {profile.phone_number}
                                </p>
                                <p className="text-2xl text-gray-00 mt-4">
                                    <span className="text-gray-600 uppercase font-bold">* State: </span>
                                    {profile.state ? 'Active' : 'Inactive'}
                                </p>
                               
                                <p className="text-2xl text-gray-00 mt-4">
                                    <span className="text-gray-600 uppercase font-bold">* Número de casa: </span>
                                    {profile.home_phone_number ? profile.home_phone_number : 'N/A'}
                                </p>
                            </div>
                        </div>
                    )
                    :
                    (
                        <p className="bg-yellow-600 border-t border-b border-yellow-900 text-white px-4 py-3 m-5 text-center rounded-lg">No data for this profile</p>
                    )
            }
       
    </div>
</>
  </div>



  <div class="basis-1/2">
  <p className="mt-3"></p>

    <p>
    <br></br>
    <br></br>
    </p> <center>
    <h3 className="font-black text-4xl text-sky-900">Actualizar o Cambiar la contraseña</h3>
    </center>

      <form className='space-y-7 text-left' onSubmit={handleSubmit}>
       
       <div className="form-floating mt-3">
         <input type={showPwd ? "text" : "password"} 
         className="form-control position-relative fw-semibold fs-5 border-0 shadow" 
         placeholder="password" 
         id="password" 
         name='password'
         value={form.password}
         onChange={handleChange}
         required />
         <label htmlFor="password" >Password</label>
         

       </div>

       <div className="form-floating mt-3">
         <input type={showPwd ? "text" : "password"} 
         className="form-control position-relative fw-semibold fs-5 border-0 shadow" 
         placeholder="password" 
         id="password_confirmation" 
         name='password_confirmation'
         value={form.password_confirmation}
         onChange={handleChange}
         required />
         <label htmlFor="password" >Confirmar Password</label>
       </div>

       <div className="pwd-icon" onClick={() => setShowPwd(!showPwd)}> 
           {showPwd ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height={"1.5rem"}>
             <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
             <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
             </svg> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height={"1.5rem"}>
             <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
             <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
             <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" />
           </svg>}
         </div>

       <div>

      

         

         <input
          type="submit"
          className="bg-sky-800 w-full p-3 text-white uppercase font-bold rounded-lg hover:bg-sky-900 cursor-pointer transition-all"
          value={user?.id ? "Guardar" : "Actualizar"}
          onclick="window.location='http://urlBase.com/'+this.value;"
        />
       </div>
      

      
     </form>

  </div>
  
</div>      
    </div>

    )
}


