/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('customerContractorBankAccounts', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    customerContractorId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'customer_contractors',
        key: 'id'
      },
      field: 'customer_contractor_id'
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
    tableName: 'customer_contractor_bank_accounts'
  });
};
