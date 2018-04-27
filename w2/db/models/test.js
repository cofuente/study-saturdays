'use strict';
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require('../db');
const Student = require('./student');

const Test = db.define();

module.exports = Test;
