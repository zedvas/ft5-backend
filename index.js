let todos = require("./todos.json");
const express = require("express");
const app = express();
const Joi = require("joi");

app.use(express.static("public"));
app.use(express.json());

const todoSchema = Joi.object({
  id: Joi.number().integer().min(0),
  todo: Joi.string().min(3).required(),
  completed: Joi.bool().required(),
  userId: Joi.number().integer().min(0).required(),
});

const port = process.env.PORT || 6001;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

//get all
app.get("/todos", (req, res) => {
  res.send(todos);
});

//get one
app.get("/todos/:id", (req, res) => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    res.send("Bad request");
    return;
  }

  if (id < 1) {
    res.status(404);
    res.send("ID must be a valid number");
    return;
  }

  const _todos = [...todos];
  const index = _todos.findIndex((todo) => {
    return Number(id) === todo.id;
  });

  if (index === -1) {
    res.send("ID does not exist");
    return;
  }

  res.send(_todos[index]);
});

//post one
app.post("/todos", (req, res) => {
  const { id } = req.body;

  const index = todos.findIndex((todo) => {
    return Number(id) === todo.id;
  });

  if (index !== -1) {
    res.send(
      "There is already a todo with this ID. Try a put request if you want to update it."
    );
    return;
  }

  const validateResult = todoSchema.validate(req.body);
  if (validateResult.error) {
    res.send(
      `Please check the request body. Error: ${validateResult.error.details[0].message}`
    );
    return;
  }
  todos.push(req.body);
  res.send(todos);
});

//update one
app.put("/todos/:id", (req, res) => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    res.send("Bad request");
    return;
  }

  if (id < 1) {
    res.status(404);
    res.send("ID must be a valid number");
    return;
  }

  const index = todos.findIndex((todo) => {
    return Number(id) === todo.id;
  });

  if (index === -1) {
    res.send("ID does not exist");
    return;
  }

  todos[index] = req.body;
  res.send(todos[index]);
});

//delete one
app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    res.send("Bad request");
    return;
  }

  if (id < 1) {
    res.status(404);
    res.send("ID must be a valid number");
    return;
  }

  const index = todos.findIndex((todo) => {
    return Number(id) === todo.id;
  });

  if (index === -1) {
    res.send("ID does not exist");
    return;
  }

  todos.splice(index, 1);
  res.send(todos);
});
