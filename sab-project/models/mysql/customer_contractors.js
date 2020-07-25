/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('customerContractors', {
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
    oilChartStructureId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'oil_chart_structure',
        key: 'id'
      },
      field: 'oil_chart_structure_id'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'updated_at'
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
    tableName: 'customer_contractors'
  });
};
