const express = require('express')
const bodyParser = require('body-parser')
const {Context} = require('./context')
const {getAction, getLogMiddleware, getErrorMiddleware} = require('../utils/express')
const areaHandlers = require('../modules/oil/handler/area')
const automateTransactionTypeHandlers = require('../modules/oil/handler/automate_transaction_type')
const bankAccountFinancialTypeHandlers = require('../modules/oil/handler/bank_account_financial_type')
const bankAccountTypeHandlers = require('../modules/oil/handler/bank_account_type')
const bankAccountHandlers = require('../modules/oil/handler/bank_account')
const bankHandlers = require('../modules/oil/handler/bank')
const regionArea = require('../modules/oil/handler/region_accounts')
const cityHandlers = require('../modules/oil/handler/city')
const contractorHandlers = require('../modules/oil/handler/customer_contractor')
const countryHandlers = require('../modules/oil/handler/country')
const customerHandlers = require('../modules/oil/handler/customer')
const customerGroupHandlers = require('../modules/oil/handler/customer_group')
const customerSupplyChannelHandlers = require('../modules/oil/handler/customer_supply_channel')
const customerTypeHandlers = require('../modules/oil/handler/customer_type')
const customerUsageTypeHandlers = require('../modules/oil/handler/customer_usage_type')
const flagHandlers = require('../modules/oil/handler/flags')
const headquarterHandlers = require('../modules/oil/handler/headquarter')
const menuPermittedActionHandlers = require('../modules/oil/handler/menu_permitted_action')
const regionHandlers = require('../modules/oil/handler/region')
const stateHandlers = require('../modules/oil/handler/state')
const transactionMediaHandlers = require('../modules/oil/handler/transaction_media')
const transactionMethodHandlers = require('../modules/oil/handler/transaction_method')
const transactionSituationHandlers = require('../modules/oil/handler/transaction_situation')
const transactionTypeGradeHandlers = require('../modules/oil/handler/transaction_type_grade')
const transactionTypeHandlers = require('../modules/oil/handler/transaction_type')
const transactionHandlers = require('../modules/oil/handler/transaction')
const userGenderHandlers = require('../modules/oil/handler/user_gender')
const userLevelHandlers = require('../modules/oil/handler/user_level')
const userSituationHandlers = require('../modules/oil/handler/user_situation')
const chartAriaDepositFunds = require('../modules/chart/controller/aria_deposit_funds')
const cookieParser = require('cookie-parser')

/**
 *
 */
class Configuration {

  /**
   *
   * @param {express.application} app
   * @param {Context} ctx
   * @returns {Promise<void>}
   */
  async config (app, ctx) {
    this.bindFrontHandlers(app, ctx)
    this.bindMainHandlers(app, ctx)
    this.bindBackHandlers(app, ctx)
  }

  /**
   *
   * @param {express.application} app
   * @param {Context} ctx
   * @returns {Promise<void>}
   */
  bindFrontHandlers (app, ctx) {
    app.use(express.json())
    app.use(cookieParser())
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(getLogMiddleware(ctx))
    app.use(async (req, res, next) => {
      res.header('X-Powered-By', 'Avin')
      res.header('Access-Control-Allow-Origin', 'https://sup.cab-in.com')
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,PATCH,OPTIONS')
      res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-with,Content-Type,type,Accept,observe,auth_token')
      res.header('Access-Control-Allow-Credentials', true)
      res.header('Access-Control-Allow-Origin-With-Credentials', true)
      res.header('Allow-Origin-With-Credentials', true)
      res.header('Upgrade-Insecure-Requests', '1')
      res.header('Content-Type', 'application/json')
      next()
    })
    app.use(async (req, res, next) => {
      const AuthService = require('../modules/users/services/AuthService')
      let token
      if (process.env.NODE_ENV === 'production') {
        token = req.cookies.authToken || ''
      } else {
        token = req.headers.auth_token || ''
      }
      const auth = new AuthService(token, req.url, req.method.toLowerCase())
      try {
        // req.user = {
        //   'id': 1,
        //   'fullName': 'علی لطفی',
        //   'genderId': 1,
        //   'email': 'lotfi.aly@gmail.com',
        //   'mobile': '09364166867',
        //   'lastLoginDate': '2020-01-01T12:23:42.595Z',
        //   'loginCount': 45,
        //   'authToken': '41f29849b7b26cfa545bea45da53bab6',
        //   'situationId': 2,
        //   'roleName': 'ادمین',
        //   'roleLevel': 1,
        //   'chartStructure':{
        //     'id': 45,
        //     'level': 0,
        //     'parentId': 1
        //   },
        //   'roles': [
        //     {
        //       'id': 1,
        //       'name': 'ادمین',
        //       'levelId': 1,
        //       'levelName': 'ادمین',
        //       'chartStructureId': 1,
        //       'chartStructureName': 'ستاد مرکزی',
        //       'chartStructureLevel': 0,
        //     },
        //   ],
        // }
        req.user = await auth.validate()
        next()
      } catch (e) {
        console.log(e)
        res.status(e.code).json(e)
      }
    })
  }

