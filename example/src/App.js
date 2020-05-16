import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { GoogleComponent } from 'react-google-location' 
const API_KEY = "AIzaSyDGwf3wXD5z0XqaolwPbRVRKGIkDnK5ql4"

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            place: null,
        };
    }

    render() {
        return (
            <div >
            <GoogleComponent

        apiKey={API_KEY}
        language={'en'}
        country={'country:in|country:us'}
        coordinates={true}
        placeholder={'Start typing location'}
        locationBoxStyle={'custom-style'}
        locationListStyle={'custom-style-list'}
        onChange={(e) => { this.setState({ place: e }) }} />
        </div>

    )
    }
}


export default App;