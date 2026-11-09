import { Pool } from "pg";
import { config } from "dotenv";
import initDatabase from "../data/createTable.js";

config();


const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    port: process.env.DATABASE_URL ? undefined : process.env.PGPORT,
    host: process.env.DATABASE_URL ? undefined : process.env.PGHOST,
    database: process.env.DATABASE_URL ? undefined : process.env.PGDATABASE,
    password: process.env.DATABASE_URL ? undefined : process.env.PGPASSWORD,
    user: process.env.DATABASE_URL ? undefined : process.env.PGUSER,
    ssl: {
        rejectUnauthorized: false
    }
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