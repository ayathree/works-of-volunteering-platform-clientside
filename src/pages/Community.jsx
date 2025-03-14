import { useState } from "react";


const Community = () => {
    const [showModal, setShowModal] = useState(false);
    // Function to open the modal
    const openModal = () => setShowModal(true);
    // Function to close the modal
    const closeModal = () => setShowModal(false);
    return (
        <div className="mx-7">
            <div className="border-2 border-black bg-blue-50 shadow-2xl mt-20 p-3 flex flex-row justify-between items-center">
                <p className="text-2xl font-bold">Want to post a request for help.</p>
                {/* <Link to="/createEvents"> */}
                    <button onClick={openModal} className="btn bg-blue-500 text-white">Post</button>
                {/* </Link> */}
            </div>
            {/* Modal Section (Visible when showModal is true) */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm  bg-opacity-50">
                    <div className="bg-blue-50 border-2 border-black p-8 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-2xl font-bold mb-4">Post a Help Request</h2>
                        <form className="flex flex-col gap-2">
                            <label className="text-xl font-semibold">About</label>
                            <textarea type="text" className="outline-2 p-2" placeholder="about" />
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
                <select name="location" className="outline-2 p-2"  required>
                    <option value=""></option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="Urgent">Urgent</option>
                </select>
                
                        </form>
                        
                        <div className="flex flex-row justify-center items-center gap-3">
                            {/* Post Button */}
                        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded btn">Post</button>
                       
                        
                       {/* Close Button */}
                       <button onClick={closeModal} className="mt-4 bg-red-500 text-white px-4 py-2 rounded btn">
                           Close
                       </button>
                        </div>
                    </div>
                </div>
            )}
            
        </div>
    );
};

export default Community;