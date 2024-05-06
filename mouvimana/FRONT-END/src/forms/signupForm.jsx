import axios from 'axios';
import React, { useState } from 'react'
import { URL } from '../api/api';
import { Link } from 'react-router-dom';

const SignUpForm = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isloading, setIsLoading] = useState(false);

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      const dataForm = {username, email, password}
      await axios.post(URL.USER_SIGNUP, dataForm);
      setIsLoading(true);
      if (isloading) {
        const sign = await axios.post(URL.USER_SIGNIN, dataForm);
        localStorage.setItem('token', sign.data.token);
      }
      window.location.href = '/';
    } catch (error) {
      console.error("Erreur lors de la creation du compte", error);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='w-3/4 grid grid-cols-1'>
        <label htmlFor='name' className='text-[#fafafa]'>Nom d'utilisateur</label>
        <input aria-label='username' type="text" placeholder="Nom d'utilisateur" className='w-full border rounded-md px-3 py-2 focus:outline-none focus:border-[#0D0074]' value={username} onChange={(e)=> setUsername(e.target.value)} required/>

        <label htmlFor='name' className='text-[#fafafa]'>Adresse Mail</label>
        <input aria-label='email' type="text" placeholder='Adresse Mail' className='w-full border rounded-md px-3 py-2 focus:outline-none focus:border-[#0D0074]' value={email} onChange={(e)=> setEmail(e.target.value)} required/>

        <label htmlFor='name' className='text-[#fafafa]'>Mot de passe</label>
        <input aria-label='password' type="password" placeholder='Mot de passe' className='w-full border rounded-md px-3 py-2 focus:outline-none focus:border-[#0D0074]' value={password} onChange={(e)=> setPassword(e.target.value)} required/>

        <button type='submit' className='mt-5 w-full bg-[#740067] text-[#fafafa] font-semibold px-4 py-2 rounded-md hover:bg-[#0D0074] focus:outline-none focus:bg-[#0D0074]'>S'inscrire</button>
        
        <p className='text-[#fafafa]'>Vous avez déjà un compte ? <Link to={'/signin'} className='text-blue-500 underline hover:text-[#2acdff]'>Connectez vous</Link></p>
      </form>

    </>
  )
}

export default SignUpForm