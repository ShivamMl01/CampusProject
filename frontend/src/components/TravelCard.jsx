// src/components/TravelCard.jsx
import { useContext } from "react";
import { AppContext } from "../context/appContext.jsx";
import profileIcon from "../assets/profile_icon.png";

const TravelCard = ({ travel }) => {
  const { joinTravel, loading, token } = useContext(AppContext);

  
  
        
        const payload = JSON.parse(atob(token.split(".")[1]));
  
        localStorage.setItem("token", token);
        localStorage.setItem("userId", payload.sub); 
        console.log("Logged in userId:", payload.sub);
  


  if (!travel) return null;
    const userId = localStorage.getItem("userId");
  console.log("TravelCard userId:", userId);

  const isJoined = travel.joinedUsers?.some(
    (join) =>
      join.user &&
      (join.user._id?.toString() === userId ||
       join.user.toString() === userId)
  );

  const handleJoin = () => {
    if (!token) {
      alert("Please login to join a travel plan");
      return;
    }
    if (isJoined) return;
    joinTravel(travel._id);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md flex items-center justify-between">
      {/* Left */}
      <div className="flex items-center gap-4">
        <img
          src={profileIcon}
          alt="User"
          className="w-10 h-10 rounded-full object-cover"
        />

        <div>
          <h4 className="font-bold text-gray-900">
            {travel.from} → {travel.to}
          </h4>
          <p className="text-sm text-gray-500 capitalize">
            Mode: {travel.mode}
          </p>

          {travel.joinedUsers?.length > 0 && (
            <p className="text-xs text-gray-400 mt-1">
              👥 {travel.joinedUsers.length} joined
            </p>
          )}
        </div>
      </div>

      {/* Middle */}
      <div className="text-sm text-gray-600 text-right">
        <p>{new Date(travel.dateTime).toLocaleDateString()}</p>
        <p>
          {new Date(travel.dateTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>

      {/* Right */}
      <div className="flex gap-2">
        <button
          onClick={handleJoin}
          disabled={isJoined || loading}
          className={`px-4 py-1 rounded-lg font-semibold text-white transition ${
            isJoined
              ? "bg-green-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isJoined ? "Joined" : "Join"}
        </button>

        <button className="bg-gray-200 px-4 py-1 rounded-lg text-gray-700">
          Sync
        </button>
      </div>
    </div>
  );
};

export default TravelCard;
