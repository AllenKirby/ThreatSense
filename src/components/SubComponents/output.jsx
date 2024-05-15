import { FiUpload } from 'react-icons/fi'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react';
import Success from '../assets/success.json'
import Lottie from 'react-lottie';
import Loaders from './loaders';
import Warning from '../assets/warning.json'


const Output = (props) => {
    const {uploadAgain, output, prompts, generateOutput, generatedOutput} = props
    const [message, setMessage] = useState('')
    const [color, setColor] = useState('')
    const [loaderFlag, setLoaderFlag] = useState(false)
    const [outputContainer, setOutputContainer] = useState(false)

    const successoptions = {
        loop: false,
        autoplay: true,
        animationData: Success,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    const warningoptions = {
        loop: false,
        autoplay: true,
        animationData: Warning,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    useEffect(()=>{
        if(output === false){
            setMessage("Warning! Threat Found on the File")
            setColor('text-red-800')
        }
        else{
            setMessage('No Threats Found!')
            setColor('text-green-800')
        }
    }, [output])

    useEffect(()=>{
        if(generatedOutput){
            setLoaderFlag(false)
        }
    }, [generatedOutput])

  return (
    <section className="w-full h-auto p-10 flex flex-row items-center justify-center transition-all duration-300">
        <div className="w-1/2 h-auto p-7 text-center">
            <div className='w-full flex items-center justify-center'>
                {output ? <Lottie options={successoptions} width={150} height={150}/> : <Lottie options={warningoptions} width={150} height={150}/> }
            </div>
            <p className={`text-2xl font-semibold ${color}`}>{message}</p>
            {output && <div className='w-full h-auto'>
                {Array.isArray(prompts) && prompts.map((prompt, index) => (
                    <button key={index} onClick={() => {generateOutput(prompt); setOutputContainer(true); setLoaderFlag(true);}} className='w-auto h-auto px-10 py-2 text-base bg-slate-800 rounded-xl m-2 hover:bg-white hover:text-slate-800 hover:scale-125 transition-all duration-100'>{prompt}</button>
                ))}
            </div>}
            <div className="w-full flex items-center justify-center my-5">
                <button onClick={uploadAgain} className="md:text-xl text-lg px-7 py-2 rounded-2xl bg-cyan-950 hover:bg-white hover:text-slate-900 hover:scale-125 transition-all duration-150 flex"><FiUpload color='white' className='mr-4'/>Upload Another File</button>
            </div>
            <div className="w-full flex items-center justify-center my-5">
                <button className="md:text-xl text-lg w-auto px-12 py-2 rounded-2xl bg-cyan-950 hover:bg-white hover:text-slate-900 hover:scale-125 transition-all duration-150 flex"><Link to='/'>Return to Home</Link></button>
            </div>
        </div>
        {outputContainer && <div className='w-1/2 h-auto text-center bg-slate-800 rounded-2xl p-5 overflow-auto transition-all duration-300'>
            <p className='text-2xl font-medium my-3'>Generated Output</p>
            {loaderFlag && <Loaders loadertext={"Generating Output"}/>}
            {generatedOutput && 
                <div className='w-full h-auto'>
                    <p className='text-justify'>{generatedOutput}</p>
                </div>}
        </div>}
    </section>
)
}

Output.propTypes = {
    uploadAgain: PropTypes.func.isRequired,
    output: PropTypes.bool.isRequired,
    prompts: PropTypes.array,
    generateOutput: PropTypes.func,
    generatedOutput: PropTypes.string
  };

export default Output
