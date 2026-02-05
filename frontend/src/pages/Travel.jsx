import { useContext, useState } from "react";
import TravelCard from "../components/TravelCard.jsx";
import { AppContext } from "../context/appContext.jsx";

const Travel = () => {
  const { travels, addTravel, loading } = useContext(AppContext);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [mode, setMode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!from || !to || !dateTime || !mode) return;

    addTravel({
      from,
      to,
      dateTime,
      mode,
    });

    // reset form
    setFrom("");
    setTo("");
    setDateTime("");
    setMode("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Travel</h1>
        <p className="text-gray-600 mt-1">
          Post your travel plan and find students with similar routes & timings.
        </p>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Post Travel Plan */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-md p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Post Travel Plan
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  From
                </label>
                <input
                  type="text"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  placeholder="Campus"
                  className="mt-1 border border-gray-300 p-3 rounded-xl w-full outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  To
                </label>
                <input
                  type="text"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  placeholder="City Mall"
                  className="mt-1 border border-gray-300 p-3 rounded-xl w-full outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={dateTime}
                  onChange={(e) => setDateTime(e.target.value)}
                  className="mt-1 border border-gray-300 p-3 rounded-xl w-full outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Mode of Travel
                </label>
                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                  className="mt-1 border border-gray-300 p-3 rounded-xl w-full outline-none focus:ring-2 focus:ring-blue-200"
                >
                  <option value="">Select mode</option>
                  <option value="walking">Walking</option>
                  <option value="bike">Bike</option>
                  <option value="auto">Auto</option>
                  <option value="cab">Cab</option>
                  <option value="bus">Bus</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50"
              >
                {loading ? "Posting..." : "+ Post Travel Plan"}
              </button>
            </form>
          </div>
        </div>

        {/* Right: Recent Travel Plans */}
        <div className="lg:col-span-2">
          <section className="bg-white rounded-2xl shadow-md p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Recent Travel Plans
            </h2>

            {travels.length === 0 && (
              <p className="text-gray-500">No travel plans yet</p>
            )}

            <div className="space-y-4">
              {travels.map((travel) => (
                <TravelCard key={travel._id} travel={travel} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Travel;
