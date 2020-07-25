/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('oilChartStructure', {
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
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'email'
    },
    financialCode: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'financial_code'
    },
    salesCode: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'sales_code'
    },
    depositId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'deposit_id'
    },
    publicDepositId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'public_deposit_id'
    },
    parentId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'oil_chart_structure',
        key: 'id'
      },
      field: 'parent_id'
    },
    level: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      field: 'level'
    },
    flagId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'flags',
        key: 'id'
      },
      field: 'flag_id'
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
    }
  }, {
    tableName: 'oil_chart_structure'
  });
};
