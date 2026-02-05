// src/components/Navbar.jsx
import { Link, useLocation } from "react-router-dom";
import { FaBell } from "react-icons/fa"
import { useContext } from "react";
import { AppContext } from "../context/appContext.jsx";
import profileicone from '../assets/profile_icon.png';
import NotificationBell from '../components/notification.jsx';

const Navbar = () => {
  const location = useLocation();

  const {token, setToken ,navigate} = useContext(AppContext);
  const logout = ()=>{
    localStorage.removeItem('token');
    setToken('');
    navigate('/login');
  }

  const navLinks = [
    { name: "Travel", path: "/travel" },
    { name: "Errands", path: "/errands" },
    { name: "Carpool", path: "/carpool" },
    { name: "Emergency", path: "/emergency" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="w-full px-4 md:px-8 py-3 flex items-center justify-between">
        {/* Left Logo  */}
        <Link to="/" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
            C
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 leading-tight">
CampusAid            </h1>
            <p className="text-xs text-gray-500 -mt-0.5">Student Assistant</p>
          </div>
        </Link>

        {/* Center: Links */}
        <div className="hidden md:flex items-center gap-2 bg-gray-100 px-2 py-2 rounded-full">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition
                ${
                  isActive
                    ? "bg-blue-600 text-white shadow"
                    : "text-gray-700 hover:bg-white hover:shadow-sm"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Search + Profile */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="hidden lg:block">
            <input
              type="text"
              placeholder="Search..."
              className="w-56 border border-gray-200 bg-white px-4 py-2 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Notification */}
          <div className="flex items-center gap-4">
  <NotificationBell />
</div>


          {/* Profile Dropdown */}
          <div className="relative group">
            {/* Profile Button */}
        <div className='group relative'>
         <img onClick={()=>token? null :navigate('/login') } className='w-5 cursor-pointer' src={profileicone} alt="" />
          {  token &&  
         <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
              <p className='cursor-pointer hover:text-black'>My Profile</p>
              <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
            </div>
          </div>}
          </div>  

            
            
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
