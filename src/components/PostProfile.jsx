import axios from "axios";
import { useEffect, useState } from "react";

const PostProfile = ({userId}) => {
    const [loading, setLoading] = useState(true); // Initial loading is true
    // const [profileData, setProfileData] = useState({});
    const [userPosts, setUserPosts] = useState([]);
    const [userReplies, setUserReplies] = useState([]);
    const [error, setError] = useState("");
 console.log(userId)
    // Get token from localStorage
    const token = JSON.parse(localStorage.getItem("token"));

    const fetchData = async () => {
        if (!token) {
            setError("Unauthorized: Please log in first");
            setLoading(false);
            return;
        }

        try {
            const header = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            // Use GET method (to match backend route)
            const response = await axios.get(`http://localhost:5000/profile/${userId}`, header);
            console.log("User data fetched:", response.data);

            if (response.data.status) {
                const { userPosts, userReplies } = response.data;
                // setProfileData(response.data.user); // Assuming the user object is returned
                setUserPosts(userPosts);
                setUserReplies(userReplies);
            } else {
                setError("Failed to load profile data");
            }
        } catch (error) {
            console.error("Error while fetching:", error);
            setError("Error fetching profile data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return <p className="text-center text-3xl mt-3">Data is loading...</p>;
    }

    if (error) {
        return <p className="text-center text-3xl mt-3 text-red-500">{error}</p>;
    }

    return (
        <div className="flex justify-center items-center mb-20">
            <div className="mt-40 border-2 border-black p-7 shadow-2xl bg-blue-50">
                

                {/* User Posts */}
                <h2 className="text-2xl font-semibold mt-8">Your Posts:</h2>
                {userPosts.length === 0 ? (
                    <p>No posts found</p>
                ) : (
                    <ul>
                        {userPosts.map((post) => (
                            <li key={post._id} className="mt-4 border-b pb-2">
                                <p><strong>About:</strong> {post.about}</p>
                                <p><strong>Category:</strong> {post.category}</p>
                                <p><strong>Location:</strong> {post.location}</p>
                                <p><strong>Urgency:</strong> {post.urgency}</p>
                            </li>
                        ))}
                    </ul>
                )}

                {/* Replies from Others */}
                <h2 className="text-2xl font-semibold mt-8">Replies from Others:</h2>
                {userReplies.length === 0 ? (
                    <p>No replies found</p>
                ) : (
                    <ul>
                        {userReplies.map((reply) => (
                            <li key={reply._id} className="mt-4 border-b pb-2">
                                <p><strong>Message:</strong> {reply.message}</p>
                                <p><strong>Sent by:</strong> {reply.senderId}</p>
                                <p><strong>Date:</strong> {new Date(reply.createdAt).toLocaleString()}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default PostProfile;
