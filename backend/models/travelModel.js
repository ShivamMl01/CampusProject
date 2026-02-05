import mongoose from "mongoose";
import userModel from "./userModel.js";

const travelSchema = new mongoose.Schema(
  {
    //  Creator of the travel plan
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    from: {
      type: String,
      required: true,
      trim: true,
    },

    to: {
      type: String,
      required: true,
      trim: true,
    },

    dateTime: {
      type: Date,
      required: true,
    },

    mode: {
      type: String,
      required: true,
      enum: ["cab", "bus", "auto", "bike", "walking"],
      default: "walking",
    },

    //  Joined users (auth-based)
    joinedUsers: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        joinedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

//  Helpful indexes
travelSchema.index({ dateTime: 1 });
travelSchema.index({ from: 1, to: 1 });

//  Prevent duplicate joins 
travelSchema.methods.hasUserJoined = function (userId) {
  return this.joinedUsers.some(
    (u) => u.user.toString() === userId.toString()
  );
};

const Travel = mongoose.model("Travel", travelSchema);

export default Travel;
