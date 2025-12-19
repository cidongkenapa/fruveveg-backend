import AppError from '../../utils/AppError.js';
import * as userService from '../user/user.service.js'


export const getProfile = async (req, res) => {
    return res.json({
        status: true,
        message: "User profile",
        user: req.user
    });
};

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.findAllUsers()
        res.status(200).json({
            success: true,
            data: users
        })
    } catch (err) {
        next(err)
    }
}

export const getUserById = async (req, res, next) => {
    try {
        const users = await userService.findUserById(req.params.id)
        if (!users) throw new AppError('User not found', 404)
        res.status(200).json({
            success: true,
            data: users
        })
    } catch (err) {
        next(err)
    }
}

export const updateUser = async (req, res, next) => {
    try {
        if (req.user.role != 'admin' && req.user.id != req.params.id) {
            throw new AppError('Forbidden : cannot update another user', 403)
        }

        const { name, email, role } = req.body

        const payload = req.user.role === 'admin' ? { name, email, role } : { name, email }

        const updated = await userService.updateUserById(req.params.id, payload)

        res.status(200).json({
            success: true,
            data: updated
        })
    } catch (err) {
        next(err)
    }
}

export const deleteUser = async (req, res, next) => {
    try{
        const users = await userService.deleteUserById(req.params.id)

        res.status(200).json({
            success : true,
            message : `${users} User deleted`
        })
    }catch(err){
        next(err)
    }
}