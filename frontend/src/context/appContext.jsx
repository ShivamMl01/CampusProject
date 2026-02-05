import { createContext, use, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext(null);

const AppProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  console.log("Backend URL:", backendUrl);


  const navigate  = useNavigate();

  const [travels, setTravels] = useState([]);
  const [errands, setErrands] = useState([]);
  const [carpools, setCarpools] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [emergencies, setEmergencies] = useState([]);
  const [sosAlerts, setSosAlerts] = useState([]);
  const [loadingEmergency, setLoadingEmergency] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [loadingNotification, setLoadingNotification] = useState(false);



  // token from localStorage
  const [token, setToken] = useState(
    localStorage.getItem("token") || null
  );

  // TRAVEL

  const fetchTravels = async () => {
    if (!token) return;

    try {
      setLoading(true);

      const res = await axios.get(`${backendUrl}/travel`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTravels(res.data.data || []);
    } catch (error) {
      console.error("Fetch Travel Plans Error:", error);
      toast.error("Failed to fetch travel plans");
    } finally {
      setLoading(false);
    }
  };

  const addTravel = async (travelData) => {
  try {
    setLoading(true);

    const token = localStorage.getItem("token");
    console.log("token", token)

    if (!token) {
      throw new Error("User not logged in");
    }

    const res = await axios.post(
      `${backendUrl}/travel`,
      travelData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Add Travel Plan Response:", res.data);

    // update UI instantly
    setTravels((prev) => [res.data.data, ...prev]);
  } catch (error) {
    console.error("Add Travel Plan Error:", error.response?.data || error.message);
  } finally {
    setLoading(false);
  }
};


 const joinTravel = async (travelId) => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.put(
      `${backendUrl}/travel/join/${travelId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Join Travel Response:", res.data);

    //  update UI instantly
    setTravels((prev) =>
      prev.map((t) => (t._id === travelId ? res.data.data : t))
    );
  } catch (err) {
    alert(err.response?.data?.message || "Join failed");
  }
};


  // ERRANDS

  //  Fetch errands 
  const fetchErrands = async () => {
    if (!token) return;
    try {
      setLoading(true);

      const res = await axios.get(`${backendUrl}/errands`);
      setErrands(res.data.data || []);
    } catch (error) {
      console.error("Fetch errands failed:", error);
      setErrands([]);
    } finally {
      setLoading(false);
    }
  };

  //  Add errand 
  const handleAddErrand = async (data) => {
    if (!data?.title || !data?.location) return;

    try {
      await axios.post(`${backendUrl}/errands`, {
        title: data.title,
        location: data.location,
        requestedBy: "You",
      });

      fetchErrands();
    } catch (error) {
      console.error("Add errand error:", error);
    }
  };

  const acceptErrand = async (id) => {
    try {
      await axios.put(`${backendUrl}/errands/${id}/accept`, {
        acceptedBy: "You",
      });
      fetchErrands();
    } catch (error) {
      console.error("Accept errand failed:", error);
    }
  };

  const completeErrand = async (id) => {
    try {
      await axios.put(`${backendUrl}/errands/${id}/complete`);
      fetchErrands();
    } catch (error) {
      console.error("Complete errand failed:", error);
    }
  };





  
// CARPOOL

//  Fetch carpools
const fetchCarpools = async () => {
  if (!token) return;

  try {
    setLoading(true);

    const res = await axios.get(`${backendUrl}/carpool`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setCarpools(res.data?.data || []);
  } catch (error) {
    console.error("Fetch carpools failed:", error);
    setCarpools([]);
    toast.error("Failed to fetch carpools");
  } finally {
    setLoading(false);
  }
};

//  Add carpool
const handleAddCarpool = async (data) => {
  if (!data?.from || !data?.to || !data?.dateTime) {
    toast.warning("Please fill all required fields");
    return;
  }

  try {
    setLoading(true);

    const res = await axios.post(
      `${backendUrl}/carpool`,
      {
        from: data.from,
        to: data.to,
        dateTime: data.dateTime,
        seats: data.seats,
        pickup: data.pickup,
        requestedBy: "You",
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (res.data?.success) {
      toast.success("Carpool created successfully");
      fetchCarpools();
    }
  } catch (error) {
    console.error("Add carpool error:", error.response?.data || error);
    toast.error("Failed to add carpool");
  } finally {
    setLoading(false);
  }
};


const joinCarpool = async (carpoolId) => {
  try {
    setLoading(true);
    await axios.put(`${backendUrl}/carpool/join/${carpoolId}`);
    fetchCarpools();
  } catch (error) {
    console.error("Join carpool failed:", error);
  } finally {
    setLoading(false);
  }
};




const fetchEmergencyData = async () => {
  if (!token) return;
    try {
      const [eRes, sRes] = await Promise.all([
        axios.get(`${backendUrl}/emergency`),
        axios.get(`${backendUrl}/sos`),
      ]);
      setEmergencies(eRes.data);
      setSosAlerts(sRes.data);
    } catch (err) {
      console.error("Emergency fetch error", err);
    } finally {
      setLoadingEmergency(false);
    }
  };

  //  create emergency
  const createEmergency = async (payload) => {
    await axios.post(`${backendUrl}/emergency`, payload);
    await fetchEmergencyData();
  };

  //  send sos
  const sendSOS = async (payload) => {
    await axios.post(`${backendUrl}/sos`, payload);
    await fetchEmergencyData();
  };


 const fetchNotification = async () => {
  if (!token) return;

  try {
    setLoadingNotification(true);

    const res = await axios.get(
      `${backendUrl}/notifications`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Always ensure array
    setNotifications(Array.isArray(res.data?.data) ? res.data.data : []);

  } catch (error) {

    if (error.response?.status === 401) {
      toast.error("Please login to view notifications 🔒");
    } else {
      toast.error("Failed to fetch notifications");
    }

    console.error("Fetch Notifications Error:", error);

  } finally {
    setLoadingNotification(false);   
  }
};



  
















  //  AUTO FETCH 


  useEffect(() => {
    if (token) fetchCarpools();
  }, [token]);

  useEffect(() => {
    if (token) fetchNotification();
  }, [token]);

  useEffect(() => {
    fetchErrands();
  }, []);

  useEffect(() => {
    if (token) fetchTravels();
  }, [token]);


  useEffect(() => {
    fetchEmergencyData();
  }, []);

  //  CONTEXT VALUE 

  const contextValue = {
    // travel
    travels,
    fetchTravels,
    addTravel,
    joinTravel,

    // errands
    errands,
    handleAddErrand,
    acceptErrand,
    completeErrand,


    // carpool    carpools,
   carpools,
  fetchCarpools,
  handleAddCarpool,
  joinCarpool,


  // emargency
    emergencies,
    sosAlerts,
    loadingEmergency,
    createEmergency,
    sendSOS,
    fetchNotification,
    notifications,

    // ui / auth
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
