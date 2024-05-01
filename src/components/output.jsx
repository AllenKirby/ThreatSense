import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

const Output = () => {
    const {prediction} = useParams();
    const [messageFlag, setMessageFlag] = useState('');
    useEffect(()=>{
        if(prediction === '1'){
            setMessageFlag(true)
        }
        else{
            setMessageFlag(false)
        }
    }, [prediction])
  return (
    <section className="w-full h-4/5 flex items-center justify-center">
        <div className="w-1/2 h-auto p-7">
            {messageFlag && 
                <div className="text-center text-2xl font-semibold text-green-800">
                    <p>No Malware Found on the File</p>
                </div>
            }
            {messageFlag || 
                <div className="text-center text-2xl font-semibold text-red-800">
                    <p>Malware Found on the File</p>
                </div>
            }
        </div>
    </section>
  )
}


export default Output
