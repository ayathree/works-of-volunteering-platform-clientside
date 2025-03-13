import { Link } from "react-router";


const Events = () => {
    return (
        <div>
            <p>hi</p>
            <Link to={'/createEvents'}><button className="btn bg-blue-500 text-white">Create Events</button></Link>

        </div>
    );
};

export default Events;