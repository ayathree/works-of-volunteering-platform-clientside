// import { Link } from "react-router";

import axios from "axios";
import { toast, ToastContainer } from "react-toastify";


const CreateEvents = () => {
    const token = JSON.parse(localStorage.getItem('token'))
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const form = event.target;
        const title = form.title.value;
        const description = form.description.value;
        const date = form.date.value;
        const time = form.time.value;
        const location = form.location.value;
        const category = form.category.value;
       
        const newEvents={title,description,date,time,location,category}

        console.log(newEvents)
    
        if (!token) {
            toast("Unauthorized: Please log in first");
            return;
        }
    
        try {
            const response = await axios.post("http://localhost:5000/allEvents", newEvents, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Sending Token:", token);
    
            toast("Event created successfully");
            console.log("Event created:", response.data);
            form.reset();
        } catch (error) {
            console.error("Event error:", error);
            toast("Event creation failed");
        }
    };


    return (
        <div className="flex justify-center items-center mb-20">
            <div className="border-2 border-black  max-w-lg   p-3 shadow-2xl mt-20 bg-blue-50">
           <h1 className="uppercase font-bold text-3xl text-center">Volunteer Event create Form</h1>
           <form onSubmit={handleSubmit} >
            <div className="flex flex-row justify-center items-center gap-6 mt-4">
            <div className="flex flex-col">
               <label className="text-xl font-semibold">Title</label>
                
                <input name="title" className="outline p-2" type="text" placeholder="title" required  />
                
                <label className="text-xl font-semibold">Description</label>
                
                <input name="description" className="outline p-2" type="text-area" placeholder="description"  />
                
                <label className="text-xl font-semibold">Date</label>
                
                <input name="date" className="outline p-2" type="date" placeholder="date" required />
               </div>
                <div className="flex flex-col">
                <label className="text-xl font-semibold">Time</label>
                
                <input name="time"  className="outline p-2" type="time" placeholder="time" required />
                <label className="text-xl font-semibold">Location</label>
                <select name="location" className="outline p-2"  required>
                    <option value=""></option>
                    <option value="Dhaka">Dhaka</option>
                    <option value="Chattogram">Chattogram</option>
                </select>
                
                
                <label className="text-xl font-semibold">Category</label>
                <select name="category" className="outline p-2"  required>
                    <option value=""></option>
                    <option value="Environmental">Environmental</option>
                    <option value="Educational">Educational</option>
                    <option value="Healthcare">Healthcare</option>
                </select>
                
                </div>

            </div>
              
                <br />
                <div className="flex justify-center items-center">

                <button className="disabled:opacity-70 bg-blue-600 p-2 text-white btn mt-3 " >Create</button>
                </div>
            </form>
            <ToastContainer />
        </div>
        </div>
    );
};

export default CreateEvents;