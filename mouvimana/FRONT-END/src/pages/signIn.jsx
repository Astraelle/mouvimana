import React, { useEffect, useState } from 'react'
import LoginForm from '../forms/loginForm'

const SignIn = () => {

  useEffect(() =>{
    isLoggedIn();
  }, [])

  const [LoggedIn, setLoggedIn] = useState(false);

  const isLoggedIn = async () =>{
    try {
      const storage = localStorage.getItem('token') || localStorage.getItem('adminToken');
      if (storage) {
        setLoggedIn(true)
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleLogOut = () =>{
    localStorage.removeItem('token') || localStorage.removeItem('adminToken');
    window.location.href = '/';
  }

  return (
    <div className='h-[90vh] pt-[55px] grid grid-cols-3 grid-rows-3 justify-items-center align-middle'>
      {LoggedIn ?
        <div>
          <p>Bienvenue !</p>
          <button onClick={handleLogOut}>Se déconnecter</button>
      </div>
      : <div className='w-3/4 grid col-start-2 row-start-2 items-center justify-items-center bg-[#460074] rounded-[15px]'>
          <LoginForm/>
        </div>
      }
    </div>
  )
}

export default SignIn