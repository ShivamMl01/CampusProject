import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/appContext.jsx";
import CarpoolCard from "../components/CarpoolCard.jsx";

const Carpool = () => {
  const { carpools, fetchCarpools, handleAddCarpool, loading } =
    useContext(AppContext);

  const [formData, setFormData] = useState({
    from: "",
    to: "",
    dateTime: "",
    seats: "",
    pickup: "",
  });

  useEffect(() => {
    fetchCarpools();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleAddCarpool(formData);
    setFormData({
      from: "",
      to: "",
      dateTime: "",
      seats: "",
      pickup: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Carpool</h1>
        <p className="text-gray-600 mt-1">
          Offer or request rides easily within campus and nearby locations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-md p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Create a Carpool Request
            </h2>

            <form className="space-y-4" onSubmit={onSubmit}>
              <div>
                <label className="text-sm font-medium text-gray-700">From</label>
                <input
                  type="text"
                  name="from"
                  value={formData.from}
                  onChange={handleChange}
                  className="mt-1 border p-3 rounded-xl w-full"
                  placeholder="Hostel A"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">To</label>
                <input
                  type="text"
                  name="to"
                  value={formData.to}
                  onChange={handleChange}
                  className="mt-1 border p-3 rounded-xl w-full"
                  placeholder="Railway Station"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Date & Time
                </label>
                <input
                  type="datetime-local"
                  name="dateTime"
                  value={formData.dateTime}
                  onChange={handleChange}
                  className="mt-1 border p-3 rounded-xl w-full"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Seats Needed
                </label>
                <select
                  name="seats"
                  value={formData.seats}
                  onChange={handleChange}
                  className="mt-1 border p-3 rounded-xl w-full"
                >
                  <option value="">Select seats</option>
                  <option value="1">1 Seat</option>
                  <option value="2">2 Seats</option>
                  <option value="3">3 Seats</option>
                  <option value="4">4 Seats</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Pickup Point
                </label>
                <select
                  name="pickup"
                  value={formData.pickup}
                  onChange={handleChange}
                  className="mt-1 border p-3 rounded-xl w-full"
                >
                  <option value="">Select pickup</option>
                  <option>Main Gate</option>
                  <option>Hostel Area</option>
                  <option>Library</option>
                  <option>Bus Stop</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
              >
                Request Ride
              </button>
            </form>
          </div>
        </div>

        {/* Right Side */}
        <div className="lg:col-span-2">
          <section className="bg-white rounded-2xl shadow-md p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Carpool Offers
            </h2>

            {loading ? (
              <p className="text-gray-500">Loading carpools...</p>
            ) : carpools?.length === 0 ? (
              <p className="text-gray-500">No carpools available</p>
            ) : (
              <div className="space-y-4">
  {carpools?.map((carpool) => (
    <CarpoolCard
      key={carpool._id}
      carpool={carpool}
    />
  ))}
</div>

            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Carpool;
