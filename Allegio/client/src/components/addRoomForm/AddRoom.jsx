import React, { useState } from "react";
import "./addroomform.css";

function AddRoom() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [maxpeople, setMaxpeople] = useState("");

  return (
    <>
      <form>
        <div className="apRoomCreateInput">
          <label htmlFor="room-title">Title: </label>
          <input type="text" name="title" id="room-title" />
        </div>
        <div className="apRoomCreateInput">
          <label htmlFor="room-des">Description: </label>
          <textarea name="desc" id="room-desc" rows={5} />
        </div>
        <div className="apRoomCreateInput">
          <label htmlFor="room-price">Price: </label>
          <input type="number" name="price" id="room-price" />
        </div>
        <div className="apRoomCreateInput">
          <label htmlFor="room-maxpeople">Max People: </label>
          <input type="number" name="maxPeople" id="room-maxpeople" />
        </div>
        <div className="apRoomCreateInput">
          <label htmlFor="room-maxpeople">Room Number: </label>
          <input type="number" name="roomNumber" id="room-roomnumber" />
          <div style={{ textAlign: "end" }}>
            <button
              style={{
                outline: "none",
                border: "none",
                padding: "0.75rem",
                cursor: "pointer",
              }}
            >
              {" "}
              Add room number{" "}
            </button>
          </div>
        </div>
        <button className="apAddRoomButton"> Add Room </button>
      </form>
    </>
  );
}

export default AddRoom;
