'use strict';
module.exports = (sequelize, DataTypes) => {
  const posts = sequelize.define('posts', {
    PostId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    PostTitle: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Username: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {});
  posts.associate = function(models) {
    // associations can be defined here
  };
  return posts;
};