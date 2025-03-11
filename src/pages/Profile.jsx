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
        <div className="mt-40">
            <p className="text-center text-3xl mt-3">{loading && "data is loading....."}</p>
           <p> name: {data.name}</p>
            <p>email: {data.email}</p>
           <p> ID : {data.id}</p>
        </div>
    );
};

export default Profile;