import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div>
            <div className=' flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

                <div>
                    <div className=' flex items-center gap-4 mb-3'>
                        <img src={assets.logo} className=' w-26 mb-2' alt="" />
                        <p className=' text-2xl font-medium prata-bold'>BanNaiDin</p>

                    </div>
                    <p className=' w-full md:w-2/3 text-gray-600'>
                        BanNaiDin Book Center <br />
                        Softnova Road, Softnova Subdistrict, Softnova District, Bangkok 10000 <br />
                        Founded 1 August 1999
                    </p>
                </div>

                <div>
                    <p className=' text-xl font-medium mb-5'>COMPANY</p>
                    <ul className=' flex flex-col gap-1 text-gray-600'>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                <div>
                    <p className=' text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>+66-12-345-6789</li>
                        <li>contact@bannaidin.com</li>
                    </ul>
                </div>

            </div>
            <div>
                <hr className=' text-gray-300' />
                <p className=' py-5 text-sm text-center'>Copyright 2025@ bannaidin.com - All Right Reserved.</p>
            </div>
        </div>
    )
}

export default Footer