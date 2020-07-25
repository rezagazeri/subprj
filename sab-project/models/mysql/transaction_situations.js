/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('transactionSituations', {
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
      type: DataTypes.STRING(3),
      allowNull: true,
      field: 'code'
    },
    flagId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'flags',
        key: 'id'
      },
      field: 'flag_id'
    }
  }, {
    tableName: 'transaction_situations'
  });
};