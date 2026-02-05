import Sidebar from "../components/sidebar.jsx";
import TravelCard from "../components/TravelCard.jsx";
import ErrandCard from "../components/ErrandCard.jsx";
import CarpoolCard from "../components/CarpoolCard.jsx";
import EmergencyCard from "../components/EmergencyCard.jsx";
import SOSCard from "../components/SOSCard.jsx";
import {AppContext} from "../context/appContext.jsx";
import { useContext, useState } from "react";



const Home = () => {
  const {loading, travels, errands, carpools,emergencies,sosAlerts,loadingEmergency} = useContext(AppContext);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 space-y-6">
          {/* Page Header */}
          <div className="bg-white rounded-2xl shadow-md p-5">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Campus Commute Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Track travel plans, errands, carpools, and emergency alerts in one place.
            </p>
          </div>

          
          

          {/*  Recent Travel Plans  */}
          <section className="bg-white rounded-2xl shadow-md p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Travel Plans
              </h2>
            </div>

            {loading && <p className="text-gray-500">Loading travel plans...</p>}

            {!loading && travels.length === 0 && (
              <p className="text-gray-500">No travel plans yet</p>
            )}

            <div className="space-y-4">
              {travels.slice(0, 3).map((travel) => (
                <TravelCard key={travel._id} travel={travel} />
              ))}
            </div>
          </section>

          {/* Errands + Carpool */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Errands */}
            <section className="bg-white rounded-2xl shadow-md p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Errand Requests
                </h2>
                <button className="text-sm font-medium text-yellow-600 hover:underline">
                  View all
                </button>
              </div>

              {loading && <p className="text-gray-500">Loading Errands...</p>}
              {!loading && travels.length === 0 && (
              <p className="text-gray-500">No travel plans yet</p>
            )}


              <div className="space-y-4">
                {errands.slice(0, 3).map((errand) => (
                <ErrandCard key={errand._id} errand={errand} />
              ))}
              </div>
            </section>

            {/* Carpool */}
            <section className="bg-white rounded-2xl shadow-md p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Carpool Offers
                </h2>
                <button className="text-sm font-medium text-green-600 hover:underline">
                  View all
                </button>
              </div>

              {loading && <p className="text-gray-500">Loading Errands...</p>}
              {!loading && carpools.length === 0 && (
              <p className="text-gray-500">No carpools yet</p>
              )}

              <div className="space-y-4">
                {carpools.slice(0, 3).map((carpool) => (
                  <CarpoolCard key={carpool._id} carpool={carpool} />
                ))}
              </div>
            </section>
          </div>

          {/* Emergency + SOS */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Emergency */}
  <section className="bg-white rounded-2xl shadow-md p-5">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold text-gray-900">
        Urgent Help Requests
      </h2>
      <button className="text-sm font-medium text-red-600 hover:underline">
        View all
      </button>
    </div>

    <div className="space-y-4">
      {emergencies.length === 0 ? (
        <p className="text-sm text-gray-500">No active emergencies</p>
      ) : (
        emergencies.slice(0, 2).map((item) => (
          <EmergencyCard key={item._id} {...item} />
        ))
      )}
    </div>
  </section>

  {/* SOS */}
  <section className="bg-white rounded-2xl shadow-md p-5">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold text-gray-900">
        Live SOS Location
      </h2>
      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-50 text-red-600">
        LIVE
      </span>
    </div>

    <div className="space-y-4">
      {sosAlerts.length === 0 ? (
        <p className="text-sm text-gray-500">No live SOS alerts</p>
      ) : (
        sosAlerts.slice(0, 1).map((alert) => (
          <SOSCard key={alert._id} {...alert} />
        ))
      )}
    </div>
  </section>
</div>

        </main>
      </div>
    </div>
  );
};

export default Home;
