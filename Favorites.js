import React from "react";

export class Favorites extends React.Component {
  constructor() {
    super();
    this.state = { apiresults: [], favResults: [] };
    this.handleDeleteFromFavorite = this.handleDeleteFromFavorite.bind(this);
    this.handlePlaylist = this.handlePlaylist.bind(this);
  }

  componentDidMount() {
    fetch(`http://localhost:8080/api/tracks`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ apiresults: data });
        console.log(this.state.apiresults);
      });
  }

  handleDeleteFromFavorite(id) {
    console.log("id is-->", id);
    fetch("http://localhost:8080/api/tracks/" + id, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status === 200) {
          let index = -1;
          let isFound = false;

          this.state.apiresults.map((item) => {
            if (!isFound && id !== item.id) {
              index++;
            } else if (!isFound && id === item.id) {
              index++;
              isFound = true;
            }
          });
          let tempFavArray = this.state.apiresults;
          if (isFound && index > -1) {
            tempFavArray.splice(index, 1);
            this.setState({ apiresults: tempFavArray });
          }
        }
        return res.json();
      })
      .then((res) => console.log(res.status));
      alert("The track has been removed from favorites!")
  }

  handlePlaylist(id) {
    if (id === 0) {
      fetch(`http://localhost:8080/api/tracks`)
        .then((response) => response.json())
        .then((data) => {
          this.setState({ apiresults: data });
          console.log(this.state.apiresults);
        });
    } else {
      console.log(id);
      const url = `http://localhost:8080/api/tracks/playlists/` + id;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.setState({ apiresults: data });
          console.log(this.state.apiresults);
        });
    }
  }
  render() {
    let rowHtml = (
      <div>
        {this.state.apiresults.map((item) => (
          <ul key={item.id}>
            {" "}
            <div className="music-row">
              <img src={item.thumb} alt="music-thumb" />
              <div className="music-title">
                {item.title}
                <br />
              </div>
              <button
                onClick={() => this.handleDeleteFromFavorite(item.id)}
                className="button favorites-button"
              >
                Delete Favorite
              </button>
            </div>
          </ul>
        ))}
      </div>
    );

    return (
      <div>
        <div className="music-list">
          <ul className="list-group">{rowHtml}</ul>
        </div>

        <div class="tab">
          <button className="tablinks" onClick={() => this.handlePlaylist(0)}>
            All favorites
          </button>
          <button className="tablinks" onClick={() => this.handlePlaylist(1)}>
            Default
          </button>
          <button className="tablinks" onClick={() => this.handlePlaylist(2)}>
            Acoustic
          </button>
          <button className="tablinks" onClick={() => this.handlePlaylist(3)}>
            Classic
          </button>
          <button className="tablinks" onClick={() => this.handlePlaylist(4)}>
            Country
          </button>
          <button className="tablinks" onClick={() => this.handlePlaylist(5)}>
            Metal
          </button>
          <button className="tablinks" onClick={() => this.handlePlaylist(6)}>
            Pop/Dance
          </button>
          <button className="tablinks" onClick={() => this.handlePlaylist(7)}>
            Rock
          </button>
        </div>
      </div>
    );
  }
}
