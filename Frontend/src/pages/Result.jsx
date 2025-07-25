import React,{useState} from 'react';
import { assets } from '../assets/assets';
// eslint-disable-next-line no-unused-vars
import {motion} from "framer-motion";
import { useContext } from 'react';
import { AppContext } from "../contexts/AppContext.jsx";


const Result = () => {

  const[image, setImage] = useState(assets.logo);
  const[isImageLoaded, setIsImageLoaded] = useState(false);
  const[loading, setLoading] = useState(false);
  const[input, setInput] = useState('');

  const{generateImage}= useContext(AppContext)

  const onsubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true);

    if(input){
      const image = await generateImage(input) 
      if(image){
        setIsImageLoaded(true)
        setImage(image)
      }
    }
    setLoading(false);
  }

  return (
    <motion.form 
      onSubmit={onsubmitHandler}
      className='flex flex-col min-h-[72vh] justify-center items-center'
    >
      <div>
        <div className='relative'>
          <img src={image} alt="" className='max-w-sm rounded'/>
          <span className={`absolute bottom-0 left-0 h-1 bg-red-500 ${loading ? 'w-full transition-all duration-[10s]': 'w-0'}`} />
        </div>
        <p className={!loading ? "hidden" : ""}>Generating...</p>
      </div>

      {!isImageLoaded && 
        <div className='flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full'>
          <input onChange={e => setInput(e.target.value)} value={input} type='text' placeholder='Describe your idea, and our AI will generate it!' className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder:color' />
          <button type='submit' className='bg-pink-700 px-10 sm:px-16 py-3 rounded-full'>Generate</button>
        </div>}

      {isImageLoaded && 
        <div className='flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full'>
          <p onClick={()=>{setIsImageLoaded(false)}} className='bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer'>Generate Another</p>
          <a href={image} download className='bg-yellow-900 px-10 py-3 rounded-full cursor-pointer'>Download</a>
        </div> }
    </motion.form>
  );
}

export default Result;

