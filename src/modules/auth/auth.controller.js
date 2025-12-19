import * as authService from './auth.service.js'

export const register = async (req, res) => {
    try{
        const user = await authService.registerUser(req.body)
        return res.status(201).json({ success : true , data : user })
    }catch (err){
        console.error('Register error :', err)
        return res.status(400).json({ success : false, message : err.message })
    }
}

export const login = async (req, res) => {
    try {
        const data = await authService.loginUser(req.body)
        return res.status(201).json({ success : true, ...data })
    }catch (err){
        console.log('Login error :', err)
        return res.status(401).json({ success : false, message : err.message })
    }
}