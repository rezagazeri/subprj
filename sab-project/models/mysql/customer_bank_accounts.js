/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('customerBankAccounts', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    customerId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'customers',
        key: 'id'
      },
      field: 'customer_id'
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
    tableName: 'customer_bank_accounts'
  });
};
