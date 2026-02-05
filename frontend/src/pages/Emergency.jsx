import { useState, useContext } from "react";
import EmergencyCard from "../components/EmergencyCard.jsx";
import SOSCard from "../components/SOSCard.jsx";
import { AppContext } from "../context/appContext.jsx";

const Emergency = () => {
  const {
    emergencies,
    sosAlerts,
    loadingEmergency,
    createEmergency,
    sendSOS,
  } = useContext(AppContext);

  const [activeTab, setActiveTab] = useState("emergency");

  // form state
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [priority, setPriority] = useState("HIGH PRIORITY");

  const [message, setMessage] = useState("");
  const [location, setLocation] = useState(null);

  const submitEmergency = async () => {
    if (!title || !details) return alert("Fill all fields");

    await createEmergency({
      title,
      details,
      priority,
      icon: priority === "CRITICAL" ? "!" : "+",
    });

    setTitle("");
    setDetails("");
    setPriority("HIGH PRIORITY");
  };

  const getLiveLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        }),
      () => alert("Location permission denied")
    );
  };

  const submitSOS = async () => {
    if (!message || !location)
      return alert("Describe problem & share location");

    await sendSOS({ message, ...location });
    setMessage("");
    setLocation(null);
  };

  if (loadingEmergency) {
    return (
      <div className="min-h-screen grid place-items-center text-gray-500">
        Fetching emergency signals…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">Emergency Hub</h1>
        <p className="text-gray-600 mt-2 max-w-xl">
          Report urgent issues or broadcast live SOS alerts.
        </p>
      </header>

      {/* Tabs */}
      <div className="flex gap-2 mb-8">
        {["emergency", "sos"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-full text-sm font-semibold ${
              activeTab === tab
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-600"
            }`}
          >
            {tab === "emergency" ? "🚑 Urgent Request" : "🚨 Send SOS"}
          </button>
        ))}
      </div>

      {/* Forms */}
      {activeTab === "emergency" ? (
        <section className="bg-white rounded-3xl p-6 mb-10">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Emergency title"
            className="w-full mb-3 px-4 py-3 border rounded-2xl"
          />

          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Describe the situation"
            className="w-full mb-4 px-4 py-3 border rounded-2xl"
          />

          <button
            onClick={submitEmergency}
            className="px-6 py-2 rounded-2xl bg-black text-white"
          >
            Submit Emergency
          </button>
        </section>
      ) : (
        <section className="bg-white rounded-3xl p-6 mb-10 border border-red-100">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe your emergency"
            className="w-full mb-4 px-4 py-3 border rounded-2xl"
          />

          <div className="flex gap-3">
            <button
              onClick={getLiveLocation}
              className="px-4 py-2 bg-blue-600 text-white rounded-2xl"
            >
              {location ? "📍 Location Shared" : "Share Location"}
            </button>

            <button
              onClick={submitSOS}
              className="px-4 py-2 bg-red-600 text-white rounded-2xl"
            >
              Send SOS
            </button>
          </div>
        </section>
      )}

      {/* Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 bg-white rounded-3xl p-6">
          <h3 className="font-semibold mb-4">Urgent Help Requests</h3>
          {emergencies.map((e) => (
            <EmergencyCard key={e._id} {...e} />
          ))}
        </section>

        <section className="bg-white rounded-3xl p-6">
          <h3 className="font-semibold mb-4">Live SOS</h3>
          {sosAlerts.map((s) => (
            <SOSCard key={s._id} {...s} />
          ))}
        </section>
      </div>
    </div>
  );
};

export default Emergency;
