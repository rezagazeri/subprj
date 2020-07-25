/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pageActions', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    menuItemId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'menu_items',
        key: 'id'
      },
      field: 'menu_item_id'
    },
    permittedActionId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'menu_permitted_actions',
        key: 'id'
      },
      field: 'permitted_action_id'
    },
    accessId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'access_list',
        key: 'id'
      },
      field: 'access_id'
    }
  }, {
    tableName: 'page_actions'
  });
};
