const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    
    // Log the error for debugging
    console.error('Error:', {
        message: err.message,
        stack: err.stack,
        name: err.name,
        code: err.code
    });

    res.json({
        status: 'error',
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
        ...(err.errors && { errors: err.errors })
    });
};

module.exports = { notFound, errorHandler }; 