import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Cart from "../pages/Cart";
import History from "../pages/History";
import CheckOut from "../pages/CheckOut";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/admin/Dashboard";
import Product from "../pages/admin/Product";
import Category from "../pages/admin/Category";
import Manage from "../pages/admin/Manage";
import LayoutAdmin from "../Layouts/LayoutAdmin";
import LayoutUser from "../Layouts/LayoutUser";
import Layout from "../Layouts/Layout";
import HomeUser from "../pages/user/HomeUser";
import ProtectRouteUser from "./ProtectRouteUser";
import ProtectRouteAdmin from "./ProtectRouteAdmin";
import Root from "../components/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "shop", element: <Shop /> },
      { path: "cart", element: <Cart /> },
      { path: "history", element: <History /> },
      { path: "checkout", element: <CheckOut /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ]
  },
 
 
 //Refresh Token

  // {
  //   path: "/",
  //   element: <Root />,
    
    
  // },
  {
    path:"/admin",
    element:<ProtectRouteAdmin element={<LayoutAdmin />} />,
    // element:<LayoutAdmin /> ,
    children:[
      {index:true,element:<Dashboard/>},
      {path:"product",element:<Product/>},
      {path:"category",element:<Category/>},
      {path:"manage",element:<Manage />},
    ]
  },
  {
    path:"/user",
    element: <ProtectRouteUser element={<LayoutUser />} />
    // element: <LayoutUser /> 
    ,
    children:[
      {index:true,element:<HomeUser/>},
    ]
  }
]);
const AppRoutes = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default AppRoutes;
