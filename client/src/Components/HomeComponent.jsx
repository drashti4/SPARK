import React from "react";

import {FormGroup, FormControl, InputGroup } from 'react-bootstrap';
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import Profile from './ProfileComponent';
import Gallery from './GalleryComponent';
import TrafficComponent from './TrafficComponent';

export default class HomeComponent extends React.Component {

    trackMapping = {
        clear_sky:{
            High: 0.5,
            Light: 0.8
        },
        clouds:{
            High: 0.6,
            Light: 0.7
        },
        scattered_clouds:{
            High: 0.4,
            Light: 0.7
        },
        broken_clouds:{
            High: 0.3,
            Light: 0.6
        },
        shower_rain:{
            High: 0.4,
            Light: 0.7
        },
        rain:{
            High: 0.4,
            Light: 0.9
        },
        thunderstorm:{
            High: 0.2,
            Light: 0.4
        },
        snow:{
            High: 0.5,
            Light: 0.8
        },
        mist:{
            High: 0.4,
            Light: 0.7
        }
    };
        constructor(props)
        {
            super(props);
            this.state = {
                query: '',
                artist: null,
                tracks: [],
                genres: [],
                testTraffic: {TrafficComponent},
            }
    }
    search(){
        const BASE_URL='https://api.spotify.com/v1/search?';
        let FETCH_URL =BASE_URL+'q='+this.state.query
            +'&type=artist&limit=1';
        const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
        const auth_token = 'Bearer BQDJMBLiD9tjo4rsp1Nf8UVAPb4shhLt0WpooiwDtySAoOWUnR8dDdVCwRdSM7zPRhkBqfMcp8GjRxMWrfrDC3Rp6rNgQx2WW51dP8etOVu2omi5lXanmEcyCGjvyP0BLxophMlG4hycdWsC2VFzQoniXNfEgPH46LY7XHx6GcUnHKAKpdp8hhiNOr7z-bdMadRLFj3dJenR_pyGy_zCkBZU4wgdZxMszk2ZHI6CLjOlX8wBCU0lYeHn01Ud3qYY_SJH0v144wk';
        const RECENT_URL = 'https://api.spotify.com/v1/tracks'
        console.log("Fetch traffic is ",this.state.testTraffic)
        fetch(RECENT_URL,{
                method:'GET',
                headers: {
                    'Content-Type' :'application/json',
                    'Authorization': auth_token,
                },
                mode: 'cors',
                cache:'default'
            }).then(response => response.json())
            .then(json => {console.log("Current data is "+JSON.stringify(json))
                //const genres=json.genres;
               // this.setState({genres});
                //console.log("Data is "+this.state.genres)
            })


        // I need traffic data over here
            fetch(FETCH_URL,{
            method:'GET',
            headers: {
                'Content-Type' :'application/json',
                'Authorization': auth_token,
            },
            mode: 'cors',
            cache:'default'
        }).then(response =>
                Promise.resolve({
                    data:response.json(),
                    status: response.status
                })
                    .then(post => post.data)
                    .then(json =>json.artists)
                    .then(items =>{
                        //console.log(items);
                        const artist=items.items[0];
                        this.setState(artist);
                        FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`
                        fetch(FETCH_URL,{
                            method:'GET',
                            headers: {
                                'Content-Type' :'application/json',
                                'Authorization': auth_token,
                            },
                        })
                            .then(response =>response.json())
                            .then(json => {
                                console.log('artist',json);
                                const tracks=json.tracks;
                                this.setState({tracks});
                            })

                    })
            );
    }

  getValueTraffic(value){
      console.log("Get data",value)
  }

    render(){
        console.log("Traffic data ",this.state.testTraffic)
        return (
            <div className="App-out">
                <div className="App-title"> React-Spotify</div>
                <div> <TrafficComponent sendData={this.getValueTraffic}/></div>
                <FormGroup>
                    <InputGroup>
                        <FormControl
                            type="text"
                            placeholder="Search music"
                            value ={this.state.query}
                            onChange={event =>{this.setState({query:event.target.value})}}
                            onKeyPress={event=>{
                                if(event.key==='Enter')
                                    this.search();

                            }}
                        />
                        <InputGroup.Addon onClick={()=>this.search()}>
                            <Glyphicon glyph="search"></Glyphicon>
                        </InputGroup.Addon>
                    </InputGroup>
                </FormGroup>
                {
                    this.state !==null
                        ?
                        <div>
                            <Profile
                                artist={this.state}
                            />
                            <Gallery
                                tracks={this.state.tracks}
                            />
                        </div>
                        :<div></div>
                }
            </div>
        )

    }
}

