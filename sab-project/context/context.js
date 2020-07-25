const { Sequelize, Model } = require("sequelize")
const { Config } = require("../utils/config")
const { Logger } = require("../utils/logger")
const { ErrorHandler } = require("../utils/error_handler")
const { AutomatedTransactionTypeRepository } = require("../modules/oil/repository/automated_transaction_type")
const { BankAccountFinancialTypeRepository } = require("../modules/oil/repository/bank_account_financial_type")
const { BankAccountTypeRepository } = require("../modules/oil/repository/bank_account_type")
const { BankAccountRepository } = require("../modules/oil/repository/bank_account")
const { BankRepository } = require("../modules/oil/repository/bank")
const { CityRepository } = require("../modules/oil/repository/city")
const { CountryRepository } = require("../modules/oil/repository/country")
const { CustomerConcessionaireRepository } = require("../modules/oil/repository/customer_concessionaire")
const { CustomerContractorRepository } = require("../modules/oil/repository/customer_contractor")
const { CustomerExtraInfoRepository } = require("../modules/oil/repository/customer_extra_info")
const { CustomerGroupRepository } = require("../modules/oil/repository/customer_group")
const { CustomerSupplyChannelRepository } = require("../modules/oil/repository/customer_supply_channel")
const { CustomerTypeRepository } = require("../modules/oil/repository/customer_type")
const { CustomerUsageTypeRepository } = require("../modules/oil/repository/customer_usage_type")
const { CustomerRepository } = require("../modules/oil/repository/customer")
const { FlagRepository } = require("../modules/oil/repository/flag")
const { MenuPermittedActionRepository } = require("../modules/oil/repository/menu_permitted_action")
const { OilChartStructureRepository } = require("../modules/oil/repository/oil_chart_structure")
const { StateRepository } = require("../modules/oil/repository/state")
const { TransactionMediaRepository } = require("../modules/oil/repository/transaction_media")
const { TransactionMethodRepository } = require("../modules/oil/repository/transaction_method")
const { TransactionSituationRepository } = require("../modules/oil/repository/transaction_situation")
const { TransactionSourceRepository } = require("../modules/oil/repository/transaction_source")
const { TransactionTypeGradeRepository } = require("../modules/oil/repository/transaction_type_grade")
const { TransactionTypeRepository } = require("../modules/oil/repository/transaction_type")
const { TransactionRepository } = require("../modules/oil/repository/transaction")
const { UserGenderRepository } = require("../modules/oil/repository/user_gender")
const { UserLevelRepository } = require("../modules/oil/repository/user_level")
const { UserRoleRepository } = require("../modules/oil/repository/user_role")
const { UserSituationRepository } = require("../modules/oil/repository/user_situation")
const { UserRepository } = require("../modules/oil/repository/user")
const { RoleListRepository } = require("../modules/oil/repository/role_list")
const { AreaService } = require("../modules/oil/service/area")
const { AutomatedTransactionTypeService } = require("../modules/oil/service/automated_transaction_type")
const { BankAccountFinancialTypeService } = require("../modules/oil/service/bank_account_financial_type")
const { BankAccountTypeService } = require("../modules/oil/service/bank_account_type")
const { BankAccountService } = require("../modules/oil/service/bank_account")
const { BankService } = require("../modules/oil/service/bank")
const { CityService } = require("../modules/oil/service/city")
const { CountryService } = require("../modules/oil/service/country")
const { CustomerContractorService } = require("../modules/oil/service/customer_contractor")
const { CustomerGroupService } = require("../modules/oil/service/customer_group")
const { CustomerSupplyChannelService } = require("../modules/oil/service/customer_supply_channel")
const { CustomerTypeService } = require("../modules/oil/service/customer_type")
const { CustomerUsageTypeService } = require("../modules/oil/service/customer_usage_type")
const { CustomerService } = require("../modules/oil/service/customer")
const { FlagService } = require("../modules/oil/service/flags")
const { HeadquarterService } = require("../modules/oil/service/headquarter")
const { MenuPermittedActionService } = require("../modules/oil/service/menu_permitted_action")
const { RegionService } = require("../modules/oil/service/region")
const { StateService } = require("../modules/oil/service/state")
const { TransactionMediaService } = require("../modules/oil/service/transaction_media")
const { TransactionMethodService } = require("../modules/oil/service/transaction_method")
const { TransactionSituationService } = require("../modules/oil/service/transaction_situation")
const { TransactionSourceService } = require("../modules/oil/service/transaction_source")
const { TransactionTypeGradeService } = require("../modules/oil/service/transaction_type_grade")
const { TransactionTypeService } = require("../modules/oil/service/transaction_type")
const { TransactionService } = require("../modules/oil/service/transaction")
const { UserGenderService } = require("../modules/oil/service/user_gender")
const { UserLevelService } = require("../modules/oil/service/user_level")
const { UserSituationService } = require("../modules/oil/service/user_situation")
const { UserService } = require("../modules/oil/service/user")
const { SequelizeOptionGenerator } = require("../utils/sequelize_option_generator")

