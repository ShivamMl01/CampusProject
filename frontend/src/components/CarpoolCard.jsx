import { useContext } from "react";
import { AppContext } from "../context/appContext.jsx";

const CarpoolCard = ({ carpool }) => {
  const { joinCarpool, loading } = useContext(AppContext);

  const handleJoin = () => {
    joinCarpool(carpool._id);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md border">
      {/* Route */}
      <h4 className="font-semibold text-lg">
        {carpool?.from} → {carpool?.to}
      </h4>

      {/* Date & Time */}
      <p className="text-gray-600 text-sm mt-1">
        {new Date(carpool?.dateTime).toLocaleString()}
      </p>

      {/* Pickup */}
      {carpool?.pickup && (
        <p className="text-gray-500 text-sm mt-1">
          Pickup: {carpool?.pickup}
        </p>
      )}

      {/* Seats */}
      <p className="text-sm font-medium mt-2">
        Seats available: {carpool?.seats}
      </p>

      {/* Action */}
      <button
        onClick={handleJoin}
        disabled={loading || carpool?.seats <= 0}
        className={`mt-3 px-4 py-2 rounded-lg text-white font-medium
          ${
            carpool?.seats <= 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
      >
        {carpool?.seats > 0 ? "Join Carpool" : "Full"}
      </button>
    </div>
  );
};

export default CarpoolCard;
