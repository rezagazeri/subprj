/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('customers', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
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
    customerName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'customer_name'
    },
    customerTypeId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'customer_types',
        key: 'id'
      },
      field: 'customer_type_id'
    },
    depositId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'deposit_id'
    },
    usageTypeId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'customer_usage_types',
        key: 'id'
      },
      field: 'usage_type_id'
    },
    supplyChannelId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'customer_supply_channels',
        key: 'id'
      },
      field: 'supply_channel_id'
    },
    concessionaireId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'customer_concessionaires',
        key: 'id'
      },
      field: 'concessionaire_id'
    },
    contractorId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'customer_contractors',
        key: 'id'
      },
      field: 'contractor_id'
    },
    groupId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'customer_groups',
        key: 'id'
      },
      field: 'group_id'
    },
    flagId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
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
    tableName: 'customers'
  });
};
