const Joi = require("@hapi/joi");

//Schema untuk register
const registerSchema = Joi.object({
  username: Joi.string().min(3).max(10).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required().messages({
    "string.pattern.base":
      "username, email dan password tidak boleh kosong, password minimal 8 karakter.",
  }),
});

const loginSchema = Joi.object({
  username: Joi.string().min(3).max(10).required(),
  password: Joi.string().min(8).required(),
});

const categorySchema = Joi.object({
  category: Joi.string().min(3).max(10).required(),
});


const statusArticleSchema = Joi.object({
  status: Joi.string().valid('public', 'user').required()
});


module.exports = { registerSchema, loginSchema, categorySchema, statusArticleSchema };
