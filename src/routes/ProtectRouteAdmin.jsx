import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import useUserStore from "../stores/userStore";
import { currentAdmin } from "../api/authApi";
import { toast } from "react-toastify";

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
      toast.warning("You are not admin")
      return <Navigate to="/" replace />;
  }

  return element;
};

export default ProtectRouteAdmin;
