import Lottie from 'react-lottie'
import PropTypes from 'prop-types'
import Upload from '../assets/upload.json'
import { FiUpload } from 'react-icons/fi'
import { IoMdArrowDropdown } from "react-icons/io";
import { useEffect, useState } from 'react';

const UploadFile = (props) => {
    const {upload} = props
    const [dropdown, setDropDown] = useState(false)
    const [dropdownclick, setDropdownclick] = useState('')

    useEffect(()=>{
      setDropdownclick('cloudmersive')
    }, [])

    const options = {
        loop: true,
        autoplay: true,
        animationData: Upload,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

  return (
    <div data-aos="zoom-in" className="w-auto h-auto text-center p-24 rounded-lg">
      <div className='w-full h-auto relative z-10'>
        <button onClick={() => setDropDown(!dropdown)} className='z-10 float-right w-auto px-8 py-2 rounded-xl text-xl bg-cyan-950 transition-all duration-150 flex'>{dropdownclick === 'cloudmersive' ? 'For Files' : dropdownclick === 'virustotal' ? 'General Scan' : dropdownclick === 'threatsense' ? 'For exe & dll' : '' }<IoMdArrowDropdown className='my-1 ml-2' color='white'/></button>
        <div className={`absolute bg-slate-800 pt-4 flex flex-col -z-10 top-9 right-0 ${dropdown ? 'block' : 'hidden'}`}>
          <button onClick={() => setDropdownclick('cloudmersive')} className='px-7 py-2 bg-slate-800 hover:rounded-xl hover:bg-white hover:text-slate-900 hover:scale-125 transition-all duration-150'>For Files</button>
          <button onClick={() => setDropdownclick('virustotal')}className='px-7 py-2 bg-slate-800 hover:rounded-xl hover:bg-white hover:text-slate-900 hover:scale-125 transition-all duration-150'>General Scan</button>
          <button onClick={() => setDropdownclick('threatsense')}className='px-7 py-2 bg-slate-800 hover:rounded-xl hover:bg-white hover:text-slate-900 hover:scale-125 transition-all duration-150'>For exe & dll </button>
        </div>
      </div>
      
      <Lottie options={options} height={300} width={300}/>
      <p className="md:text-3xl text-xl font-semibold">Upload a file to <br /> check for potential threat</p>
      <div className='w-full flex items-center justify-center'>
        <button onClick={() => upload(dropdownclick)} className="md:text-2xl text-lg px-7 py-2 rounded-2xl bg-cyan-950 mt-4 hover:bg-white hover:text-slate-900 hover:scale-125 transition-all duration-150 flex"><FiUpload color='white' className='mr-4'/> Upload File</button>
      </div>
    </div>
  )
}

UploadFile.propTypes = {
    upload: PropTypes.func.isRequired,
  };

export default UploadFile
