// Write your "projects" router here!
const express = require('express')

const { 
    validateProjectId, 
    validateProject 
} = require("./projects-middleware");

const Projects = require('./projects-model')

const router = express.Router()

router.get('/:id/actions', validateProjectId, (req, res, next) => {
    Projects.getProjectActions(req.params.id)
    .then(actions => {
        if(!actions) {
            res.status(400).json(actions)
        } else {
            res.status(200).json(actions)
        }
    })
    .catch(next)
})

router.delete('/:id', validateProjectId, (req, res, next) => {
   Projects.remove(req.params.id)
   .then(projects => {
       res.status(200).json(projects)
   })
   .catch(next)
})

router.put('/:id', validateProjectId, validateProject, (req, res, next) => {
    Projects.update(req.params.id, req.body)
    .then(() => {
        return Projects.get(req.params.id)
    })
    .then(project => {
        res.json(project)
    })
    .catch(next)
})

router.post('/', validateProject, (req, res, next) => {
    const project = req.body
    Projects.insert(project)
        .then(newProject => {
            res.status(201).json(newProject)
        })
        .catch(error => {
            next(error)
        })
})

router.get('/', (req, res) => {
    Projects.get()
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(err => {
        res.status(500).json({
            message: 'error getting projects',
            err: err.message,
            stack: err.stack
        })
    })
})

router.get('/:id', validateProjectId, (req, res, next) => {
    Projects.get(req.params.id)
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(next)
})

module.exports = router 