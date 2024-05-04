import { FiUpload } from 'react-icons/fi'
import {useEffect, useState} from 'react'
import axios from 'axios';
import {ThreeCircles} from 'react-loader-spinner'
import { Link } from 'react-router-dom';

const Testnetwork = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loaderFlag, setLoaderFlag] = useState(false);
  const [outputFlag, setOutputFlag] = useState(false)
  const [prediction, setPrediction] = useState(null)
  const [colorFlag, setColorFlag] = useState(false)
  const [output, setOutput] = useState(false)
  const [uploadFlag, setUploadFlag] = useState(true)

  useEffect(()=>{
      if(prediction === 1){
          setOutput("No Malware Found on the File")
          setColorFlag(true)
      }
      else{
          setOutput("Warning! Malware Found on the File")
          setColorFlag(false)
      }
  }, [prediction])

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadFile = () =>{
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = '.exe, .dll';
    input.addEventListener('change', handleFileChange)
    input.click();
  }

  useEffect(()=>{
    setLoaderFlag(false)
  }, [])

  useEffect(()=>{
    const handleSubmit = async () => {

      if(selectedFile){
        setLoaderFlag(true)
        setUploadFlag(false)
        const formData = new FormData();
        formData.append('file', selectedFile);
  
        try {
          const response = await axios.post('https://maldetectionml01.pythonanywhere.com/extract', formData, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          });
          if(response){
            const prediction = response.data.prediction
            setLoaderFlag(false)
            console.log(response.data);
            setPrediction(prediction)
            console.log(prediction)
            setOutputFlag(true)
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
    handleSubmit();
  }, [selectedFile])


  return (
    <section className="w-full h-4/5 flex items-center justify-center">
      {uploadFlag && <div className="w-auto h-auto text-center p-7">
        <p className="md:text-4xl text-xl font-semibold">Upload an .exe or . dll file to <br /> check for potential malware</p>
        <div className='w-full flex items-center justify-center'>
          <button onClick={uploadFile} className="md:text-2xl text-lg px-7 py-2 rounded-2xl bg-cyan-950 mt-4 hover:bg-white hover:text-slate-900 hover:scale-125 transition-all duration-150 flex"><FiUpload color='white' className='mr-4'/> Upload File</button>
        </div>
      </div>
      }
      {loaderFlag && 
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
            <button onClick={() => setLoaderFlag(false)} className='md:text-2xl text-lg px-7 py-2 font-semibold rounded-xl bg-cyan-950 mt-4 hover:bg-white hover:text-slate-900 hover:scale-125 transition-all duration-150'>Go Back</button>
          </div>
        </div>
      }
      {outputFlag && 
        <section className="w-full h-auto flex items-center justify-center">
          <div className="w-auto h-auto p-7">
              <p className={`text-center md:text-2xl text-lg font-semibold  ${colorFlag ? 'text-green-800' : 'text-red-800'}`}>{output}</p>
              <div className="w-full flex items-center justify-center my-5">
                <button onClick={() => {setOutputFlag(false); setUploadFlag(true);} } className="md:text-2xl text-lg px-7 py-2 rounded-2xl bg-cyan-950 mt-4 hover:bg-white hover:text-slate-900 hover:scale-125 transition-all duration-150 flex"><FiUpload color='white' className='mr-4'/>Upload Another File</button>
              </div>
              <div className="w-full flex items-center justify-center my-5">
                <button className="md:text-2xl text-lg w-auto px-12 py-2 rounded-2xl bg-cyan-950 hover:bg-white hover:text-slate-900 hover:scale-125 transition-all duration-150 flex"><Link to='/'>Return to Home</Link></button>
              </div>
          </div>
        </section>
      }
    </section>
  )
}

export default Testnetwork