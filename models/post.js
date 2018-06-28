'use strict';
module.exports = (sequelize, DataTypes) => {
  var post = sequelize.define('post', {
    content: DataTypes.TEXT,
    groupId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  post.associate = function(models) {
    // associations can be defined here
    models.post.belongsTo(models.group);
    models.post.belongsTo(models.user);
  };
  return post;
};