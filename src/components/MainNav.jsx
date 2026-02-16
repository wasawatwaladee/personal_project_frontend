import React from 'react'
import { Link } from 'react-router'
import useUserStore from '../stores/userStore'
import CartCard from './card/cartCard'
import Logoshop from '../img/logoshop.jpg'

const MainNav = () => {
  const logout = useUserStore(state=>state.logout)
  const carts = useUserStore(state=>state.carts)
  const user = useUserStore(state=>state.user)
    
  return (
    <nav className='bg-[#000000]'>
    <div className='mx-auto px-5 py-2 '>

    <div className='flex justify-between h-12  items-center'>

        <div className='text-white'>
            <ul className='flex items-center gap-10'>
                {/* <li>
                <Link to="/" className='text-2xl font-bold'>
                <img src={Logoshop} alt="Logo"  />
                </Link>
                </li> */}
                <li><Link to="/">Home</Link></li>
                <li><Link to="/shop">Shop</Link></li>
                {/* <li><Link to="/checkout">Checkout</Link></li> */}
                
            </ul>
            
        </div>
        

        <div className='text-white'>
            <ul className='flex items-center gap-3'>
                {
                    !user && 
                    <>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/login" >Login</Link></li>
                    </>
                    
                }
                <CartCard />
                <li><Link to="/login" onClick={()=>logout()}>Logout</Link></li>
            </ul>
        </div>

    </div>
    
    </div>
    </nav>
  )
}

export default MainNav