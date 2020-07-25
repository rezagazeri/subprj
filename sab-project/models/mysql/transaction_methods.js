/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('transactionMethods', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'name'
    },
    code: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'code'
    },
    flagId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'flag_id'
    }
  }, {
    tableName: 'transaction_methods'
  });
};
