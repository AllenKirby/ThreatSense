import {useEffect, useState} from 'react'
import axios from 'axios';


//sub-components
import Loaders from './SubComponents/loaders';
import UploadFile from './SubComponents/upload';
import Output from './SubComponents/output';


import { GoogleGenerativeAI } from '@google/generative-ai';
const API_KEY_GEMINI = 'AIzaSyCE9JE3wzlsy5XcOVatjltLPSESgfwAjW0';

const genAI = new GoogleGenerativeAI(API_KEY_GEMINI);


const Testnetwork = () => {       
  const [selectedFile, setSelectedFile] = useState({cloudmersive: null, virustotal: null, threatsense: null});
  const [loaderFlag, setLoaderFlag] = useState(false);
  const [outputFlag, setOutputFlag] = useState(false)
  const [uploadFlag, setUploadFlag] = useState(true)
  const [output, setOutput] = useState('')
  const [promptOutput, setPromptOutput] = useState('')
  const [generatedOutput, setGeneratedOutput] = useState('')


  const handleFIleChange= (service, event) => {
    setSelectedFile((prevFiles) => ({
      ...prevFiles,
      [service]: event.target.files[0]
    }));
  };

  const uploadFile = (service) =>{
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf, .docx, .xlsx, .pptx, .html, .swf, .zip, .rar, .dmg, .tar, .exe, .dll';
    input.addEventListener('change', (event) => handleFIleChange(service, event))
    input.click();
  }
  const uploadAgain = () => {
    setOutputFlag(false); 
    setUploadFlag(true);
  }

  useEffect(()=>{
    setLoaderFlag(false)
  }, [])


  useEffect(()=>{
    const handleSubmit = async () => {
      if(selectedFile.cloudmersive){
        setLoaderFlag(true)
        setUploadFlag(false)
        const formData = new FormData();
        formData.append('inputFile', selectedFile.cloudmersive, "file");
        
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
            if(response){
              setLoaderFlag(false)
              setOutputFlag(true)
              const data = response.data;
              console.log(data)
              console.log(data.CleanResult); 
              console.log(data.FoundViruses); 
              setOutput(data.CleanResult)
              generateQuestions();
            }
          })
          .catch(error => {
              console.error('Error uploading file:', error);
          });
        } catch (error) {
          console.error(error);
        }
        console.log("end");
      }
    };
    handleSubmit();
  }, [selectedFile.cloudmersive])

  const generateQuestions = async () => {
    if(output){
      let Text = await runGenerativeAI("Create 3 questions about virus and malware prevention.");
      let splitText = Text.split("?");
      const filteredText = splitText.filter(item => item != '')
      setPromptOutput(filteredText)
    }
  }

  const generateOutput = async (prompt) => {
    setGeneratedOutput('')
    const text = await runGenerativeAI(prompt + "Make it a paragraph form")
    console.log(text)
    setGeneratedOutput(text)
  }

  const runGenerativeAI = async (prompt) => {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    try {
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      return text;
  } catch (error) {
      console.error('Error generating content:', error);
      return error
  }
};

  return (
    <section className="w-full h-4/5 flex items-center justify-center">
        {uploadFlag && <UploadFile upload={uploadFile} />}
        {loaderFlag && <Loaders loadertext={"Checking the File"} />}
        {outputFlag && <Output uploadAgain={uploadAgain} output={output} prompts={promptOutput} generateOutput={generateOutput} generatedOutput={generatedOutput}/>}
    </section>
  )
}

export default Testnetwork