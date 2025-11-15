import React, { useEffect, useState } from 'react'
import useUserStore from '../../stores/userStore'
import { get } from 'react-hook-form'

const SearchCard = () => {
  const getProduct = useUserStore(state=>state.getProduct)
  const products = useUserStore(state=>state.products)
const searchFilters = useUserStore(state=>state.searchFilters)
  const [text,setText] = useState('')
  console.log('text', text)
  //Step 1 search by text
  //Step 2 search by Category
  //search by Price range

  useEffect(()=>{
    
    const timeout = setTimeout(()=>{
        searchFilters({query:text})
  },300)

    getProduct()

  return ()=>clearTimeout(timeout)
  },[text])


    return (
    <div>
        <h1 className='text-xl font-bold mb-4'>Search product</h1>
        
        <input 
        type="text" 
        name='text'
        placeholder='product name...'
        onChange={(e)=>setText(e.target.value)}
        className='border rounded-md w-full mb-4 px-2' />
   
        
   
    </div>
  )
}

export default SearchCard;

