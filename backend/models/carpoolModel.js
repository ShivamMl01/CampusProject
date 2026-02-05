// Carpool model

import mongoose from "mongoose";

const carpoolSchema = new mongoose.Schema(
    {
        from:{
            type: String,
            required: true,
            trim: true,
        },
        to:{
            type: String,
            required: true,
            trim: true, 
        },
        dateTime:{
            type: Date,
            required: true,
        },
        seats:{
            type: Number,
            default: 1,
        },
        requestedBy:{
            type: String,
            default: "Anonymous",
        },
    },
    {
        timestamps: true,   
    }


);

const Carpool  = mongoose.model("Carpool", carpoolSchema);

export default Carpool;