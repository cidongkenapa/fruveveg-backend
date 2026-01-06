import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import authRepository from './auth.repository.js'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key'

export const registerUser = async ({name, email, password}) => {
    console.log('Register user called', { email })
    const hashed = await bcrypt.hash(password, 10)
    const user = {name, email, password : hashed}
    const prisma = await authRepository.createUser(user)
    return prisma
}

export const loginUser = async ({ email, password }) => {
    console.log("Login user called", { email })
    const user = await authRepository.getUser({email})
    if (!user) throw new AppError("Email and Password doesnt exist", 404)
    const match = await bcrypt.compare(password, user.password)
    if (!match) throw new AppError("Email and password doesnt match", 401)
    const { password : _, ...safeUser } = user
    
    const payload = {
        id : user.id,
        role : user.role
    }

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn : '1h' })
    console.log('user valid\n', user, token)
    return { user : safeUser, token }
}


