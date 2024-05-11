import {ThreeCircles} from 'react-loader-spinner'

const Loaders = () => {
  return (
    <div className="w-auto h-auto text-center p-7">
          <div className='p-5 flex items-center justify-center'>
            <ThreeCircles
              visible={true}
              height="100"
              width="100"
              innerCircleColor="#ffffff"
              middleCircleColor="#152238"
              outerCircleColor="#0000FF"
              ariaLabel="three-circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
          <p className='md:text-2xl text-xl font-semibold'>Checking the File</p>
          <div className='flex items-center justify-center py-5'>
            <button className='md:text-2xl text-lg px-7 py-2 font-semibold rounded-xl bg-cyan-950 mt-4 hover:bg-white hover:text-slate-900 hover:scale-125 transition-all duration-150'>Go Back</button>
          </div>
        </div>
  )
}
export default Loaders
