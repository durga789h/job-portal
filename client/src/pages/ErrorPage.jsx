import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'

const Errorpage = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-red-500 text-white'>
      <div className='text-center'>
        <h1 className='text-4xl font-bold'>PAGE NOT FOUND</h1>
        <h2 className='text-2xl font-bold'>ERROR 404</h2>
        <p className='my-4'>
          Oops! You are trying to access a page that does not exist.
        </p>
        <Link to={'/'}>
          <Button buttonText='Home Page' />
        </Link>
        <Link to={'/contacts'} className='mt-4'>
          <Button buttonText='Report Problem' />
        </Link>
      </div>
    </div>
  )
}

export default Errorpage
