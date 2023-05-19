import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    roomId:{
        type: String, required: true,
    },
    userId:{
        type: String, required: true,
    },
    fromdate:{
        type: String, required: true,
    },
    todate:{
        type: String, required: true,
    },
    totalAmount:{
        type: String, required: true,
    },
    totalDays:{
        type: String, required: true,
    },
    status:{
        type: String, required: true, default: "booked",
    },
},
{
    timestamps: true,
});

export default mongoose.model("Booking", BookingSchema)