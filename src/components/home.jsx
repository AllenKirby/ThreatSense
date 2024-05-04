import { Link } from "react-router-dom"

const home = () => {

  return (
    <section className="w-full h-4/5 flex items-center justify-center">
        <article className="p-7 text-center">
          <p className="md:text-5xl text-3xl mb-4">Welcome to <span className=" font-permanentMarker">THREAT<span className='text-blue-800'>SENSE</span></span></p>
          <p className="md:text-3xl text-xl font-light">Securing the Digital World: One Scan at a Time</p>
          <div className="w-full flex items-center justify-center">
            <div className="cursor-pointer w-1/2 md:text-2xl text-lg px-7 py-2 rounded-lg bg-cyan-950 mt-4 hover:bg-white hover:text-slate-900 hover:scale-125 transition-all duration-150">
              <Link to={'checkfile'}>Get Started</Link>
            </div>
          </div>
        </article>
    </section>
  )
}

export default home