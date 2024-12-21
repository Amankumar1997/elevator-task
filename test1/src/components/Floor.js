import React, { useState } from "react";
import "../assets/Floor.css";
import { LIST_WAIT_TIME_PER_FLOOR } from "../constants";

const Floor = ({ floorNumber, onCall, showItem }) => {
  const [status, setStatus] = useState("call"); // States: "call", "waiting", "arrived"

  const handleCall = () => {
    setStatus("waiting");
    onCall(floorNumber, () => {
      setStatus("arrived"); // Change to "arrived" once elevator reaches the floor
      setTimeout(() => {
        setStatus("call"); // Reset to "call" after 2 seconds
      }, LIST_WAIT_TIME_PER_FLOOR);
    });
  };

  return (
    <div className="floor">
      {showItem === "floor" ? <span> {floorNumber === 0 ? "Ground Floor" : `${floorNumber}th`}</span> :
      <button
        onClick={handleCall}
        className={`button-${status}`}
        disabled={status !== "call"}
      >
        {status === "call" ? "Call" : status}
      </button>}
    </div>
  );
};

export default Floor;
