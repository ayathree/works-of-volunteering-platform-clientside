import axios from "axios";
import { useState } from "react";
import { BiSolidCategory } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import { useLoaderData } from "react-router";
import { toast, ToastContainer } from "react-toastify";


const Community = () => {

    const loadedPosts = useLoaderData();
    const [posts, setPosts] = useState(loadedPosts);

    
    const [showModal, setShowModal] = useState(false);
    // Function to open the modal
    const openModal = () => setShowModal(true);
    // Function to close the modal
    const closeModal = () => setShowModal(false);

    const handleSubmit = event=>{
        event.preventDefault();
        const form = event.target;
        const about= form.about.value;
        const category = form.category.value;
        const location = form.location.value;
        const urgency = form.urgency.value;
       
        const newPosts={about,location,category,urgency}

        console.log(newPosts)

        axios.post("http://localhost:5000/allPosts", newPosts)
       .then((res)=>{
        toast('Post submitted successfully')
        console.log("Post created",res);
        form.reset()
        

       })
        
        .catch ((error)=>  console.error("post error:", error))
        
        toast('Post submission failed')
    }

    return (
        <div className="mx-7">
            <div className="border-2 border-black bg-blue-50 shadow-2xl mt-20 p-3 flex flex-row justify-between items-center">
                <p className="text-2xl font-bold">Want to post a request for help.</p>
                    <button onClick={openModal} className="btn bg-blue-500 text-white">Post</button>
               
            </div>
            <div>
            <h1 className=" mt-20 text-2xl font-bold text-center">All Posts</h1>
            <div className="grid grid-cols-3 justify-center items-center gap-4">
            {
                posts.map((post)=>(<div key={post._id} className="border-2 border-black w-full max-w-sm p-5 shadow-2xl bg-blue-50 ">
                  
                  <h1 className="text-center font-bold text-2xl">{post.about}</h1>
                                             
                    
                                              
                    
                                             <div className="flex flex-col justify-center items-center gap-3">
                                                 <p className="flex items-center gap-1">
                                                     <FaLocationDot /> {post.location}
                                                 </p>
                                                 <p className="flex items-center gap-1">
                                                     <BiSolidCategory /> {post.category}
                                                 </p>
                                             </div>
                                       
             
                                         <div className="flex justify-center mt-3">
                                             <button className="bg-blue-600 p-2 px-5 text-white btn">Join Event</button>
                                         </div>
                  


                </div>))
            }

            </div>
            
            </div>
            {/* Modal Section (Visible when showModal is true) */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm  bg-opacity-50">
                    <div className="bg-blue-50 border-2 border-black p-8 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-2xl font-bold mb-4">Post a Help Request</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                            <label className="text-xl font-semibold">About</label>
                            <textarea name="about" type="text" className="outline-2 p-2" placeholder="about" />
                            <label className="text-xl font-semibold">Category</label>
                            <select name="category" className="outline-2 p-2"  required>
                    <option value=""></option>
                    <option value="Environmental">Environmental</option>
                    <option value="Educational">Educational</option>
                    <option value="Healthcare">Healthcare</option>
                </select>
                <label className="text-xl font-semibold">Location</label>
                <select name="location" className="outline-2 p-2"  required>
                    <option value=""></option>
                    <option value="Dhaka">Dhaka</option>
                    <option value="Chattogram">Chattogram</option>
                </select>
                <label className="text-xl font-semibold">Urgency</label>
                <select name="urgency" className="outline-2 p-2"  required>
                    <option value=""></option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="Urgent">Urgent</option>
                </select>
                
                        <div className="flex flex-row justify-center items-center gap-3">
                            {/* Post Button */}
                        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded btn">Post</button>
                       
                        
                       {/* Close Button */}
                       <button onClick={closeModal} className="mt-4 bg-red-500 text-white px-4 py-2 rounded btn">
                           Close
                       </button>
                        </div>
                        </form>
                        
                    </div>
                </div>
            )}
<ToastContainer></ToastContainer>
        </div>
    );
};

export default Community;