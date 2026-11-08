import Joi from 'joi';
import AppError from '../utils/appError.js';


const userSchema = Joi.object({
    username: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().max(50).required(),
    password: Joi.string().min(8).required()
});
const loginSchema = Joi.object({
    email: Joi.string().email().max(50).required(),
    password: Joi.string().min(8).required()
})


const registerValidator = (req, res, next) => {
    const validator = userSchema.validate(req.body);
    if (validator.error) return next(new AppError(validator.error.message, 400, 'Failed'));
    next();
}

const loginValidator = (req, res, next) => {

    const validator = loginSchema.validate(req.body);

    if (validator.error) return next(new AppError(validator.error, 400, 'Failed'));
    next();
}

export { registerValidator, loginValidator }