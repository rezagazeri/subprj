/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('behdadAccountNumbers', {
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
    bankAccountId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'bank_accounts',
        key: 'id'
      },
      field: 'bank_account_id'
    },
    behdadAccountId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'behdad_accounts',
        key: 'id'
      },
      field: 'behdad_account_id'
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
    tableName: 'behdad_account_numbers'
  });
};