/**
 * 
 */
class Context {

    /**
     * 
     * @returns {Promise<void>}
     */
    async init() {
        this.config = new Config()
        await this.config.init()
        this.logger = new Logger(this)
        this.errorHandler = new ErrorHandler(this)
        this.sequelizeClients = new Array()
        this.__initSequelizeClients()
        this.sequelizeModels = new Object()
        this.__importSequelizeModels()
        this.automatedTransactionTypeRepository = new AutomatedTransactionTypeRepository(this)
        this.bankAccountFinancialTypeRepository = new BankAccountFinancialTypeRepository(this)
        this.bankAccountTypeRepository = new BankAccountTypeRepository(this)
        this.bankAccountRepository = new BankAccountRepository(this)
        this.bankRepository = new BankRepository(this)
        this.cityRepository = new CityRepository(this)
        this.countryRepository = new CountryRepository(this)
        this.customerConcessionaireRepository = new CustomerConcessionaireRepository(this)
        this.customerContractorRepository = new CustomerContractorRepository(this)
        this.customerExtraInfoRepository = new CustomerExtraInfoRepository(this)
        this.customerGroupRepository = new CustomerGroupRepository(this)
        this.customerSupplyChannelRepository = new CustomerSupplyChannelRepository(this)
        this.customerTypeRepository = new CustomerTypeRepository(this)
        this.customerUsageTypeRepository = new CustomerUsageTypeRepository(this)
        this.customerRepository = new CustomerRepository(this)
        this.flagRepository = new FlagRepository(this)
        this.menuPermittedActionRepository = new MenuPermittedActionRepository(this)
        this.oilChartStructureRepository = new OilChartStructureRepository(this)
        this.stateRepository = new StateRepository(this)
        this.transactionMediaRepository = new TransactionMediaRepository(this)
        this.transactionMethodRepository = new TransactionMethodRepository(this)
        this.transactionSituationRepository = new TransactionSituationRepository(this)
        this.transactionSourceRepository = new TransactionSourceRepository(this)
        this.transactionTypeGradeRepository = new TransactionTypeGradeRepository(this)
        this.transactionTypeRepository = new TransactionTypeRepository(this)
        this.transactionRepository = new TransactionRepository(this)
        this.userGenderRepository = new UserGenderRepository(this)
        this.userLevelRepository = new UserLevelRepository(this)
        this.userRoleRepository = new UserRoleRepository(this)
        this.userSituationRepository = new UserSituationRepository(this)
        this.userRepository = new UserRepository(this)
        this.areaService = new AreaService(this)
        this.automatedTransactionTyeService = new AutomatedTransactionTypeService(this)
        this.bankAccountFinancialTypeService = new BankAccountFinancialTypeService(this)
        this.bankAccountTypeService = new BankAccountTypeService(this)
        this.bankAccountService = new BankAccountService(this)
        this.bankService = new BankService(this)
        this.cityService = new CityService(this)
        this.countryService = new CountryService(this)
        this.customerContractorService = new CustomerContractorService(this)
        this.customerGroupService = new CustomerGroupService(this)
        this.customerSupplyChannelService = new CustomerSupplyChannelService(this)
        this.customerTypeService = new CustomerTypeService(this)
        this.customerUsageTypeService = new CustomerUsageTypeService(this)
        this.customerService = new CustomerService(this)
        this.flagService = new FlagService(this)
        this.headquarterService = new HeadquarterService(this)
        this.menuPermittedActionService = new MenuPermittedActionService(this)
        this.regionService = new RegionService(this)
        this.stateService = new StateService(this)
        this.transactionMediaService = new TransactionMediaService(this)
        this.transactionMethodService = new TransactionMethodService(this)
        this.transactionSituationService = new TransactionSituationService(this)
        this.transactionSourceService = new TransactionSourceService(this)
        this.transactionTypeGradeService = new TransactionTypeGradeService(this)
        this.transactionTypeService = new TransactionTypeService(this)
        this.transactionService = new TransactionService(this)
        this.userGenderService = new UserGenderService(this)
        this.userLevelService = new UserLevelService(this)
        this.userSituationService = new UserSituationService(this)
        this.RoleListRepository = new RoleListRepository(this)
        this.userService = new UserService(this)
    }

