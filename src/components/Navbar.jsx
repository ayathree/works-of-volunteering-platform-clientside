import { Link } from "react-router";
// import { useContext } from "react"
import {  useNavigate } from "react-router";



const Navbar = () => {
   
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const handleLogout = () => {
       localStorage.removeItem('token')
        navigate("/");
    };
    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
       <Link to={'/userProfile'}> <li><a>Profile</a></li></Link>
      
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">Volunteering Platform</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
       <Link to={'/'}> <li><a>Home</a></li></Link>
      <Link to={'/userProfile'}><li><a>Profile</a></li></Link>
      <Link to={'/events'}><li><a>Volunteer Events</a></li></Link>
      <Link to={'/community'}><li><a>Community</a></li></Link>

      
      
    </ul>
  </div>
  <div className="navbar-end">
  {
    !token?(<Link to={'/loginUser'}><a className="btn">Login</a></Link>):(
        <a onClick={handleLogout} className="btn" >Logout</a>
    )
  }
  </div>
</div>
            
        </div>
    );
};

export default Navbar;