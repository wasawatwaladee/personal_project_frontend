import  { useEffect, useState } from 'react'
import useUserStore from '../../stores/userStore'
import { createProduct, removeProduct } from '../../api/product'
import { toast } from 'react-toastify'
import Uploadfile from './Uploadfile'



   const initialState ={
    title: "",
    description: "",
    price:"",
    quantity:"",
    categoryId:"",
    images:[]

    }
const FormProduct = () => {
    const token = useUserStore(state=>state.token)
    const getCategory = useUserStore(state=>state.getCategory)
    const categories = useUserStore(state=>state.categories)
    const getProduct = useUserStore(state=>state.getProduct)
    const products = useUserStore(state=>state.products)
    const [form,setForm] = useState(initialState)
    // console.log('products', products)
 
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
            const res = await createProduct(token,form)
            // console.log('res', res)
            getProduct(token)
            setForm(initialState)
            toast.success(res.data.product.title + " successfully created")
        } catch (err) { 
            console.log(err)
        }
    }

      const handleRemove = async(id)=>{
            try {
               const res = await removeProduct(token,id)
            //    console.log('res', res) 
            //    console.log('res', res) 
               toast.success(`Deleted ${res.data.product.title} success`)
               getProduct(token)
    
            } catch (err) {
                console.log(err)
            }
        }


    useEffect(()=>{
        getCategory(token)
        getProduct(token)
    },[token])
    
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
            required>
                <option disabled value=''>Please select </option>
                {categories.map(category=>
                    (<option key={category.id} value={category.id}>{category.name}</option>))}
            </select>
            <hr />

            {/* upload image */}
            <Uploadfile form={form} setForm={setForm} />        


            <button  className='bg-green-600'>Add product</button>
            

            <hr />

<table className="table-auto">
  <thead>
    <tr>
      <th>Name</th>
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
            <td>{product.description}</td>
            <td>{product.price}</td>
            <td>{product.sold}</td>
            <td>{product.quantity}</td>
            <td>{product.updatedAt}</td>
            <td>
                <button  className='btn'>update</button>
                <button onClick={()=>handleRemove(product.id)} className='btn'>delete</button>
            </td>
        </tr>
    ))}
    
  </tbody>
</table>
        </form>
    </div>
  )
}

export default FormProduct