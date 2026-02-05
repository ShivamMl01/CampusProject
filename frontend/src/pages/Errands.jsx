import { useContext, useState } from "react";
import ErrandCard from "../components/ErrandCard.jsx";
import { AppContext } from "../context/appContext.jsx";

const Errands = () => {
  const {
    errands,
    search,
    setSearch,
    handleAddErrand,
    acceptErrand,
    completeErrand,
    loading,
  } = useContext(AppContext);

  // LOCAL form state 
  const [formData, setFormData] = useState({
    title: "",
    location: "",
  });

  //  derive filtered errands locally
  const filteredErrands = (errands || []).filter((e) =>
    e.title?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <p className="p-6">Loading errands...</p>;
  }
  

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Errands</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel */}
        <div className="bg-white p-5 rounded-2xl shadow">
          <h2 className="font-semibold mb-4">Request Errand</h2>

          <input
            placeholder="Item"
            className="w-full border p-3 rounded-xl mb-3"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          <input
            placeholder="Location"
            className="w-full border p-3 rounded-xl mb-4"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
          />

          <button
            onClick={() => handleAddErrand(formData)}
            className="w-full bg-yellow-500 text-white py-2 rounded-xl"
          >
            Add Errand
          </button>

          <input
            className="mt-6 w-full border p-3 rounded-xl"
            placeholder="Search errands..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Right Panel */}
        <div className="lg:col-span-2 space-y-4">
          {filteredErrands.length > 0 ? (
            filteredErrands.map((errand) => (
              <ErrandCard
                key={errand._id}
                errand={errand}
                onAccept={acceptErrand}
                onComplete={completeErrand}
              />
            ))
          ) : (
            <p>No errands found </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Errands;
