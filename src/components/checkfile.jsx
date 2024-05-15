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
  const [whichService, setService] = useState('')


  const handleFIleChange= (service, event) => {
    setSelectedFile((prevFiles) => ({
      ...prevFiles,
      [service]: event.target.files[0]
    }));
    setService(service);
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

  const threatSense_func = () => {
    setLoaderFlag(true)
    setUploadFlag(false)
    const formData = new FormData();
    formData.append('file', selectedFile.threatsense);
    console.log("start");
    try{
      axios.post('https://maldetectionml01.pythonanywhere.com/extract',formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
          },
      })
      .then(response => console.log(response.data))
      .catch(error => console.log("error inside threatsense: ", error))
    }catch(error){
      console.log("Error occured in TS: ", error);
    }
    console.log("end");

    // normal = 1
    // malware = 0
  }

  const cloudMersive_func = () =>{
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
        },
        timeout: 0,
      })
      .then(async (response) => {
        if(response){
          
          setLoaderFlag(false)
          setOutputFlag(true)
          const data = response.data;
          console.log(data)
          console.log(data.CleanResult); 
          console.log(data.FoundViruses); 
          setOutput(data.CleanResult)
          await generateQuestions();
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

  const virustotal_func = () => {
    setLoaderFlag(true)
    setUploadFlag(false)
    api_virustotal_key = '7b5adb68edbcdbc0047ff72271a6b072df6f5f794758fcc8541ba5099a1b5cdc'
    const formData = new FormData();
    formData.append('file', selectedFile.virustotal);
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'x-apikey': '7b5adb68edbcdbc0047ff72271a6b072df6f5f794758fcc8541ba5099a1b5cdc'
      }
    };
    
    options.body = form;

    fetch('https://www.virustotal.com/api/v3/files', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
    
  }

  useEffect(()=>{
    const handleSubmit = async () => {
      switch(whichService){
        case 'cloudmersive':
          console.log('cloud');
          cloudMersive_func();
          break;
        case 'virustotal':
          console.log('virus');
          virustotal_func();
          break;
        case 'threatsense':
          console.log('threat');
          threatSense_func();
          break;
      }
    };
    handleSubmit();
  }, [selectedFile])

  const generateQuestions = async () => {
    let Text = await runGenerativeAI("Create 3 questions about virus and malware prevention.");
    let splitText = Text.split("?");
    const filteredText = splitText.filter(item => item != '')
    console.log("hit generating questions")
    setPromptOutput(filteredText)
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