const Joi = require('@hapi/joi');

const authSchema = Joi.object({
    firstName: Joi.string().min(3).max(25).required(),
    lastName: Joi.string().min(3).max(25).required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(8).required(),
    aboutYou: Joi.string().min(20).max(1000).required()
})

module.exports = {
    authSchema,
}
