import axiosInstance from "./axiosApi";
import axios from "axios";



export const createProduct = async(form)=>{
  return  await axiosInstance.post('/product',form)  
}

// export const listProduct = (token,count=20)=>{
//   return axios.get(`http://localhost:8000/api/products/${count}`,{
//     headers:{
//         Authorization:`Bearer ${token}`
//     }
//   })  
// }
export const listProduct = async()=>{
  return  await axiosInstance.get(`/products`)  
}
export const searchFilters = async(arg)=>{
  return  axiosInstance.post(`/search/filters/`,arg)  
}

export const removeProduct = async(id)=>{
  return await axiosInstance.delete(`/product/${id}`)  
}

export const updateProduct = async (id, form) => {
  return axiosInstance.put(`/product/${id}`, form)
}

export const readProduct = async (id) => {
  return axiosInstance.get(`/product/${id}`)
}
// export const readProduct = async (token, id) => {
//   // code body
//   return axios.get("http://localhost:5001/api/product/" + id, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };
// export const removeProduct = async (token, id) => {
//   // code body
//   return axios.delete("http://localhost:5001/api/product/" + id, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };
// export const updateProduct = async (token, id, form) => {
//   // code body
//   return axios.put("http://localhost:5001/api/product/" + id, form, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };

export const uploadFiles = async(form)=>{
  return  await axiosInstance.post(`/images`,{
    images:form
  })
}



export const removeFiles = async(public_id)=>{
  return await axiosInstance.post(`/removeimages/`,{
    public_id
  })
}





