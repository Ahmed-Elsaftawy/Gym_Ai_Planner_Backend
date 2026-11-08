import asyncWrapper from "../middlewares/asyncwarpper.js";
import AppError from "../utils/appError.js";
import { createPlanService, getPlanService, getProfileService } from "../models/Plan.js";
import generatePlan from "../libs/ai.js";


const createPlan = asyncWrapper(async (req, res, next) => {
    const userId = req.currentUser.id;
    console.log(userId);
    console.log("work=======================================================");
    console.log("work=======================================================");
    
    if (!userId) return next(new AppError('User Id is required', 400, 'Failed'));

    const userProfile = await getProfileService(userId);
    if (!userProfile) return next(new AppError('user Profile not found, Complete onboarding first.', 400, 'Failed'));

    let plan = await getPlanService(userId);
    const version = plan ? plan.version + 1 : 1;
    let planJson = await generatePlan(userProfile, next);

    const planText = JSON.stringify(planJson, null, 2);
    const newPlan = await createPlanService(userId, planText, version);

    res.status(201).json({ status: 'Success', data: newPlan });
})

const getPlan = asyncWrapper(async (req, res, next) => {
    const userId = req.currentUser.id;

    const plan = await getPlanService(userId);
    if (!plan) return next(new AppError('something went wrong', 500, 'Error'))
    plan.version = undefined;
    res.status(200).json({ status: 'Success', data: plan })
})
export { createPlan, getPlan }