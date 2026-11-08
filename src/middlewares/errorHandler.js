const routesErrorHandler = (error, req, res, next) => {
    return res.status(error.statusCode || 500).json({ status: "Error", message: error.message });
}


export default routesErrorHandler;