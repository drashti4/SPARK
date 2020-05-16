module.exports = (app) => {
  const tracks = require("../controllers/track.controller.js");

  var router = require("express").Router();

  // Create a new Track
  router.post("/api/tracks/", tracks.create);

  // Retrieve all Tracks
  router.get("/api/tracks/", tracks.findAll);

  // Retrieve all Tracks in a  playlist
  router.get("/api/tracks/playlists/:id", tracks.findAllInPlaylist);

  // Retrieve a single Track with id
  router.get("/api/tracks/:id", tracks.findOne);

  // Delete a Track with id
  router.delete("/api/tracks/:id", tracks.delete);

  // Create a new Track
  router.delete("/api/tracks/", tracks.deleteAll);

  const playlists = require("../controllers/playlist.controller.js");

  // var router = require("express").Router();

  // Create a new Playlist
  router.post("/api/playlists/", playlists.create);

  // Retrieve all Playlists
  router.get("/api/playlists/", playlists.findAll);

  // Retrieve a single Playlist with id
  router.get("/api/playlists/:id", playlists.findOne);

  app.use(router);
};
