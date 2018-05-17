var router = require('express').Router();
var Lists = require('../models/list');
var Tasks = require('../models/task');

// GET ALL TASKS BY LIST
router.get('/api/boards/:boardId/lists/:listId/tasks', (req, res, next) => {
    Tasks.find({ listId: req.params.listId }) // FINDS TASK BY LISTid
        .then(tasks => {
            res.send(tasks);
        })
        .catch(next);
});
// Boards.find({ userId: req.session.uid })
router.post('/api/boards/:boardId/lists/:listId/tasks', (req, res, next) => {
    req.body.listId = req.params.listId;
    req.body.boardId = req.params.boardId;
    Tasks.create(req.body)
        .then(list => {
            res.send(list);
        })
        .catch(next)
});

router.put('/api/boards/:boardId/lists/:listId/tasks/:taskId', (req, res, next) => {
    Tasks.findByIdAndUpdate(
        req.params.taskId,
        req.body,
        { new: true },
        (err, log) => {
            if (err) return res.status(500).send(err);
            return res.send(log);
        })
        .catch(next);
});

router.delete('/api/boards/:boardId/lists/:listId/tasks/:taskId', (req, res, next) => {
    Tasks.findById(req.params.taskId)
    .then(task => {
        task.remove();
        return res.send({boardId: task.boardId, listId: task.listId});
    })
    .catch(next);
});


module.exports = router;