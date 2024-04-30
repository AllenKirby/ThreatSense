import {NavLink, Outlet} from 'react-router-dom'

const RootLayout = () => {
  return (
    <>
      <header className='w-full h-auto py-5 px-32 flex items-center justify-between'>
        <div>
          <p className='text-2xl font-permanentMarker'>THREAT<span className='text-blue-800'>SENSE</span></p>
        </div>
        <nav className='text-xl font-medium'>
          <NavLink className='mr-7 hover:text-blue-800 transition-all duration-100' to="/">Home</NavLink>
          <NavLink className='ml-7 hover:text-blue-800 transition-all duration-100' to="/testnetwork">Test Network</NavLink>
        </nav>
      </header>
      <section className='w-full'>
        <Outlet/>
      </section>
    </>
  )
}

export default RootLayout