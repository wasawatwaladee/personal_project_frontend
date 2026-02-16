
import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import useUserStore from '../../stores/userStore'
import {  ShoppingCart } from 'lucide-react';
import { createUserCart } from '../../api/user';
import { toast } from 'react-toastify';
import { Link, Navigate, useNavigate } from 'react-router';
import { set } from 'lodash';




export default function CartCard() {
  const [open, setOpen] = useState(false)

  const carts = useUserStore(state=>state.carts)
  const updateQuantity = useUserStore(state=>state.updateQuantity)
  const removeProduct = useUserStore(state=>state.removeProduct)
  const getTotalPrice = useUserStore(state=>state.getTotalPrice)
  const user = useUserStore(state=>state.user)
  const navigate = useNavigate()


  const handleCart = async()=>{
    console.log('carts', carts)
   
    try {
      if(carts.length===0){
        toast.warning('ไม่มีสินค้าในตะกร้า')
        return
      }
      carts.map(item=>{
      if(!item.isActive){ 
      toast.error('เอาสินค้าที่ไม่มีออกก่อนนะ')
      return
      
      }

      
      if(item.quantity<item.count){
        toast.error("ขออภัย สินค้า "+ item.title +" มีจำนวนไม่เพียงพอ")
        return 
      }
    
      
    })
      await createUserCart({cart:carts})
      toast.success(`Add carts successful`)
      setOpen(false)
      navigate('/checkout')
    } 
      catch (error) {
      console.log(error)
      navigate('/shop')
    }
  }
  return (
    <div>
      <button 
        onClick={() => setOpen(true)}
        className="relative rounded-md bg-gray-950/5 px-2.5 py-1.5 text-sm font-semibold text-white hover:bg-gray-950/10"
      >
       <ShoppingCart className='relative '/>
       {carts.length > 0 && <span className='absolute top-0 right-0 rounded-full bg-red-500 w-[15px]'>{carts.length}</span>}
       
      </button>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
        />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <DialogPanel
                transition
                className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
              >
                <div className="flex h-full flex-col overflow-y-auto bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <DialogTitle className="text-lg font-medium text-gray-900">Shopping cart</DialogTitle>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                        >
                          <span className="absolute -inset-0.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                          
                          {/* Show Product in Cart */}
                          {carts.map((item,index) => {
                            
                            return (
                            <li key={index} className="flex py-6">
                              <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                               
                                 {
                                  item.images &&item.images.length>0
                                  ?<img className='rounded-md w-full h-full object-fill hover:scale-110 hover:duration-200' src={item.images[0].url}/>
                                  :
                                <div className='w-full h-24 bg-gray-200 rounded-md 
                                text-center flex items-center justify-center
                                shadow'>
                                    No image
                                </div>
                                }

                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>{item.title}</h3>
                                    <p className="ml-4">{item.price*item.count}</p>
                                  </div>
                                
                                </div>

                                <div className='text-[12px] text-gray-400'>
                                  <h5>
                                    {item.description}
                                    </h5>
                                </div>
                                
                                
                                <div className="flex flex-1 items-center justify-between text-sm ">
                                  
                                  <p className="text-gray-500">Qty {item.quantity}</p>
                                 
                                  <div className='flex justify-between items-center'>
                                    <button onClick={()=>updateQuantity(item.id,item.count-1)} className='btn' >-</button>
                                    <span className='px-2 py-1'>
                                      
                                      {item.count} 
                                      
                                      </span>
                                    <button onClick={()=>updateQuantity(item.id,item.count+1)} className='btn'>+</button>
                                  </div>

                                  <div className="flex">
                                    <button onClick={()=>removeProduct(item.id)} type="button" className="font-medium text-[#e19c5d] hover:text-[#a07246]">
                                      Remove
                                    </button>
                                  </div>
                                 
                                </div>
                              
                              { item.quantity < item.count ?

                                 <div className='flex justify-center text-red-500'>
                                    Product is out of stock
                                  </div>
                                  : null
                                  // <div>
                                  //   Enjoy
                                  // </div>
                              }
                              </div>

                             
                            </li>
                            )
})}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>{getTotalPrice()}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-[#e19c5d]">Shipping and taxes calculated at checkout.</p>
                    
                    {user ?  
                    <div className="mt-6">
                      <Link >
                      <button onClick={()=>handleCart()}
                            className="flex  w-full items-center justify-center rounded-md border border-transparent bg-[#C55939] px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-[#db914c]"
                          >
                      
                       Checkout
                     

                       </button>
                        </Link>
                    </div>
                    :
                     <div className="mt-6">
                    
                      <Link to={'/login'}>
                      <button 
                            className="flex  w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-[#db914c]"
                          >
                      
                       Login
                     

                       </button>
                        </Link>
                    </div>
                    }
                    
                   
                    
                    
                    
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or{' '}
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="font-medium text-[#e19c5d] hover:text-[#c98b51]"
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

