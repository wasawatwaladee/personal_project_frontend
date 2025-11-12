import React from 'react'
import { Link } from 'react-router'
import useUserStore from '../stores/userStore'

const MainNav = () => {
  const logout = useUserStore(state=>state.logout)
    return (
    <nav className='bg-red-300'>
    <div className='mx-auto px-5 py-2 '>

    <div className='flex justify-between h-12 '>

        <div >
            <ul className='flex items-center gap-3'>
                <li><Link to="/" className='text-2xl font-bold'>Logo</Link></li>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/shop">Shop</Link></li>
                <li><Link to="/cart">Cart</Link></li>
                
            </ul>
        </div>

        <div>
            <ul className='flex items-center gap-3'>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/login" onClick={()=>logout()}>Login</Link></li>
                <li><Link to="/login" onClick={()=>logout()}>Logout</Link></li>
            </ul>
        </div>

    </div>
    
    </div>
    </nav>
  )
}

export default MainNav