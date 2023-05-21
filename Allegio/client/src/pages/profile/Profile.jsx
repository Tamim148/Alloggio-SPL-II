import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./profile.css";

function Profile() {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  useEffect(() => {
    async function getBookingsDetail() {
      try {
        const res = await axios.post(
          `http://localhost:8800/api/booking/getbookings`,
          {
            userId: userId,
          }
        );
        console.log(res.data);
        setBookings(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getBookingsDetail();
  }, [userId]);

  const cancelBooking = async (bookingId) => {
    try {
      const res = await axios.post(
        `http://localhost:8800/api/booking/cancelbooking`,
        {
          bookingId,
        }
      );
      console.log(res.data.message);
      setBookings((v) => {
        return v.filter((booking) => booking._id !== bookingId);
      });
    } catch (error) {
      console.log(error);
    }
    console.log(bookingId);
  };

  if (user._id !== userId) {
    return <p>You are not authorized to view this page.</p>;
  }

  return (
    <div>
      <h1 className="profileHeading">Profile</h1>
      <div className="profileInfoWrapper">
        <div className="profileInfo">
          <p>
            <b> Name</b>: <span>{user.username}</span>
          </p>
          <p>
            <b> Email</b>: <span>{user.email}</span>
          </p>
          <p>
            <b> Account status</b>:
            <span>{user.verified ? "Verified" : "Not verified"}</span>
          </p>
          <br />
          <br />
          <p>
            <small> The account was created at {user.createdAt} </small>
          </p>
        </div>
      </div>

      <div className="bookingsSection">
        <h2 className="bookingHeading">Bookings</h2>
        <div className="bookingsWrapper">
          {bookings.map((booking, i) => (
            <div className="booking" key={booking._id}>
              <div key={booking._id}>
                <small>{i + 1}.</small>
                <p>{/* <b>Price:</b> {booking.totalAmount}$ */}</p>
                <p>
                  From <b>{booking.fromdate}</b> to <b>{booking.todate}</b> for{" "}
                  {booking.totalDays} days
                </p>
                <br />
                <p>Issue date: {booking.createdAt}</p>
              </div>
              <div>
                <button
                  className="cancelBoking"
                  onClick={() => cancelBooking(booking._id)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
