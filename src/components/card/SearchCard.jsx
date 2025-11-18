import React, { useEffect, useState } from 'react'
import useUserStore from '../../stores/userStore'
import { get } from 'react-hook-form'
import CartCard from './cartCard'

const SearchCard = () => {
  const getProduct = useUserStore(state=>state.getProduct)
  const products = useUserStore(state=>state.products)
  const searchFilters = useUserStore(state=>state.searchFilters)
  const getCategory = useUserStore(state=>state.getCategory)
  const categories = useUserStore(state=>state.categories)
  
  const [text,setText] = useState('')
  const [categorySelected,setCategorySelected] = useState([])

  //Step 1 search by text
  
  //search by Price range
  useEffect(()=>{
    getCategory()
  },[])

  useEffect(()=>{
    
   const timeout = setTimeout(()=>{
      if (!text) {
        // ถ้า text ว่าง โหลด default
        getProduct()
      } else {
        searchFilters({query:text})
      }
    },300)
    
  return ()=>clearTimeout(timeout)
  },[text])



    // Step 2 search by Category 
    const handleCheck=(e)=>{

    const inCheck = e.target.value; // ค่าที่เรา ติ๊ก
    console.log('inCheck', inCheck)
    const inState = [...categorySelected]; // [1,2,3] arr ว่าง
    console.log('inState', inState)
    const findCheck = inState.indexOf(inCheck); // ถ้าไม่เจอ จะ return -1
    console.log('findCheck', findCheck)

    if (findCheck === -1) {
      inState.push(inCheck);
    } else {
      inState.splice(findCheck, 1);
    }
    setCategorySelected(inState);

    if (inState.length > 0) {
      searchFilters({ category: inState });
    } else {
      getProduct();
    }
  };
  // console.log(categorySelected)
  return (
  // <div>
  //     <h1 className='text-xl font-bold mb-4'>Search product</h1>
      
  //     <input 
  //     type="text" 
  //     name='text'
  //     placeholder='product name...'
  //     onChange={(e)=>setText(e.target.value)}
  //     className='border rounded-md w-full mb-4 px-2' />
 
  //     <hr />
  //     {/* Step 2 search by Category */}
  //     <div>
  //     <h1>Category</h1>
  //     {
  //      categories.map((item,index)=>(
  //         <div key={index} className='flex gap-2'>
  //             <input 
  //             onChange={handleCheck}
  //             type="checkbox" 
  //             value={item.id}
  //             />
              
  //             <label >{item.name}</label>
  //         </div>
  //      ))   
              
                  
  //     }
  //     </div>
 
  // </div>
  <div className="bg-white p-6 rounded-2xl shadow-md border border-[#edb394]">
  <h1 className="text-2xl font-bold mb-4 text-[#C55939]">Search Product</h1>
  
  <input
    type="text"
    name="text"
    placeholder="Search product name..."
    onChange={(e) => setText(e.target.value)}
    className="border border-[#e19c5d] rounded-lg w-full mb-4 px-3 py-2 
               focus:ring-2 focus:ring-[#edb394] focus:outline-none"
  />

  <hr className="border-[#f1e3c7] mb-4" />

  <div>
    <h2 className="text-lg font-semibold mb-2 text-[#C55939]">Category</h2>

    {categories.map((item, index) => (
      <div key={index} className="flex gap-3 items-center mb-2">
        <input
          onChange={handleCheck}
          type="checkbox"
          value={item.id}
          className="w-4 h-4 accent-[#C55939] cursor-pointer"
        />
        <label className="text-stone-700">{item.name}</label>
      </div>
    ))}
  </div>
</div>

)
    }



export default SearchCard;

