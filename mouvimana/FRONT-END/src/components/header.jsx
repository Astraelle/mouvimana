import React, { useEffect, useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import MovieSearch from './search';

const Header = () => {

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
  return (
    <div>
        <nav className='grid grid-cols-[200px_minmax(0,1fr)_500px] grid-rows-1 bg-[#460074] border-b-[#740067] border-b-4 fixed w-screen h-[55px]'>
            <ul className='grid grid-cols-1 grid-row-1 justify-items-center items-center'>
                <li><Link to="/" className='text-[#fafafa] text-center'>Mouvimana</Link></li>
            </ul>
            <div className='grid justify-items-end'>
              <MovieSearch/>
            </div>
            <ul className='grid grid-cols-3 grid-row-1 justify-items-center content-center'>
                <li><Link to="/films" className='text-[#fafafa] text-center'>Films</Link></li>
                <li><Link to="/about" className='text-[#fafafa] text-center'>A propos</Link></li>
                {LoggedIn ?
                    <li><Link to="/profil" className='text-[#fafafa] text-center'>Profil</Link></li>
                : 
                    <li><Link to="/signin" className='text-[#fafafa] text-center'>Se connecter</Link></li>
                }
                
            </ul>
        </nav>
        <section>
            <Outlet/>
        </section>
    </div>
  )
}

export default Header