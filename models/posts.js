'use strict';
module.exports = (sequelize, DataTypes) => {
  const posts = sequelize.define('posts', {
    PostId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    PostTitle: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
  }, {});
  posts.associate = function(models) {
    // associations can be defined here
  };
  return posts;
};