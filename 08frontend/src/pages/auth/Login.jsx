import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Label, Button } from '../../components'
import { AuthContext } from '../../contexts';




export const Login = () => 
{
    const { login } = useContext(AuthContext);

    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [showPwd, setShowPwd] = useState(false)


    const onLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'https://base.devitamedical.com/api/v1/login',
                { email, password },
                { headers: { 'accept': 'application/json' } }
            )
            const {access_token, token_type, user} = response.data.data 
            console.warn(access_token, token_type, user);
            login(user, `${token_type} ${access_token}`);   
            navigate('/');       
        } catch (error) {
            console.log(error.response.data.message, 'error');
            setEmail('');
            setPassword('');
        }
    }

    return (
        <>
            <img src="https://devitamedical.com/wp-content/uploads/2021/10/logo.png" alt="" />
            <p className='text-sm text-gray-500 pb-6'>Ingrese sus credenciales</p>
            
     <form className='space-y-7 text-left' onSubmit={onLogin}>
       
        <div className="form-floating">
          <input className="form-control fw-semibold fs-5 border-0 shadow" 
          placeholder="Email" 
          type="email" 
          id="email" 
          value={email}
          maxLength="35"
          autoFocus
          onChange={e => setEmail(e.target.value)}
          required />
          <label htmlFor="userid" >Email</label>
        </div>
        <div className="form-floating mt-3">
          <input type={showPwd ? "text" : "password"} 
          className="form-control position-relative fw-semibold fs-5 border-0 shadow" 
          placeholder="password" 
          id="password" 
          name='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          required />
          <label htmlFor="password" >Password</label>
          <div className="position-absolute pointer pwd-icon" onClick={() => setShowPwd(!showPwd)}>
            {showPwd ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height={"1.5rem"}>
              <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
              <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
            </svg> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height={"1.5rem"}>
              <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
              <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
              <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" />
            </svg>}
          </div>
        </div>
      </form>

            <form className='space-y-7 text-left' onSubmit={onLogin}>
                <div className='pt-4 flex justify-center'>  
                    <Button name='Ingresar' styles='w-3/5' />
                </div>
                  <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
            </form>




        </>
    );
}
