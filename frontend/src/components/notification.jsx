import { useContext, useEffect, useRef, useState } from "react";
import { FaBell } from "react-icons/fa";
import { AppContext } from "../context/appContext.jsx";

export default function NotificationBell() {
  console.log("NotificationBell mounted");


  const {
    notifications,
    fetchNotification,
    loadingNotification
  } = useContext(AppContext);

  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);

  // Fetch when dropdown opens
  useEffect(() => {
    if (open) {
      fetchNotification();
    }
  }, [open]);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={boxRef}>

      {/* Bell Button */}
      <button
        onClick={() => {
          console.log("Bell clicked");
          setOpen(!open);
        }}
        className="relative h-10 w-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
      >
        <FaBell className="text-gray-700" />

        {notifications.length > 0 && (
          <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full"></span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-72 bg-white rounded-xl shadow-lg p-3 z-50">

          <h4 className="font-semibold mb-2">Notifications</h4>

          {loadingNotification ? (
            <p className="text-sm text-gray-500">Loading...</p>
          ) : notifications.length === 0 ? (
            <p className="text-sm text-gray-500">No notifications</p>
          ) : (
            notifications.map((n) => (
              <div
                key={n._id}
                className="p-2 rounded hover:bg-gray-100 text-sm"
              >
                {n.message}
              </div>
            ))
          )}

        </div>
      )}
    </div>
  );
}
