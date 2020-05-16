const db = require("../models");
const Playlist = db.playlists;
const Op = db.Sequelize.Op;

// Create and Save a new Playlist
exports.create = (req, res) => {
  // Validate request
  
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Playlist
  const playlist = {
    title: req.body.title,
  };

  console.log("playlisttiltle------------------>", playlist.title);
  // Save Playlist in the database
  Playlist.create(playlist)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Playlist.",
      });
    });
};

// Retrieve all Tracks from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  Playlist.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving playlists.",
      });
    });
};

// Find a single Playlist with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Playlist.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Playlist with id=" + id,
      });
    });
};

// Update a Playlist by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Playlist.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Playlist was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Playlist with id=${id}. Maybe Playlist was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Playlist with id=" + id,
      });
    });
};

// Delete a Playlist with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Playlist.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Playlist was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Playlist with id=${id}. Maybe Playlist was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Playlist with id=" + id,
      });
    });
};

// Delete all Tracks from the database.
exports.deleteAll = (req, res) => {
  Playlist.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Tracks were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all playlists.",
      });
    });
};
