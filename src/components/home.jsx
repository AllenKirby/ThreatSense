import { Link } from "react-router-dom"
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const Home = () => {

  useEffect(() => {

    AOS.init();

  }, [])

  return (
    <section className="w-full h-screen flex items-center justify-center">
        <article data-aos="zoom-in" className="p-7 text-center">
          <p className="md:text-4xl text-2xl mb-4">Welcome to <span className=" font-permanentMarker">THREAT<span className='text-blue-800'>SENSE</span></span></p>
          <p className="md:text-2xl text-lg font-light">Securing the Digital World: One Scan at a Time</p>
          <div className="w-full flex items-center justify-center">
            <div className="cursor-pointer w-1/2 md:text-xl text-base px-7 py-2 rounded-lg bg-cyan-950 mt-4 hover:bg-white hover:text-slate-900 hover:scale-125 transition-all duration-150">
              <Link to={'checkfile'}>Get Started</Link>
            </div>
          </div>
        </article>
    </section>
  )
}

export default Home