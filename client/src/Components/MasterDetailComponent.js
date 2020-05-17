import React from 'react'

export default class MasterDetailComponent extends React.Component
{
    render(){
        let data = this.props.data
        return(
            <>

                <table>

                    <tbody>
                    <tr>
                        <th>Title</th>
                        <td  className="styleTabs"><span>{data.title}</span></td>
                    </tr>
                    {data.styles!== undefined?
                    <tr>
                            <th>Styles</th><td  className="styleTabs">{ data.styles.map((_val,key)=>{
                                return(<span>{_val}</span>)
                        }) }
                    </td>
                        </tr>:null}
                    {data.genres!== undefined?
                    <tr>
                        <th>Genres</th><td  className="styleTabs">{ data.genres.map((_val,key)=>{
                        return(<span>{_val}</span>)
                    }) }
                    </td>
                    </tr>
                    :null
                    }

                    {data.artist !== undefined?
                    <tr>
                        <th>Artists</th><td  className="styleTabs">{ data.artists.map((_val,key)=>{
                        return(<span>{_val.name}</span>)
                    }) }
                    </td>
                    </tr>
                        :null}

                    {data.videos !== undefined?
                    <tr>
                        <th>Videos</th><td className="styleLinks">
                        {data.videos.map((_val,_key)=>{
                            return(
                                <><span><a rel="noopener noreferrer" target="_blank" href={_val.uri}>{_val.title}</a></span><br /></>
                            )
                        })}
                    </td>
                    </tr>
                        :null}
                    {data.tracklist !== undefined?
                        <tr>
                            <th>Tracks</th><td className="styleTabs">
                            {data.tracklist.map((_val,_key)=>{
                                return(
                                    <><span>{_val.title}</span><br /></>
                                )
                            })}
                        </td>
                        </tr>
                        :null}
                    </tbody>
                </table>
            </>
        )
    }
}