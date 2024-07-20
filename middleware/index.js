let todos = require("../todos.json");

function attachTodos (req,res,next) {
    req.todos = todos;
    next();
    }

    module.exports = {attachTodos}