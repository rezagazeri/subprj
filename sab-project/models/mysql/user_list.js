/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('userList', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    fullName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'full_name'
    },
    genderId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'user_genders',
        key: 'id'
      },
      field: 'gender_id'
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'username'
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'password'
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'email'
    },
    mobile: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'mobile'
    },
    lastLoginDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'last_login_date'
    },
    loginCount: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0',
      field: 'login_count'
    },
    lastActivityDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'last_activity_date'
    },
    lastActivityUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'last_activity_url'
    },
    registerDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'register_date'
    },
    situationId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'user_situations',
        key: 'id'
      },
      field: 'situation_id'
    }
  }, {
    tableName: 'user_list'
  });
};
