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

const validateToken = (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    res.send("No token");
    return;
  }
  
  const user = req.users.find((user) => {
    return user.tokens.includes(token);
  });

  if (!user) {
    res.send("Invalid token");
    return;
  }

  req.authedUser = user;
  next();
};

module.exports = { attachTodos, attachUsers, validateToken };
