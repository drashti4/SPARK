import React, { useEffect, useState } from "react";
import geoPoint from "geopoint";
import publicIP from 'public-ip'
import "./TrafficComponent.css";
import IncidentLegend from "./IncedentLegend"

// Your API KEY can be hardcoded, but I recommend setting it as an env variable.
const API_KEY = "ugeMO6z2ZsMlHHRAG9gFcvDoCtqrVuhj";
let temp = null

const TrafficComponent = (props) => {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(true);
    const [trafficData, setTrafficData] = useState([]);

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

    // setDataProps(){
    //     const a ="sewlrjelwrjk"
    //     this.props.sendData(a);
    //
    // }

    useEffect(()=> {
        publicIP
            .v4()
            .then((ip) => fetch(`https://ipapi.co/${ip}/json`))
            .then((res) => res.json())
            .then((result) => getBoundingBox(result.latitude, result.longitude))
            .then((values) =>
                fetch(
                    `https://api.tomtom.com/traffic/services/4/incidentDetails/s3/${values[0]._degLat},${values[0]._degLon},${values[1]._degLat},${values[1]._degLon}/10/-1/json?projection=EPSG4326&key=${API_KEY}`
                )
            )
            .then((res) => res.json())
            .then(
                (payload) => {
                    setIsLoaded(true);
                //    console.log("Value====", payload.tm.poi)
                    const dummyArray = payload.tm.poi
                   // dummyArray.map(i => console.log("Value========", i))
                    props.sendData(payload);
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error,
                    });
                    setIsLoaded(true);
                    setError(error);
                }
            );
    },[]);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
                  <div></div>
        );
    }
};

export default TrafficComponent;
