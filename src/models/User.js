import { pool } from '../utils/connectDb.js'


const createUserService = async (username, email, password) => {
    const results = await pool.query(
        `INSERT INTO users(username,email,password)
         VALUES($1,$2,$3) RETURNING *`, [username, email, password]);

    return results.rows[0];
}
const loginService = async (email) => {
    const user = await pool.query(`SELECT id,password FROM users WHERE email = $1`, [email]);

    return user.rows[0];
}






export {  createUserService, loginService }