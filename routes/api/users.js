const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

//Load User Model
const User = require("../../models/User");

//test route
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

//registraction route start here

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //Size OF Image
        r: "pg", //Ratting
        d: "mm" //Default
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar
      });

      //Password Encription Start here
      //   bcrypt.genSalt(10, (err, salt) => {
      //     bcrypt.hash(newUser.password, salt, (err, hash) => {
      //       if (err) throw err;
      //       newUser.password = hash;
      //       newUser
      //         .save()
      //         .then(user => res.json(user))
      //         .catch(err => console.log(err));
      //     });
      //   });
    }
  });
});
module.exports = router;
