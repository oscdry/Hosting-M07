import Joi from 'joi';

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(15).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,15}$/).required(),
  password_confirm: Joi.string().valid(Joi.ref('password')).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,15}$/).required(),
});


export { signupSchema, loginSchema };
