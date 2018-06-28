'use strict';
module.exports = (sequelize, DataTypes) => {
  var groupsBooks = sequelize.define('groupsBooks', {
    groupId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER
  }, {});
  groupsBooks.associate = function(models) {
    // associations can be defined here
  };
  return groupsBooks;
};