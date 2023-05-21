import moment from "moment";
import Booking from "../models/Booking.js";
import Room from "../models/Room.js";

export const bookRoom = async (req, res, next) => {
  const { roomId, userId, fromdate, todate, totalAmount, totalDays } = req.body;

  try {
    const room = await Room.findOne({ "roomNumbers._id": roomId });

    if (!room._id) {
      res.status(404);
    }

    const newBooking = new Booking({
      roomId,
      userId,
      fromdate: moment(fromdate).format("DD-MM-YYYY"),
      todate: moment(todate).format("DD-MM-YYYY"),
      totalAmount,
      totalDays,
    });

    const updatedRoom = await Room.updateOne(
      {
        "roomNumbers._id": roomId,
      },
      {
        $set: {
          currentBookings: {
            roomId,
            bookingId: newBooking._id,
            fromdate: newBooking.fromdate,
            todate: newBooking.todate,
            userId: newBooking.userId,
          },
        },
      }
    );

    await newBooking.save();

    res.status(201).json({
      message: "Booking Successful",
      data: newBooking,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

export const getBookings = async (req, res, next) => {
  try {
    const { userId } = req.body;
    console.log(userId);
    const bookings = await Booking.find({ userId });
    
    console.log(bookings);
    res.status(200).json(bookings);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

export const cancelBooking = async (req, res, next) => {
  try {
    const { bookingId } = req.body;
    const cancelledBooking = await Booking.findByIdAndDelete(bookingId);
    const updatedRoom = await Room.updateOne(
      {
        "currentBookings.bookingId": bookingId,
      },
      {
        $set: {
          currentBookings: {
            roomId:"",
            bookingId: "",
            fromdate: "",
            todate: "",
            userId: "",
          },
        },
      }
    );
    res
      .status(200)
      .json({ message: "Booking has been cancelled", booking: cancelledBooking });
  } catch (error) {
    console.log(error)
    res.status(500);
  }
};
export const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    console.log(error)
    res.status(500);    
  }
}