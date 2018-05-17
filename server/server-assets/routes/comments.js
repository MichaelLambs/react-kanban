var router = require('express').Router();
var Comments = require('../models/comment');
var Tasks = require('../models/task');

// GET ALL TASKS BY LIST
router.get('/api/boards/:boardId/lists/:listId/tasks/:taskId/comments', (req, res, next) => {
    Comments.find({ taskId: req.params.taskId }) // FINDS TASK BY LISTid
        .then(comment => {
            res.send(comment);
        })
        .catch(next);
});
// Boards.find({ userId: req.session.uid })
router.post('/api/boards/:boardId/lists/:listId/tasks/:taskId/comments', (req, res, next) => {
    req.body.taskId = req.params.taskId;
    req.body.listId = req.params.listId;
    req.body.boardId = req.params.boardId;
    Comments.create(req.body)
        .then(comment => {
            res.send(comment);
        })
        .catch(next)
});

router.put('/api/boards/:boardId/lists/:listId/tasks/:taskId/comments/:commentId', (req, res, next) => {
    Comments.findByIdAndUpdate(
        req.params.commentId,
        req.body,
        { new: true },
        (err, log) => {
            if (err) return res.status(500).send(err);
            return res.send(log);
        })
        .catch(next);
});

router.delete('/api/boards/:boardId/lists/:listId/tasks/:taskId/comments/:commentId', (req, res, next) => {
    Comments.findByIdAndRemove(req.params.commentId)
        .then(comment => {
            return res.send({boardId: comment.boardId, listId: comment.listId, taskId: comment.taskId})
        })
        .catch(next)
});


module.exports = router;