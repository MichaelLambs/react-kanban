let express = require("express"),
bp = require("body-parser"),
cors = require("cors"),
server = express(),
session = require('./server-assets/auth/sessions')

// if spun on heroku, goes left, if spun locally, goes right
var port = process.env.PORT || 3000;
require("./server-assets/db/mlab-config");

let authRoutes = require('./server-assets/auth/routes'),
boardRoutes = require('./server-assets/routes/boards'),
listRoutes = require('./server-assets/routes/lists'),
taskRoutes = require('./server-assets/routes/tasks'),
commentRoutes = require('./server-assets/routes/comments')

var whitelist = ['http://localhost:3001', 'https://port-vue-kan-ban.herokuapp.com/']

var corsOptions = {
   origin: function(origin, callback){
       var originIsWhiteListed = whitelist.indexOf(origin) !== -1;
       callback(null, originIsWhiteListed);
   },
   credentials: true
}

server.use(cors(corsOptions))
server.use(session)
server.use(bp.json())
server.use(bp.urlencoded({ extended: true }))
server.use(express.static(__dirname + "/../public/www/dist"))

server.use(authRoutes);

server.use(boardRoutes);
server.use(listRoutes);
server.use(taskRoutes);
server.use(commentRoutes);


server.use("*", (error, req, res, next) => {
    res.status(400).send(error);
   });
   
   server.listen(port, () => {
    console.log("the server is running... Port:", port);
   });

