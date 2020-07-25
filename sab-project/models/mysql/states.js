/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('states', {
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
    },
    countryId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'country',
        key: 'id'
      },
      field: 'country_id'
    },
    flagId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'flags',
        key: 'id'
      },
      field: 'flag_id'
    }
  }, {
    tableName: 'states'
  });
};
