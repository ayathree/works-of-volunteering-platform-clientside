import axios from "axios";
import { useEffect, useState } from "react";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  // Retrieve token from localStorage
  const token = JSON.parse(localStorage.getItem('token'));

  // Fetch User Profile Data
  const fetchData = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`
      };
      const res = await axios.post("https://works-of-volunteering-platform-serverside.vercel.app/profile", {}, { headers });
      console.log("User data fetched:", res.data.data);

      setData(res.data.data);
    } catch (error) {
      console.error("Error while fetching:", error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle loading state
  if (loading) return <p className="text-center text-3xl mt-3">Data is loading...</p>;

  // Ensure data exists before accessing properties
  if (!data) return <p className="text-center text-3xl mt-3">No data found</p>;

  return (
    <div className="flex flex-col items-center mb-20">
      {/* User Information */}
      <div className="mt-20 border-2 border-black p-7 shadow-2xl bg-blue-50 w-2/3">
        <h2 className="text-3xl uppercase text-center mb-6">Profile</h2>
        <p className="text-xl font-bold"><span className="uppercase">Name:</span> {data.name}</p>
        <p className="text-xl font-bold"><span className="uppercase">Email:</span> {data.email}</p>
        <p className="text-xl font-bold"><span className="uppercase">ID:</span> {data.id}</p>
      </div>

      {/* User Posts */}
      <div className="mt-20 border-2 border-black p-7 shadow-2xl bg-blue-50 w-2/3">
        <h2 className="text-2xl font-semibold mb-4">Your Posts:</h2>
        {data.posts && data.posts.length === 0 ? (
          <p>No posts found</p>
        ) : (
          <ul>
            {data.posts?.map((post) => (
              <li key={post._id} className="mt-4 border-b pb-2">
                <p><strong>About:</strong> {post.about}</p>
                <p><strong>Category:</strong> {post.category}</p>
                <p><strong>Location:</strong> {post.location}</p>
                <p><strong>Urgency:</strong> {post.urgency}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Replies from Others */}
      <div className="mt-20 border-2 border-black p-7 shadow-2xl bg-blue-50 w-2/3">
        <h2 className="text-2xl font-semibold mb-4">Replies from Others:</h2>
        {data.replies && data.replies.length === 0 ? (
          <p>No replies found</p>
        ) : (
          <ul>
            {data.replies?.map((reply) => (
              <li key={reply._id} className="mt-4 border-b pb-2">
                <p><strong>Message:</strong> {reply.message}</p>
                <p><strong>Sent by:</strong> {reply.senderId}</p>
                <p><strong>Date:</strong> {new Date(reply.createdAt).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* User events */}
      <div className="mt-20 border-2 border-black p-7 shadow-2xl bg-blue-50 w-2/3">
        <h2 className="text-2xl font-semibold mb-4">Your Events:</h2>
        {data.posts && data.events.length === 0 ? (
          <p>No events found</p>
        ) : (
          <ul>
            {data.events?.map((event) => (
              <li key={event._id} className="mt-4 border-b pb-2">
                <p><strong>Title:</strong> {event.title}</p>
                <p><strong>Category:</strong> {event.category}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Description:</strong> {event.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* attendees */}
      <div className="mt-20 border-2 border-black p-7 shadow-2xl bg-blue-50 w-2/3">
        <h2 className="text-2xl font-semibold mb-4">Attendee list:</h2>
        {data.attenders && data.attenders.length === 0 ? (
          <p>No attenders found</p>
        ) : (
          <ul>
            {data.attenders?.map((attendee) => (
              <li key={attendee._id} className="mt-4 border-b pb-2">
                <p><strong>Joined At:</strong> {attendee.joinedAt}</p>
               
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* User joined events */}
      <div className="mt-20 border-2 border-black p-7 shadow-2xl bg-blue-50 w-2/3">
        <h2 className="text-2xl font-semibold mb-4">Events you have joined:</h2>
        {data.joiners && data.joiners.length === 0 ? (
          <p>No posts found</p>
        ) : (
          <ul>
            {data.joiners?.map((join) => (
              <li key={join._id} className="mt-4 border-b pb-2">
                <p><strong>Event Pass:</strong> {join.eventId}</p>
               
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Profile;
