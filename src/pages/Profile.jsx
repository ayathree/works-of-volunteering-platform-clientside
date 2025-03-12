import axios from "axios";
import { useEffect, useState } from "react";


const Profile = () => {
     const[loading, setLoading]=useState(false)
     const[data, setData]=useState('')

    const token = JSON.parse(localStorage.getItem('token'))
    const fetchData =  () => {

        const header ={
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

       
        
        
       axios.post("http://localhost:5000/profile", {}, header)
       .then((res)=>{
       
           setLoading(false)
           setData(res.data.data)
           console.log("User data fetched",res);

       })
        
        .catch ((error)=>  console.error(" error while fetching:", error))
        setLoading(false)
       
    };
    console.log('data', data)

    useEffect(()=>{
        fetchData()
    },[])
    return (
       <div className="flex justify-center items-center">
         <div className="mt-40 border-2 border-black p-7 shadow-2xl bg-blue-50">
            <p className="text-center text-3xl mt-3">{loading && "data is loading....."}</p>
           <p className="text-xl font-bold"> <span className="uppercase text-3xl">Name:</span> {data.name}</p>
            <p className="text-xl font-bold"><span className="uppercase text-3xl">email:</span> {data.email}</p>
           <p className="text-xl font-bold"> <span className="uppercase text-3xl">ID :</span> {data.id}</p>
        </div>
       </div>
    );
};

export default Profile;