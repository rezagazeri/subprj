/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('transactions', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    sourceId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'transaction_sources',
        key: 'id'
      },
      field: 'source_id'
    },
    bankAccountId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'bank_accounts',
        key: 'id'
      },
      field: 'bank_account_id'
    },
    sourceTransactionId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'source_transaction_id'
    },
    amount: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: 'amount'
    },
    transactionMethodId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'transaction_methods',
        key: 'id'
      },
      field: 'transaction_method_id'
    },
    newBalance: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: 'new_balance'
    },
    transactionTypeId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'transaction_types',
        key: 'id'
      },
      field: 'transaction_type_id'
    },
    sourceCreatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'source_created_at'
    },
    identifier: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'identifier'
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
    sourceAccountNumbers: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'source_account_numbers'
    },
    destinationAccountNumbers: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'destination_account_numbers'
    },
    transactionSituationId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'transaction_situations',
        key: 'id'
      },
      field: 'transaction_situation_id'
    },
    lastChangeStatusDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'last_change_status_date'
    },
    transactionMediaTypeId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'transaction_medias',
        key: 'id'
      },
      field: 'transaction_media_type_id'
    },
    isGroupTransfer: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'is_group_transfer'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'description'
    },
    isValid: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'is_valid'
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
    tableName: 'transactions'
  });
};
