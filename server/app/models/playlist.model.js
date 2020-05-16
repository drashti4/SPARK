module.exports = (sequelize, Sequelize) => {
  const Playlist = sequelize.define("playlist", {
    title: {
      type: Sequelize.STRING,
    },
  });

  return Playlist;
};
