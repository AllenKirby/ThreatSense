import {NavLink, Outlet} from 'react-router-dom'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { useState } from 'react';

const RootLayout = () => {
  const [click, setClick] = useState(false)
  const navClick = () => setClick(!click);
  return (
    <>
      <header className='md:px-32 px-10 w-full h-auto py-5 flex items-center justify-between'>
        <div>
          <p className='md:text-4xl text-2xl font-permanentMarker'>THREAT<span className='text-blue-800'>SENSE</span></p>
        </div>
        <nav className='md:block hidden text-xl font-medium'>
          <NavLink className='mr-7 hover:text-blue-800 transition-all duration-100' to="/">Home</NavLink>
          <NavLink className='ml-7 hover:text-blue-800 transition-all duration-100' to="/checkfile">Check File</NavLink>
        </nav>
        <button onClick={navClick} className='md:hidden block p-2'>{click ? <IoClose color='white' /> :<GiHamburgerMenu color='white' />}</button>
      </header>
      {click && 
        <nav className='md:hidden block fixed top-16 w-full h-auto p-7 text-xl font-medium'>
          <ul className='text-center flex flex-col gap-4'>
            <NavLink className='w-full hover:bg-blue-800 rounded-xl transition-all duration-100' to="/">Home</NavLink>
            <NavLink className='w-full hover:bg-blue-800 rounded-xl transition-all duration-100' to="/checkfile">Check File</NavLink>
          </ul>
        </nav>
      }
        <Outlet/>
    </>
  )
}

export default RootLayout