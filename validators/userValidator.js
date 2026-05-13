const Joi = require("joi");

const signupSchema = Joi.object({
    name : Joi.string().required(),
    email : Joi.string().required(),
    password : Joi.string().min(6).required(),
});

module.exports ={
    signupSchema
};