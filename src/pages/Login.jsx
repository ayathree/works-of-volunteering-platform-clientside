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
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
<p className="text-xl">Don't have any account? <Link to={'/register'}><span className="text-blue-600">Register Here</span></Link></p>
<ToastContainer />
        </div>
    );
};

export default Login;
