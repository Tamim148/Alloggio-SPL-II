import mongoose from "mongoose";
const RoomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    roomNumbers: [{ number: Number }],
    currentBookings: {
      roomId: { type: String },
      bookingId: { type: String, },
      userId: { type: String, },
      fromdate: { type: String, },
      todate: { type: String, },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Room", RoomSchema);
