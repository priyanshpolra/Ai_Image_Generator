
// eslint-disable-next-line no-unused-vars
import {motion} from "framer-motion";
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

function GeneratedBtn() {
  
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{opacity:0.2, y:100}}
      transition={{duration:1}}
      whileInView={{opacity:1, y:0}}
      viewport={{once:true}}
      className='pb-16 text-center'>
      <h1 className='text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-neutral-800 py-6 md:py-16'>
        See the Magic, Try NOw
      </h1>
      <button onClick={()=>navigate('/buy')} className='inline-flex items-center gap-2 px-12 py-3 rounded-full bg-pink-500 text-white m-auto hover:scale-105 transition-all duration-500 cursor-pointer' 
        >Subscribe Now
        <img src={assets.star_group} className='w-6 h-6' alt="" />
      </button>
    </motion.div>
  )
}

export default GeneratedBtn

