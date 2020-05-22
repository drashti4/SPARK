import React, { useEffect, useState } from "react";

import geoPoint from "geopoint";
import publicIP from 'public-ip'
import "./TrafficComponent.css";
import IncidentLegend from "./IncedentLegend"
import TrafficComponent from "./TrafficComponent";

const API_KEY = "ugeMO6z2ZsMlHHRAG9gFcvDoCtqrVuhj";

let date = new Date();
let currentDate = date.toDateString();
let currentTime =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

class TestClass{
constructor() {

}
     getBoundingBox(latitude, longitude) {
        const bboxValues = new geoPoint(latitude, longitude).boundingCoordinates(
            10,
            true
        );
        return bboxValues;
    };

     test(){
        return this.trafficData;
    }

     useEffect() {
                publicIP
            .v4()
            .then((ip) => fetch(`https://ipapi.co/${ip}/json`))
            .then((res) => res.json())
            .then((result) => this.getBoundingBox(result.latitude, result.longitude))
            .then((values) =>
            fetch(
            `https://api.tomtom.com/traffic/services/4/incidentDetails/s3/${values[0]._degLat},${values[0]._degLon},${values[1]._degLat},${values[1]._degLon}/10/-1/json?projection=EPSG4326&key=${API_KEY}`
            )
            )
            .then((res) => res.json())
            .then(
            (payload) => {
            this.setIsLoaded(true);
            this.setTrafficData(payload)
            },
            (error) => {
            this.setState({
            isLoaded: true,
            error,
            });
            this.setIsLoaded(true);
            this.setError(error);
            }
            );
}

}
export default TestClass;