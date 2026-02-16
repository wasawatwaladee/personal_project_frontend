import  { useEffect, useState } from 'react'
import useUserStore from '../../stores/userStore'
import { createProduct, removeProduct } from '../../api/product'
import { toast } from 'react-toastify'
import Uploadfile from './Uploadfile'
import { Link } from 'react-router'
import { Loader } from 'lucide-react';




  
const FormProduct = () => {
     const initialState ={
    title: "",
    description: "",
    price:0,
    quantity:0,
    categoryId:"",
    images:[]

    }
    const getCategory = useUserStore(state=>state.getCategory)
    const categories = useUserStore(state=>state.categories)
    const getProduct = useUserStore(state=>state.getProduct)
    const products = useUserStore(state=>state.products)
    const [form,setForm] = useState({
    title: "",
    description: "" ,
    price:0,
    quantity:0,
    categoryId:"",
    images:[]

    })
    
    useEffect(()=>{
        getCategory()
        getProduct()
    },[])
    
    

    const handleOnChange = (e)=>{
        setForm(
            {
                ...form,
                [e.target.name]:e.target.value
            })
        }
        
        const handleSubmit = async(e)=>{

            e.preventDefault();
            try {
                const res = await createProduct(form)
                // console.log('res', res)
                getProduct()
                setForm(initialState)
                toast.success(res.data.product.title + " successfully created")
            } catch (err) { 
                console.log(err)
            }
        }
        
        const handleRemove = async(id)=>{
            try {
                console.log('id', id)
                const res = await removeProduct(id)
                   console.log('res', res) 
                //    console.log('res', res) 
                toast.success(`Deleted ${res.data.newProduct.title} success`)
                getProduct()
                
                
            } catch (err) {
                console.log(err)
            }
        }
        
        
        
        
    
  return (
    <div className='container mx-auto p-4 bg-white shadow-md text-black'>
        <form onSubmit={handleSubmit}>
            <h1>Add product</h1>
            <input 
            placeholder='input name'
            value={form.title}
            name="title"
            onChange={handleOnChange}
            className='border'
            type="text" />
            
            <input 
            placeholder='input description'
            value={form.description}
            name="description"
            onChange={handleOnChange}
            className='border'
            type="text" />
            
            
            <input 
            placeholder='input price'
            value={form.price}
            name="price"
            onChange={handleOnChange}
            className='border'
            type="number" />
           
            <input 
            placeholder='input quantity'
            value={form.quantity}
            name="quantity"
            onChange={handleOnChange}
            className='border'
            type="number" />

            <select 
            className='border'
            value= {form.categoryId}
            name='categoryId'
            onChange={handleOnChange}
            // required
            >
                <option disabled value=''>Please select </option>
                {categories.map(category=>
                    (<option key={category.id} value={category.id}>{category.name}</option>))}
            </select>
            <hr />

            {/* upload image */}
            <Uploadfile form={form} setForm={setForm} />        


            <button  type='submit' className='btn bg-green-600'>Add product</button>
            </form>

            <hr />

<table className="table w-full ">
  <thead>
    <tr className='bg-gray-200'>
      <th>Name</th>
      <th>Image</th>
      <th>Description</th>
      <th>Price</th>
      <th>Sold</th>
      <th>Quantity</th>
      <th>UpdatedAt </th>
      <th>Manage </th>
    </tr>
  </thead>
  <tbody>
    {products.map(product=>(
        <tr key={product.id}>
            <td>{product.title}</td>
            <td>
            {
            product.images.length > 0 ? 
            <img 
            className='w-24 h-24 rounded-md'
            src={product.images[0].url}  />
            :
            <div className='w-24 h-24 rounded-md flex bg-gray-400 items-center justify-center'>
                No image
            </div>
                }
            </td>
            <td>{product.description}</td>
            <td>{product.price}</td>
            <td>{product.sold}</td>
            <td>{product.quantity}</td>
            <td>{product.updatedAt}</td>
            <td>
                {/* <button className='btn bg-blue-500 m-2'><Link to = {`/admin/product/${product.id}`} >  update  </Link></button> */}
                <Link to = {`/admin/product/${product.id}`} ><button className='btn bg-blue-500 m-2'>  update </button></Link>
                <button onClick={()=>handleRemove(product.id)} className='btn bg-red-500'>delete</button>
            </td>
        </tr>
    ))}
    
  </tbody>
</table>
        
    </div>
  )
}

export default FormProduct