'use strict';
module.exports = (sequelize, DataTypes) => {
  var book = sequelize.define('book', {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    description: DataTypes.TEXT,
    imgUrl: DataTypes.TEXT,
    banner: DataTypes.TEXT
  }, {});
  book.associate = function(models) {
    // associations can be defined here
    models.book.hasMany(models.quote);
    models.book.hasMany(models.note);
    models.book.belongsToMany(models.list, {through: 'listsBooks'});
    models.book.belongsToMany(models.group, {through: 'groupsBooks'});
  };
  return book;
};