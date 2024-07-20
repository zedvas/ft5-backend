const joi = require('joi');

const todoSchema = joi.object({
    id: joi.number().integer().min(0),
    todo: joi.string().min(3).required(),
    completed: joi.bool().required(),
    userId: joi.number().integer().min(0).required(),
  });
  
  module.exports = todoSchema
  