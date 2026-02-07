
import React, { useEffect } from 'react'
import { AppContext } from   '../context/appContext.jsx';
import axios from 'axios';
import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [currentState, setcurrentState] = useState('Sign up');
  const { token, backendUrl, setToken} = useContext(AppContext);

  const navigate = useNavigate();
  
  // console.log("Navigate value:", navigate);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');



  const onSubmitHandler = async (event) => {
  event.preventDefault();

try {
  let response;

  if (currentState === "Sign up") {
    response = await axios.post(
      `${backendUrl}/api/auth/register`,
      { name, email, password }
    );
  } else {
    response = await axios.post(
      `${backendUrl}/api/auth/login`,
      { email, password }
    );
  }

  console.log("AUTH RESPONSE:", response.data);

  if (response.data.token) {
    setToken(response.data.token);
  } else {
    toast.error(response.data.message || "Authentication failed");
  }

} catch (error) {
  console.error(error);
  toast.error(error.response?.data?.message || error.message);
}



  //  if token exists navigate to home page
  useEffect(() => {
      console.log("TOKEN CHANGED:", token);

    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular  text-3xl '>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {currentState === 'Login' ? '' : <input onChange={(e) => setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border  border-gray-800' placeholder='Name' required />
      }
      <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border  border-gray-800' placeholder='Email' required />
      <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border  border-gray-800' placeholder='Password' required />
      <div className='w-full flex justify-between text-sm mt-[-8]'>
        <p className='cursor-pointer'>Forgot your password</p>

        {
          currentState === 'Login'
            ? <p onClick={() => setcurrentState('Sign up')} className='cursor-pointer'>Create Account</p>
            : <p onClick={() => setcurrentState('Login')} className='cursor-pointer'>Login Here</p>

        }
      </div>
      <button type='submit' className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState === 'Login' ? 'Sign In' : 'Sign up'}</button>
    </form>
  )
}

export default Login
