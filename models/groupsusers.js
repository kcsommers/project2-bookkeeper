'use strict';
module.exports = (sequelize, DataTypes) => {
  var groupsUsers = sequelize.define('groupsUsers', {
    groupId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  groupsUsers.associate = function(models) {
    // associations can be defined here
  };
  return groupsUsers;
};