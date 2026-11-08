import express from 'express';
import { register, login } from '../controllers/user-controller.js';
import { loginValidator, registerValidator } from '../middlewares/input-validators.js';

const userRouter = express.Router();

userRouter.route('/register').post(registerValidator, register);
userRouter.route('/login').post(loginValidator, login);



export { userRouter };