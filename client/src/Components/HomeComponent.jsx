import React from "react";

import {FormGroup, FormControl, InputGroup } from 'react-bootstrap';
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import Profile from './ProfileComponent';
import Gallery from './GalleryComponent';
import Traffic from './TempClass'
export default class HomeComponent extends React.Component {

        constructor(props)
        {
            super(props);
            this.state = {
                query: '',
                artist: null,
                tracks: [],
                genres: []
            }
    }
    search(){

        const BASE_URL='https://api.spotify.com/v1/search?';
        let FETCH_URL =BASE_URL+'q='+this.state.query
            +'&type=artist&limit=1';
        const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
        const auth_token = 'Bearer BQDWvn-EM-aEJGUApnrUZ3xDVhOPVDW8jnsqXLQhewC1-FvhQAnYL6GrxpxDUcc1IX-ZQVG1sIpw2zebSZDRLUp_dGjFQEDhNDyn6ov2E0d0rU_7ITvb6jw_R4cs7CKlPnBLVn1HMjyO92w4kj9DKmHkwG9SZhMtNaVdWtZEo8qfGHlhZu3KSds8w2tC3xoPqey8ir_RQ0S9HK4ZnS-P_sT6IR4_wOvjmJnMO7BeahY_fgbzqs86f8-wSSFs58Xj-NOyoLHtRuQ';
        const RECENT_URL = 'https://api.spotify.com/v1/recommendations/available-genre-seeds'

const paags = new Traffic()
        console.log("Traffic "+paags.test())


        fetch(RECENT_URL,{
                method:'GET',
                headers: {
                    'Content-Type' :'application/json',
                    'Authorization': auth_token,
                },
                mode: 'cors',
                cache:'default'
            }).then(response => response.json())
            .then(json => {//console.log("Current data is "+JSON.stringify(json.genres))
                const genres=json.genres;
                this.setState({genres});
                console.log("Data is "+this.state.genres)
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

  /*  showResults(data){
            console.log("Recently played music")
        console.log(data)
        this.setState({
            trackList: data,
            masterInfo:undefined
        })
    }*/

    render(){
        return (
            <div className="App-out">
                <div className="App-title"> React-Spotify</div>
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
