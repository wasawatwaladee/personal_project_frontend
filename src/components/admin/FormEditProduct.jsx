// import  { useEffect, useState } from 'react'
// import useUserStore from '../../stores/userStore'
// import {  readProduct,  updateProduct } from '../../api/product'
// import { toast } from 'react-toastify'
// import Uploadfile from './Uploadfile'
// import { useNavigate, useParams } from 'react-router'



//    const initialState ={
//     title: "",
//     description: "",
//     price:"",
//     quantity:"",
//     categoryId:"",
//     images:[]

//     }
// const FormEditProduct = () => {
//     const {id} = useParams()
//     const navigate = useNavigate()
//     const token = useUserStore(state=>state.token)
//     const getCategory = useUserStore(state=>state.getCategory)
//     const categories = useUserStore(state=>state.categories)
    
//     const [form,setForm] = useState(initialState)
//     // console.log('products', products)

//      useEffect(()=>{
//         getCategory()
//         fetchProduct(id)
        
//     },[])
//     const handleOnChange = (e)=>{
//         setForm(
//             {
//                 ...form,
//             [e.target.name]:e.target.value
//         })
//     }
    
//     const handleSubmit = async(e)=>{
//         e.preventDefault();
//         try {
//             console.log('test submit')
//             const res = await updateProduct(id,form)
//             console.log('res from submit', res)
            
//             console.log('res from formEditProduct for updateProduct', res)
            
//             toast.success(res.data.product.title + " successfully update")
            
//            navigate('/admin/product')
//         } catch (err) { 
//             console.log('submit error')
//             console.log(err)
//         }
//     }



   

//     const fetchProduct = async(id)=>{
//         try {
//             const res = await readProduct(id)
//             console.log('res from formEditProduct for readProduct', res)
//             setForm(res.data.product)
//         } catch (err) {
//             console.log(err)
//         }
//     }
   
//   return (
//     <div className='container mx-auto p-4 bg-white shadow-md text-black'>
//         <form onSubmit={handleSubmit}>
//             <h1>Add product</h1>
//             <input 
//             placeholder='input name'
//             value={form.title}
//             name="title"
//             onChange={handleOnChange}
//             className='border'
//             type="text" />
            
//             <input 
//             placeholder='input description'
//             value={form.description}
//             name="description"
//             onChange={handleOnChange}
//             className='border'
//             type="text" />
            
//             <input 
//             placeholder='input price'
//             value={form.price}
//             name="price"
//             onChange={handleOnChange}
//             className='border'
//             type="number" />
           
//             <input 
//             placeholder='input quantity'
//             value={form.quantity}
//             name="quantity"
//             onChange={handleOnChange}
//             className='border'
//             type="number" />

//             <select 
//             className='border'
//             value= {form.categoryId}
//             name='categoryId'
//             onChange={handleOnChange}
//             required>
//                 <option disabled value=''>Please select </option>
//                 {categories.map(category=>
//                     (<option key={category.id} value={category.id}>{category.name}</option>))}
//             </select>
//             <hr />

//             {/* upload image */}
//             <Uploadfile form={form} setForm={setForm} />        


//             <button  className='btn bg-green-600'>Update product</button>
            

//             <hr />
//             <br />

//         </form>
//     </div>
//   )
// }

// export default FormEditProduct

import { useEffect, useState } from 'react'
import useUserStore from '../../stores/userStore'
import { readProduct, updateProduct } from '../../api/product'
import { toast } from 'react-toastify'
import Uploadfile from './Uploadfile'
import { useNavigate, useParams } from 'react-router'

const initialState = {
  title: "",
  description: "",
  price: "",
  quantity: "",
  categoryId: "",
  images: []
}

const FormEditProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const getCategory = useUserStore(state => state.getCategory)
  const categories = useUserStore(state => state.categories)

  const [form, setForm] = useState(initialState)

  // โหลด category + product
  useEffect(() => {
    getCategory()
    fetchProduct(id,form)
  }, [])

  // โหลดสินค้า
  const fetchProduct = async (id,form) => {
    try {
      const res = await readProduct(id,form)
      console.log('res.data', res.data)
      setForm(res.data.product)
    } catch (err) {
      console.log(err)
    }
  }

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await updateProduct(id, form)

      toast.success(res.data.product.title + " updated successfully")
      navigate('/admin/product')

    } catch (err) {
      console.log("submit error", err)
    }
  }

  return (
    <div className='container mx-auto p-4 bg-white shadow-md text-black'>
      <form onSubmit={handleSubmit}>
        <h1>Edit product</h1>

        <input
          placeholder='input name'
          value={form.title}
          name="title"
          onChange={handleOnChange}
          className='border'
          type="text"
        />

        <input
          placeholder='input description'
          value={form.description}
          name="description"
          onChange={handleOnChange}
          className='border'
          type="text"
        />

        <input
          placeholder='input price'
          value={form.price}
          name="price"
          onChange={handleOnChange}
          className='border'
          type="number"
        />

        <input
          placeholder='input quantity'
          value={form.quantity}
          name="quantity"
          onChange={handleOnChange}
          className='border'
          type="number"
        />

        <select
          className='border'
          value={form.categoryId}
          name='categoryId'
          onChange={handleOnChange}
          required
        >
          <option disabled value=''>Please select</option>
          {categories.map(category =>
            <option key={category.id} value={category.id}>{category.name}</option>
          )}
        </select>

        <hr />

        <Uploadfile form={form} setForm={setForm} />

        <button className='btn bg-green-600'>Update product</button>

        <hr /><br />
      </form>
    </div>
  )
}

export default FormEditProduct
