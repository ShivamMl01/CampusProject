import mongoose from "mongoose";

const sosSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const SOS = mongoose.model("SOS", sosSchema);
export default SOS;
