import React, { useContext } from 'react'
import { assets } from '../assets/assets'
// eslint-disable-next-line no-unused-vars
import {motion} from "framer-motion";
import { useNavigate } from 'react-router-dom';
import {AppContext} from "../contexts/AppContext"


const Header = () => {

  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate()

  const onClickHandler =() => {
    if (user) {
      navigate('/result')
    }else{
      setShowLogin(true)
    }
  }

  return (
    <motion.div className='flex flex-col justify-center items-center text-center my-20'
      initial={{ opacity: 0.2, y: 100 }}
      transition={{duration:1}}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <motion.div className='text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border hover:scale-105 border-neutral-500 transition-all duration-700 hover:cursor-default'
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.8 }}
      >
        <p>Best Transform Words into Art</p>
        <img src={assets.star_icon} alt="" />
      </motion.div>

      <motion.h1 className='text-4xl max-w-[300px] sm:text-6xl sm:max-w-[590px] mx-auto mt-10 text-center'
        initial={{ opacity: 0}}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.4 }}
      >
        Transform Words into <span className='text-blue-500 font-bold'>Art </span>in seconds.</motion.h1>
      <motion.p className='text-center max-w-xl mx-auto mt-5'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }} 
      >
        Unleash boundless creativity with our AI-powered image generator.Create stunning images from text prompts in seconds.
      </motion.p>
      
      <motion.button 
        onClick={onClickHandler}
        className='sm:text-lg text-white bg-pink-500 w-auto mt-8 px-10  py-2.5 flex items-center gap-2
      rounded-full cursor-pointer hover:scale-105 transition-all duration-700'
        initial={{ opacity: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ opacity: 1 }}
        transition={{default:{duration:0.5}, opacity:{duration:1, delay:1}}}
      >
        Generate Image
        <img src={assets.star_group} alt="Generate Icon" className='w-6 h-6' />
      </motion.button>

      <motion.div className='flex flex-wrap justify-center mt-16 gap-3'>
        {Array(2).fill('').map((item, index) => (
          <motion.img
            key={index}
            whileHover={{ scale: 1.05, duration: 0.1 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className='rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10'
            src={index % 2 === 0 ? assets.sample_img_2 : assets.sample_img_1}
            width={70}
          />
        ))}
      </motion.div>

      <motion.p
        className='mt-2 text-neutral-600'
        initial={{ opacity: 0}}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        Generate image from AimG
      </motion.p>
    </motion.div>
  )
}
export default Header