  /**
   *
   * @param {express.application} app
   * @param {Context} ctx
   * @returns {Promise<void>}
   */
  bindMainHandlers (app, ctx) {
    require('../routers')(app, ctx)
    app.get('/v1/automated_transaction_types',
      getAction(ctx, automateTransactionTypeHandlers.handleGetAll))
    app.get('/v1/automated_transaction_types/:id',
      getAction(ctx, automateTransactionTypeHandlers.handleGetById))

    app.get('/v1/bank_account_financial_types',
      getAction(ctx, bankAccountFinancialTypeHandlers.handleGetAll))
    app.get('/v1/bank_account_financial_types/:id',
      getAction(ctx, bankAccountFinancialTypeHandlers.handleGetById))
    app.post('/v1/bank_account_financial_types',
      getAction(ctx, bankAccountFinancialTypeHandlers.handlePost))
    app.patch('/v1/bank_account_financial_types/:id',
      getAction(ctx, bankAccountFinancialTypeHandlers.handlePatch))
    app.delete('/v1/bank_account_financial_types/:id',
      getAction(ctx, bankAccountFinancialTypeHandlers.handleDelete))

    app.get('/v1/bank_account_types',
      getAction(ctx, bankAccountTypeHandlers.handleGetAll))
    app.get('/v1/bank_account_types/:id',
      getAction(ctx, bankAccountTypeHandlers.handleGetById))
    app.post('/v1/bank_account_types',
      getAction(ctx, bankAccountTypeHandlers.handlePost))
    app.patch('/v1/bank_account_types/:id',
      getAction(ctx, bankAccountTypeHandlers.handlePatch))
    app.delete('/v1/bank_account_types/:id',
      getAction(ctx, bankAccountTypeHandlers.handleDelete))

    app.get('/v1/bank_accounts',
      getAction(ctx, bankAccountHandlers.handleGetAll))
    app.get('/v1/report/bank_accounts',
      getAction(ctx, bankAccountHandlers.handleGetAll))
    app.get('/v1/bank_accounts/:id',
      getAction(ctx, bankAccountHandlers.handleGetById))
    app.get('/v1/region_bank_accounts/:id',
      getAction(ctx, bankAccountHandlers.handleRegionBankAccounts))
    app.get('/v1/bank_accounts_without_cheque',
      getAction(ctx, bankAccountHandlers.handleGetAccountsWithoutCheque))
    app.post('/v1/bank_accounts',
      getAction(ctx, bankAccountHandlers.handlePost))
    app.patch('/v1/bank_accounts/:id',
      getAction(ctx, bankAccountHandlers.handlePatch))
    app.delete('/v1/bank_accounts/:id',
      getAction(ctx, bankAccountHandlers.handleDelete))

    app.get('/v1/banks',
      getAction(ctx, bankHandlers.handleGetAll))
    app.get('/v1/banks/:id',
      getAction(ctx, bankHandlers.handleGetById))
    app.post('/v1/banks',
      getAction(ctx, bankHandlers.handlePost))
    app.patch('/v1/banks/:id',
      getAction(ctx, bankHandlers.handlePatch))
    app.delete('/v1/banks/:id',
      getAction(ctx, bankHandlers.handleDelete))

    app.get('/v1/cities',
      getAction(ctx, cityHandlers.handleGetAll))
    app.get('/v1/cities/:id',
      getAction(ctx, cityHandlers.handleGetById))
    app.post('/v1/cities',
      getAction(ctx, cityHandlers.handlePost))
    app.patch('/v1/cities/:id',
      getAction(ctx, cityHandlers.handlePatch))
    app.delete('/v1/cities/:id',
      getAction(ctx, cityHandlers.handleDelete))

    app.get('/v1/contractors',
      getAction(ctx, contractorHandlers.handleGetAll))
    app.get('/v1/contractors/:id',
      getAction(ctx, contractorHandlers.handleGetById))
    app.post('/v1/contractors',
      getAction(ctx, contractorHandlers.handlePost))
    app.patch('/v1/contractors/:id',
      getAction(ctx, contractorHandlers.handlePatch))
    app.delete('/v1/contractors/:id',
      getAction(ctx, contractorHandlers.handleDelete))

    app.get('/v1/countries',
      getAction(ctx, countryHandlers.handleGetAll))
    app.get('/v1/countries/:id',
      getAction(ctx, countryHandlers.handleGetById))

    app.get('/v1/customers',
      getAction(ctx, customerHandlers.handleGetAll))
    app.get('/v1/customers/:id',
      getAction(ctx, customerHandlers.handleGetById))
    app.post('/v1/customers',
      getAction(ctx, customerHandlers.handlePost))
    app.patch('/v1/customers/:id',
      getAction(ctx, customerHandlers.handlePatch))
    app.delete('/v1/customers/:id',
      getAction(ctx, customerHandlers.handleDelete))
    app.get('/v1/report/customer_list',
        getAction(ctx, customerHandlers.handleGetAll))

    /* for external users Ex. NIOPDC IT */
    app.post('/api/v1/customers',
      getAction(ctx, customerHandlers.handlePost))
    app.post('/api/v1/contractors',
      getAction(ctx, contractorHandlers.handlePost))

    app.get('/api/v1/customer_types',
      getAction(ctx, customerTypeHandlers.handleGetAll))
    app.get('/api/v1/customer_usage_types',
      getAction(ctx, customerUsageTypeHandlers.handleGetAll))
    app.get('/api/v1/customer_supply_channels',
      getAction(ctx, customerSupplyChannelHandlers.handleGetAll))
    app.get('/api/v1/contractors',
      getAction(ctx, contractorHandlers.handleGetAll))
    app.get('/api/v1/customer_groups',
      getAction(ctx, customerGroupHandlers.handleGetAll))
    app.get('/api/v1/bank_accounts',
      getAction(ctx, bankAccountHandlers.handleGetAll))
    app.get('/api/v1/areas',
      getAction(ctx, areaHandlers.handleGetList))
    app.get('/api/v1/regions',
      getAction(ctx, regionHandlers.handleGetList))
    /* for external users Ex. NIOPDC IT */

    app.get('/v1/customer_groups',
      getAction(ctx, customerGroupHandlers.handleGetAll))
    app.get('/v1/customer_groups/:id',
      getAction(ctx, customerGroupHandlers.handleGetById))
    app.post('/v1/customer_groups',
      getAction(ctx, customerGroupHandlers.handlePost))
    app.patch('/v1/customer_groups/:id',
      getAction(ctx, customerGroupHandlers.handlePatch))
    app.delete('/v1/customer_groups/:id',
      getAction(ctx, customerGroupHandlers.handleDelete))

    app.get('/v1/customer_supply_channels',
      getAction(ctx, customerSupplyChannelHandlers.handleGetAll))
    app.get('/v1/customer_supply_channels/:id',
      getAction(ctx, customerSupplyChannelHandlers.handleGetById))
    app.post('/v1/customer_supply_channels',
      getAction(ctx, customerSupplyChannelHandlers.handlePost))
    app.patch('/v1/customer_supply_channels/:id',
      getAction(ctx, customerSupplyChannelHandlers.handlePatch))
    app.delete('/v1/customer_supply_channels/:id',
      getAction(ctx, customerSupplyChannelHandlers.handleDelete))

    app.get('/v1/customer_types',
      getAction(ctx, customerTypeHandlers.handleGetAll))
    app.get('/v1/customer_types/:id',
      getAction(ctx, customerTypeHandlers.handleGetById))
    app.post('/v1/customer_types',
      getAction(ctx, customerTypeHandlers.handlePost))
    app.patch('/v1/customer_types/:id',
      getAction(ctx, customerTypeHandlers.handlePatch))
    app.delete('/v1/customer_types/:id',
      getAction(ctx, customerTypeHandlers.handleDelete))

    app.get('/v1/customer_usage_types',
      getAction(ctx, customerUsageTypeHandlers.handleGetAll))
    app.get('/v1/customer_usage_types/:id',
      getAction(ctx, customerUsageTypeHandlers.handleGetById))
    app.post('/v1/customer_usage_types',
      getAction(ctx, customerUsageTypeHandlers.handlePost))
    app.patch('/v1/customer_usage_types/:id',
      getAction(ctx, customerUsageTypeHandlers.handlePatch))
    app.delete('/v1/customer_usage_types/:id',
      getAction(ctx, customerUsageTypeHandlers.handleDelete))

    app.get('/v1/flags',
      getAction(ctx, flagHandlers.handleGetAll))
    app.get('/v1/flags/:id',
      getAction(ctx, flagHandlers.handleGetById))

    app.get('/v1/menu_permitted_actions',
      getAction(ctx, menuPermittedActionHandlers.handleGetAll))
    app.get('/v1/menu_permitted_actions/:id',
      getAction(ctx, menuPermittedActionHandlers.handleGetById))

    app.get('/v1/headquarters',
      getAction(ctx, headquarterHandlers.handleGetList))
    app.get('/v1/headquarters/:id',
      getAction(ctx, headquarterHandlers.handleGet))
    app.post('/v1/headquarters',
      getAction(ctx, headquarterHandlers.handlePost))
    app.patch('/v1/headquarters/:id',
      getAction(ctx, headquarterHandlers.handlePatch))
    app.delete('/v1/headquarters/:id',
      getAction(ctx, headquarterHandlers.handleDelete))

    app.get('/v1/regions',
      getAction(ctx, regionHandlers.handleGetList))
    app.get('/v1/regions/:id',
      getAction(ctx, regionHandlers.handleGet))
    app.post('/v1/regions',
      getAction(ctx, regionHandlers.handlePost))
    app.patch('/v1/regions/:id',
      getAction(ctx, regionHandlers.handlePatch))
    app.delete('/v1/regions/:id',
      getAction(ctx, regionHandlers.handleDelete))

    app.get('/v1/areas',
      getAction(ctx, areaHandlers.handleGetList))
    app.get('/v1/areas/:id',
      getAction(ctx, areaHandlers.handleGet))
    app.post('/v1/areas',
      getAction(ctx, areaHandlers.handlePost))
    app.patch('/v1/areas/:id',
      getAction(ctx, areaHandlers.handlePatch))
    app.delete('/v1/areas/:id',
      getAction(ctx, areaHandlers.handleDelete))

    app.get('/v1/states',
      getAction(ctx, stateHandlers.handleGetAll))
    app.get('/v1/states/:id',
      getAction(ctx, stateHandlers.handleGetById))
    app.post('/v1/states',
      getAction(ctx, stateHandlers.handlePost))
    app.patch('/v1/states/:id',
      getAction(ctx, stateHandlers.handlePatch))
    app.delete('/v1/states/:id',
      getAction(ctx, stateHandlers.handleDelete))

    app.get('/v1/transaction_media',
      getAction(ctx, transactionMediaHandlers.handleGetAll))
    app.get('/v1/transaction_media/:id',
      getAction(ctx, transactionMediaHandlers.handleGetById))

    app.get('/v1/transaction_methods',
      getAction(ctx, transactionMethodHandlers.handleGetAll))
    app.get('/v1/transaction_methods/:id',
      getAction(ctx, transactionMethodHandlers.handleGetById))

    app.get('/v1/transaction_situations',
      getAction(ctx, transactionSituationHandlers.handleGetAll))
    app.get('/v1/transaction_situations/:id',
      getAction(ctx, transactionSituationHandlers.handleGetById))

    app.get('/v1/transaction_type_grades',
      getAction(ctx, transactionTypeGradeHandlers.handleGetAll))
    app.get('/v1/transaction_type_grades/:id',
      getAction(ctx, transactionTypeGradeHandlers.handleGetById))

    app.get('/v1/transaction_types',
      getAction(ctx, transactionTypeHandlers.handleGetAll))
      
    app.get('/v1/transaction_types/:id',
      getAction(ctx, transactionTypeHandlers.handleGetById))

    app.get('/v1/report/transactions',
      getAction(ctx, transactionHandlers.handleGetAll))
    
    app.get('/v1/report/region_area_transactions',
      getAction(ctx, transactionHandlers.handleGetAll))
    
    app.get('/v1/report/customer_transactions',
      getAction(ctx, transactionHandlers.handleGetAll))

    //region transactions
    app.get('/v1/report/region_transactions',
        getAction(ctx, transactionHandlers.handleGetRegionAll))
    //area transactions
    app.get('/v1/report/area_transactions',
        getAction(ctx, transactionHandlers.handleGetAreaAll))
    app.get('/v1/report/region_transactions_turnover',
        getAction(ctx, transactionHandlers.handleGetRegionTurnOverAll))
    //area transactions
    app.get('/v1/report/area_transactions_turnover',
        getAction(ctx, transactionHandlers.handleGetAreaTurnOverAll))
    /**
     * Get System Summary EndPoint
     */
    app.get('/v1/report/system_summary',
        getAction(ctx, transactionHandlers.handleGetSystemSummaryAll))

    // Checks if transaction exists
    app.get('/v1/report/check_transaction',
        getAction(ctx, transactionHandlers.handleCheckIfTransactionExists))
    app.get('/v1/report/revered_transactions',
        getAction(ctx, transactionHandlers.handleGetReversedTransactions))
    app.get('/v1/report/invalid_transactions',
        getAction(ctx, transactionHandlers.handleGetInvalidTransactions))

    app.get('/v1/report/bank_account_list',
      getAction(ctx, bankAccountHandlers.handleGetAll))

    app.get('/v1/report/bank_account_list',
      getAction(ctx, bankAccountHandlers.handleGetAll))

    app.get('/v1/report/region_accounts',
      getAction(ctx, regionArea.handleGetList))

    app.get('/v1/report/area_accounts',
      getAction(ctx, regionArea.handleGetListArea))

    app.get('/v1/report/transactions/:id',
      getAction(ctx, transactionHandlers.handleGetById))

    app.get('/v1/user_genders',
      getAction(ctx, userGenderHandlers.handleGetAll))
      
    app.get('/v1/user_genders/:id',
      getAction(ctx, userGenderHandlers.handleGetById))

    app.get('/v1/user_levels',
      getAction(ctx, userLevelHandlers.handleGetAll))
    app.get('/v1/user_levels/:id',
      getAction(ctx, userLevelHandlers.handleGetById))

    app.get('/v1/user_situations',
      getAction(ctx, userSituationHandlers.handleGetAll))
    app.get('/v1/user_situations/:id',
      getAction(ctx, userSituationHandlers.handleGetById))

    // Add by voltan
    app.get('/v1/chart_aria_deposit_funds', getAction(ctx, chartAriaDepositFunds.getChart))

  }

  /**
   *
   * @param {express.application} app
   * @param {Context} ctx
   * @returns {Promise<void>}
   */
  bindBackHandlers (app, ctx) {
    app.use(getErrorMiddleware(ctx))
  }
}

module.exports = {
  Configuration,
}
