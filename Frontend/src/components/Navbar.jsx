import React from 'react'
import {assets} from '../assets/assets'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <div>
      <Link to='/'>
        <img src={assets.logo} alt="Logo" className='w-28 sm:w-32 lg:w-40' />
      </Link>
      <div>
        <div>
          <button>
            <img src={assets.credit_star} alt="Creidit"/>
            <p>Credit left : 5</p>
          </button>
          <p>
            Hi, Priyansh
          </p>
          <div>
            <img src={assets.profile_icon} alt="profile" className=' w-10 drop-shadow-2xl' />
          </div>
        </div>
      </div>
    </div>
  )
}
