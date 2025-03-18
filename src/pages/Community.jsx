import axios from "axios";
import { useState } from "react";
import { useLoaderData } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import AllPostCard from "../components/AllpostCard";



const Community = () => {

    const loadedPosts = useLoaderData();
    const [posts, setPosts] = useState(loadedPosts);
    const [showModal, setShowModal] = useState(false);

     
    // Function to open the modal
    const handleOpenModal = () => setShowModal(true);
      
    // Function to close the modal
    const closeModal = () => setShowModal(false);
    // const navigate = useNavigate();

    const token = JSON.parse(localStorage.getItem('token'))
const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const about = form.about.value;
    const category = form.category.value;
    const location = form.location.value;
    const urgency = form.urgency.value;

    const newPosts = { about, category, location, urgency };

    if (!token) {
        toast("Unauthorized: Please log in first");
        return;
    }

    try {
        const response = await axios.post("http://localhost:5000/allPosts", newPosts, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("Sending Token:", token);

        toast("Post submitted successfully");
        console.log("Post created:", response.data);
        form.reset();
    } catch (error) {
        console.error("Post error:", error);
        toast("Post submission failed");
    }
};


         
      
  

    return (
        <div className="mx-7 mb-20">
            <div className="border-2 border-black bg-blue-50 shadow-2xl mt-20 p-3 flex flex-row justify-between items-center">
                <p className="text-2xl font-bold">Want to post a request for help.</p>
                    <button onClick={handleOpenModal} className="btn bg-blue-500 text-white">Post</button>
               
            </div>
            <div>
            <h1 className=" mt-20 text-2xl font-bold text-center">All Posts</h1>
            <div className="grid grid-cols-1 justify-center items-center gap-4">
            {
                posts.map((post)=>(<AllPostCard key={post._id} post={post} >
                    
                  


                </AllPostCard>))
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