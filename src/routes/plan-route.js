import express from 'express';
import { createPlan, getPlan } from '../controllers/plan-controller.js'
import verifyToken from '../middlewares/verifyToken.js';

const planRouter = express.Router();


planRouter.route('/generate').post(verifyToken, createPlan);
planRouter.route('/').get(verifyToken, getPlan);



export { planRouter }