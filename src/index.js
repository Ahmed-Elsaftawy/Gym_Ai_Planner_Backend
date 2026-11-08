import express from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import { profileRouter } from './routes/profile-route.js';
import routesErrorHandler from './middlewares/errorHandler.js';
import connectDb from './utils/connectDb.js';
import { userRouter } from './routes/user-route.js';
import verifyToken from './middlewares/verifyToken.js';
import { planRouter } from './routes/plan-route.js';
config()



const app = express();
app.use(cors());
app.use(cookieParser())
app.use(express.json());

//API routes
app.use('/api/profile', profileRouter);
app.use('/api/user', userRouter);
app.use('/api/plan', planRouter);

app.use(routesErrorHandler)




const port = process.env.PORT || 3000
const start = async () => {
    await connectDb()
    app.listen((port), () => {
        console.log(`Running on port ${port}...`);
    })
}
start()