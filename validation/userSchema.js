const joi = require('joi');

const userSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(8).max(32).required()
})

module.exports = userSchema;