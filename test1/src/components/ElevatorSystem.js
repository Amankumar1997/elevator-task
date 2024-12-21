import React, { useState } from "react";
import Floor from "./Floor";
import Elevator from "./Elevator";
import "../assets/ElevatorSystem.css";

const ElevatorSystem = () => {
  const [elevators, setElevators] = useState(
    Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      currentFloor: 0,
      status: "idle", // "idle", "moving", "waiting"
      targetFloor: null,
    }))
  );
  const [timer, setTimer] = useState(1)

  const handleCall = (floor, onArrive) => {
    const availableElevator = elevators
      .filter((e) => e.status === "idle")
      .reduce(
        (closest, elevator) =>
          Math.abs(elevator.currentFloor - floor) <
          Math.abs(closest.currentFloor - floor)
            ? elevator
            : closest,
        elevators[0]
      );

    if (availableElevator) {
      moveElevator(availableElevator.id, floor, onArrive);
    } else {
      console.log("All elevators busy, please wait.");
    }
  };

  const moveElevator = (elevatorId, targetFloor, onArrive) => {
    setElevators((prev) =>
      prev.map((elevator) =>
        elevator.id === elevatorId
          ? { ...elevator, status: "moving", targetFloor, currentFloor: targetFloor }
          : elevator
      )
    );

    const elevator = elevators.find((e) => e.id === elevatorId);
    const travelTime = Math.abs(targetFloor - elevator.currentFloor) * 1000;

    setTimer(travelTime+1000)

    setTimeout(() => {
      setElevators((prev) =>
        prev.map((elevator) =>
          elevator.id === elevatorId
            ? { ...elevator, currentFloor: targetFloor, status: "waiting" }
            : elevator
        )
      );

      onArrive(); // Notify the floor that the elevator has arrived

      setTimeout(() => {
        setElevators((prev) =>
          prev.map((elevator) =>
            elevator.id === elevatorId ? { ...elevator, status: "idle" } : elevator
          )
        );
      }, 2000); // Elevator remains idle after waiting for 2 seconds
    }, travelTime);
  };

  return (
    <div className="elevator-system">
      <div className="floors">
        {Array.from({ length: 10 }, (_, i) => (
          <Floor key={`floor-name-${i}`} floorNumber={i} onCall={handleCall} showItem="floor" />
        ))}
      </div>
      <div className="elevators">
        {elevators.map((elevator) => (
          <div className="grid-column-view">
            <Elevator key={elevator.id} {...elevator} timeTravel={timer} />
          </div>
        ))}
      </div>
      <div className="floors">
        {Array.from({ length: 10 }, (_, i) => (
          <Floor key={`action-button-${i}`} floorNumber={i} onCall={handleCall} showItem="action-botton" />
        ))}
      </div>
    </div>
  );
};

export default ElevatorSystem;
