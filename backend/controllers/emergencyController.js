import Emergency from "../models/emergencyModel.js";


 
 
export const createEmergency = async (req, res) => {
  try {
    const { icon, title, details, priority } = req.body;

    // basic validation
    if (!title || !details) {
      return res.status(400).json({
        message: "Title and details are required",
      });
    }

    const emergency = await Emergency.create({
      icon: icon || "!",
      title,
      details,
      priority: priority || "HIGH PRIORITY",
    });

    res.status(201).json(emergency);
  } catch (error) {
    console.error("CREATE EMERGENCY ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

 

export const getAllEmergencies = async (req, res) => {
  try {
    const emergencies = await Emergency.find().sort({
      createdAt: -1,
    });

    res.status(200).json(emergencies);
  } catch (error) {
    console.error("FETCH EMERGENCY ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
