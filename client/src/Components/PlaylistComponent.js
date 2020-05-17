import React from 'react'

export default  class PlaylistComponet extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <>
               {
                   this.props.data.map((_value,_key)=>{
                return (
                    <div key={'pls'+_key} className="plsRow">
                        <h3>{_value.title}</h3>
                        <h4>Genre: {_value.genre} </h4>
                        <a href={_value.uri} className="btn btn-outline-info" target="_new">Show Details</a>
                        <button data-id={_value.id} onClick={this.props.deletePlaylist} style={{"marginLeft":"6px"}}className="btn btn-outline-danger" target="_new">Delete</button>
                    </div> )
            })
               }

            </>
        )
    }
}