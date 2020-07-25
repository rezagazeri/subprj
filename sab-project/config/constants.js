const path = require('path')

module.exports = {
  inArray: (element, array) => {
    let length = array.length
    for (let i = 0; i < length; i++) {
      if (array[i] === element) return true
    }
    return false
  },
  env: {
    current: process.env.NODE_ENV || 'development',
    development: 'development',
    production: 'production',
  },
  redis: {
    prefix: 'sup_',
    list: {
      direction: {
        right: 'right',
        left: 'left',
      },
    },
  },
  behdad: {
    account: {
      wsdl: () => {
        if (constants.env.current === constants.env.production) {
          return path.join(__dirname, 'behdad', 'accountservice', 'accountservice.xml')
        } else {
          return 'https://85.133.186.11:8324/behdad/accountservice?wsdl'
        }
      },
      namespace: 'com.misc.bis.behdad.service',
      certificate: () => {
        if (constants.env.current === constants.env.production) {
          return {
            file: path.join(__dirname, 'behdad', 'certificate.pfx'),
            password: 'ShSoftco',
          }
        } else {
          return false
        }
      },
      logFolder: path.join(__dirname, 'behdad', 'logs'),
    },
    identifier: {
      // wsdl: 'https://85.133.186.11:8324/behdad/identifierservice?wsdl',
      wsdl: () => {
        if (constants.env.current === constants.env.production) {
          return path.join(__dirname, 'behdad', 'identifierservice', 'identifierservice.xml')
        } else {
          return 'https://85.133.186.11:8324/behdad/identifierservice?wsdl'
        }
      },
      namespace: 'com.misc.bis.behdad.service',
      certificate: () => {
        if (constants.env.current === constants.env.production) {
          return {
            file: path.join(__dirname, 'behdad', 'certificate.pfx'),
            password: 'ShSoftco',
          }
        } else {
          return false
        }
      },
      logFolder: path.join(__dirname, 'behdad', 'logs'),
      startDate: '2010-01-01 00:00:00',
      endDatePad: 1, //month
    },
    transaction: {
      redis: {
        list: {
          pending: 'transactions_pending_list',
          processed: 'transactions_processed_list',
        },
      },
      maxTransactionToInsert: 500,
      pageSize: 50,
      source: {
        behdad: 1,
      },
      method: {
        'General': {
          'key': 'General',
          'value': 1
        },
        'Fee': {
          'key': 'Fee',
          'value': 2
        },
        'Reversal': {
          'key': 'Reversal',
          'value': 3
        },
        'FeeReversal': {
          'key': 'FeeReversal',
          'value': 4
        },
        'ATM_Withdraw': {
          'key': 'ATM_Withdraw',
          'value': 5
        },
        'ATM_Payment': {
          'key': 'ATM_Payment',
          'value': 6
        },
        'ATM_Transfer': {
          'key': 'ATM_Transfer',
          'value': 7
        },
        'ATM_TeransferTo': {
          'key': 'ATM_TeransferTo',
          'value': 8
        },
        'ATM_TransferFrom': {
          'key': 'ATM_TransferFrom',
          'value': 9
        },
        'POS_Buy': {
          'key': 'POS_Buy',
          'value': 10
        },
        'POS_BillPayment': {
          'key': 'POS_BillPayment',
          'value': 11
        },
        'PinPad_Withdraw': {
          'key': 'PinPad_Withdraw',
          'value': 12
        },
        'PinPad_Transfer': {
          'key': 'PinPad_Transfer',
          'value': 13
        },
        'PinPad_TransferTo': {
          'key': 'PinPad_TransferTo',
          'value': 14
        },
        'PinPad_TransferFrom': {
          'key': 'PinPad_TransferFrom',
          'value': 15
        },
        'Internet_Buy': {
          'key': 'Internet_Buy',
          'value': 16
        },
        'Internet_BillPayment': {
          'key': 'Internet_BillPayment',
          'value': 17
        },
        'Internet_Transfer': {
          'key': 'Internet_Transfer',
          'value': 18
        },
        'Internet_TransferTo': {
          'key': 'Internet_TransferTo',
          'value': 19
        },
        'Internet_TransferFrom': {
          'key': 'Internet_TransferFrom',
          'value': 20
        },
        'VRU_BillPayment': {
          'key': 'VRU_BillPayment',
          'value': 21
        },
        'Mobile_Buy': {
          'key': 'Mobile_Buy',
          'value': 22
        },
        'Mobile_BillPayment': {
          'key': 'Mobile_BillPayment',
          'value': 23
        },
        'TransferFromRTGS': {
          'key': 'TransferFromRTGS',
          'value': 24
        },
        'TransferToRTGS': {
          'key': 'TransferToRTGS',
          'value': 25
        },
        'TransferFromACH': {
          'key': 'TransferFromACH',
          'value': 26
        },
        'TransferToACH': {
          'key': 'TransferToACH',
          'value': 27
        },
        'Incomming': {
          'key': 'Incomming',
          'value': 28
        },
        'Issue': {
          'key': 'Issue',
          'value': 29
        },
        'Salary': {
          'key': 'Salary',
          'value': 30
        },
        'Group_Deposit': {
          'key': 'Group_Deposit',
          'value': 31
        },
        'Group_Withdraw': {
          'key': 'Group_Withdraw',
          'value': 32
        },
        'WaterBill': {
          'key': 'WaterBill',
          'value': 33
        },
        'ElectricBill': {
          'key': 'ElectricBill',
          'value': 34
        },
        'GasBill': {
          'key': 'GasBill',
          'value': 35
        },
        'PhoneBill': {
          'key': 'PhoneBill',
          'value': 36
        },
        'MobileBill': {
          'key': 'MobileBill',
          'value': 37
        },
        'MunicipalityBill': {
          'key': 'MunicipalityBill',
          'value': 38
        },
        'TaxBill': {
          'key': 'TaxBill',
          'value': 39
        },
        'PoliceBill': {
          'key': 'PoliceBill',
          'value': 40
        },
      },
      media: {
        'CHQ': {
          'key': 'CHQ',
          'value': 1
        },
        'POR': {
          'key': 'POR',
          'value': 2
        },
        'PAY': {
          'key': 'PAY',
          'value': 3
        },
        'POG': {
          'key': 'POG',
          'value': 4
        },
        '10': {
          'key': '10',
          'value': 5
        },
        '11': {
          'key': '11',
          'value': 6
        },
        '12': {
          'key': '12',
          'value': 7
        },
        '13': {
          'key': '13',
          'value': 8
        },
        '14': {
          'key': '14',
          'value': 9
        },
        '15': {
          'key': '15',
          'value': 10
        },
        '16': {
          'key': '16',
          'value': 11
        },
        '17': {
          'key': '17',
          'value': 12
        },
        '18': {
          'key': '18',
          'value': 13
        },
        '19': {
          'key': '19',
          'value': 14
        },
        '20': {
          'key': '20',
          'value': 15
        },
        '21': {
          'key': '21',
          'value': 16
        },
        '22': {
          'key': '22',
          'value': 17
        },
        '51': {
          'key': '51',
          'value': 18
        },
        '52': {
          'key': '52',
          'value': 19
        },
        '53': {
          'key': '53',
          'value': 20
        },
        '54': {
          'key': '54',
          'value': 21
        },
        '55': {
          'key': '55',
          'value': 22
        },
        '56': {
          'key': '56',
          'value': 23
        },
        '57': {
          'key': '57',
          'value': 24
        },
        '58': {
          'key': '58',
          'value': 25
        },
        '59': {
          'key': '59',
          'value': 26
        },
        '60': {
          'key': '60',
          'value': 27
        },
        '61': {
          'key': '61',
          'value': 28
        },
        '62': {
          'key': '62',
          'value': 29
        },
        '63': {
          'key': '63',
          'value': 30
        },
        '64': {
          'key': '64',
          'value': 31
        },
        '65': {
          'key': '65',
          'value': 32
        },
        '66': {
          'key': '66',
          'value': 33
        },
        '67': {
          'key': '67',
          'value': 34
        },
        '69': {
          'key': '69',
          'value': 35
        },
        '70': {
          'key': '70',
          'value': 36
        },
        '73': {
          'key': '73',
          'value': 37
        },
        '75': {
          'key': '75',
          'value': 38
        },
        '78': {
          'key': '78',
          'value': 39
        },
        '95': {
          'key': '95',
          'value': 40
        },
        'SCP': {
          'key': 'SCP',
          'value': 41
        },
        'CHBRT': {
          'key': 'CHBRT',
          'value': 42
        },
        'CHF': {
          'key': 'CHF',
          'value': 43
        },
        'DPK': {
          'key': 'DPK',
          'value': 44
        },
        'BNC': {
          'key': 'BNC',
          'value': 45
        },
        'SYS': {
          'key': 'SYS',
          'value': 46
        },
        'BTM': {
          'key': 'BTM',
          'value': 47
        },
        'BPM': {
          'key': 'BPM',
          'value': 48
        },
        'BFE': {
          'key': 'BFE',
          'value': 49
        },
        'RBF': {
          'key': 'RBF',
          'value': 50
        },
        'RBP': {
          'key': 'RBP',
          'value': 51
        },
        'CHI': {
          'key': 'CHI',
          'value': 52
        },
        'CHM': {
          'key': 'CHM',
          'value': 53
        },
        'VAG': {
          'key': 'VAG',
          'value': 54
        },
        'ISS': {
          'key': 'ISS',
          'value': 55
        },
        'SPO': {
          'key': 'SPO',
          'value': 56
        },
        'ATC': {
          'key': 'ATC',
          'value': 57
        },
        'NAM': {
          'key': 'NAM',
          'value': 58
        },
        'SAN': {
          'key': 'SAN',
          'value': 59
        },
        'CRE': {
          'key': 'CRE',
          'value': 60
        },
      },
      situation: {
        'DON': {
          'key': 'DON',
          'value': 1
        },
        'PND': {
          'key': 'PND',
          'value': 2
        },
        'UPD': {
          'key': 'UPD',
          'value': 3
        },
        'EDP': {
          'key': 'EDP',
          'value': 4
        },
        'CNL': {
          'key': 'CNL',
          'value': 5
        },
      },
      typeGrade: {
        'MON': {
          'key': 'MON',
          'value': 1
        },
        'SBLC': {
          'key': 'SBLC',
          'value': 2
        },
        'UBLC': {
          'key': 'UBLC',
          'value': 3
        },
        'CRD': {
          'key': 'CRD',
          'value': 4
        },
      },
      type: {
        'CDP': {
          'key': 'CDP',
          'value': { 'id': 1, 'effect': 'increase' }
        },
        'DPS': {
          'key': 'DPS',
          'value': { 'id': 2, 'effect': 'increase' }
        },
        'RDP': {
          'key': 'RDP',
          'value': { 'id': 3, 'effect': 'increase' }
        },
        'CWT': {
          'key': 'CWT',
          'value': { 'id': 4, 'effect': 'decrease' }
        },
        'WTD': {
          'key': 'WTD',
          'value': { 'id': 5, 'effect': 'decrease' }
        },
        'RWD': {
          'key': 'RWD',
          'value': { 'id': 6, 'effect': 'decrease' }
        },
        'FEE': {
          'key': 'FEE',
          'value': { 'id': 7, 'effect': 'decrease' }
        },
        'SBLC': {
          'key': 'SBLC',
          'value': { 'id': 8, 'effect': 'decrease' }
        },
        'SUBL': {
          'key': 'SUBL',
          'value': { 'id': 9, 'effect': 'increase' }
        },
        'UBLC': {
          'key': 'UBLC',
          'value': { 'id': 10, 'effect': 'decrease' }
        },
        'UUBL': {
          'key': 'UUBL',
          'value': { 'id': 11, 'effect': 'increase' }
        },
        'ICC': {
          'key': 'ICC',
          'value': { 'id': 12, 'effect': 'increase' }
        },
        'DCC': {
          'key': 'DCC',
          'value': { 'id': 13, 'effect': 'decrease' }
        },
      },
    },
  },
  pagination: {
    defaults: {
      page: 1,
      pageSize: 10,
      order: 'id',
      orderType: 'desc',
    },
    orderTypes: ['acs', 'desc'],
  },
  logKeys: {
    dbError: 'dbError',
  },
  user: {
    auth: {
      preSalt: 'SUP+KbPeShV',
      postSalt: 'RgUkXp2sSUP',
      token: {
        s1: 'WmYq3t6w',
        s2: 'VkYp3s6v',
        s3: 'MbQeThWm',
        s4: 'jXn2r5u8',
        s5: 'bPdSgVkY',
        expirationDuration: 120,
      },
      openWebServices: [
        'post:/v1/user/login',
        'get:/v1/user/captcha',
        'get:/v1/user/password/forget',
        'get:/v1/behdad/test',
      ],
      noUpdateWebServices: [
        'post:/v1/user/update',
      ],
    },
    role: {
      level: {
        admin: 1,
        headquarter: 2,
        region: 3,
        area: 4,
      },
      access: {
        method: {
          get: 1,
          post: 2,
          patch: 3,
          delete: 4,
          options: 'options',
        },
      },
    },
    menu: {
      permittedAction: {
        view: 1,
        list: 1,
        create: 1,
        update: 1,
        delete: 1,
        activate: 1,
        deactivate: 1,
        changePassword: 1,
      },
    },
    situation: {
      pending: 1,
      accepted: 2,
      rejected: 3,
      blocked: 4,
      blackListed: 5,
    },
  },
  flags: {
    active: 1,
    deActive: 2,
    deleted: 3,
  },
  chartLevels: {
    levels: {
      headquarter: 0,
      region: 1,
      area: 2,
    },
  },
}