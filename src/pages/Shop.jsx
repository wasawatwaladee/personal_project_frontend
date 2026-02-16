import React, { useEffect } from 'react'
import ProductCard from '../components/card/ProductCard'
import useUserStore from '../stores/userStore'
import SearchCard from '../components/card/SearchCard'
import CartCard from '../components/card/cartCard'
// import { createUserCart } from '../api/user'

const Shop = () => {
  const getProduct = useUserStore(state=>state.getProduct)
  const products = useUserStore(state=>state.products)
  const user = useUserStore(state=>state.user)

  useEffect(()=>{
    getProduct()
  },[])
  


  console.log('user from Shop page',user)
  
  return (
    <div className='flex'>
     
      {/* SearchBar */}
      <div className='w-1/4 p-4 h-screen'>
        <SearchCard />
       
      </div>
       

      {/* Product Title */}
      <div className='w-3/4 p-4 h-screen overflow-y-auto'>
        <p className='text-2xl font-bold mb-4 text-white'>Menu</p>
        <div className='flex flex-wrap gap-4'>
          {/* Product card */}
            {
              products.map((item,index)=>(

                <ProductCard key={index} item={item}/>
              ))

            }
          
         
        </div>
      </div>

     
 
    </div>
  )
}

export default Shop