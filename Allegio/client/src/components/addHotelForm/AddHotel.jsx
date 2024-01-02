import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./addhotelform.css";
function AddHotel({ page }) {
  const [message, showMessage] = useState(false);
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [type, setType] = useState("");
  const [cheapestPrice, setCheapestPrice] = useState(0);
  const [distance, setDistance] = useState("");
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");
  const [rooms, setRooms] = useState([]);
  const [featured, setFeatured] = useState(false);
  const [photos, setPhotos] = useState([]);

  const navigate = useNavigate();

  const addHotel = async (e) => {
    e.preventDefault();
    const fileNames = Array.from(photos).map((file) => file.name);
console.log(fileNames);
    // try {
    //   const response = await axios.post(
    //     "http://localhost:8800/api/hotels",
    //     {
    //       user,
    //       access_token: localStorage.getItem("token"),
    //       name,
    //       address,
    //       cheapestPrice,
    //       city,
    //       desc,
    //       distance,
    //       featured,
    //       title,
    //       type,
    //       rooms,
    //       photos: fileNames, // Use the array of file names directly
    //     }
    //   );
    //   console.log(response.data);
    // } catch (error) {
    //   console.error(error);
    // }


    const formData = new FormData();
    formData.append("user", user);
    formData.append("access_token", localStorage.getItem("token"));
    formData.append("name", name);
    formData.append("address", address);
    formData.append("cheapestPrice", cheapestPrice);
    formData.append("city", city);
    formData.append("desc", desc);
    formData.append("distance", distance);
    formData.append("featured", featured);
    formData.append("title", title);
    formData.append("type", type);
    
    rooms.forEach((room, index) => {
      formData.append(`rooms[${index}]`, room);
    });
  
    if (Array.isArray(photos)) {
      photos.forEach((photo) => {
        formData.append("photos", photo);
      });
    } else {
      console.error("Photos is not an array");
    }
  
    try {
      const response = await axios.post("http://localhost:8800/api/hotels", formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }


    if (page === "listproperty") {
      showMessage(true);
      setTimeout(() => navigate("/"), 2000);
    }
  };

  return (
    <>
      {message && (
        <div
          onClick={() => showMessage(false)}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: "0",
            left: "0",
            zIndex: 1,
            background: "rgba(0,0,0,0.5)",
            height: "100vh",
            width: "100vw",
          }}
        >
          <div className="SentToAdminMessage">
            <p>Your hotel information was sent to Admin</p>
          </div>
        </div>
      )}
      <form onSubmit={addHotel} encType="multipart/form-data">
        <div className="apRoomCreateInput">
          <label htmlFor="hotel-name">Hotel name: </label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            name="name"
            id="hotel-name"
            required
          />
        </div>
        <div className="apRoomCreateInput">
          <label htmlFor="hotel-title">Title: </label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            name="title"
            id="hotel-title"
            required
          />
        </div>
        <div className="apRoomCreateInput">
          <label htmlFor="hotel-des">Description: </label>
          <textarea
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            name="desc"
            id="hotel-desc"
            rows={5}
            required
          />
        </div>
        <div className="apRoomCreateInput">
          <label htmlFor="hotel-address">Address: </label>
          <input
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            type="text"
            name="address"
            id="hotel-address"
            required
          />
        </div>
        <div className="apRoomCreateInput">
          <label htmlFor="hotel-city">City: </label>
          <input
            onChange={(e) => setCity(e.target.value)}
            value={city}
            type="text"
            name="city"
            id="hotel-city"
            required
          />
        </div>
        <div className="apRoomCreateInput">
          <label htmlFor="hotel-maxpeople">Distance: </label>
          <input
            onChange={(e) => setDistance(e.target.value)}
            value={distance}
            type="number"
            name="distance"
            id="hotel-distance"
            required
          />
        </div>

        <div className="apRoomCreateInput">
          <label htmlFor="hotel-maxpeople">Type: </label>
          <input
            onChange={(e) => setType(e.target.value)}
            value={type}
            type="text"
            name="type"
            id="hotel-type"
            required
          />
        </div>

        <div className="apRoomCreateInput">
          <label htmlFor="hotel-cheapestPrice">Price: </label>
          <input
            onChange={(e) => setCheapestPrice(e.target.value)}
            value={cheapestPrice}
            type="number"
            name="cheapestPrice"
            id="hotel-cheapestPrice"
            required
          />
        </div>

        <div className="apRoomCreateInput">
  <label htmlFor="hotel-photos">Photos: </label>
  <input
    type="file"
    accept="image/*"
    onChange={(e) => setPhotos(Array.from(e.target.files))}
    multiple
    id="hotel-photos"
  />
</div>


        <button type="submit" className="apAddHotelButton">
          {" "}
          Add Hotel{" "}
        </button>
      </form>
    </>
  );
}

export default AddHotel;
