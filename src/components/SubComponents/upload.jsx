import Lottie from 'react-lottie'
import PropTypes from 'prop-types'
import Upload from '../assets/upload.json'
import { FiUpload } from 'react-icons/fi'

const UploadFile = (props) => {
    const {upload} = props

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
        <Lottie options={options} height={300} width={300}/>
        <p className="md:text-4xl text-xl font-semibold">Upload an .exe or . dll file to <br /> check for potential malware</p>
        <div className='w-full flex items-center justify-center'>
          <button onClick={upload} className="md:text-2xl text-lg px-7 py-2 rounded-2xl bg-cyan-950 mt-4 hover:bg-white hover:text-slate-900 hover:scale-125 transition-all duration-150 flex"><FiUpload color='white' className='mr-4'/> Upload File</button>
        </div>
      </div>
  )
}

UploadFile.propTypes = {
    upload: PropTypes.func.isRequired,
  };

export default UploadFile
