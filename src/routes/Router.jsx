import { createBrowserRouter } from "react-router";
import Root from "../pages/Root";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";


const router =createBrowserRouter([
    {
        path:'/',
        element: <Root></Root>,
        children:[
            {
                index:true,
                element:<Home></Home>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/profile',
                element:<Profile></Profile>
            }
        ]
    }
])

export default router