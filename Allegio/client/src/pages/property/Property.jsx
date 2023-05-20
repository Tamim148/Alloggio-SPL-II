import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import "./property.css";

function Property() {
  const location = useLocation();
  const type = location.pathname.split("/")[2];
  const { data, loading, error, reFetch } = useFetch(
    `http://localhost:8800/api/hotels?type=${encodeURIComponent(type)}`
  );

  useEffect(() => {
    console.log(data);
  }, [data]);

  console.log(type);

  return (
    <>
      <Navbar />
      <Header type="list" />

      <div className="propertyWrapper">
        <h1> {type.toUpperCase()} </h1>
        <hr className="hr" />
        {data.map((property) => (
          <Link
            to={`/property/hotels/${property._id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <SearchItem
              item={property}
              disableAvailabilityButton={true}
              key={property._id}
            />
          </Link>
        ))}
      </div>
    </>
  );
}

export default Property;
