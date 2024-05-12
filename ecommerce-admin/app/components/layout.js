'use client'
import Image from 'next/image'
import { useSession, signIn, signOut } from 'next-auth/react'
import Nav from './nav';
import { useState } from 'react';
import Logo from './logo';



export default function HomeLayout({children}) {
  const [showNav,setShowNav] = useState(false);
  const {data: session} = useSession();
  if(!session){
    return (
      <div className='bg-cyan-800 w-screen h-screen flex items-center'>
        <div className='text-center w-full'>
          <button onClick={()=> signIn('google')} className='bg-white rounded-lg p-2 px-4'>Login with google</button>
        </div>
      </div>
    )
  }
  return (
    <div className='min-h-screen bg-cyan-800 '>
      <div className='md:hidden flex items-center p-2'>
      <button className='border-4 rounded-lg p-1 text-white' onClick={()=> setShowNav(true)}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
      </button>
      <div className='flex grow justify-center mr-6'>
      <Logo/>
      </div>
      </div>
      
    <div className='flex'>
      <Nav show={showNav} />
      <div className='bg-white flex-grow mt-2 mr-2 mb-2 ml-2 md:ml-0 rounded-lg p-4'>
      {children}
      </div>
    </div>
    </div>
    
  )
}
