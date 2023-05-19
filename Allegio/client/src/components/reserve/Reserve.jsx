import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
// import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { SearchContext } from "../../context/SearchContext";
import useFetch from "../../hooks/useFetch";
import "./reserve.css";

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, error } = useFetch(
    `http://localhost:8800/api/hotels/room/${hotelId}`
  );

  const { date } = useContext(SearchContext);
  const { user } = useContext(AuthContext);

  const getTotalDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const difference = end.getTime() - start.getTime();
    return Math.ceil(difference / (1000 * 3600 * 24));
  };

  // const getDatesInRange = (startDate, endDate) => {
  //   const start = new Date(startDate);
  //   const end = new Date(endDate);

  //   const date = new Date(start.getTime());

  //   const dates = [];

  //   while (date <= end) {
  //     dates.push(new Date(date).getTime());
  //     date.setDate(date.getDate() + 1);
  //   }

  //   return dates;
  // };

  // console.log(date);
  // const alldates = getDatesInRange(date[0].startDate, date[0].endDate);

  const isAvailable = (roomId, rooms) => {
    let booked = false;
    rooms.forEach((room) => {
      if (room.currentBookings && room.currentBookings.roomId === roomId) {
        booked = true;
      }
    });

    return !booked;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;

    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );

    console.log(data);
  };

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      // selectedRooms.map(async (roomId) => {
      //   const res = await axios.put(
      //     `http://localhost:8800/api/rooms/availability/${roomId}`,
      //     {
      //       dates: alldates,
      //     }
      //   );

      //   console.log(res.data);
      //   return res.data;
      // });
      console.log(data);

      selectedRooms.forEach(async (room) => {
        const res = await axios.post("http://localhost:8800/api/booking", {
          roomId: room,
          userId: user._id,
          fromdate: date[0].startDate,
          todate: date[0].endDate,
          totalAmount: 400,
          totalDays: getTotalDays(date[0].startDate, date[0].endDate),
        });
        console.log(res.data);
      });

      // console.log(selectedRooms);

      setOpen(false);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <>
            {item ? (
              <div className="rItem" key={item._id}>
                <div className="rItemInfo">
                  <div className="rTitle">{item.title}</div>
                  <div className="rDesc">{item.desc}</div>
                  <div className="rMax">
                    Max people: <b>{item.maxPeople}</b>
                  </div>
                  <div className="rPrice">{item.price}</div>
                </div>
                <div className="rSelectRooms">
                  {item.roomNumbers.map((roomNumber, i) => (
                    <div className="room" key={i + roomNumber._id}>
                      <label>{roomNumber.number}</label>
                      <input
                        type="checkbox"
                        value={roomNumber._id}
                        onChange={handleSelect}
                        disabled={!isAvailable(roomNumber._id, data)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              ""
            )}
          </>
        ))}
        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
