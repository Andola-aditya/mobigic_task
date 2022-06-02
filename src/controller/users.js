import User from '../models/users';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import devConfig from '../../config/development.json';

/**
 * Create a new user.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

export function create(req, res) {
    const user = req.body;
    const userData = {
        name: user.name,
        userName: user.userName,
        password: user.password,
    };
    return User.create(userData)
        .then(function (newUser) {
            res.status(200).json({ newUser });
        })
        .catch(function (err) {
            return err;
        });
}

export async function login(req, res) {
    const user = req.body;
    const userInfo = await User.find({ userName: user.userName });
    if(!userInfo) res.status(400).json({ errors: [{ msg: 'invalid credentials' }] });
    const token = jwt.sign({ _id: userInfo[0]._id }, devConfig.secretKey, { expiresIn: '1day' });
    const pass =  bcryptjs.compareSync(user.password, userInfo[0].password);
    if (pass) {
        res.status(200).json({  
            userInfo: userInfo,
            token: token
        });
    }else{
        throw new Error('Not Authenticated');
    }
}
