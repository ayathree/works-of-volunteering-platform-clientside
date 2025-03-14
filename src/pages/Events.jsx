import { useState, useEffect } from "react";
import { BiSolidCategory } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosTime } from "react-icons/io";
import { MdDateRange } from "react-icons/md";
import { Link, useLoaderData } from "react-router";

const Events = () => {
    // Load all events once
    const loadedEvents = useLoaderData();

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

    // Handle Filter Logic (on the client side)
    const handleFilter = () => {
        let filteredEvents = loadedEvents;

        // Filter by location (if selected)
        if (location) {
            filteredEvents = filteredEvents.filter((event) => event.location === location);
        }

        // Filter by category (if selected)
        if (category) {
            filteredEvents = filteredEvents.filter((event) => event.category === category);
        }

        // Filter by date range
        if (startDate && endDate) {
            filteredEvents = filteredEvents.filter((event) => {
                const eventDate = new Date(event.date);
                return eventDate >= new Date(startDate) && eventDate <= new Date(endDate);
            });
        }

        // Update the filtered events
        setEvents(filteredEvents);
    };

    // Reset filters and show all events
    const handleShowAllEvents = () => {
        setLocation("");
        setCategory("");
        setStartDate("");
        setEndDate("");
        setEvents(loadedEvents); // Reset to all events
    };

    return (
        <div className="mx-7">
            {/* Header Section */}
            <div className="border-2 border-black bg-blue-50 shadow-2xl mt-20 p-3 flex flex-row justify-between items-center">
                <p className="text-2xl font-bold">You can create any volunteer events.</p>
                <Link to="/createEvents">
                    <button className="btn bg-blue-500 text-white">Create Events</button>
                </Link>
            </div>

            {/* Filter Section */}
            <h1 className=" mt-20 text-2xl font-bold text-center">Filter Events</h1>
           <div className="border-2 border-black bg-blue-50 shadow-2xl mt-10 p-3 ">
           <div className="flex flex-row justify-center  gap-4 mt-4 items-center p-4">
                {/* Location Filter (Dropdown) */}
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

                {/* Category Filter (Dropdown) */}
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

                {/* Date Range Filters */}
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

                {/* Show All Events Button */}
                <button onClick={handleShowAllEvents} className="bg-blue-600 text-white p-2 rounded">
                    All Events
                </button>
            </div>
           </div>

            {/* Events List */}
            <h1 className=" mt-20 text-2xl font-bold text-center">All Events</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center items-center mt-10">
                {events.length === 0 ? (
                    <p className="text-red-500 col-span-3">No events found matching your filters.</p>
                ) : (
                    events.map((event) => (
                        <div key={event._id} className="border-2 border-black w-full max-w-sm p-5 shadow-2xl bg-blue-50">
                            <h1 className="text-center font-bold text-2xl">{event.title}</h1>
                            <p className="text-center">{event.description}</p>

                            <div className="flex flex-row gap-5 justify-center items-center mt-5">
                                <div className="flex flex-col justify-center items-center gap-3">
                                    <p className="flex items-center gap-1">
                                        <MdDateRange /> {event.date}
                                    </p>
                                    <p className="flex items-center gap-1">
                                        <IoIosTime /> {event.time}
                                    </p>
                                </div>

                                <div className="flex flex-col justify-center items-center gap-3">
                                    <p className="flex items-center gap-1">
                                        <FaLocationDot /> {event.location}
                                    </p>
                                    <p className="flex items-center gap-1">
                                        <BiSolidCategory /> {event.category}
                                    </p>
                                </div>
                            </div>

                            <div className="flex justify-center mt-3">
                                <button className="bg-blue-600 p-2 px-5 text-white btn">Join Event</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Events;
