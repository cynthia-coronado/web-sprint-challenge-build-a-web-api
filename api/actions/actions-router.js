// Write your "actions" router here!
const express = require('express')

const {
    validatePost,
    validateActionId,
    validateAction,
  } = require("../actions/actions-middlware");

const Actions = require('./actions-model')

const router = express.Router()

router.delete('/:id', validateActionId, (req, res, next) => {
    Actions.remove(req.params.id)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(next)
})

router.put('/:id', validateActionId, validateAction, (req, res, next) => {
    console.log('Starting actions route PUT')
    Actions.update(req.params.id, req.body)
    .then(() => {
      return Actions.get(req.params.id)
    })
    .then(action => {
        console.log(action)
        res.json(action)
    })
    .catch(next);
})

router.post('/', validatePost, (req, res, next) => {
    const action = req.body
    Actions.insert(action)
    .then(newAction => {
        res.status(201).json(newAction)
    })
    .catch(error => {
        console.log(error);
        res.status(400).json({
          message: 'Error adding the action',
        })
      })
})

router.get('/:id', validateActionId, (req, res) => {
    res.status(200).json(req.action)
})

router.get('/', (req, res) => {
    Actions.get()
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(err => {
        res.status(500).json({
            message: 'Error getting actions',
            err: err.message,
            stack: err.stack,
        })
    })
})
module.exports = router