import axios from 'axios'

export const authApi = axios.create({
    baseURL:"http://localhost:8000/api/"
})

export const currentUser =  async(token) =>{
  return  await authApi.post('/current-user',{},{
    headers:{
        Authorization:`Bearer ${token}`
    }
  }) 
}
export const currentAdmin =  async(token) =>{
  return  await authApi.post('/current-admin',{},{
    headers:{
        Authorization:`Bearer ${token}`
    }
  }) 
}