import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { registerSchema } from '../../validation/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { authApi } from '../../api/authApi'
import { toast } from 'react-toastify'

const Register = ({resetForm}) => {
   const {handleSubmit,register,formState,reset} = useForm({
        resolver: zodResolver(registerSchema),
        mode:'onSubmit' 
    })

    const {isSubmitting,errors} = formState
    useEffect(()=>{reset()},[resetForm])

    const onSubmit = async(data)=>{
      try {
        const resp = await authApi.post('/register',data)
        toast.success(resp.data?.message)
        reset()
      } catch (err) {
        const errMsg = err.response?.data?.message || err.message
        toast.error(errMsg)
      }
    }

      const onError = err =>{
        console.log(err)
        toast.error("กรุณาตรวจสอบข้อมูลในฟอร์มให้ถูกต้อง");
    }

  return (
    <>
      <div className="mx-auto max-w-xs">
              <form onSubmit={handleSubmit(onSubmit,onError)}>
                <fieldset disabled={isSubmitting} className='flex flex-col gap-5 p-4 pt-3'>
                     <div className='flex gap-2'>
            <div className="w-full">
            <input type="text" className='input w-full' placeholder='First name' {...register('firstName')}/>
            <p className='text-sm text-error'>{errors.firstName?.message}</p>
            </div>

            <div className="w-full">
            <input type="text" className='input w-full' placeholder='Last name'{...register('lastName')}/>
            <p className='text-sm text-error'>{errors.lastName?.message}</p>
            </div>
            
        </div>

            <div className="w-full">
            <input type="text" className='input w-full' placeholder='Email or Phone number' {...register('identity')}/>
            <p className='text-sm text-error'>{errors.identity?.message}</p>
            </div>

            <div className="w-full">
            <input type="password" className='input w-full' placeholder='Password' {...register('password')}/>
            <p className='text-sm text-error'>{errors.password?.message}</p>
            </div>

            <div className="w-full">
            <input type="password" className='input w-full' placeholder='Confirm Password' {...register('confirmPassword')}/>
            <p className='text-sm text-error'>{errors.confirmPassword?.message}</p>

            </div>

      
        <button >
            Sign up
            {isSubmitting && <span className="loading loading-spinner loading-sm"></span>}
            </button>
                 
        <button className='btn btn-error text-xl text-neutral-50' onClick={()=>reset()}>Reset Form</button>
                </fieldset>
              
              </form>
             
                
              </div>
    </>
  )
}

export default Register