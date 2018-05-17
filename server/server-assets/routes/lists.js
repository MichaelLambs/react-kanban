var router = require('express').Router();
var Boards = require('../models/board');
var Lists = require('../models/list');

// GET ALL LISTS BY BOARD
router.get('/api/boards/:boardId/lists', (req, res, next) => {
    Lists.find({ boardId: req.params.boardId }) // FINDS LISTS BY BOARDId
        .then(lists => {
            res.send(lists);
        })
        .catch(next);
});
// Boards.find({ userId: req.session.uid })
router.post('/api/boards/:theboardId/lists', (req, res, next) => {
    req.body.boardId = req.params.theboardId;
    // req.body.name = req.params.nam
    Lists.create(req.body)
        .then(list => {
            res.send(list);
        })
        .catch(next)
});

router.put('/api/boards/:boardId/lists/:listId', (req, res, next) => {
    Lists.findByIdAndUpdate(
        req.params.listId,
        req.body,
        { new: true },
        (err, log) => {
            if (err) return res.status(500).send(err);
            return res.send(log);
        })
        .catch(next);
});

router.delete('/api/boards/:boardId/lists/:listId', (req, res, next) => {
    Lists.findById(req.params.listId)
    .then(list => {
        list.remove();
        return res.send(list.boardId);
    })
    .catch(next);
});


module.exports = router;