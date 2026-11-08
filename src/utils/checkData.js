import AppError from "./appError.js"

const checkDetails = (details, next) => {
    for (let detail of Object.keys(details)) {


        if (!details[detail] && details[detail] != 0) {
            return next(new AppError(`${detail} is required`, 401, 'Failed'))
        }


    }
}

export { checkDetails }