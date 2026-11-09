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
    ssl: process.env.DATABASE_URL?.includes("localhost") ? false : {
        rejectUnauthorized: false
    }
});



const connectDb = async () => {
    const client = await pool.connect();
    console.log('Database is connected successfully');
    client.release();
    await initDatabase(pool);
    pool.on('connect', () => {
        console.log('database is connected');

    })
}

export default connectDb
export { pool }