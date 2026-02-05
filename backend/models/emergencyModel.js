import mongoose from "mongoose";

const emergencySchema = new mongoose.Schema(
  {
    icon: {
      type: String,
      default: "!",
    },
    title: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ["LOW", "HIGH PRIORITY", "CRITICAL"],
      default: "HIGH PRIORITY",
    },
  },
  { timestamps: true }
);

const Emergency = mongoose.model("Emergency", emergencySchema);
export default Emergency;
