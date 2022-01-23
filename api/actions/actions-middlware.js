// add middlewares here related to actions
const Actions = require('./actions-model')

async function validateActionId(req, res, next){
    try{
        const action = await Actions.get(req.params.id)
        if(!action){
            res.status(404).json({
                message: 'No actions matching that ID'
            })
        }else{
            req.action = action
            next()
        }
    }catch(err){
        res.status(500).json({
            message: 'Action not found'
        })
    }
}

async function validateAction(req, res, next){
    const {description, notes, completed} = req.body
    const action_id = await Actions.get(req.params.id)
    if(!action_id){
        res.status(400).json({
            message: 'Action ID is required'
        })
    }else if(!notes || !notes.trim()){
        res.status(400).json({
            message: 'Notes field is required'
        })
    }else if(!description || !description.trim()){
        res.status(400).json({
            message: 'Description field is required'
        })
    }else{
        req.action_id = action_id
        req.description = description.trim()
        req.notes = notes.trim()
        req.completed = completed
        next()
    }
}

const validatePost = (req, res, next) => {
    const {project_id, description, notes, completed} = req.body
    if(!project_id){
        res.status(400).json({
            message: 'Project ID is required'
        })
    }else if(!notes || !notes.trim()){
        res.status(400).json({
            message: 'Notes field is required'
        })
    }else if(!description || !description.trim()){
        res.status(400).json({
            message: 'Description field is required'
        })
    }else{
        req.project_id = project_id
        req.description = description.trim()
        req.notes = notes.trim()
        req.completed = completed
        next()
    }
}

module.exports = { validateAction, validateActionId, validatePost }