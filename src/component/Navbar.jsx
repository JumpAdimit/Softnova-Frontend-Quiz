import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {

  const { getCartCount, showSearch, setShowSearch } = useContext(ShopContext)

  const [showSidebar, setShowSidebar] = useState(false)

  return (
    <div className=' flex items-center justify-between py-5 font-medium'>

      <Link to='/' className=' flex items-center gap-4'>
        <img src={assets.logo} className=' w-22 sm:w-24 md:w-28' alt="" />
        <p className=' text-xl sm:text-2xl md:text-3xl prata-bold'>BanNaiDin</p>
      </Link>

      <ul className=' hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink to='/' className=' flex flex-col gap-1 items-center' >
          <p className=' font-medium'>Home</p>
          <hr className=' w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/book' className=' flex flex-col gap-1 items-center' >
          <p className=' font-medium'>Book</p>
          <hr className=' w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
      </ul>

      <div className=' flex gap-5 text-sm text-gray-700 items-center'>
        <Link to='/book'><img onClick={() => setShowSearch(!showSearch)} src={assets.search_icon} className=' w-5 cursor-pointer' alt="" /></Link>
        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} className=' w-5 cursor-pointer' alt="" />
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
        </Link>
        <img onClick={() => setShowSidebar(true)} src={assets.menu_icon} className=' w-5 cursor-pointer sm:hidden' alt="" />
      </div>

      {/* Sidebar for Small Screen */}
      <div className={` absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${showSidebar ? 'w-full' : 'w-0'}`}>
        <div className=' flex flex-col text-gray-600'>
          <div onClick={() => setShowSidebar(false)} className=' flex items-center gap-4 p-3 cursor-pointer'>
            <img className=' h-4 rotate-180' src={assets.dropdown_icon} alt="" />
            <p>Back</p>
          </div>
          <NavLink onClick={() => setShowSidebar(false)} className='py-4 pl-6 border-0' to='/'>Home</NavLink>
          <NavLink onClick={() => setShowSidebar(false)} className='py-4 pl-6 border-0' to='/Book'>Book</NavLink>
        </div>
      </div>

    </div>

  )
}

export default Navbar