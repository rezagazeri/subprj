/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('roleList', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    userLevelId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'user_levels',
        key: 'id'
      },
      field: 'user_level_id'
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'name'
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
    tableName: 'role_list'
  });
};
