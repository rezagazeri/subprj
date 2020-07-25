/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('flags', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'name'
    }
  }, {
    tableName: 'flags'
  });
};