    /**
     * 
     * @returns {void}
     */
    __initSequelizeClients() {
        this.config.getSequelizeConfig().clients.forEach(e => {
            this.sequelizeClients.push(new Sequelize(e.database, e.username, e.password, {
                host: e.host,
                port: e.port,
                dialect: e.dialect,
                pool: {
                    max: e.pool.max,
                    min: e.pool.min,
                    acquire: e.pool.acquire,
                    idle: e.pool.idle
                },
                define: {
                    underscored: e.define.underscored,
                    syncOnAssociation: e.define.syncOnAssociation,
                    charset: e.define.charset,
                    collate: e.define.collate,
                    timestamps: e.define.timestamps
                }
            }))
        })
    }

    /**
     * 
     * @returns {void}
     */
    __importSequelizeModels() {
        this.sequelizeModels = db.mysql
    }

    /**
     * 
     * @returns {Config}
     */
    getConfig() {
        return this.config
    }

    /**
     * 
     * @param {number} index 
     * @returns {Sequelize}
     */
    getSequelizeClient(index = 0) {
        this.sequelizeClients(index)
    }

    /**
     * 
     * @param {string} name 
     * @returns {Model}
     */
    getSequelizeModel(name) {
        return this.sequelizeModels[name]
    }

    /**
     * 
     * @returns {Logger} 
     */
    getLogger() {
        return this.logger
    }

    /**
     * 
     * @returns {ErrorHandler}
     */
    getErrorHandler() {
        return this.errorHandler
    }

    /**
     * 
     * @returns {AutomatedTransactionTypeRepository}
     */
    getAutomatedTransactionTypeRepository() {
        return this.automatedTransactionTypeRepository
    }

    /**
     * 
     * @returns {BankAccountFinancialTypeRepository}
     */
    getBankAccountFinancialTypeRepository() {
        return this.bankAccountFinancialTypeRepository
    }

    /**
     * 
     * @returns {BankAccountTypeRepository}
     */
    getBankAccountTypeRepository() {
        return this.bankAccountTypeRepository
    }

    /**
     * 
     * @returns {BankAccountRepository}
     */
    getBankAccountRepository() {
        return this.bankAccountRepository
    }

    /**
     * 
     * @returns {BankRepository}
     */
    getBankRepository() {
        return this.bankRepository
    }

    /**
     * 
     * @returns {CityRepository}
     */
    getCityRepository() {
        return this.cityRepository
    }

    /**
     * 
     * @returns {CountryRepository}
     */
    getCountryRepository() {
        return this.countryRepository
    }

    /**
     * 
     * @returns {CustomerConcessionaireRepository}
     */
    getCustomerConcessionaireRepository() {
        return this.customerConcessionaireRepository
    }

