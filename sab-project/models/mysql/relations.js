module.exports = (db) => {
  db.userAuthTokens.belongsTo(db.userList, {foreignKey: 'userId', as: 'user'})

  db.userList.hasMany(db.userRoles, {foreignKey: 'userId', as: 'roles'})

  db.userRoles.belongsTo(db.userList, {foreignKey: 'userId', as: 'user'})
  db.userRoles.belongsTo(db.roleList, {foreignKey: 'roleId', as: 'role'})
  db.userRoles.belongsTo(db.oilChartStructure, {foreignKey: 'oilChartStructureId', as: 'chartStructure'})

  db.rolePageActions.belongsTo(db.roleList, {foreignKey: 'roleId', as: 'role'})
  db.rolePageActions.belongsTo(db.pageActions, {foreignKey: 'pageActionId', as: 'pageActions'})

  db.menuItems.belongsTo(db.menuItems, {foreignKey: 'parentId', as: 'parent'})
  db.menuItems.hasMany(db.menuItems, {foreignKey: 'parentId', as: 'children'})
  db.menuItems.hasMany(db.pageActions, {foreignKey: 'menuItemId', as: 'pageActions'})

  db.pageActions.belongsTo(db.menuItems, {foreignKey: 'menuItemId', as: 'menuItem'})
  db.pageActions.belongsTo(db.menuPermittedActions, {foreignKey: 'permittedActionId', as: 'permittedAction'})
  db.pageActions.belongsTo(db.accessList, {foreignKey: 'accessId', as: 'access'})
  db.pageActions.hasMany(db.rolePageActions, {foreignKey: 'pageActionId', as: 'rolePageActions'})

  db.accessList.belongsTo(db.accessMethods, {foreignKey: 'methodId', as: 'method'})

  db.roleList.hasMany(db.userRoles, {foreignKey: 'roleId', as: 'userRoles'})
  db.roleList.belongsTo(db.userLevels, {foreignKey: 'userLevelId', as: 'level'})
  db.roleList.hasMany(db.rolePageActions, {foreignKey: 'roleId', as: 'pageActions'})

  db.behdadAccountNumbers.belongsTo(db.behdadAccounts, {foreignKey: 'behdadAccountId', as: 'account'})
  db.behdadAccountNumbers.belongsTo(db.bankAccounts, {foreignKey: 'bankAccountId', as: 'bankAccount'})

  db.behdadIdentifiers.belongsTo(db.behdadAccountNumbers, {foreignKey: 'behdadAccountNumberId', as: 'accountNumber'})
  db.behdadIdentifiers.belongsTo(db.customers, {foreignKey: 'customerId', as: 'customer'})

  db.bankAccounts.hasMany(db.oilChartStructureBankAccounts, {foreignKey: 'bankAccountId', as: 'oilChartStructures'})
  db.bankAccounts.hasMany(db.customerBankAccounts, {foreignKey: 'bankAccountId', as: 'customers'})
  db.bankAccounts.hasMany(db.customerContractorBankAccounts, {foreignKey: 'bankAccountId', as: 'customerContractors'})

  db.customers.hasMany(db.customerAllowedBankAccounts, {foreignKey: 'customerId', as: 'allowedBankAccounts'})

  return db
}