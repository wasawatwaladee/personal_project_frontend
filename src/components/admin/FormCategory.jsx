import React, { useEffect, useState } from 'react'
import useUserStore from '../../stores/userStore'
import { createCategory, listCategory, removeCategory } from '../../api/Category'
import { toast } from 'react-toastify'

const FormCategory = () => {
    const [name,setName] = useState('')
    const token = useUserStore(state=>state.token)
    const [categories,setCategories] = useState([])
    
    useEffect(()=>{
        getCategory(token)
    },[token])

    const getCategory = async(token)=>{
        try {
            const res = await listCategory(token)
            setCategories(res.data)

        } catch (err) {
            console.log(err)
        }
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        if(!name){
            return toast.warning('Please fill data')
        }
        
        try {
            const res = await createCategory(token,{name})
            toast.success(`Add Category ${res.data.name} success!!!`)
            setName('')
            getCategory(token)
        } catch (err) {
            console.log(err)
        }
    }

    const handleRemove = async(id)=>{
        try {
           const res = await removeCategory(token,id) 
           toast.success(`Deleted ${res.data.name} success`)
           getCategory(token)

        } catch (err) {
            console.log(err)
        }
    }

    return (
    <div className='container mx-auto p-4 bg-white shadow-md'>
        <h1>Category Management</h1>
        <form className='my-4' onSubmit={handleSubmit}>
            <input 
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className='border' type="text" />

            <button className='bg-blue-500'>Add Category</button>
        </form>

        <hr />

        <ul className='list-none'>
            {
                categories.map((item,index)=>(

                <li 
                className='flex justify-between my-2'
                key={index}>
                    <span>
                    {item.name}
                    </span>
                    <button
                    className='bg-red-500'
                    onClick={()=>handleRemove(item.id)}>Delete</button>
                </li>
                )
                )
            }
        </ul>
    </div>
  )
}

export default FormCategory


/* const FormCategory = () => {
  return (
    <div>FormCategory</div>
  )
}

export default FormCategory */
