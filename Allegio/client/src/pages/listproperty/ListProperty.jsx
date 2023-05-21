import React from "react";
import AddHotel from "../../components/addHotelForm/AddHotel";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";

function ListProperty() {
  return (
    <div>
      <Navbar />
      <Header type={"list"} />
      <div
        style={{
          display: "grid",
          gap: "1rem",
          padding: "1rem",
          gridTemplateColumns: "500px auto",
        }}
      >
        <div
          style={{
            padding: "1rem",
            border: "1px solid lightgray",
            borderRadius: "5px",
          }}
        >
          <AddHotel page="listproperty" />
        </div>
        <div style={{ width: "100%", textAlign: "center" }}>
          <h3> You currently have no hotels </h3>
        </div>
      </div>
    </div>
  );
}

export default ListProperty;
