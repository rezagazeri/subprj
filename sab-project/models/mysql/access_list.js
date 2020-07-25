/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('accessList', {
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
    endpoint: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'endpoint'
    },
    methodId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'access_methods',
        key: 'id'
      },
      field: 'method_id'
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
    tableName: 'access_list'
  });
};
