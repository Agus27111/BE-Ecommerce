const Joi = require("@hapi/joi");

const loginSchema = Joi.object({
  name: Joi.string().min(3).max(10).required(),
  password: Joi.string()
    .min(6)
    .pattern(/^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]+$/) // hanya karakter yang diperbolehkan
    .pattern(/[A-Z]/) // setidaknya satu huruf kapital
    .pattern(/[0-9]/) // setidaknya satu angka
    .pattern(/[!@#$%^&*(),.?":{}|<>]/) // setidaknya satu karakter khusus
    .required()
    .messages({
      "string.pattern.base":
        "Password harus mengandung setidaknya satu huruf kapital, satu angka, dan satu karakter khusus.",
    }),
});

// Schema untuk registrasi (dapat disesuaikan)
const registerSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(6)
    .pattern(/^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]+$/) // hanya karakter yang diperbolehkan
    .pattern(/[A-Z]/) // setidaknya satu huruf kapital
    .pattern(/[0-9]/) // setidaknya satu angka
    .pattern(/[!@#$%^&*(),.?":{}|<>]/) // setidaknya satu karakter khusus
    .required()
    .messages({
      "string.pattern.base":
        "Password harus mengandung setidaknya satu huruf kapital, satu angka, dan satu karakter khusus.",
    }),
});

module.exports = { loginSchema, registerSchema };
