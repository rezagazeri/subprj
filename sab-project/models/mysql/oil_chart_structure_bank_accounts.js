/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('oilChartStructureBankAccounts', {
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
    bankAccountId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'bank_accounts',
        key: 'id'
      },
      field: 'bank_account_id'
    }
  }, {
    tableName: 'oil_chart_structure_bank_accounts'
  });
};
