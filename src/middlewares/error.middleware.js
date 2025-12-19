const errorHandler = (err, req, res, next) => {
    console.error("🔥 ERROR:", err)

    let statusCode = err.statusCode || 500
    let message = err.message || 'Internal Server Error'

    if (err.code === 'P2002'){
        message = 'Field value duplicated'
        statusCode = 400
    }

    if (err.name === 'JsonWebTokenError'){
        message = 'Invalid Token'
        statusCode = 401
    }

    if (err.name === 'TokenExpiredError'){
        message = 'Token Expired'
        statusCode = 401
    }

    return res.status(statusCode).json({
        status : false,
        message
    })
}

export default errorHandler