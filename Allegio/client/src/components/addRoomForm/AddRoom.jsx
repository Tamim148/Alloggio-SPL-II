import axios from "axios";
import React, { useState } from "react";
import "./addroomform.css";

function AddRoom({ hotels = [] }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [maxpeople, setMaxpeople] = useState(0);
  const [hotelId, setHotelId] = useState(0);
  const [roomNumber, setRoomnumber] = useState(0);
  const [roomNumbers, setRoomnumbers] = useState([]);

  const addroom = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8800/api/rooms/${hotelId}`,
        {
          title,
          desc: description,
          price,
          maxPeople: maxpeople,
          roomNumbers,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const selectHotel = (e) => {
    console.log(e.target.value);
    setHotelId(e.target.value);
  };

  const addRoomNumber = (e) => {
    e.preventDefault();
    setRoomnumbers((v) => {
      v.push({ number: roomNumber });
      return v;
    });
    console.log(roomNumbers);
  };
  return (
    <>
      <form onSubmit={addroom}>
        <div className="apRoomCreateInput">
          <label htmlFor="room-title">Title: </label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            name="title"
            id="room-title"
          />
        </div>
        <div className="apRoomCreateInput">
          <label htmlFor="room-des">Description: </label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            name="desc"
            id="room-desc"
            rows={5}
          />
        </div>
        <div className="apRoomCreateInput">
          <label htmlFor="room-price">Price: </label>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            type="number"
            name="price"
            id="room-price"
          />
        </div>
        <div className="apRoomCreateInput">
          <label htmlFor="room-maxpeople">Max People: </label>
          <input
            onChange={(e) => setMaxpeople(e.target.value)}
            value={maxpeople}
            min={0}
            type="number"
            name="maxPeople"
            id="room-maxpeople"
          />
        </div>

        <div className="apRoomCreateInput">
          <label htmlFor="hotel"> Hotel:</label>
          <select
            onChange={selectHotel}
            style={{ padding: "0.5rem", borderRadius: "5px" }}
            name="hotelId"
            id="hotel"
          >
            <option value={0}> Select Hotel </option>
            {hotels.map((hotel) => (
              <option value={hotel._id}> {hotel.name} </option>
            ))}
          </select>
        </div>

        <div className="apRoomCreateInput">
          <label htmlFor="room-maxpeople">Room Number: </label>
          <input
            onChange={(e) => setRoomnumber(e.target.value)}
            value={roomNumber}
            min={0}
            type="number"
            name="roomNumber"
            id="room-roomnumber"
          />
          <div style={{ textAlign: "end" }}>
            <button
              onClick={addRoomNumber}
              style={{
                outline: "none",
                border: "none",
                padding: "0.75rem",
                cursor: "pointer",
              }}
            >
              Add room number
            </button>
          </div>
        </div>
        <button type="submit" className="apAddRoomButton">
          Add Room
        </button>
      </form>
    </>
  );
}

export default AddRoom;
