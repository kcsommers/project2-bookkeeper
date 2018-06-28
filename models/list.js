'use strict';
module.exports = (sequelize, DataTypes) => {
  var list = sequelize.define('list', {
    name: {
    	type: DataTypes.STRING,
    	validate: {
    		len: {
    			args: [1, 99],
    			msg: 'Name must be between 1 and 99 characters.'
    		}
    	}
    },
    userId: DataTypes.INTEGER
  }, {});
  list.associate = function(models) {
    // associations can be defined here
    models.list.belongsTo(models.user);
    models.list.belongsToMany(models.book, {through: 'listsBooks'});
  };
  return list;
};