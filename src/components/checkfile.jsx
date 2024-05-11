import {useEffect, useState} from 'react'
import axios from 'axios';
import { FiUpload } from 'react-icons/fi'
import { Link } from 'react-router-dom';


//sub-components
import Loaders from './SubComponents/loaders';
import UploadFile from './SubComponents/upload';

const Testnetwork = () => {       
  const [selectedFile, setSelectedFile] = useState(null);
  const [loaderFlag, setLoaderFlag] = useState(false);
  const [outputFlag, setOutputFlag] = useState(false)
  const [color, setColor] = useState('')
  const [output, setOutput] = useState(false)
  const [uploadFlag, setUploadFlag] = useState(true)
  const [predictionData , setPredictionData] = useState({
    malicious: null, 
    confirmed_timeout: null, 
    failure: null, 
    harmless: null, 
    suspicious: null, 
    timeout: null, 
    type_unsupported: null, 
    undetected: null
  })
 

  useEffect(()=>{
      if(predictionData.malicious > 0){
        setOutput("Warning! Malware Found on the File")
        setColor('text-red-800')
      }
      else{
        setOutput("No Malware Found on the File")
        setColor('text-green-800')
      }
  }, [predictionData.malicious])

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
        console.log("start");
        try {
          await axios.post('https://maldetectionml01.pythonanywhere.com/extract_data', formData, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          }).then(response => {
            if (response){
              setLoaderFlag(false)
              console.log('Response data:', response.data);
              console.log(response.data.extracted_values.data.attributes.stats.malicious)
              const res = response.data.extracted_values.data.attributes.stats;
              
              setPredictionData({malicious: res.malicious, confirmed_timeout: res.confirmed_timeout, failure: res.failure, harmless: res.harmless, suspicious: res.suspicious, timeout: res.timeout, type_unsupported: res.type_unsupported, undetected: res.undetected})
              setOutputFlag(true)
            }
          }).catch(error =>{
            console.error('Error:', error);
          });
          console.log("end");
        } catch (error) {
          console.error(error);
        }
      }
    };
    handleSubmit();
  }, [selectedFile])


  return (
    <section className="w-full h-4/5 flex items-center justify-center">
      {uploadFlag && <UploadFile upload={uploadFile} />}
      {loaderFlag && <Loaders />}
      {outputFlag && 
        <section className="w-full h-auto flex items-center justify-center">
          <div className="w-auto h-auto p-7">
              <p className={`text-center md:text-2xl text-lg font-semibold  ${color}`}>{output}</p>
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