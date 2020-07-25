/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bankAccounts', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    accountNumber: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'account_number'
    },
    bankId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'banks',
        key: 'id'
      },
      field: 'bank_id'
    },
    ownerName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'owner_name'
    },
    hasChequePermission: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'has_cheque_permission'
    },
    financialTypeId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'bank_account_financial_types',
        key: 'id'
      },
      field: 'financial_type_id'
    },
    accountTypeId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'bank_account_types',
        key: 'id'
      },
      field: 'account_type_id'
    },
    headquarterConfirmation: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'headquartet_confirmation'
    },
    bankConfirmation: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'bank_confirmation'
    },
    situationId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'bank_account_situations',
        key: 'id'
      },
      field: 'situation_id'
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
    tableName: 'bank_accounts'
  });
};
