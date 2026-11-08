import AppError from "../utils/appError.js";
import { pool } from "../utils/connectDb.js";



const createProfileService = async (userId, profileData) => {
    const { goal, experience, daysPerWeek, sessionLength, equipment, preferredSplit, injuries } = profileData
    const result = await pool.query(
        `INSERT INTO profiles
        (goal, experience, daysPerWeek, sessionLength, equipment, preferredSplit, injuries,user_id)
        VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`
        , [goal, experience, daysPerWeek, sessionLength, equipment, preferredSplit, injuries, userId]);

    return result.rows[0];
};

const getProfileService = async (userId) => {
    const profile = await pool.query(`SELECT
         goal, experience, daysPerWeek, sessionLength, equipment, preferredSplit, injuries
          FROM profiles WHERE user_id = $1`, [userId]);

    return profile.rows[0];
}

const editProfileService = async (updatedValue, userId) => {

    const allowedFiled = [goal, experience, daysPerWeek, sessionLength, equipment, preferredSplit, injuries];
    if (!allowedFiled.includes(updatedValue)) throw new AppError('This Filed is not allowed', 400, 'Failed')
    const profile = await pool.query(`UPDATE profiles SET ${updatedValue} = $1 WHERE user_id = $2 RETURNING *`, [updatedValue, userId]);
    return profile.rows[0]
}
export { createProfileService, getProfileService, editProfileService };