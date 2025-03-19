import { useState, useEffect } from "react";
import { BiSolidCategory } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosTime } from "react-icons/io";
import { MdDateRange } from "react-icons/md";
import { Link, useLoaderData } from "react-router";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";


const Events = () => {
  // Load all events once
  const loadedEvents = useLoaderData();
  const [isJoined, setIsJoined] = useState(false);

  // State to store the original and filtered events
  const [events, setEvents] = useState(loadedEvents);

  // Filter states
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Extract unique locations and categories
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Extract unique locations and categories from events
    const uniqueLocations = [...new Set(loadedEvents.map((event) => event.location))];
    const uniqueCategories = [...new Set(loadedEvents.map((event) => event.category))];

    setLocations(uniqueLocations);
    setCategories(uniqueCategories);
  }, [loadedEvents]);

  // Handle Filter Logic
  const handleFilter = () => {
    let filteredEvents = loadedEvents;

    if (location) {
      filteredEvents = filteredEvents.filter((event) => event.location === location);
    }

    if (category) {
      filteredEvents = filteredEvents.filter((event) => event.category === category);
    }

    if (startDate && endDate) {
      filteredEvents = filteredEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate >= new Date(startDate) && eventDate <= new Date(endDate);
      });
    }

    setEvents(filteredEvents);
  };

  // Reset filters
  const handleShowAllEvents = () => {
    setLocation("");
    setCategory("");
    setStartDate("");
    setEndDate("");
    setEvents(loadedEvents);
  };

  // Improved handleJoinEvent function with token authentication
  const handleJoinEvent = async (eventId, eventCreatorId) => {
    try {
      // Retrieve the token from localStorage
      const token = JSON.parse(localStorage.getItem("token"));

      if (!token) {
        toast("You must be logged in to join events.");
        return;
      }

      console.log("Joining event with:", { eventId, eventCreatorId });

      // Send request with Authorization header
      const response = await axios.post(
        "http://localhost:5000/addEvent",
        { eventId, eventCreatorId },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token
          },
        }
      );

      if (response.status === 200) {
          setIsJoined(true);
          toast("Successfully joined the event!");
      } else {
        toast("Failed to join the event.");
      }
    } catch (error) {
      console.error("Error joining event:", error.message);
      toast("Error joining the event. Try again later.");
    }
  };

  return (
    <div className="mx-7 mb-20">
      {/* Header Section */}
      <div className="border-2 border-black bg-blue-50 shadow-2xl mt-20 p-3 flex justify-between items-center">
        <p className="text-2xl font-bold">You can create any volunteer events.</p>
        <Link to="/createEvents">
          <button className="btn bg-blue-500 text-white">Create Events</button>
        </Link>
      </div>

      {/* Filter Section */}
      <h1 className="mt-20 text-2xl font-bold text-center">Filter Events</h1>
      <div className="border-2 border-black bg-blue-50 shadow-2xl mt-10 p-3">
        <div className="flex justify-center gap-4 mt-4 items-center p-4">
          {/* Location Filter */}
          <div>
            <label className="font-bold text-xl p-1">Location:</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border-2 p-2 rounded"
            >
              <option value="">All Locations</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="font-bold text-xl p-1">Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border-2 p-2 rounded"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Date Filters */}
          <div>
            <label className="font-bold text-xl p-1">Start Date:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border-2 p-2 rounded"
            />
          </div>

          <div>
            <label className="font-bold text-xl p-1">End Date:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border-2 p-2 rounded"
            />
          </div>

          {/* Filter Button */}
          <button onClick={handleFilter} className="bg-blue-600 text-white p-2 rounded">
            Filter
          </button>

          {/* Show All Button */}
          <button onClick={handleShowAllEvents} className="bg-blue-600 text-white p-2 rounded">
            All Events
          </button>
        </div>
      </div>

      {/* Events List */}
      <h1 className="mt-20 text-2xl font-bold text-center">All Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {events.length === 0 ? (
          <p className="text-red-500 col-span-3">No events found matching your filters.</p>
        ) : (
          events.map((event) => (
            <div key={event._id} className="border-2 border-black p-5 shadow-2xl bg-blue-50">
              <h1 className="text-center font-bold text-2xl">{event.title}</h1>
              <p className="text-center">{event.description}</p>

              <div className="flex justify-center gap-5 mt-5">
                <p>
                  <MdDateRange /> {event.date}
                </p>
                <p>
                  <FaLocationDot /> {event.location}
                </p>
              </div>

              {isJoined ? (
                <p>You have successfully joined the event!</p>
              ) : (
                <button onClick={() => handleJoinEvent(event._id, event.creatorId)}>
                  Join Event
                </button>
              )}
            </div>
          ))
        )}
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Events;
