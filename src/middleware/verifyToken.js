import jwt from 'jsonwebtoken';
import devConfig from '../../config/development.json';

function tokenVerify(req, res, next) {
    jwt.verify(req.headers['x-access-token'], devConfig.secretKey, function (err, decoded) {
        if (err) {
            return res.json({ status: 'error' });
        } else {
            console.log(decoded);
            req.userId = decoded._id;
            next();
        }
    });
}
export default tokenVerify;
