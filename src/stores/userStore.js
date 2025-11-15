import { create } from "zustand";
import { createJSONStorage,persist } from "zustand/middleware";
import { authApi } from "../api/authApi";
import { listCategory } from "../api/Category";
import { listProduct, searchFilters } from "../api/product";


const useUserStore = create(persist((set,get)=>({
    user:null,
    token:'',
    categories:[],
    products:[],
    getCategory : async()=>{
            try {
                const res = await listCategory()
                set({
                    categories:res.data
                })
    
            } catch (err) {
                console.log(err)
            }
        },
        searchFilters:async(count)=>{
            try {
                const res = await searchFilters(count)
                set({
                    products:res.data.product
                })
            } catch (err) {
                console.log(err)
            }
        }
        ,


    login:async (input)=>{
        const resp = await authApi.post('/login',input)
        console.log('resp', resp)
        set({token:resp.data.token,
            user:resp.data.user
        })
        return resp
    },
    logout: ()=> set({token:'',user:null}),
    // getProduct:async(token,count)=>{
    //     console.log('count', count)   
    //     try {
    //             const res = await listProduct(token,count)
    //             console.log(res)
    //             set({
    //                 products:res.data
    //             })
    
    //         } catch (err) {
    //             console.log(err)
    //         }
    //     },
    getProduct:async()=>{
         
        try {
                const res = await listProduct()
                
                set({
                    products:res.data
                })
    
            } catch (err) {
                console.log(err)
            }
        },

}),{
    name:'userState',
    storage:createJSONStorage(()=>localStorage)
}))

export default useUserStore;