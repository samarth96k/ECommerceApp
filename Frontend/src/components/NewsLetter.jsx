import React from 'react'

const NewsLetter = () => {

    const onSubmitHandler = (event)=>{
        event.preventDefault();
    }

  return (
    <div className='text-center'>
        <p className='text-2xl fnot-medium text-gray-800'>Subscribe now and get 20% off.</p>
        <p className='text-gray-400 mt-3'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor reiciendis, eligendi illo omnis quis quae quidem consectetur tempora laudantium deleniti vitae dolores cupiditate ad quisquam deserunt. Aperiam officiis eaque voluptatem.
        </p>
        <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-cent gap-3 mx-auto my-6 border pl-2'>
            <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter your email'/>
            <button type="submit" className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default NewsLetter;