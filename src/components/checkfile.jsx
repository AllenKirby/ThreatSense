import {useEffect, useState} from 'react'
import axios from 'axios';


//sub-components
import Loaders from './SubComponents/loaders';
import UploadFile from './SubComponents/upload';
import Output from './SubComponents/output';


import { GoogleGenerativeAI } from '@google/generative-ai';
import Errorpage from './errorpage';
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
  const [errormessage, setErrormessage] = useState('')


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
    input.accept = service === 'cloudmersive' ?  '.pdf, .docx, .xlsx, .pptx, .html, .swf, .zip, .rar, .dmg, .tar' 
                : service === 'threatsense' ? '.exe, .dll' 
                : service === 'virustotal' ? '' : '' ;
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
    console.log(selectedFile.threatsense);
    try{
      axios.post('https://maldetectionml01.pythonanywhere.com/extract',formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
          },
      })
      .then(async(response)=> {
        if(response){
          setLoaderFlag(false)
          setOutputFlag(true)
          console.log(response.data)
          const prediction = response.data.prediction;
          console.log(prediction)
          setOutput('')
          setOutput(prediction)
          const filetype = whichService === 'cloudmersive' ?  '.pdf, .docx, .xlsx, .pptx, .html, .swf, .zip, .rar, .dmg, .tar' 
          : whichService === 'threatsense' ? '.exe, .dll' 
          : whichService === 'virustotal' ? 'any' : '' ;
          await generateQuestions(filetype);
          setErrormessage('')
        }
      })
      .catch(error => {
        console.log("error inside threatsense: ", error)
        setOutput('')
        setErrormessage(error)
      })
    }catch(error){
      console.log("Error occured in TS: ", error);
      setOutput('')
      setErrormessage(error)
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
    console.log(selectedFile.cloudmersive)
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
          const filetype = whichService === 'cloudmersive' ?  '.pdf, .docx, .xlsx, .pptx, .html, .swf, .zip, .rar, .dmg, .tar' 
          : whichService === 'threatsense' ? '.exe, .dll' 
          : whichService === 'virustotal' ? 'any' : '' ;
          await generateQuestions(filetype);
          setErrormessage('')
        }
        
      })
      .catch(error => {
          console.error('Error uploading file:', error);
          setOutput('')
          setErrormessage(error)
      });
    } catch (error) {
      console.error(error);
      setOutput('')
      setErrormessage(error)
    }
    console.log("end");
  }

  // const upload_file_vt = () => {
  //   const vtformData = new FormData();
  //   vtformData.append('file', selectedFile.virustotal);
  //   const options1 = {
  //     method: 'POST',
  //     headers: {
  //       accept: 'application/json',
  //       'x-apikey': '7b5adb68edbcdbc0047ff72271a6b072df6f5f794758fcc8541ba5099a1b5cdc'
  //     }
  //   };
    
  //   options1.body = vtformData;

  //   fetch('https://www.virustotal.com/api/v3/files', options1)
  //   .then(response => response.json())
  //   .then(response => {
  //     console.log(response['data']['id'])
  //     console.log(response['data'])
  //     console.log(response['data']['links']['self'])
  //     console.log('before option2')
  //     const options2 = {
  //       method: 'GET',
  //       headers: {
  //         accept: 'application/json',
  //         'x-apikey': '7b5adb68edbcdbc0047ff72271a6b072df6f5f794758fcc8541ba5099a1b5cdc'
  //       }
  //     };

  //     fetch(response['data']['links']['self'], options2)
  //     .then(response => response.json())
  //     .then(async (response) => {
  //       if(response){
  //         setLoaderFlag(false)
  //         setOutputFlag(true)
  //         const res = response.data
  //         const prediction = res.attributes.stats.malicious === 0 ? true : false
  //         console.log(prediction)
  //         setOutput(prediction)
  //         await generateQuestions();
  //       }
  //     })
  //     .catch(err => console.error(err));

  //     })
  //   .catch(err => {
  //     console.error(err)
      
  //   });
  // }

  const virustotal_func = () => {
    setLoaderFlag(true)
    setUploadFlag(false)
    // upload_file_vt();
    const formData = new FormData();
    formData.append('file', selectedFile.virustotal);
    console.log("start");
    console.log(selectedFile.virustotal);
    try{
      axios.post('https://maldetectionml01.pythonanywhere.com/extract_data',formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
          },
      })
      .then(async(response)=> {
        if(response){
          setLoaderFlag(false)
          setOutputFlag(true)
          console.log(response.data)
          const prediction = response.data.extracted_values.data.attributes.stats.malicious;
          console.log(prediction)
          setOutput('')
          setOutput(prediction === 0 ? true : false)
          const filetype = whichService === 'cloudmersive' ?  '.pdf, .docx, .xlsx, .pptx, .html, .swf, .zip, .rar, .dmg, .tar' 
          : whichService === 'threatsense' ? '.exe, .dll' 
          : whichService === 'virustotal' ? 'any' : '' ;
          await generateQuestions(filetype);
          setErrormessage('')
        }
      })
      .catch(error => {
        console.log("error inside threatsense: ", error)
        setOutput('')
        setErrormessage(error)
      })
    }catch(error){
      console.log("Error occured in TS: ", error);
      setOutput('')
      setErrormessage(error)
    }
    console.log("end");
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

  const generateQuestions = async (filetype) => {
    let Text = await runGenerativeAI(`Create 3 questions about prevention of virus and malware that maybe included to your ${filetype} downloaded files from the internet.`);
    let splitText = Text.split("?");
    const filteredText = splitText.filter(item => item != '')
    console.log("hit generating questions")
    setPromptOutput(filteredText)
  }

  const generateOutput = async (prompt) => {
    setGeneratedOutput('')
    const text = await runGenerativeAI(prompt + "Make it a paragraph form and do not use list formatting")
    console.log(text)
    setGeneratedOutput(text)
  }

  const generateSuggestion = async () => {
    setGeneratedOutput('')
    const text = await runGenerativeAI("Create a paragraph about the uploaded file contains a virus or malware and include how to handle or remove the uploaded file")
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
      setErrormessage(error)
      return error
  }
};

  return (
    <section className="w-full h-screen flex items-center justify-center">
        {uploadFlag && <UploadFile upload={uploadFile}/>}
        {loaderFlag && <Loaders loadertext={"Checking the File"} />}
        {outputFlag && <Output 
        uploadAgain={uploadAgain} 
        output={output} 
        prompts={promptOutput} 
        generateOutput={generateOutput} 
        generatedOutput={generatedOutput}
        generateSuggestion={generateSuggestion}/>}

        {errormessage && <Errorpage error={errormessage}/>}

    </section>
  )
}

export default Testnetwork