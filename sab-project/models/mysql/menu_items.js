/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('menuItems', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      field: 'id',
    },
    slug: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'slug',
    },
    flagId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'flag_id',
    },
    parentId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'menu_items',
        key: 'id',
      },
      field: 'parent_id',
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'title',
    },
  }, {
    tableName: 'menu_items',
  })
}
