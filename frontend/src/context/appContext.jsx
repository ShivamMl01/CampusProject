import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext(null);

const AppProvider = ({ children }) => {

  
  const backendUrl = import.meta.env.VITE_BACKEND_URL + "/api";
  console.log("Backend URL:", backendUrl);

  const navigate = useNavigate();

  const [travels, setTravels] = useState([]);
  const [errands, setErrands] = useState([]);
  const [carpools, setCarpools] = useState([]);
  const [emergencies, setEmergencies] = useState([]);
  const [sosAlerts, setSosAlerts] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loadingEmergency, setLoadingEmergency] = useState(true);
  const [loadingNotification, setLoadingNotification] = useState(false);

  const [search, setSearch] = useState("");

  const [token, setToken] = useState(
    localStorage.getItem("token") || null
  );


  const fetchTravels = async () => {
    if (!token) return;

    try {
      setLoading(true);
      const res = await axios.get(`${backendUrl}/travel`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTravels(res.data?.data || []);
    } catch (err) {
      toast.error("Failed to fetch travel plans");
    } finally {
      setLoading(false);
    }
  };

  const addTravel = async (travelData) => {
    try {
      const res = await axios.post(
        `${backendUrl}/travel`,
        travelData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTravels((prev) => [res.data.data, ...prev]);
    } catch (err) {
      toast.error("Add travel failed");
    }
  };

  const joinTravel = async (id) => {
    try {
      const res = await axios.put(
        `${backendUrl}/travel/join/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTravels((prev) =>
        prev.map((t) => (t._id === id ? res.data.data : t))
      );
    } catch {
      toast.error("Join travel failed");
    }
  };


  const fetchErrands = async () => {
    try {
      const res = await axios.get(`${backendUrl}/errands`);
      setErrands(res.data?.data || []);
    } catch {
      setErrands([]);
    }
  };

  const handleAddErrand = async (data) => {
    try {
      await axios.post(`${backendUrl}/errands`, data);
      fetchErrands();
    } catch {
      toast.error("Add errand failed");
    }
  };

  const acceptErrand = async (id) => {
    await axios.put(`${backendUrl}/errands/${id}/accept`);
    fetchErrands();
  };

  const completeErrand = async (id) => {
    await axios.put(`${backendUrl}/errands/${id}/complete`);
    fetchErrands();
  };


  const fetchCarpools = async () => {
    if (!token) return;

    try {
      const res = await axios.get(`${backendUrl}/carpool`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCarpools(res.data?.data || []);
    } catch {
      setCarpools([]);
    }
  };

  const handleAddCarpool = async (data) => {
    try {
      await axios.post(`${backendUrl}/carpool`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCarpools();
    } catch {
      toast.error("Add carpool failed");
    }
  };

  const joinCarpool = async (id) => {
    await axios.put(`${backendUrl}/carpool/join/${id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchCarpools();
  };


  const fetchEmergencyData = async () => {
    try {
      const [eRes, sRes] = await Promise.all([
        axios.get(`${backendUrl}/emergency`),
        axios.get(`${backendUrl}/sos`)
      ]);
      setEmergencies(eRes.data || []);
      setSosAlerts(sRes.data || []);
    } catch {
      console.log("Emergency fetch error");
    } finally {
      setLoadingEmergency(false);
    }
  };

  const createEmergency = async (payload) => {
    await axios.post(`${backendUrl}/emergency`, payload);
    fetchEmergencyData();
  };

  const sendSOS = async (payload) => {
    await axios.post(`${backendUrl}/sos`, payload);
    fetchEmergencyData();
  };


  const fetchNotification = async () => {
    if (!token) return;

    try {
      setLoadingNotification(true);
      const res = await axios.get(`${backendUrl}/notifications`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(res.data?.data || []);
    } catch {
      toast.error("Failed to fetch notifications");
    } finally {
      setLoadingNotification(false);
    }
  };


  useEffect(() => { if (token) fetchTravels(); }, [token]);
  useEffect(() => { if (token) fetchCarpools(); }, [token]);
  useEffect(() => { if (token) fetchNotification(); }, [token]);
  useEffect(() => { fetchErrands(); }, []);
  useEffect(() => { fetchEmergencyData(); }, []);


  const contextValue = {
    travels,
    fetchTravels,
    addTravel,
    joinTravel,

    errands,
    handleAddErrand,
    acceptErrand,
    completeErrand,

    carpools,
    fetchCarpools,
    handleAddCarpool,
    joinCarpool,

    emergencies,
    sosAlerts,
    loadingEmergency,
    createEmergency,
    sendSOS,

    notifications,
    fetchNotification,

    search,
    setSearch,
    loading,
    token,
    setToken,
    navigate,
    backendUrl
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
