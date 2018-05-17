var router = require('express').Router();
var Boards = require('../models/board');
var Users = require('../models/user');

var sortId = 0;

// GET ALL BOARDS BY USER
router.get('/api/boards', (req, res, next) => {
    Boards.find({ userId: req.session.uid }) // FINDS BOARDS TIED TO userId BY SETTING IT TO SESSION ID
        .then(boards => {
            res.send(boards);
        })
        .catch(next);
});

// GET BOARD BY BOARD ID
router.get('/api/boards/:boardId', (req, res, next) => {
    Boards.findById(req.params.boardId) // FINDS BOARDS TIED TO userId BY SETTING IT TO SESSION ID
        .then(board => {
            res.send(board);
        })
        .catch(next);
});   

router.post('/api/boards', (req, res, next) => {
    req.body.userId = req.session.uid //GIVES BOARD USER ID
    Users.findById(req.session.uid)
        .then(user => {
            req.body.user = user.username
            Boards.create(req.body)
                .then(board => {
                    res.send(board);
                })
                .catch(next)
        })
        .catch(next);
});

router.put('/api/boards/:boardId', (req, res, next) => {

   Boards.findByIdAndUpdate(
       req.params.boardId,
       req.body,
       { new: true },
       (err, log) => {
            if(err) return res.status(500).send(err);
            return res.send(log);
       })
       .catch(next);
});

router.delete('/api/boards/:boardId', (req, res, next) => {
   Boards.findById(req.params.boardId)
       .then(board => {
           board.remove();
           return res.send('Deleted Board!');
       })
       .catch(next);
});



module.exports = router;