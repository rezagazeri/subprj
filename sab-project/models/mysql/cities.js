/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cities', {
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
    stateId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'states',
        key: 'id'
      },
      field: 'state_id'
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
    tableName: 'cities'
  });
};
