'use strict';
module.exports = (sequelize, DataTypes) => {
  var group = sequelize.define('group', {
    name: {
    	type: DataTypes.STRING,
    	validate: {
    		len: {
    			args: [1, 99],
    			msg: 'Group name must be between 1 and 99 characters.'
    		}
    	}
    },
    description: DataTypes.TEXT,
    admin: DataTypes.STRING,
    topic: DataTypes.STRING,
    imgUrl: DataTypes.STRING
  }, {});
  group.associate = function(models) {
    // associations can be defined here
    models.group.hasMany(models.post);
    models.group.belongsToMany(models.user, {through: 'groupsUsers'});
    models.group.belongsToMany(models.book, {through: 'groupsBooks'});
  };
  return group;
};