    /**
     * 
     * @returns {CustomerContractorRepository}
     */
    getCustomerContractorRepository() {
        return this.customerContractorRepository
    }

    /**
     * 
     * @returns {CustomerExtraInfoRepository}
     */
    getCustomerExtraInfoRepository() {
        return this.customerExtraInfoRepository
    }

    /**
     * 
     * @returns {CustomerGroupRepository}
     */
    getCustomerGroupRepository() {
        return this.customerGroupRepository
    }

    /**
     * 
     * @returns {CustomerSupplyChannelRepository}
     */
    getCustomerSupplyChannelRepository() {
        return this.customerSupplyChannelRepository
    }

    /**
     * 
     * @returns {CustomerTypeRepository}
     */
    getCustomerTypeRepository() {
        return this.customerTypeRepository
    }

    /**
     * 
     * @returns {CustomerUsageTypeRepository}
     */
    getCustomerUsageTypeRepository() {
        return this.customerUsageTypeRepository
    }

    /**
     * 
     * @returns {CustomerRepository}
     */
    getCustomerRepository() {
        return this.customerRepository
    }

    /**
     * 
     * @returns {FlagRepository}
     */
    getFlagRepository() {
        return this.flagRepository
    }

    /**
     * 
     * @returns {MenuPermittedActionRepository}
     */
    getMenuPermittedActionRepository() {
        return this.menuPermittedActionRepository
    }

    /**
     * 
     * @returns {OilChartStructureRepository}
     */
    getOilChartStructureRepository() {
        return this.oilChartStructureRepository
    }

    /**
     * 
     * @returns {StateRepository}
     */
    getStateRepository() {
        return this.stateRepository
    }

    /**
     * 
     * @returns {TransactionMediaRepository}
     */
    getTransactionMediaRepository() {
        return this.transactionMediaRepository
    }

    /**
     * 
     * @returns {TransactionMethodRepository}
     */
    getTransactionMethodRepository() {
        return this.transactionMethodRepository
    }

    /**
     * 
     * @returns {TransactionSituationRepository}
     */
    getTransactionSituationRepository() {
        return this.transactionSituationRepository
    }

    /**
     * 
     * @returns {TransactionSourceRepository}
     */
    getTransactionSourceRepository() {
        return this.transactionSourceRepository
    }

    /**
     * 
     * @returns {TransactionTypeGradeRepository}
     */
    getTransactionTypeGradeRepository() {
        return this.transactionTypeGradeRepository
    }
    /**
     *
     * @returns {RoleListRepository}
     */
    getRoleListRepository() {
        return this.RoleListRepository
    }

    getRegionAreaAccountsRepository(){
        return this.regionAreaAccountsRepository
    }

    getRegionAreaAccountsService(){
        return this.regionAreaAccountsService
    }
    /**
     * 
     * @returns {TransactionTypeRepository}
     */
    getTransactionTypeRepository() {
        return this.transactionTypeRepository
    }

    /**
     * 
     * @returns {TransactionRepository}
     */
    getTransactionRepository() {
        return this.transactionRepository
    }

    /**
     * 
     * @returns {UserGenderRepository}
     */
    getUserGenderRepository() {
        return this.userGenderRepository
    }

    /**
     * 
     * @returns {UserLevelRepository}
     */
    getUserLevelRepository() {
        return this.userLevelRepository
    }

    /**
     *
     * @returns {UserLevelRepository}
     */
    getUserRoleRepository() {
        return this.userRoleRepository
    }

    /**
     * 
     * @returns {UserSituationRepository}
     */
    getUserSituationRepository() {
        return this.userSituationRepository
    }

    /**
     * 
     * @returns {UserRepository}
     */
    getUserRepository() {
        return this.userRepository
    }

    /**
     * 
     * @returns {AreaService}
     */
    getAreaService() {
        return this.areaService
    }

