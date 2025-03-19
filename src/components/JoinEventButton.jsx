import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

const JoinEventButton = ({ eventId, eventCreatorId }) => {
  const [isJoined, setIsJoined] = useState(false);

  // Get user info and token from localStorage
  const getUserFromLocalStorage = (key) => {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (error) {
      console.error(`Error parsing localStorage key: ${key}`, error);
      return null;
    }
  };

  const user = getUserFromLocalStorage("user");
  const token = getUserFromLocalStorage("token");

  useEffect(() => {
    // Check if the user already joined the event
    const joinedEvents = getUserFromLocalStorage("joinedEvents") || [];
    if (joinedEvents.includes(eventId)) {
      setIsJoined(true);
    }
  }, [eventId]);

  const handleJoinEvent = async () => {
    // Ensure user is logged in
    if (!user || !token) {
      toast.error("Please log in to join the event.");
      return;
    }

    const joinData = {
      attenderId: user._id,
      eventCreatorId,
      eventId,
    };

    try {
      console.log("Joining event with data:", joinData);

      const response = await axios.post("http://localhost:5000/addEvent", joinData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        // Mark as joined
        setIsJoined(true);

        // Update joined events in localStorage
        const joinedEvents = getUserFromLocalStorage("joinedEvents") || [];
        localStorage.setItem("joinedEvents", JSON.stringify([...joinedEvents, eventId]));

        toast.success("Successfully joined the event!");
      } else {
        toast.error("Failed to join the event.");
      }
    } catch (error) {
      console.error("Error joining event:", error.response || error);
      toast.error(error.response?.data?.message || "Failed to join event.");
    }
  };

  return (
    <div className="flex justify-center mt-3">
      <button
        onClick={handleJoinEvent}
        disabled={isJoined}
        className={`bg-blue-600 p-2 px-5 text-white btn ${
          isJoined ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isJoined ? "Joined" : "Join Event"}
      </button>
    </div>
  );
};

export default JoinEventButton;
