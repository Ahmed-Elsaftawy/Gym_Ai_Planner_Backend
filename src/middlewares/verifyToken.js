import jwt from 'jsonwebtoken'
import AppError from '../utils/appError.js';


const verifyToken = async (req, res, next) => {
    const authorization = req.headers['authorization'];
    if (!authorization) return next(new AppError('Token is Required', 401, 'Failed'));

    const token = authorization.split(' ')[1];

    try {
        const currentUser = await jwt.verify(token, process.env.JWT_SECRET);

        req.currentUser = currentUser;
        next()
    } catch (err) {
        console.log(err);
        next(new AppError('token is invalid', 401, 'Error'));
    }


}

export default verifyToken;