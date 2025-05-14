import Navbar from '@/components/Navbar'
import Hero from '@/pages/student/Hero'
import React from 'react'
import { Outlet } from 'react-router'

const Mainlayout = () => {
  return (
    <div>
      <Navbar/>
      <Outlet></Outlet>
    </div>
  )
}

export default Mainlayout
