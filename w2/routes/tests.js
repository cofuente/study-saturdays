const router = require('express').Router()
const Test = require('../db/models/test')
const Student = require('../db/models/student')

router.get('/', function(req, res, next) {
  Test.findAll({})
    .then(allTests => {
      res.send(allTests)
    })
    .catch(next)
})
//note: order of routes is important because if you accidentally go through the wrong route first it can f you up, namely the URI won't be able to tell the difference

router.get('/subject/:subject', function(req, res, next) {
  //   console.log('here s---->')
  let subject = req.params.subject
  Test.findBySubject(subject)
    .then(relevantTests => {
      res.send(relevantTests)
    })
    .catch(next)
})

router.get('/passing', function(req, res, next) {
  //   console.log('here p---->')
  Test.passing()
    .then(passingTests => {
      res.send(passingTests)
    })
    .catch(next)
})

router.get('/:id', function(req, res, next) {
  //   console.log('here i---->')
  Test.findById(req.params.id)
    .then(testSearched => {
      res.send(testSearched)
    })
    .catch(next)
})

router.post('/student/:studentId', function(req, res, next) {
  Test.create({
    subject: req.body.subject,
    grade: req.body.grade,
    studentId: req.params.studentId
  })
    .then(test => res.status(201).send(test))
    .catch(next)
})

router.delete('/:id', function(req, res, next) {
  Test.findById(Number(req.params.id))
    .then(test => test.destroy())
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
