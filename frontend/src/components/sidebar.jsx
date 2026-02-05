// src/components/Sidebar.jsx
import { Link, useLocation } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaPlaneDeparture, FaShoppingBag, FaCarSide, FaBell } from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      name: "Post Travel Plan",
      path: "/travel",
      icon: <FaPlaneDeparture />,
      gradient: "from-blue-500 to-blue-600",
    },
    {
      name: "Request an Errand",
      path: "/errands",
      icon: <FaShoppingBag />,
      gradient: "from-blue-500 to-blue-600",
    },
    {
      name: "Offer Carpool Ride",
      path: "/carpool",
      icon: <FaCarSide />,
      gradient: "from-blue-500 to-blue-600",
    },
    {
      name: "SOS Emergency",
      path: "/emergency",
      icon: <FaBell />,
      gradient: "from-red-500 to-red-600",
    },
  ];

  return (
<aside style={{ width: "280px" }} className="w-full md:w-auto bg-white p-4 rounded-2xl shadow-lg">
      <div className="space-y-6">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;

          return (
            <Link key={index} to={item.path}>
              <div
                className={`flex items-center justify-between px-4 py-6 rounded-2xl text-white shadow-md cursor-pointer
                bg-linear-to-r ${item.gradient}
                hover:scale-[1.02] transition-all duration-200
                ${isActive ? "ring-2 ring-blue-200" : ""}`}
              >
                {/* Left */}
                <div className="flex items-center gap-3">
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-semibold text-sm md:text-base">
                    {item.name}
                  </span>
                </div>

                {/* Right arrow */}
                <span className="text-2xl opacity-90">
                  <MdKeyboardArrowRight />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
