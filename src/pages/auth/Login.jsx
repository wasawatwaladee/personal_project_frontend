import  { Children, useState } from 'react'
import useUserStore from '../../stores/userStore'
import { useForm } from 'react-hook-form'
import { loginSchema } from '../../validation/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import Register from './Register'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'


const Login = () => {
  const navigate = useNavigate();
  const login = useUserStore(state=>state.login)
  const logout = useUserStore(state=>state.logout)
  const token = useUserStore(state=>state.token)
  const [resetForm,setResetForm] = useState(true)
  const {handleSubmit,register,formState,reset} = useForm({
        resolver:zodResolver(loginSchema),
        mode:'onSubmit' 
    })

  const {isSubmitting,errors} = formState
  
    
  const onSubmit = async( data,e) =>{
    e.preventDefault()  
    try {
        const resp = await login(data)
        const role = resp.data.verifyUser.role
        toast.success("Login success")
        roleRedirect(role)
        

      } catch (err) {
        const errMsg = err.response?.data.message || err.message
        toast.error(errMsg)        
      }
    }
    
    const roleRedirect = (role) =>{
      if(role === "admin"){
        navigate("/admin")
      }else if(role === "user"){
        navigate("/user")
      }

    }
  
  
  
  return (
    <>

   <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          {/* Logo */}
          <div>
            <img
              src="https://storage.googleapis.com/devitary-image-host.appspot.com/15846435184459982716-LogoMakr_7POjrN.png"
              className="w-32 mx-auto"
              alt="Logo" 
            />
          </div>
          
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Login</h1>
           
            <div className="w-full flex-1 mt-8">
            

              <div className="my-12 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  Login with E-mail or Phone number
                </div>
              </div>

              <div className="mx-auto max-w-xs">
              <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset disabled={isSubmitting}>
                  
                  <div>
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Email or Phone number" {...register('identity')}
                />
                <p className='text-sm text-red-500'>{errors.identity?.message}</p>
                  </div>
                  
                  <div>
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  placeholder="Password" {...register('password')}
                />
                <p className='text-sm text-red-500'>{errors.password?.message}</p>
                  </div>

                <button className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">              
                  <span className="ml-3">Login</span>
                   {isSubmitting && <span className="loading loading-spinner loading-sm"></span>}
                </button>
                
                {/* Register */}
                <button className='btn btn-secondary w-full mt-5'
                       
                        onClick={()=>navigate('/register')}
                        >Create new account</button>
                </fieldset>
              
              </form>
                
              </div>
           
            </div>
          </div>
        
        </div>
       
       
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className=" w-full bg-contain bg-center bg-no-repeat"
            
            style={{
              backgroundImage:
                "url('https://d3iiuzaifwnkfj.cloudfront.net/public/top10best-sellingmenus.jpg')",
            }}
          ></div>
        </div>
      
      </div>
    </div>

    </>
  )
}

export default Login