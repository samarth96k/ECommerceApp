import React from 'react'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text md:text-base text-gray-700'>
        <div>
            <img src="exchange-svgrepo-com.svg" className='w-12 m-auto mb-5' alt="" />
            <p className='font-semibold'>Easy Exchange Policy</p>
            <p className='text-gray-400'>We offer hassle free exchange policy</p>
        </div>
        <div>
            <img src="clock-svgrepo-com.svg" className='w-12 m-auto mb-5' alt="" />
            <p className='font-semibold'>7 Days Return Policy</p>
            <p className='text-gray-400'>We offer 7 Day free return policy</p>
        </div>
        <div>
            <img src="customer-service-svgrepo-com.svg" className='w-12 m-auto mb-5' alt="" />
            <p className='font-semibold'>Best Customer Support</p>
            <p className='text-gray-400'>We orivide 24/7 customer support</p>
        </div>
    </div>
  )
}

export default OurPolicy