import React from 'react'
import ResultsComponent from "./ResultsComponent";
import MasterDetailComponent from "./MasterDetailComponent";
import PlaylistComponent from "./PlaylistComponent";

export default class SearchComponent extends React.Component{
    constructor(props)
    {
       super(props)
       this.state = {
           trackList : undefined,
           masterInfo: undefined,
           playlists:undefined
       }
       this.handleSubmit = this.handleSubmit.bind(this)
        
    }

componentDidMount() {
        fetch('http://localhost:3002/tracks',{
            method:"GET",
            mode:"cors",
            header:{
                "Content-Type":"application/json"
            }
        }).then(response => response.json())
            .then(json => this.loadPlaylists(json))
}

loadPlaylists(jsonData){
    this.setState({playlists:jsonData})
}

    handleSubmit(ev)
{
    let query =  ev.target.value

    if(ev.key === "Enter")
    {
        if(query === "")
        {
            alert('Search Field Empty')
        }else{

            fetch(`https://api.discogs.com/database/search?q=${query}&secret=CRvdQITvnETqiUWmrtkgGzKncyifCOWX&key=POPlpHHovyYtisGjIrSG&per_page=10`,{
                method:"GET"
            }).then(response => response.json())
                .then(json => this.showResults(json))
            /////
        }
    }

}

showResults(data){

    this.setState({
        trackList: data,
        masterInfo:undefined,
        playlists:undefined
    })
}

navigate = (ev)=>{
    fetch(ev.target.getAttribute('data-url'),{
        method:"GET"
    }).then(response => response.json())
        .then(json => this.showResults(json))
}

fetchMaster = (ev)=>{
        let url = ev.target.getAttribute('data-url')
        fetch(url,{
         method:"GET"
       }).then(response => response.json())
        .then(json => this.showMaster(json))

}

    addToFavourite = (ev) => {
        const key = ev.target.getAttribute('data-key')
        const album = this.state.trackList.results[key]
        const _genre = album.genre
        const _master_id = album.master_id
        const _title = album.title
        const _uri = `http://www.discogs.com/${album.uri}`

        const message = {
            genres: _genre,
            master_id: _master_id,
            title: _title,
            uri: _uri
        }

        fetch('http://localhost:3002/track',{
            method:"POST",
            mode:"cors",
            headers:{
                "Content-Type":'application/json'
            },
            body: JSON.stringify(message)
        }).then(response => response.json())
            .then(json => alert('track added to favourites'))
    }

showMaster(data)
{
    this.setState(
        {
            trackList: undefined,
            masterInfo: data
        }
    )
}

    deletePlaylist = (ev)=>{
        let id = ev.target.getAttribute('data-id')

        fetch('http://localhost:3002/track/'+id,{
            method:"DELETE",
            mode:"cors",
            headers:{
                'Content-Type':"application/json"
            }
        }).then(response => response.json())
            .then(json => this.reloadData(json))
    }

    reloadData = (data)=>{
        this.setState(
            {
                    trackList : undefined,
                    masterInfo: undefined
                }
            )
        this.componentDidMount()

    }
    render(){
        return(
            <>
            <nav className="navbar navbar-light bg-light">
                <div className="form-inline">
                    <input onKeyDown={this.handleSubmit} className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                </div>

                    <button onClick={this.reloadData} className=" btn btn-link nav-item">Home</button>

            </nav>
                <div className="container">
                    {this.state.trackList !== undefined?<ResultsComponent addToFavourite={this.addToFavourite} fetchMaster={this.fetchMaster} navigate={this.navigate} data={this.state.trackList} />:null}
                    {this.state.masterInfo !== undefined? <MasterDetailComponent data={this.state.masterInfo} />:null }
                    {this.state.playlists !== undefined?<PlaylistComponent deletePlaylist={this.deletePlaylist} data={this.state.playlists} />:null}
                </div>
            </>
            )
    }
}