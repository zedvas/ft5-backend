const express = require("express");
const router = express.Router();
const createToken = require("../utils");
const joi = require("joi");

const userSchema = require("../validation/userSchema");
const messageSchema = require("../validation/messageSchema");

const { validateToken } = require("../middleware/index");

//get all users - testing purposes
router.get("/", (req, res) => {
  res.send(req.users);
});

//signup
router.post("/signup", (req, res) => {
  const validateResult = userSchema.validate(req.body);

  if (validateResult.error) {
    res.send(`Invalid details. Error: ${validateResult.error.message}`);
    return;
  }

  const index = req.users.findIndex(
    (user) => req.body.email.toLowerCase() === user.email.toLowerCase()
  );

  if (index === -1) {
    req.users.push(req.body);
    res.send(req.users);
    return;
  } else {
    res.send("user exists");
    return;
  }
});

//login
router.post("/login", (req, res) => {
  const index = req.users.findIndex(
    (user) =>
      req.body.email.toLowerCase() === user.email.toLowerCase() &&
      req.body.password === user.password
  );

  if (index === -1) {
    res.send("Invalid email/password combo");
    return;
  } else {
    //create token and attach to user, send back to them too
    const token = createToken();
    req.users[index].tokens
      ? req.users[index].tokens.push(token)
      : (req.users[index].tokens = [token]);

    res.send(`Logged in! Token: ${token}`);
    return;
  }
});

router.get("/privateRoute", validateToken, (req, res) => {
  res.send(`in the private route for user $${req.authedUser}`);
});

router.patch("/privateRoute", validateToken, (req, res) => {
    const validateMessage = messageSchema.validate(req.body);
    if (validateMessage.error) {
        res.send(`Invalid details. Error: ${validateMessage.error.message}`);
        return;
      }
      req.authedUser.messages ? req.authedUser.messages.push(req.body) : req.authedUser.messages = [req.body];
      res.send(req.authedUser)
});

module.exports = router;
