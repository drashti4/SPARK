import React from "react";
import "./incidentinput.css";
const IncidentInput = ({
  isSubmit,
  setIsSubmitted,
  setLatitude,
  setLongitude,
  latitude,
  longitude,
}) => {
  const handleSubmit = () => {
    setIsSubmitted(!isSubmit);
  };
  const changeLatitude = (e) => {
    setLatitude(e.target.value);
  };
  const changeLongitude = (e) => {
    setLongitude(e.target.value);
  };
  return (
    <form className="incident-input" onSubmit={handleSubmit}>
      <h2>Enter Latitude & Longitude</h2>
      <input
        type="text"
        placeholder="Latitude"
        value={latitude}
        required
        onChange={changeLatitude}
      />
      <input
        type="text"
        placeholder="Longitude"
        value={longitude}
        required
        onChange={changeLongitude}
      />
      <input type="submit" value="Get Incidents" />
    </form>
  );
};

export default IncidentInput;
