import React from 'react'
import SideBar from '../SideBar'
import Header from '../Header'

type Props = {
    children : React.ReactNode
}

export default function Layout({children}: Props) {
  return (
    <>
        <div className='flex justify-between'>
          <SideBar/>
          <Header/>
        </div>
          {children}
          
    </>
  )
}