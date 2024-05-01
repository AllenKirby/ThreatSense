import { FiUpload } from 'react-icons/fi'

const Testnetwork = () => {

  const uploadFile = () =>{
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = '.exe, .dll';
    input.click();
  }

  return (
    <section className="w-full h-4/5 flex items-center justify-center">
      <div className="w-auto h-auto text-center p-7">
        <p className="text-4xl font-semibold">Upload an .exe or . dll file to <br /> check for potential malware</p>
        <div className='w-full flex items-center justify-center'>
          <button onClick={uploadFile} className="text-2xl px-7 py-2 rounded-2xl bg-cyan-950 mt-4 hover:bg-white hover:text-slate-900 hover:scale-125 transition-all duration-150 flex"><FiUpload color='white' className='mr-4'/> Upload File</button>
        </div>
      </div>
    </section>
  )
}

export default Testnetwork