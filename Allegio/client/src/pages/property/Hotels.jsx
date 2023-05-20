import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import { useLocation } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import useFetch from "../../hooks/useFetch";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css";
import "./hotels.css";
function Hotels() {
  const location = useLocation();
  const hotelId = location.pathname.split("/")[3];
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [showResserve, setShowResserve] = useState(false);
  const { data, loading, error } = useFetch(
    `http://localhost:8800/api/hotels/find/${hotelId}`
  );

  console.log(hotelId);

  useEffect(() => {
    console.log(data);
    console.log(date);
  }, [data, date]);

  const handleResserve = () => {
    setOpen(true);
  };

  return (
    <>
      {open && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            minWidth: "100vw",
          }}
        >
          <div
            style={{
              minHeight: "100%",
              minWidth: "100%",
              background: "rgba(0,0,0, 0.5)",
              position: "absolute",
              top: 0,
              left: 0,
            }}
            onClick={() => setOpen(false)}
          />
          <div className="Modal">
            <DateRange
              editableDateInputs={true}
              onChange={(item) => setDate([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={date}
              minDate={new Date()}
            />
          </div>
        </div>
      )}
      <div className="hotelSection">
        <div>
          <Navbar />
          <Header type="list" />
        </div>

        <div className="hotelContainer">
          <div className="hotelWrapper">
            <button className="bookNow" onClick={handleResserve}>
              Reserve or Book Now!
            </button>
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">
              Excellent location – {data.distance}m from center
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over ${data.cheapestPrice} at this property and get a
              free airport taxi
            </span>
            <div className="hotelImages">
              {data.photos?.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    // onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">{data.desc}</p>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default Hotels;
