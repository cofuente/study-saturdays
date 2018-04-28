const router = require('express').Router()
const Student = require('../db/models/student')

router.get('/', function(req, res, next) {
  Student.findAll({}) //<----the promise, a function, takes in anempty object
    .then(allStudents => {
      res.send(allStudents)
    })
    .catch(next) //<---error catching with nextpassed in
})

module.exports = router
