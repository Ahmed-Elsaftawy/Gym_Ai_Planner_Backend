import express from 'express';
import { createProfile, getProfile } from '../controllers/profile-controller.js';
import verifyToken from '../middlewares/verifyToken.js';
const profileRouter = express.Router();


profileRouter.route('/')
    .post(verifyToken, createProfile)
    .get(verifyToken, getProfile);




export { profileRouter }