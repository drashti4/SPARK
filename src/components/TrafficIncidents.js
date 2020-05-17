import React, { useEffect, useState } from "react";
import geoPoint from "geopoint";
import IncidentCategory from "./IncidentCategory";
import IncidentData from "./IncidentData";
import IncidentLegend from "./IncidentLegend";
import IncidentInput from "./IncidentInput";
import "./trafficincidents.css";

// Your API KEY can be hardcoded, but I recommend setting it as an env variable.
const API_KEY = "ohVRNxhVQsszHT52o64ZlXKLPu6yxame";

const TrafficIncidents = () => {
  const [error, seterror] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);
  const [trafficData, setTrafficData] = useState([]);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  let date = new Date();
  let currentDate = date.toDateString();
  let currentTime =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

  const getBoundingBox = (latitude, longitude) => {
    const bboxValues = new geoPoint(latitude, longitude).boundingCoordinates(
      10,
      true
    );
    return bboxValues;
  };

  const loadData = () => {
    const response = async () =>
      getBoundingBox(parseInt(latitude), parseInt(longitude)).then((values) => {
        fetch(
          `https://api.tomtom.com/traffic/services/4/incidentDetails/s3/${values[0]._degLat},${values[0]._degLon},${values[1]._degLat},${values[1]._degLon}/10/-1/json?projection=EPSG4326&key=${API_KEY}`
        )
          .then((res) => res.json())
          .then((data) => console.log(data));
      });

    // fetch(
    //   `https://api.tomtom.com/traffic/services/4/incidentDetails/s3/${values[0]._degLat},${values[0]._degLon},${values[1]._degLat},${values[1]._degLon}/10/-1/json?projection=EPSG4326&key=${API_KEY}`
    // )
    //   .then((res) => res.json())
    //   .then((data) => console.log(data));
  };

  if (isSubmitted) {
    loadData();
  }

  // componentDidMount() {
  // publicIP
  //   .v4()
  //   .then((ip) => fetch(`https://ipapi.co/${ip}/json`))
  //   .then((res) => res.json())
  //   .then((result) => this.getBoundingBox(result.latitude, result.longitude))
  //   .then((values) =>
  //     fetch(
  //       `https://api.tomtom.com/traffic/services/4/incidentDetails/s3/${values[0]._degLat},${values[0]._degLon},${values[1]._degLat},${values[1]._degLon}/10/-1/json?projection=EPSG4326&key=${API_KEY}`
  //     )
  //   )
  //   .then((res) => res.json())
  //   .then(
  //     (payload) => {
  //       this.setState({
  //         isLoaded: true,
  //         trafficData: payload["tm"]["poi"],
  //       });
  //     },
  //     (error) => {
  //       this.setState({
  //         isLoaded: true,
  //         error,
  //       });
  //     }
  //   );
  // }

  const toggleIncidents = (e) => {
    e.preventDefault();
    document.querySelector(".incidents-table").classList.toggle("hide");
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else if (!isSubmitted) {
    return (
      <IncidentInput
        setIsSubmitted={setIsSubmitted}
        isSubmited={isSubmitted}
        setLatitude={setLatitude}
        setLongitude={setLongitude}
        latitude={latitude}
        longitude={longitude}
      />
    );
  } else {
    return (
      <div className="incidents-wrapper">
        <h1>Traffic Incidents</h1>
        <h5>{currentDate}</h5>
        <h5>Time: {currentTime}</h5>
        <div className="incidents-data">
          <input
            type="submit"
            value="Show Incidents"
            onClick={toggleIncidents}
          />
          <input
            type="submit"
            value="Search Again"
            onClick={() => setIsSubmitted(!isSubmitted)}
          />
          <table className="incidents-table hide">
            <IncidentCategory />
            <IncidentData data={trafficData} />
          </table>
        </div>
        <IncidentLegend />
      </div>
    );
  }
};

export default TrafficIncidents;
