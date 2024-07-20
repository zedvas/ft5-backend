let todos = require("./todos.json");
const express = require("express");
const app = express();

app.use(express.static("public"));
app.use(express.json());

function attachTodos (req,res,next) {
req.todos = todos;
next();
}

app.use('/todos', attachTodos)
app.use('/todos', require('./routes/todos'));

const port = process.env.PORT || 6001;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

