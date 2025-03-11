import { Link} from "react-router";
import { ToastContainer, toast } from 'react-toastify';


import { useState } from "react";
import axios from "axios";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const[loading, setLoading]=useState(false)
   

    const handleRegister = async (e) => {
        setLoading(true)
        
        e.preventDefault();
        
       axios.post("http://localhost:5000/users", { name, email, password })
       .then((res)=>{
        toast('Registration successfully')
           console.log("User register",res);
           setLoading(false)

       })
        
        .catch ((error)=>  console.error("Registration error:", error))
        setLoading(false)
        toast('registration failed')
        //    
        // }
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <button className="disabled:opacity-70" disabled={loading} type="submit">{loading? "Submitting...": "Register"}</button>
            </form>
<p className="text-xl">Already have an account? <Link to={'/loginUser'}><span className="text-blue-600">Log In Here</span></Link></p>
<ToastContainer />
        </div>
    );
};

export default Register;
