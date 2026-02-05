import SOS from "../models/sosModel.js";

 
export const createSOS = async (req, res) => {
  try {
    const { message, latitude, longitude } = req.body;

    // validation
    if (!message || latitude === undefined || longitude === undefined) {
      return res.status(400).json({
        message: "Message and live location are required",
      });
    }

    const sos = await SOS.create({
      message,
      latitude,
      longitude,
    });

    res.status(201).json({
      _id: sos._id,
      title: "Live SOS Signal",
      details: "Location shared • just now",
      buttonText: "View",
      latitude: sos.latitude,
      longitude: sos.longitude,
      message: sos.message,
    });
  } catch (error) {
    console.error("CREATE SOS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};


 
export const getAllSOS = async (req, res) => {
  try {
    const sosList = await SOS.find().sort({ createdAt: -1 });

    const formattedSOS = sosList.map((sos) => ({
      _id: sos._id,
      title: "Live SOS Signal",
      details: "Location shared • moments ago",
      buttonText: "View",
      latitude: sos.latitude,
      longitude: sos.longitude,
      message: sos.message,
    }));

    res.status(200).json(formattedSOS);
  } catch (error) {
    console.error("FETCH SOS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
