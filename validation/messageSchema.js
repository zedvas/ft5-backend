const joi = require("joi");

const messageSchema = joi.object({
  title: joi.string().min(3).required(),
  message: joi.string().min(3).required(),
});

module.exports = messageSchema;
