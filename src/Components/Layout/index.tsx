import React from 'react'
import SideBar from '../SideBar'
import Header from '../Header'

type Props = {
    children : React.ReactNode
}

export default function Layout({children}: Props) {
  return (
    <>
        <Header/>
        <SideBar/>
        {children}
    </>
  )
}