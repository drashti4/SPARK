import React from "react";
import {browserHistory} from "react-router";

export default class HomeComponent extends React.Component {

    render(){
        return(
            <>
                <div className="App">
                    <header className="App-header"> SPARKS
                    </header>

                    <form >
                        <label className="col-form-label-lg">Register</label><br/>
                        <input className="form__input" type="text" name="user" placeholder="Enter the first name"/><br/><br/>
                        <input className="form__input" type="text" name="password" placeholder="Enter the last name"/><br/><br/>
                        <input className="form__input" type="email" name="email" placeholder="Enter the email"/><br/><br/>
                        <input className="form__input" type="password" name="" placeholder="Enter the password"/><br/><br/>
                        <button className="form__button">Register</button>
                        <br/><br/>
                        <label>Already register go to login</label>
                        <br/><br/>

                        <button  onClick={() => browserHistory.push('/login')} className="form__button">
                            Login now
                        </button>
                    </form>
                </div>

            </>
        )
    }
}