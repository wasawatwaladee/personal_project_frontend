import { create } from "zustand";
import { createJSONStorage,persist } from "zustand/middleware";
import { authApi } from "../api/authApi";


const useUserStore = create(persist((set,get)=>({
    user:null,
    token:'',
    login:async (input)=>{
        const resp = await authApi.post('/login',input)
        console.log('resp', resp)
        set({token:resp.data.token,
            user:resp.data.user
        })
        return resp
    },
    logout: ()=> set({token:'',user:null})
}),{
    name:'userState',
    storage:createJSONStorage(()=>localStorage)
}))

export default useUserStore;