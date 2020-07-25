/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('behdadIdentifiers', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id',
    },
    behdadAccountNumberId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'behdad_account_numbers',
        key: 'id',
      },
      field: 'behdad_account_number_id',
    },
    identifier: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'identifier',
    },
    customerId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'customers',
        key: 'id',
      },
      field: 'customer_id',
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'is_active',
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'start_date',
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'end_date',
    },
    lastUpdate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'last_update',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'updated_at',
    },
  }, {
    tableName: 'behdad_identifiers',
  })
}
