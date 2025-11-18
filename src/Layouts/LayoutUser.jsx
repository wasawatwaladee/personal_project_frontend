import React from 'react'
import { Outlet } from 'react-router'
import MainNav from '../components/MainNav'

const LayoutUser = () => {
  return (
    <div>
       <MainNav />
        <Outlet />
    </div>
  )
}

export default LayoutUser