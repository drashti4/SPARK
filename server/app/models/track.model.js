module.exports = (sequelize, Sequelize) => {
  const Track = sequelize.define("track", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    title: {
      type: Sequelize.STRING,
    },
    uri: {
      type: Sequelize.STRING,
    },
    master_id: {
      type: Sequelize.INTEGER,
    },
    playlist_id: {
      type: Sequelize.INTEGER,
    },
    thumb: {
      type: Sequelize.STRING,
    },
  });
  return Track;
};
