/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('automatedTransactions', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    transactionId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'transactions',
        key: 'id'
      },
      field: 'transaction_id'
    },
    automatedTransactionTypeId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'automated_transaction_types',
        key: 'id'
      },
      field: 'automated_transaction_type_id'
    },
    transactionSourceBankAccountId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'bank_accounts',
        key: 'id'
      },
      field: 'transaction_source_bank_account_id'
    },
    transactionDestinationBankAccountId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'bank_accounts',
        key: 'id'
      },
      field: 'transaction_destination_bank_account_id'
    }
  }, {
    tableName: 'automated_transactions'
  });
};
