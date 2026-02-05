import mongoose from "mongoose";

const errandSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    requestedBy: {
      type: String,
      default: "Anonymous",
    },

    acceptedBy: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: ["open", "accepted", "completed"],
      default: "open",
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
  },
  {
    timestamps: true, 
  }
);

const Errand = mongoose.model("Errand", errandSchema);

export default Errand;
