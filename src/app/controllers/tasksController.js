import { Router } from 'express';
import tasks from '@/app/schemas/tasks';

const router = new Router();

//get all tasks
router.get('/', (req, res) => {

    tasks.find()
        .then(data => { 
            const tasks = data.map(task => {
                return {description: task.description, deadline: task.deadline, done: task.done };
            });
            res.send(tasks);
        })
        .catch(error => {
            console.error('Error trying to get all tasks from the database', error);
            res.status(400).send({
                error: "It wasn't possible to get all tasks. Please, try again!",
            });
        })
});

//get one specific task
router.get('/:taskId', (req, res) => { 

    tasks.findOne({id: req.params.taskId})
        .then(task => {
            res.send(task);
        })
        .catch(error => {
            console.error('Error trying to get task from the database', error);
            res.status(400).send({
                error: "It wasn't possible to get task. Please, try again!",
            });
        })
});


//Create a new task
router.post('/', (req, res) => {

    const { description, deadline, done } = req.body;

    tasks.create({ description, deadline, done })
        .then(task => { res.status(200).send(task) })
        .catch(error => {
            console.error('Error trying to save new task to database', error);
            res.status(400).send({
                error: "It wasn't possible to save your task. Please, verify your data and try again!",
            });
        })
});

//Update task by id
router.put('/:taskId', (req, res) => {

    const { description, deadline, done } = req.body;

    tasks.findByIdAndUpdate(req.params.taskId, { description, deadline, done }, { new: true})
        .then(task => { res.status(200).send(task) })
        .catch(error => {
            console.error('Error trying to update task in database', error);
            res.status(400).send({
                error: "It wasn't possible to update your task. Please, verify your data and try again!",
            });
        })
});

//Delete task by id
router.delete('/:taskId', (req, res) => {
    tasks.findByIdAndRemove(req.params.taskId)
        .then(() => {
        res.send({message: 'task removed successfully!'});
        })
        .catch(error => {
            console.error('Error removing task from database.', error);
            res.status(400).send({ message: 'Error removing task from database. Please, try again!' });
        });
});

export default router;