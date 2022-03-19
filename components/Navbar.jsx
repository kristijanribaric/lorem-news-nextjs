import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className='bg-black py-4'>
        <ul className='flex justify-end'>
            <li>
                <Link href='/'><a className='py-4 px-6 mx-2 hover:bg-white hover:rounded-b-3xl hover:text-black text-white transition-all duration-200'>Home</a></Link>
            </li>
            <li >
                <Link href='/about'><a className='py-4 px-6 mx-2 hover:bg-white hover:rounded-b-3xl hover:text-black text-white transition-all duration-200'>About</a></Link>
            </li>
            <li >
                <Link href='/upload'><a className='py-4 px-6 mx-2 hover:bg-white hover:rounded-b-3xl hover:text-black text-white transition-all duration-200'>Upload</a></Link>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar