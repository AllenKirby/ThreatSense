import {useEffect, useState} from 'react'
import axios from 'axios';
import { FiUpload } from 'react-icons/fi'
import { Link } from 'react-router-dom';


//sub-components
import Loaders from './SubComponents/loaders';
import UploadFile from './SubComponents/upload';


import { GoogleGenerativeAI } from '@google/generative-ai';
const API_KEY_GEMINI = 'AIzaSyCE9JE3wzlsy5XcOVatjltLPSESgfwAjW0';

const genAI = new GoogleGenerativeAI(API_KEY_GEMINI);


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
    input.accept = '.exe, .dll, .pdf';
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
        formData.append('inputFile', selectedFile, "file");
        
        console.log("start");
        try {
          axios.post('https://api.cloudmersive.com/virus/scan/file/advanced', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Apikey': '874630e7-9a60-457c-a096-c79f2274c161',
                // Add other headers as needed
            },
            timeout: 0, // Adjust timeout as needed
            // You may add other options like responseType, onUploadProgress, etc.
          })
          .then(response => {
            console.log(response.data); // Handle the response as needed
          })
          .catch(error => {
              console.error('Error uploading file:', error);
          });
        } catch (error) {
          console.error(error);
        }
        console.log("end");
        runGenerativeAI();
      }
    };
    handleSubmit();
  }, [selectedFile])

  const runGenerativeAI = async () => {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const prompt = 'Write a short phrase about awareness in downloading and executing a suspicious pdf file';
    
    try {
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        console.log(text);
    } catch (error) {
        console.error('Error generating content:', error);
    }
};

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