import { createBrowserRouter } from "react-router";
import Root from "../pages/Root";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import Events from "../pages/Events";
import CreateEvents from "../pages/CreateEvents";
import Community from "../pages/Community";


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
            },
            {
                path:'/events',
                element:<Events></Events>,
                loader:()=>fetch('http://localhost:5000/allEvents')
            },
            {
                path:'/createEvents',
                element:<CreateEvents></CreateEvents>
            },
            {
                path:'/community',
                element:<Community></Community>,
                loader:()=>fetch('http://localhost:5000/allPosts')

            }
        ]
    }
])

export default router