import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../../config/db.js'
import dotenv from 'dotenv'
import AppError from '../../utils/AppError.js'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key'

export const registerUser = async ({name, email, password}) => {
    console.log('Register user called', { email })
    const hashed = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
        data : { name, email, password : hashed },
        select : {
            id : true,
            name : true,
            email : true
        }
    })
    console.log('User created', user)
    return user
}

export const loginUser = async ({ email, password }) => {
    console.log("Login user called", { email })
    const user = await prisma.user.findUnique({
        where : {email},
        select : {
            id : true,
            name : true,
            email : true,
            role : true,
            password : true
        }
    })

    if (!user) throw new AppError("Email and Password doesnt exist", 404)
    const match = await bcrypt.compare(password, user.password)
    if (!match) throw new Error("Email and password doesnt match", 401)
    const { password : _, ...safeUser } = user
    
    const payload = {
        id : user.id,
        role : user.role
    }

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn : '1h' })
    console.log('user valid\n', user, token)
    return { user : safeUser, token }
}


