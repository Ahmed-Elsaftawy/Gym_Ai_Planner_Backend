import { createUserService, loginService } from "../models/User.js";
import asyncWrapper from "../middlewares/asyncwarpper.js";
import bcrypt from 'bcrypt'
import AppError from "../utils/appError.js";
import generateToken from '../utils/generateToken.js'
const register = asyncWrapper(async (req, res, next) => {
    const { username, email, password } = req.body;
    console.log(username)
    const checkUser = await loginService(email);
    if (checkUser) return next(new AppError('Email Already Exists', 400, 'Failed'));

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await createUserService(username, email, hashedPassword);

    user.password = undefined;
    res.status(201).json({ status: 'Success', data: user });

});

const login = asyncWrapper(async (req, res, next) => {
    const { email, password } = req.body;


    const user = await loginService(email);

    if (!user) return next(new AppError('Your Email Does Not Exist', 400, 'Failed'));

    const result = await bcrypt.compare(password, user.password);
    if (!result) return next(new AppError('incorrect Password', 400, 'Failed'));

    const token = await generateToken(user.id);
    user.password = undefined;
    res.status(200).json({ status: "Success", message: 'Welcome Back', data: token });
})
export { register, login }