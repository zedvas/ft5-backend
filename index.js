const express = require("express");
const app = express();
require("dotenv").config()

const {attachTodos, attachUsers} = require('./middleware/index')

app.use(express.static("public"));
app.use(express.json());

app.use('/todos', attachTodos)
app.use('/todos', require('./routes/todos'));

app.use('/users', attachUsers)
app.use('/users', require('./routes/users'));

const port = process.env.PORT || 6001;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

