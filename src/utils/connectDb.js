import { Pool } from "pg";
import { config } from "dotenv";
import initDatabase from "../data/createTable.js";

config();


const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    port: process.env.DATABASE_URL ? undefined : process.env.DB_PORT,
    host: process.env.DATABASE_URL ? undefined : process.env.DB_HOST,
    database: process.env.DATABASE_URL ? undefined : process.env.DB_NAME,
    password: process.env.DATABASE_URL ? undefined : process.env.DB_PASSWORD,
    user: process.env.DATABASE_URL ? undefined : process.env.DB_USER,
    // ssl: {
    //     rejectUnauthorized: false
    // }
});



const connectDb = async () => {
    await initDatabase(pool);
    await pool.connect()
    pool.on('connect', () => {
        console.log('database is connected');

    })
}

export default connectDb
export { pool }