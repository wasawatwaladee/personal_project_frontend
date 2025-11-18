import axiosInstance from "./axiosApi";

export const payment = async()=>{
    return await axiosInstance.post('/user/create-payment-intent')
}