/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('userRoles', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'user_list',
        key: 'id'
      },
      field: 'user_id'
    },
    roleId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'role_list',
        key: 'id'
      },
      field: 'role_id'
    },
    oilChartStructureId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'oil_chart_structure',
        key: 'id'
      },
      field: 'oil_chart_structure_id'
    }
  }, {
    tableName: 'user_roles'
  });
};
