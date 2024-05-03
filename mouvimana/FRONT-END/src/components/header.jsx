import React from 'react'
import { Outlet, Link } from 'react-router-dom'

const Header = () => {
  return (
    <div>
        <nav className='grid grid-cols-[150px_minmax(0,1fr)] grid-rows-1 bg-[#740067] fixed w-screen h-[6vh]'>
            <ul className='grid grid-cols-1 grid-row-1 justify-items-center items-center'>
                <li><Link to="/" className='text-[#fafafa] text-center'>Mouvimana</Link></li>
            </ul>
            <ul className='grid grid-cols-3 grid-row-1 justify-items-center items-center'>
                <li><Link to="/films" className='text-[#fafafa] text-center'>Films</Link></li>
                <li><Link to="/about" className='text-[#fafafa] text-center'>A propos</Link></li>
                <li><Link to="/profile" className='text-[#fafafa] text-center'>Profil</Link></li>
            </ul>
        </nav>
        <section className=''>
            <Outlet/>
        </section>
    </div>
  )
}

export default Header