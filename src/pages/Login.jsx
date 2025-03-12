import { Link } from "react-router";


import { useState } from "react";

import { useNavigate } from "react-router";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
// import { AuthContext } from "../routes/AuthProvider";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        
        e.preventDefault();
        axios.post("http://localhost:5000/login", { email, password })
       .then((res)=>{
        toast('logged in successfully')
           console.log("User register",res);
           localStorage.setItem('token', JSON.stringify(res.data.token))
           navigate('/')

       })
        
        .catch ((error)=>  console.error("login error:", error))
        toast('logged in failed')
        
        //    
        // }
    };

    return (
       
             <div className="flex justify-center items-center">
            <div className="border-2 border-black w-full max-w-sm   p-2 shadow-2xl mt-20 bg-blue-50">
            <h1 className="text-center text-3xl font-bold mb-3">Login</h1>
            <form className="flex flex-col justify-center items-center" onSubmit={handleLogin}>
                
                
                <label className="text-xl font-semibold">Email</label>
                
                <input  className="outline p-2" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                
                <label className="text-xl font-semibold">Password</label>
                
                <input  className="outline p-2" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <br />
                <button className=" bg-blue-600 p-2 text-white btn mt-3">Login</button>
            </form>
<p className="text-xl text-center">Don't have an account? <Link to={'/register'}><span className="text-blue-600">Register Here</span></Link></p>
<ToastContainer />
        </div>
        </div>
        
    );
};

export default Login;
