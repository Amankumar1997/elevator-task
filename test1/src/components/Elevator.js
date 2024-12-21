import React from "react";
import "../assets/Elevator.css";
import svgIcon from "../assets/images/icons8-elevator.svg";
const Elevator = ({ id, currentFloor, status, timeTravel }) => {
  const floorHeight = 50; // Height of each floor in pixels
  const elevatorPosition = currentFloor * floorHeight;

  return (
    <>
      <div className="elevator">
        <img
          src={svgIcon}
          className="elevator-view"
          style={{
            transform: `translateY(-${elevatorPosition}px)`,
            backgroundColor:
              status === "moving"
                ? "red"
                : status === "waiting"
                ? "green"
                : "transparent",
            transition: `transform ${timeTravel / 1000}s ease`,
          }}
        />
      </div>
      {Array.from({ length: 10 }, (_, i) => (
        <div key={i} className="grid-row-view" />
      ))}
    </>
  );
};

export default Elevator;
