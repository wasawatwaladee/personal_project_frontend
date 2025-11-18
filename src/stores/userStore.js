import { create } from "zustand";
import { createJSONStorage,persist } from "zustand/middleware";
import { authApi } from "../api/authApi";
import { listCategory } from "../api/Category";
import { listProduct,  searchFilters } from "../api/product";
import _ from "lodash";
import { toast } from "react-toastify";


const useUserStore = create(persist((set,get)=>({
    user:null,
    token:'',
    categories:[],
    products:[],
    carts:[],
    getTotalPrice:()=>{
        const carts = get().carts
        const subTotal = carts.reduce((total,item)=>{
            return total+item.price*item.count
        },0)
        return subTotal
    },
    updateQuantity:(productId,newQty)=>{
        const carts = get().carts
        console.log('carts', carts)
       set(state=>({
            carts:state.carts.map(item=>
                item.id === productId 
                ? {...item,count:Math.max(1,newQty)}
                : item
            )
        }))
    },
    addToCart:(product)=>{
        const carts = get().carts
         const isExist = carts.some(item => item.id === product.id)

    if (isExist) {
        // ถ้ามีแล้ว ไม่ต้องเพิ่ม ไม่ต้อง toast
        return
    }
        const updateCart = [...carts,{...product,count:1 }]
        //unique
        const unique = _.unionWith(updateCart,_.isEqual)
         set({carts:unique})
        toast.success(`add ${product.title} successfully`)
         
        
    },
    removeProduct:(productId)=>{
        set(state=>({
            carts:state.carts.filter(item=>(
                item.id !== productId
            ))
        }))
    }
    ,
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
            user:resp.data.verifyUser
        })
        console.log('resp.data.verifyUser', resp.data.verifyUser)
        return resp
    },
    logout: ()=> set({token:'',user:null,carts:[]}),
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