import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import useUserStore from "../stores/userStore";
import { currentUser } from "../api/authApi";

const ProtectRouteUser = ({ element }) => {
  const user = useUserStore((state) => state.user);
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
        const res = await currentUser(token);
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

  if (!isAuth) {
    
      return <Navigate to="/shop" replace />;
  }

  return element;
};

export default ProtectRouteUser;
