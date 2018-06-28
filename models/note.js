'use strict';
module.exports = (sequelize, DataTypes) => {
  var note = sequelize.define('note', {
    content: DataTypes.TEXT,
    bookId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  note.associate = function(models) {
    // associations can be defined here
    models.quote.belongsTo(models.book);
    models.quote.belongsTo(models.user);
  };
  return note;
};