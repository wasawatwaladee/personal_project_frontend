import axiosInstance from "./axiosApi"


export const createUserCart = async(cart)=>{
  return await axiosInstance.post(`/user/cart`,cart)  
}

export const listUserCart = async()=>{
    return await axiosInstance.get('/user/cart')
}

export const saveAddress = async(address)=>{
    return await axiosInstance.post(`/user/address`,{address})
}
export const saveOrder = async(payload)=>{
    return await axiosInstance.post(`/user/order`,payload)
}