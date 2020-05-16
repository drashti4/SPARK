const db = require("../models");
const Track = db.tracks;
const Op = db.Sequelize.Op;

// Create and Save a new Track
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Track
  const track = {
    id: req.body.id,
    title: req.body.title,
    uri: req.body.uri,
    master_id: req.body.master_id,
    playlist_id: req.body.playlist_id,
    thumb: req.body.thumb,
  };

  // Save Track in the database
  Track.create(track)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Track.",
      });
    });
};

// Retrieve all Tracks from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  Track.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tracks.",
      });
    });
};

// Retrieve all Tracks from the database.
exports.findAllInPlaylist = (req, res) => {
  console.log("requuest", req.params);
  const playlist_id = parseInt(req.params.id);
  var condition = playlist_id
    ? { playlist_id: { [Op.eq]: playlist_id } }
    : null;

  Track.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tracks.",
      });
    });
};

// Find a single Track with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Track.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Track with id=" + id,
      });
    });
};

// Update a Track by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Track.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Track was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Track with id=${id}. Maybe Track was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Track with id=" + id,
      });
    });
};

// Delete a Track with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Track.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Track was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Track with id=${id}. Maybe Track was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Track with id=" + id,
      });
    });
};

// Delete all Tracks from the database.
exports.deleteAll = (req, res) => {
  Track.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Tracks were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tracks.",
      });
    });
};
