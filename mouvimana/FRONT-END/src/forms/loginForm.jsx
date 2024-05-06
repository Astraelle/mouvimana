import React, { useState } from 'react'
import axios from 'axios';
import { URL } from '../api/api';
import { Link } from 'react-router-dom';

const LoginForm = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      const response = await axios.post(URL.USER_SIGNIN, {email, password});
      if (response.data.others.role === 1) {
        localStorage.setItem('adminToken', response.data.adminToken);
      }else{
        localStorage.setItem('token', response.data.token);
      }
      localStorage.setItem('user', response.data.others.email)
      window.location.href = '/';
    } catch (error) {
      console.error('Erreur de connexion', error)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='w-3/4 grid grid-cols-1'>
        <label htmlFor='name' className='text-[#fafafa]'>Adresse Mail</label>
        <input aria-label='email' type="text" placeholder='Adresse Mail' className='w-full border rounded-md px-3 py-2 focus:outline-none focus:border-[#0D0074]' value={email} onChange={(e)=> setEmail(e.target.value)} required/>

        <label htmlFor='name' className='text-[#fafafa]'>Mot de passe</label>
        <input aria-label='password' type="password" placeholder='Mot de passe' className='w-full border rounded-md px-3 py-2 focus:outline-none focus:border-[#0D0074]' value={password} onChange={(e)=> setPassword(e.target.value)} required/>

        <button type='submit' className='mt-5 w-full bg-[#740067] text-[#fafafa] font-semibold px-4 py-2 rounded-md hover:bg-[#0D0074] focus:outline-none focus:bg-[#0D0074]'>Se Connecter</button>

        <p className='text-[#fafafa]'>Vous n'êtes pas encore incrit ? <Link to={'/signup'} className='text-blue-500 underline hover:text-[#2acdff]'>Cliquez ici</Link></p>
      </form>
    </>
  )
}

export default LoginForm