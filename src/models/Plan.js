import { pool } from "../utils/connectDb.js";



const createPlanService = async (userId, plan, version) => {
    const result = await pool.query(
        `INSERT INTO plans (user_id,plan_json,version)
        VALUES($1,$2,$3) RETURNING *`, [userId, plan, version]);
    return result.rows[0];
}

const getProfileService = async (userId) => {
    const profile = await pool.query('SELECT * FROM profiles WHERE user_id = $1', [userId]);
    return profile.rows[0];
}
const getPlanService = async (userId) => {
    const plan = await pool.query('SELECT plan_json,version FROM plans WHERE user_id = $1', [userId]);
    return plan.rows[0];
}

export { createPlanService, getProfileService, getPlanService }