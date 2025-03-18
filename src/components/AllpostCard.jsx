import axios from "axios";
import { BiSolidCategory } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import { TbUrgent } from "react-icons/tb";
import { toast } from "react-toastify";

const AllPostCard = ({ post }) => {
    const { urgency, about, location, category, creatorId } = post;
    console.log("Post Data:", post);

    // Get token from localStorage
    const token = JSON.parse(localStorage.getItem("token"));
    console.log("Token Found:", token);

    // Handle Message Submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const message = form.message.value.trim();

        // Ensure token and message exist
        if (!token) {
            toast.error("Unauthorized: Please log in first");
            return;
        }

        if (!message) {
            toast.error("Message cannot be empty");
            return;
        }

        // Prepare message object
        const newMessage = { message, creatorId };

        try {
            // Axios POST request
            const response = await axios.post(
                "http://localhost:5000/allMessages",
                newMessage,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log(" Message Sent Successfully:", response.data);
            toast.success("Message sent successfully");
            form.reset();
        } catch (error) {
            // Handle Axios errors
            console.error(" Message Submission Error:", error.response || error);
            toast.error(error.response?.data?.message || "Submission failed");
        }
    };

    return (
        <div className="border-2 mt-10 border-black mx-20 p-5 shadow-2xl bg-blue-50">
            {/* Urgency Display */}
            <div className="flex justify-end items-end">
                <p
                    className={`flex items-center gap-1 ${
                        urgency === "Urgent"
                            ? "bg-red-500"
                            : urgency === "Low"
                            ? "bg-yellow-500"
                            : urgency === "Medium"
                            ? "bg-green-500"
                            : "text-black"
                    } px-2 font-semibold border-black border-2`}
                >
                    <TbUrgent /> {urgency}
                </p>
            </div>

            {/* Post Content */}
            <p className="text-xl font-semibold mt-5">{about}</p>

            {/* Location & Category */}
            <div className="flex flex-col justify-start items-start gap-3 mt-6">
                <p className="flex items-start gap-1">
                    <FaLocationDot /> {location}
                </p>
                <p className="flex items-start gap-1">
                    <BiSolidCategory /> {category}
                </p>
            </div>

            {/* Message Section */}
            <p className="underline font-bold text-2xl mt-3 text-start">
                Message Section
            </p>

            {/* Message Form */}
            <form onSubmit={handleSubmit} className="flex flex-col justify-start">
                <textarea
                    name="message"
                    className="outline-2 mt-5 h-30 p-2"
                    placeholder="Write your message here"
                />

                <button
                    type="submit"
                    className="bg-blue-600 p-2 px-5 text-white btn mt-5 w-24 text-xl"
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default AllPostCard;
