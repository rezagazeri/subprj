/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('customerExtraInfo', {
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
    phone: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'phone'
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'address'
    },
    accountNumber: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'account_number'
    },
    shippingCode: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'shipping_code'
    },
    stationCode: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'station_code'
    }
  }, {
    tableName: 'customer_extra_info'
  });
};
