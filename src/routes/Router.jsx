import { createBrowserRouter } from "react-router";
import Root from "../pages/Root";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";


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
                path:'/loginUser',
                element:<Login></Login>
            },
            {
                path:'/register',
                element:<Register></Register>

            },
            {
                path:'/userProfile',
                element:<PrivateRoute><Profile></Profile></PrivateRoute>
            }
        ]
    }
])

export default router