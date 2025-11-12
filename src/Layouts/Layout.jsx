import React from 'react'
import { Outlet } from 'react-router'
import MainNav from '../components/MainNav'

const Layout = () => {
  return (
    <div>
        <MainNav />
        <main >
        <Outlet />
        </main>
    </div>
  )
}

export default Layout