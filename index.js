const express = require("express");
const app = express();
const {attachTodos} = require('./middleware/index')

app.use(express.static("public"));
app.use(express.json());

app.use('/todos', attachTodos)
app.use('/todos', require('./routes/todos'));

const port = process.env.PORT || 6001;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

