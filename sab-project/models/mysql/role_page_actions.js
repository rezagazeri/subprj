/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('rolePageActions', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    roleId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'role_list',
        key: 'id'
      },
      field: 'role_id'
    },
    pageActionId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'page_actions',
        key: 'id'
      },
      field: 'page_action_id'
    }
  }, {
    tableName: 'role_page_actions'
  });
};
