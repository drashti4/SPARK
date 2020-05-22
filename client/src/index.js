import React from 'react';
import "./assets/external.css"
import LoginComponent from "./Components/LoginComponent";
import {render} from "react-dom"
import {Router, Route, browserHistory} from "react-router";
import HomeComponent from "./Components/HomeComponent";
import RegisterComponent from "./Components/RegisterComponent";
import TrafficComponent from "./Components/TrafficComponent";

class App extends React.Component{
    render(){
        return(
            <Router history={browserHistory}>
                <Route path={"home"} component={HomeComponent}/>
                <Route path={"register"} component={RegisterComponent}/>
                <Route path={"/"} component={LoginComponent}/>
                <Route path={"login"} component={LoginComponent}/>
                <Route path={"traffic"} component={TrafficComponent}/>
            </Router>
        );
    }
}

render(<App/>,window.document.getElementById('root'))