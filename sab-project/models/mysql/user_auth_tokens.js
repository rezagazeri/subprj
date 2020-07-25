/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('userAuthTokens', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'user_list',
        key: 'id'
      },
      field: 'user_id'
    },
    authToken: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'auth_token'
    },
    usageCount: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0',
      field: 'usage_count'
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'active'
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
    tableName: 'user_auth_tokens'
  });
};
