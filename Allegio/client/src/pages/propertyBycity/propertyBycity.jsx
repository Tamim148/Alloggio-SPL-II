import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import "./propertybycity.css";

function PropertyBycity() {
  const location = useLocation();
  const city = location.pathname.split("/")[2];
  const { data, loading, error, reFetch } = useFetch(
    `http://localhost:8800/api/hotels?city=${encodeURIComponent(city)}`
  );

  useEffect(() => {
    console.log(data);
  }, [data]);

  console.log(city);

  return (
    <>
      <Navbar />
      <Header type="list" />

      <div className="propertybycityWrapper">
        <h1> {city.toUpperCase()} </h1>
        <hr className="hr" />
        {data.map((propertybycity) => (
          <Link
            to={`/propertybycity/city/${propertybycity._id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <SearchItem
              item={propertybycity}
              disableAvailabilityButton={true}
              key={propertybycity._id}
            />
          </Link>
        ))}
      </div>
    </>
  );
}

export default PropertyBycity;
