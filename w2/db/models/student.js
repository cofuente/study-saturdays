'use strict'

const Sequelize = require('sequelize')
const db = require('../db')

const Student = db.define('student', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  fullName: {
    type: Sequelize.VIRTUAL,
    get() {
      return (
        this.getDataValue('firstName') + ' ' + this.getDataValue('lastName')
      )
    }
  }
})

module.exports = Student

Student.beforeCreate(studentInstance => {
  studentInstance.firstName = properCapitalizationHelperFunc(
    studentInstance.firstName
  )
  studentInstance.lastName = properCapitalizationHelperFunc(
    studentInstance.lastName
  )
})

function properCapitalizationHelperFunc(str) {
  return str[0].toUpperCase() + str.slice(1).toLowerCase()
}
