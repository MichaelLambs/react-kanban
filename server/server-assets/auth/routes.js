var router = require("express").Router();
var Users = require("../models/user"); //empty right now

var errorMessage = { error: "Not Right Meow Bro" };

// REGISTER NEW USER
router.post('/auth/register', (req, res) => {
   req.body.password = Users.generateHash(req.body.password)
   Users.create(req.body)
       .then(user => {
           if (!user) {
               return res.status(401).send(errorMessage)
           }
           user.password = null; // RETURNS NULL TO FRONT END NO HACKING
           req.session.uid = user._id // MATCHES SESSION ID WITH MONGO ID (HOLDING HANDS)
           console.log("Succesfully Registered")
           return res.send({ message: "Successfully created user", user })
       })
       .catch(err => res.status(401).send(errorMessage))
})

// LOGIN USER
router.post("/auth/login", (req, res) => {
   Users.findOne({ email: req.body.email }).then(user => {
       if (!user) {
           return res.status(401).send(errorMessage);
       }
       if (!user.validatePassword(req.body.password)) {
           return res.status(401).send(errorMessage);
       }
       user.password = null;
       req.session.uid = user._id;
       return res.send({ message: "Successfully logged in", user });
   });
});

router.get('/auth/authenticate', (req, res) => {
   Users.findById(req.session.uid)
       .then(user => {
           if (!user) {
               return res.status(401).send({ error: "Please Login to Continue" })
           }
           user.password = null;
           return res.status(200).send(user)
       })
       .catch(err => {
           return res.status(500).send({
               error: err
           })
       });
});

router.delete('/auth/logout', (req, res) => {
   req.session.destroy();
   res.send("Successfully logged out");
});

module.exports = router;