import AppError from "../utils/AppError.js"

const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        try{
            if (!req.user) {
                throw new AppError('Unauthorized', 401)
            }

            const userRole = req.user.role

            if (!allowedRoles.includes(userRole)){
                throw new AppError('Forbidden : You are not allowed', 403)
            }

            next()
        }catch (err) {
            next(err)
        }
    }
}

export default authorize