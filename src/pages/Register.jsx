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
        <div className="flex justify-center items-center">
            <div className="border-2 border-black w-full max-w-sm   p-2 shadow-2xl mt-20 bg-blue-50">
            <h1 className="text-center text-3xl font-bold mb-3">Register</h1>
            <form className="flex flex-col justify-center items-center" onSubmit={handleRegister}>
                <label className="text-xl font-semibold">Name</label>
                
                <input className="outline p-2" type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                
                <label className="text-xl font-semibold">Email</label>
                
                <input  className="outline p-2" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                
                <label className="text-xl font-semibold">Password</label>
                
                <input  className="outline p-2" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <br />
                <button className="disabled:opacity-70 bg-blue-600 p-2 text-white btn mt-3" disabled={loading} type="submit">{loading? "Submitting...": "Register"}</button>
            </form>
<p className="text-xl text-center">Already have an account? <Link to={'/loginUser'}><span className="text-blue-600">Log In Here</span></Link></p>
<ToastContainer />
        </div>
        </div>
    );
};

export default Register;
