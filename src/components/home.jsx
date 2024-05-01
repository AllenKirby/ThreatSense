import { Link } from "react-router-dom"

const home = () => {

  return (
    <section className="w-full h-4/5 p-14 flex items-center justify-center">
        <article className="p-14 text-center">
          <p className="text-5xl mb-4">Welcome to <span className=" font-permanentMarker">THREAT<span className='text-blue-800'>SENSE</span></span></p>
          <p className="text-3xl font-light">Shielding Your Network: A Sentry Against Intrusions</p>
          <div className="w-full flex items-center justify-center">
            <div className="cursor-pointer w-1/2 text-2xl px-7 py-2 rounded-lg bg-cyan-950 mt-4 hover:bg-white hover:text-slate-900 hover:scale-125 transition-all duration-150">
              <Link to={'/checkfile'}>Get Started</Link>
            </div>
          </div>
        </article>
    </section>
  )
}

export default home