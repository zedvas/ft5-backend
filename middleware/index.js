const asyncMySQL = require("../mysql/connection");
const { checkToken } = require("../mysql/queries");
let todos = require("../todos.json");

const users = [];

const attachTodos = (req, res, next) => {
  req.todos = todos;
  next();
};

const attachUsers = (req, res, next) => {
  req.users = users;
  next();
};

const validateToken = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    res.send("No token");
    return;
  }

  try {
    const results = await asyncMySQL(checkToken(token));

    if (!results.length) {
      throw new Error("Invalid token");
    } else {
        req.authedUser = results[0].user_id
        next();
    }
  } catch (e) {
    res.send(e.message);
    return;
  }
};

module.exports = { attachTodos, attachUsers, validateToken };
