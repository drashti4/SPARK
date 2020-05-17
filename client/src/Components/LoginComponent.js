import React from "react";
import { browserHistory } from 'react-router';

export default class LoginComponent extends React.Component{
    constructor(props)
    {
        super(props)
        this.state = {
            userName : undefined,
            pwd: undefined,
            isValid : undefined
        }
        this.onItemClick = this.onItemClick.bind(this);
        this.handleSubmitClick = this.handleSubmitClick.bind(this)
    }
    onItemClick(event) {
        if(event.target.name === "uname"){
            console.log("username is "+ event.target.value)
            this.setState({
                userName : event.target.value
            })
        }
        if(event.target.name === "psw"){
            console.log("pwd is "+ event.target.value)
            this.setState({
                pwd : event.target.value
            })
        }
    }
    handleSubmitClick(event){

        const message = {
            email: this.state.userName,
            pwd: this.state.pwd
        }
        fetch('http://localhost:3002/isvaliduser',{
            method:"POST",
            mode:"cors",
            headers:{
                "Content-Type":'application/json'
            },
            body: JSON.stringify(message)
        }).then( response => {
            if(response.status === 200){
                browserHistory.push('/home');
            }else{
                console.log("User Invalid")
                this.setState({
                    isValid: false
                })
            }
        })
    }
    render(){
        return(
            <>
                <div className="container">
                    <label className="col-form-label-lg">Login</label><br/>
                  <input onChange={this.onItemClick} className="form__input" type="text" name="uname" placeholder="Enter the username" required/><br/><br/>
                    <input onChange={this.onItemClick} className="form__input" type="password" name="psw" placeholder="Enter the password" required/><br/><br/>
                    <button onClick={this.handleSubmitClick} className="form__button">Login</button>
                    {this.state.isValid === false ? (
                        <h3>Password wrong</h3>
                    ) :null}
                    <br/><br/>
                    <label>Not registered yet , Register Now</label>
                    <br/><br/>
                    <button  onClick={() => browserHistory.push('/register')} className="form__button">
                        Register now
                    </button>
                </div>
            </>
        )
    }
}