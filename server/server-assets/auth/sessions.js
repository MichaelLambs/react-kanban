var expressSession = require("express-session")
var mongoStore = require("connect-mongodb-session")(expressSession)

// THIS IS WHERE SESSIONS ARE BEING HELD WITHIN SERVER
var store = new mongoStore({
   uri: "mongodb://kanban:kanban@ds012578.mlab.com:12578/vue-kanban",
   collection: "Sessions"
});

// IF THERE IS AN ERROR GETTING THE SESSION
store.on("error", function(err) {
   console.log("[SESSION ERROR]", err);
})

// SESSION CONSTRUCTOR/GUIDELINE
//@tsignore
var session = expressSession({
    secret: "movieiohqegnakdljv",
    cookie: {
       maxAge: (1000 * 60 * 60 * 24 * 7) * 52 // HOW LONG UNTIL NEED TO RE-LOGIN
   },
   store, // PUTTING ON MONGO SERVER VIA URI
   resave: true,
   saveUninitialized: true
})

module.exports = session;