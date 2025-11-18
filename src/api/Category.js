import axiosInstance from "./axiosApi"


export const createCategory = async(form)=>{
  return axiosInstance.post('/category',form)    
}

export const listCategory = async()=>{
  return axiosInstance.get('/category')  
}

export const removeCategory = async(id)=>{
  return axiosInstance.delete(`/category/${id}`)  
}