    /**
     * 
     * @returns {AutomatedTransactionTypeService}
     */
    getAutomatedTransactionTypeService() {
        return this.automatedTransactionTyeService
    }

    /**
     * 
     * @returns {BankAccountFinancialTypeService}
     */
    getBankAccountFinancialTypeService() {
        return this.bankAccountFinancialTypeService
    }

    /**
     * 
     * @returns {BankAccountTypeService}
     */
    getBankAccountTypeService() {
        return this.bankAccountTypeService
    }

    /**
     * 
     * @returns {BankAccountService}
     */
    getBankAccountService() {
        return this.bankAccountService
    }

    /**
     * 
     * @returns {BankService}
     */
    getBankService() {
        return this.bankService
    }

    /**
     * 
     * @returns {CityService}
     */
    getCityService() {
        return this.cityService
    }

    /**
     * 
     * @returns {CountryService}
     */
    getCountryService() {
        return this.countryService
    }

    /**
     * 
     * @returns {CustomerContractorService}
     */
    getCustomerContractorService() {
        return this.customerContractorService
    }

    /**
     * 
     * @returns {CustomerGroupService}
     */
    getCustomerGroupService() {
        return this.customerGroupService
    }

    /**
     * 
     * @returns {CustomerSupplyChannelService}
     */
    getCustomerSupplyChannelService() {
        return this.customerSupplyChannelService
    }

    /**
     * 
     * @returns {CustomerTypeService}
     */
    getCustomerTypeService() {
        return this.customerTypeService
    }

    /**
     * 
     * @returns {CustomerUsageTypeService}
     */
    getCustomerUsageTypeService() {
        return this.customerUsageTypeService
    }

    /**
     * 
     * @returns {CustomerService}
     */
    getCustomerService() {
        return this.customerService
    }

    /**
     * 
     * @returns {FlagService}
     */
    getFlagService() {
        return this.flagService
    }

    /**
     * 
     * @returns {HeadquarterService}
     */
    getHeadquarterService() {
        return this.headquarterService
    }

    /**
     * 
     * @returns {MenuPermittedActionService}
     */
    getMenuPermittedActionService() {
        return this.menuPermittedActionService
    }

    /**
     * 
     * @returns {RegionService}
     */
    getRegionService() {
        return this.regionService
    }

    /**
     * 
     * @returns {StateService}
     */
    getStateService() {
        return this.stateService
    }

    /**
     * 
     * @returns {TransactionMediaService}
     */
    getTransactionMediaService() {
        return this.transactionMediaService
    }

    /**
     * 
     * @returns {TransactionMethodService}
     */
    getTransactionMethodService() {
        return this.transactionMethodService
    }

    /**
     * 
     * @returns {TransactionSituationService}
     */
    getTransactionSituationService() {
        return this.transactionSituationService
    }

    /**
     * 
     * @returns {TransactionSourceService}
     */
    getTransactionSourceService() {
        return this.transactionSourceService
    }

    /**
     * 
     * @returns {TransactionTypeGradeService}
     */
    getTransactionTypeGradeService() {
        return this.transactionTypeGradeService
    }

    /**
     * 
     * @returns {TransactionTypeService}
     */
    getTransactionTypeService() {
        return this.transactionTypeService
    }

    /**
     * 
     * @returns {TransactionService}
     */
    getTransactionService() {
        return this.transactionService
    }

    /**
     * 
     * @returns {UserGenderService}
     */
    getUserGenderService() {
        return this.userGenderService
    }

    /**
     * 
     * @returns {UserLevelService}
     */
    getUserLevelService() {
        return this.userLevelService
    }

    /**
     * 
     * @returns {UserSituationService}
     */
    getUserSituationService() {
        return this.userSituationService
    }

    /**
     * 
     * @return {UserService}
     */
    getUserService() {
        return this.userService
    }


    /**
     * 
     * @param {express.Request} req 
     * @returns {OptionsGenerator}
     */
    newOptionsGenerator(req) {
        return new SequelizeOptionGenerator(req)
    }
}

module.exports = {
    Context
}
