const router = require('express').Router()
const Student = require('../db/models/student')

router.get('/', function(req, res, next) {
  Student.findAll({}) //<----the promise, a function, takes in an empty object
    .then(allStudents => {
      res.send(allStudents)
    })
    .catch(next) //<---error catching with nextpassed in
})

router.get('/:id', function(req, res, next) {
  Student.findById(req.params.id)
    .then(studentSearched => {
      //   console.log('here--->', Student.findById(req.params.id))
      if (!studentSearched) {
        res.status(404).send()
        //or altenatively do as below with additional middleware changes found in app.js
        //let err = new Error()
        //err.status = 404
        //next(err)
      } else {
        res.status(200).send(studentSearched)
      }
    })
    .catch(next)
})

router.post('/', function(req, res, next) {
  Student.create(req.body) //<----req.body keys must match model
    .then(newStudent => {
      res.send(newStudent)
    })
    .catch(next)
})

router.put('/:id', function(req, res, next) {
  Student.findById(Number(req.params.id)) //<----Number is coercing param, but not entirely necesarry because sequelize will do it for you, GOOD PRACTICE
    .then(student => student.update(req.body))
    .then(updatedStudent => res.status(201).send(updatedStudent))
    .catch(next)
})

router.delete('/:id', function(req, res, next) {
  Student.findById(Number(req.params.id))
    .then(student => student.destroy())
    .then(() => res.sendStatus(204))
    .catch(next)
})
module.exports = router
