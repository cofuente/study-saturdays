'use strict'
const Sequelize = require('sequelize')
const db = require('../db')
const Student = require('./student')

const Test = db.define('test', {
  subject: {
    type: Sequelize.STRING,
    allowNull: false
  },
  grade: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

Test.passing = function() {
  return this.findAll({
    where: {
      grade: {
        gt: 70
      }
    }
  })
}
Test.findBySubject = function(str) {
  return this.findAll({
    where: {
      subject: str
    }
  })
}

Test.belongsTo(Student)
module.exports = Test
