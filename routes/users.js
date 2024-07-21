const express = require("express");
const router = express.Router();
const createToken = require("../utils");
const joi = require("joi");
const sha256 = require("sha256");
require("dotenv").config();
const {
  getUsers,
  addUser,
  getUserID,
  addToken,
  addMessage,
} = require("../mysql/queries");
const asyncMySQL = require("../mysql/connection");

const userSchema = require("../validation/userSchema");
const messageSchema = require("../validation/messageSchema");

const { validateToken } = require("../middleware/index");

//get all users
router.get("/", async(req, res) => {
    const results = await asyncMySQL(getUsers())
  res.send(results);
});

//signup
router.post("/signup", async (req, res) => {
  const validateResult = userSchema.validate(req.body);

  if (validateResult.error) {
    res.send(`Invalid details. Error: ${validateResult.error.message}`);
    return;
  }

  req.body.password = sha256(process.env.SALT + req.body.password);

  try {
    const result = await asyncMySQL(addUser(req.body.email, req.body.password));
    res.send("User successfully added");
  } catch (e) {
    if (e.code === "ER_DUP_ENTRY") {
      res.send("User already exists");
      return;
    }
    console.log(e);
    res.send("Unknown error");
    return;
  }
});

//login
router.post("/login", async (req, res) => {
  const hashedReqBodyPassword = sha256(process.env.SALT + req.body.password);

  try {
    const results = await asyncMySQL(
      getUserID(req.body.email, hashedReqBodyPassword)
    );

    if (!results.length) {
      throw new Error("Invalid login details");
    } else {
      const token = createToken();
      await asyncMySQL(addToken(results[0].id, token));
      res.send(token);
      return;
    }
  } catch (e) {
    res.send(e);
  }
});

//access private route
router.get("/privateRoute", validateToken, (req, res) => {
  res.send(`in the private route for user ${req.authedUser}`);
});

//add messages to private route 
//---------------------------------DON'T KNOW IF THIS WILL WORK, CAN'T TEST AS MYSQL IS CRASHING ON XAMPP-----------------------------------
router.patch("/privateRoute", validateToken, async (req, res) => {
  const validateMessage = messageSchema.validate(req.body);

  if (validateMessage.error) {
    res.send(`Invalid details. Error: ${validateMessage.error.message}`);
    return;
  }

  await asyncMySQL(addMessage(req.authedUser, req.body));
  res.send("Message successfully added");
});

module.exports = router;
