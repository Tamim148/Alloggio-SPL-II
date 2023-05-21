import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddHotel from "../../components/addHotelForm/AddHotel";
import AddRoom from "../../components/addRoomForm/AddRoom";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import "./admin.css";

function Admin() {
  const { user } = useContext(AuthContext);
  const { data: bookings } = useFetch(
    "http://localhost:8800/api/booking/getallbookings"
  );
  const { data: rooms } = useFetch("http://localhost:8800/api/rooms");
  const { data: hotels } = useFetch("http://localhost:8800/api/hotels");
  const [hotelBookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [hotel, setHotels] = useState([]);
  const [room, setRooms] = useState([]);

  useEffect(() => {
    async function getUsers() {
      const { data } = await axios.post("http://localhost:8800/api/users", {
        user,
        access_token: localStorage.getItem("token"),
      });

      setUsers(data);
      console.log(data);
    }

    if (user.isAdmin) {
      getUsers();
    }
  }, [user.isAdmin]);

  useEffect(() => {
    setBookings(bookings);
  }, [bookings]);

  useEffect(() => {
    setHotels(hotels);
  }, [hotels]);

  useEffect(() => {
    setRooms(rooms);
  }, [rooms]);

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

  const deleteAccount = async (userId) => {
    const res = await axios.delete(
      `http://localhost:8800/api/users/${userId}`,
      {
        // user,
        // access_token: localStorage.getItem("token"),
        userId,
      }
    );
    console.log(res.data);
    setUsers((v) => {
      return v.filter((user) => user._id !== userId);
    });
  };

  const deleteHotel = async (hotelId) => {
    try {
      const res = await axios.delete(
        `http://localhost:8800/api/hotels/${hotelId}`
      );
      console.log(res.data);
      setHotels((v) => {
        return v.filter((hotel) => hotel._id !== hotelId);
      });
    } catch (error) {
      console.log(error);
    }
    console.log(hotelId);
  };

  const deleteroom = async (roomId) => {
    try {
      const res = await axios.delete(
        `http://localhost:8800/api/rooms/${roomId}`
      );
      console.log(res.data);
      setRooms((v) => {
        return v.filter((__room) => __room._id !== roomId);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const verifyHotel = async (hotelId) => {
    try {
      const res = await axios.put(
        `http://localhost:8800/api/hotels/${hotelId}`,
        {
          featured: true,
        }
      );
      console.log(res.data);
      setHotels((v) => {
        return v.map((hotel) => {
          if (hotel._id === hotelId) hotel.featured = true;

          return hotel;
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (!user.isAdmin)
    return (
      <>
        <p>You are not authorized to view this page.</p>
      </>
    );
  return (
    <>
      <div>
        <div className="navbar">
          <div className="navContainer">
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
              <span className="logo">Allegio</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="AdminContainer">
        <h1 className="AdminPanelHeading">Admin Panel</h1>
        <div className="AdminPanelWrapper">
          <div className="PanelWrapper">
            <h3>Bookings</h3>
            <hr />
            <div className="Panel">
              {!hotelBookings.length && (
                <p style={{ width: "100%", textAlign: "center" }}>
                  No booking records found
                </p>
              )}
              {hotelBookings.map((booking, i) => (
                <div className="booking" key={booking._id}>
                  <div key={booking._id}>
                    <small>{i + 1}.</small>
                    <p>
                      <b>Price:</b> {booking.totalAmount}$
                    </p>
                    <p>
                      From <b>{booking.fromdate}</b> to <b>{booking.todate}</b>
                      for {booking.totalDays} days
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

          <div className="PanelWrapper">
            <h3>Users</h3>
            <hr />
            <div className="Panel">
              {!users.length && (
                <p style={{ width: "100%", textAlign: "center" }}>
                  No user records found
                </p>
              )}
              {users.map((userAccount) => (
                <div className="userWrapper" key={userAccount._id}>
                  <div>
                    <p>Username: {userAccount.username}</p>
                    <p>Email: {userAccount.email}</p>
                    <p>Account created at: {userAccount.createdAt}</p>
                    <br />
                    <p
                      style={{ color: userAccount.verified ? "green" : "red" }}
                    >
                      email {userAccount.verified ? "" : "not"} verified
                    </p>
                  </div>
                  <button
                    className="deleteAccountButton"
                    onClick={() => deleteAccount(userAccount._id)}
                  >
                    Delete account
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="PanelWrapper">
            <h3>Hotels</h3>
            <hr />
            <div className="Panel">
              {!hotels.length && (
                <p style={{ width: "100%", textAlign: "center" }}>
                  No hotel records found
                </p>
              )}
              {hotels.map((hotel) => (
                <div className="apHotelWrapper" key={hotel._id}>
                  <div>
                    <div style={{ display: "flex", gap: "1rem" }}>
                      <img src={hotel.photos[0]} alt="" className="hotelsImg" />
                      <div>
                        <p>Name: {hotel.name}</p>
                        <p>Address: {hotel.address}</p>
                        <p>Description: {hotel.desc}</p>
                        <p>{hotel.distance}</p>
                        <p>City: {hotel.city}</p>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex" }}>
                    <div style={{ textAlign: "end", padding: "5px" }}>
                      <button
                        className="deleteHotelButton"
                        onClick={() => deleteHotel(hotel._id)}
                      >
                        Delete hotel
                      </button>
                    </div>
                    {!hotel.featured && (
                      <div style={{ textAlign: "end", padding: "5px" }}>
                        <button
                          className="deleteHotelButton"
                          onClick={() => verifyHotel(hotel._id)}
                        >
                          Verify hotel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="PanelWrapper">
            <h3>Rooms</h3>
            <hr />
            <div className="Panel">
              {!rooms.length && (
                <p style={{ width: "100%", textAlign: "center" }}>
                  No hotel records found
                </p>
              )}
              {rooms.map((room) => (
                <div className="RoomWrapper" key={room._id}>
                  <h4>{room.title}</h4>
                  <p>{room.desc}</p>
                  <br />
                  <p>Max People: {room.maxPeople}</p>
                  <p>Price: {room.price}</p>

                  <div style={{ textAlign: "end" }}>
                    <button
                      className="deleteHotelButton"
                      onClick={() => deleteroom(room._id)}
                    >
                      Delete room
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="PanelWrapper">
            <h3>Add Hotel</h3>
            <div className="Panel">
              <AddHotel />
            </div>
          </div>

          <div className="PanelWrapper">
            <h3>Add Room</h3>
            <div className="Panel">
              <AddRoom hotels={hotel} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
