'use strict'

const Account = require('./models/account')  
const expect = require('chai').expect

describe('Account module', () => {  
  describe('"up"', () => {
    it('should export a function', () => {
      expect(Account.up).to.be.a('function')
    })
  })
})