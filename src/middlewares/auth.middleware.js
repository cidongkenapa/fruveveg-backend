import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key'

const authMiddleware = (req, res, next) => {
    try{
        const header = req.headers['authorization']
        console.log('raw header : ', header)

        if ( !header || !header.startsWith('Bearer ') ) {
            return res.status(401).json({
                status : false,
                message : 'Unauthorized : Token missing!'
            })
        }

        const token = header.split(" ")[1]
        console.log('extract header : ', token)
        const decode = jwt.verify(token, JWT_SECRET)

        req.user = decode
        return next()
    }catch (err){
        console.error('JWT VERIFY ERROR : ', err)
        res.status(401).json({
            status : false,
            message : 'Invalid or Token expired'
        })
    }
}

export default authMiddleware