import React from 'react'
import {stepsData } from '../assets/assets'
// eslint-disable-next-line no-unused-vars
import {motion} from "framer-motion";


export const Step = () => {
  return (
    <motion.div
      className='flex flex-col justify-center items-center my-32'
      initial={{ opacity: 0.2, y: 100 }}
      transition={{duration:1}}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h1 className='text-black-700 inline-flex text-3xl sm:text-0xl font-bold text-center gap-2 bg-white px-28 py-4 rounded-full border hover:scale-105 border-neutral-500 transition-all duration-700'>
        How AI Magic Works
      </h1>
      <p className='text-lg text-gray-600 mb-8'>
        Trasform your words into stunning images with our AI-powered image generator. 
      </p>
      <div
        className='space-y-4 w-full max-w-3xl text-sm'
      >
        {stepsData.map((item, index) => (
          <div key={index} className='flex items-center gap-4 p-5 px-8 bg-white/20 shadow-md border border-gray-200 cursor-pointer hover:scale-[1.02] transition-all duration-300 rounded-lg'>
            <img width={40} src={item.icon} alt="" />
            <h2 className='text-xl font-medium'>{item.title}</h2>
            <p className='text-blue-600'>{item.description}</p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
