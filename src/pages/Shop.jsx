import React, { useEffect } from 'react'
import ProductCard from '../components/card/ProductCard'
import useUserStore from '../stores/userStore'
import SearchCard from '../components/card/SearchCard'

const Shop = () => {
  const getProduct = useUserStore(state=>state.getProduct)
  const products = useUserStore(state=>state.products)


  useEffect(()=>{
    getProduct()
  },[])
  
  
  return (
    <div className='flex'>
      
      {/* SearchBy */}
      <div className='w-1/4 p-4 h-screen'>
        <SearchCard />
      </div>

      {/* Product */}
      <div className='w-1/2 p-4 h-screen overflow-y-auto'>
        <p className='text-2xl font-bold mb-4'>Products</p>
        <div className='flex flex-wrap gap-4'>
          {/* Product card */}
            {
              products.map((item,index)=>(

                <ProductCard key={index} item={item}/>
              ))

            }
          
          {/* Product card */}
        </div>
      </div>

      {/* Cart */}
      <div className='w-1/4 p-4 h-screen overflow-y-auto'>
        Cart
      </div>

    </div>
  )
}

export default Shop