var mongoose = require("mongoose");

var connectionString = "mongodb://kanban:kanban@ds012578.mlab.com:12578/vue-kanban";
var connection = mongoose.connection;

mongoose.connect(connectionString);

connection.on("error", err => {
 console.error("mlab Error: ", err);
});

connection.once("open", () => {
 console.log("connected to MLAB BOOOOOOYYAAAAAAAAKAAAASHAAAAAAmeow");
});