// import { useEffect } from "react"
// import useUserStore from "../stores/userStore"
// import { currentAdmin } from "../api/authApi"

// const ProtectRouteAdmin = ({element}) => {
//     const user =  useUserStore(state=>state.user)
//     const token =  useUserStore(state=>state.token)

//     useEffect(()=>{
//         if(user && token){
//             try {
//                 currentAdmin(token)
                
//             } catch (error) {
//                 console.log(error)
//             }
//         }
//     },[])
//     return element
// }

// export default ProtectRouteAdmin


import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import useUserStore from "../stores/userStore";
import { currentAdmin } from "../api/authApi";

const ProtectRouteAdmin = ({ element }) => {
  const token = useUserStore((state) => state.token);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setIsAuth(false);
        setIsLoading(false);
        return;
      }
      try {
        const res = await currentAdmin(token);
        if (res.data?.success) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch (error) {
        setIsAuth(false);
      } finally {
        setIsLoading(false);
      }
    };
    verify();
  }, [token]);

  if (isLoading) return <div>Loading...</div>;

  if (!isAuth){
    
      return <Navigate to="/login" replace />;
  }

  return element;
};

export default ProtectRouteAdmin;
