const Joi = require('joi');


const userValidationSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    status: Joi.boolean().default(true)
});


const loginValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});


const todoCreateValidationSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().allow('', null),
    dueDate: Joi.date(),
    priority: Joi.string().valid('low', 'medium', 'high').default('low'),
    status: Joi.string().valid('pending', 'completed').default('pending'),
    category: Joi.string().allow('', null),
});

const todoUpdateValidationSchema = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    dueDate: Joi.date(),
    priority: Joi.string().valid('low', 'medium', 'high').default('low'),
    status: Joi.string().valid('pending', 'completed').default('pending'),
    category: Joi.string(),
});

module.exports = {
    userValidationSchema,
    loginValidationSchema,
    todoCreateValidationSchema,
    todoUpdateValidationSchema
};
