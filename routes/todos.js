const express = require("express");
const router = express.Router();
const joi = require("joi");
const todoSchema = require('../validation/todoSchema')

// router.get('/', (req,res) => {
//     res.send("working")
// })

//get all
router.get("/", (req, res) => {
    res.send(req.todos);
  });
  
  //get one
  router.get("/:id", (req, res) => {
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
  
    const _todos = [...req.todos];
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
  router.post("/", (req, res) => {
    const { id } = req.body;
  
    const index = req.todos.findIndex((todo) => {
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
    req.todos.push(req.body);
    res.send(req.todos);
  });
  
  //update one
  router.put("/:id", (req, res) => {
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
  
    const index = req.todos.findIndex((todo) => {
      return Number(id) === todo.id;
    });
  
    if (index === -1) {
      res.send("ID does not exist");
      return;
    }
  
    const validateResult = todoSchema.validate(req.body);
    if (validateResult.error) {
      res.send(
        `Please check the request body. Error: ${validateResult.error.details[0].message}`
      );
      return;
    }
  
    req.todos[index] = req.body;
    res.send(req.todos[index]);
  });
  
  //delete one
  router.delete("/:id", (req, res) => {
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
  
    const index = req.todos.findIndex((todo) => {
      return Number(id) === todo.id;
    });
  
    if (index === -1) {
      res.send("ID does not exist");
      return;
    }
  
    req.todos.splice(index, 1);
    res.send(req.todos);
  });
  

module.exports = router