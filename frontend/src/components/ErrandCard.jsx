const ErrandCard = ({ errand, onAccept, onComplete }) => {
    if (!errand) return null; 

  return (
    <div className="bg-white p-4 rounded-2xl shadow flex justify-between items-center">
      <div>
        <h3 className="font-semibold">{errand.title}</h3>
        <p className="text-sm text-gray-500">
          {errand.requestedBy} • {errand.location}
        </p>
        <p className="text-xs mt-1 capitalize">
          Status: {errand.status}
        </p>
      </div>

      <div className="flex gap-2">
        {errand.status === "open" && (
          <button
            onClick={() => onAccept(errand._id)}
            className="bg-blue-500 text-white px-3 py-1 rounded-lg"
          >
            Accept
          </button>
        )}

        {errand.status === "accepted" && (
          <button
            onClick={() => onComplete(errand._id)}
            className="bg-green-500 text-white px-3 py-1 rounded-lg"
          >
            Complete
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrandCard;
