/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('transactionTypes', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    transactionTypeGradeId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'transaction_type_grades',
        key: 'id'
      },
      field: 'transaction_type_grade_id'
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
    effect: {
      type: DataTypes.ENUM('increase','decrease'),
      allowNull: true,
      field: 'effect'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'description'
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
    tableName: 'transaction_types'
  });
};
