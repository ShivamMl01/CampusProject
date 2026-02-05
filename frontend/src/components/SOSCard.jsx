// src/components/SOSCard.jsx
const SOSCard = ({
  title,
  details,
  message,
  latitude,
  longitude,
  createdAt,
}) => {
  const timeAgo = createdAt
    ? new Date(createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  const mapUrl =
    latitude && longitude
      ? `https://www.google.com/maps?q=${latitude},${longitude}`
      : null;

  return (
    <div className="bg-white rounded-2xl p-4 mb-3 shadow-sm hover:shadow-md transition border border-red-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <h4 className="font-semibold text-red-600">
          {title || "Live SOS"}
        </h4>
        <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
          LIVE
        </span>
      </div>

      {/* Meta */}
      {details && (
        <p className="text-xs text-gray-500 mb-2">
          {details} {timeAgo && `• ${timeAgo}`}
        </p>
      )}

      {/* Message */}
      {message && (
        <p className="text-sm text-gray-700 mb-3">
          “{message}”
        </p>
      )}

      {/* Map Preview */}
      {mapUrl && (
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block mb-3"
        >
          <div className="bg-gray-100 h-24 rounded-xl flex items-center justify-center text-xs text-gray-500 hover:bg-gray-200 transition">
            📍 Tap to open location in Maps
          </div>
        </a>
      )}

      {/* Action Button */}
      {mapUrl && (
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <button className="w-full mt-1 px-4 py-2 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition">
            📍 View Location
          </button>
        </a>
      )}
    </div>
  );
};

export default SOSCard;
