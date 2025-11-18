import React from 'react'
import { Outlet } from 'react-router'
import SidebarAdmin from '../components/admin/SidebarAdmin'
import HeaderBar from '../components/admin/HeaderBar'
import MainNav from '../components/MainNav'

const LayoutAdmin = () => {
  return (
    <div className='flex h-screen'>
        <SidebarAdmin />
        <div className='flex-1 flex flex-col'>
        
        {/* <HeaderBar /> */}
        <MainNav />
        <main className='flex-1 p-6 bg-gray-100 overflow-y-auto'>
        <Outlet/>
        </main>

        </div>
    </div>
  )
}

export default LayoutAdmin