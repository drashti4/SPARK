import React from 'react'

export default class ResultsComponent extends React.Component{
    constructor(props) {
        super(props);
    }

    render()
    {
        return(
            <>
                    {this.props.data.pagination.items === 0?
                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>Holy guacamole!</strong> Please Refine your Search.

                        </div>
                        :this.props.data.results.map((_value,_key)=>{
                            return(
                                <div key={"result"+_key} className="plsRow">
                                    {_value.thumb === ""?
                                        <div className="fakeimg">Cover not Available</div>
                                        :
                                        <img alt="resultImage" className="resultImage" src={_value.cover_image} />
                                    }
                                    <br />
                                    <h4>{_value.title}</h4>
                                    {_value.type === "release" || _value.type === "master"?
                                        <>
                                            <button onClick={this.props.fetchMaster} className="btn btn-outline-primary"data-url={_value.type==="master"?_value.resource_url:_value.master_url===null?_value.resource_url:_value.master_url}>View Album</button>
                                            <button onClick={this.props.addToFavourite} style={{"marginLeft":"6px"}} className="btn btn-outline-success" data-key={_key}>Add to Favourite</button>
                                        </>
                                        :
                                        null
                                    }
                                </div>
                            )
                        })}

                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        {this.props.data.pagination.urls.first !== undefined && this.props.data.pagination.urls.first !== this.props.data.pagination.urls.prev?<li className="page-item"><button onClick={this.props.navigate} className="page-link" data-url={this.props.data.pagination.urls.first}>First</button></li>:null}
                        {this.props.data.pagination.urls.prev !== undefined?<li className="page-item"><button className="page-link" onClick={this.props.navigate} data-url={this.props.data.pagination.urls.prev}>Previous</button></li>:null}

                        {this.props.data.pagination.urls.next !== undefined?<li className="page-item"><button className="page-link"  onClick={this.props.navigate} data-url={this.props.data.pagination.urls.next}>Next</button></li>:null}
                        {this.props.data.pagination.urls.last !== undefined && this.props.data.pagination.urls.next !== this.props.data.pagination.urls.last?<li className="page-item"><button onClick={this.props.navigate} className="page-link" data-url={this.props.data.pagination.urls.last}>Last</button></li>:null}
                    </ul>
                </nav>
            </>
        )
    }
}