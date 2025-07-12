import jwt from 'jsonwebtoken';

const authUser = async(req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'No token provided, authorization denied' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        if(token_decode.id) {
            req.userId = token_decode.id;
        }else{
            return res.status(401).json({success:false, message: 'Invalid token, authorization denied'});
        }
        next();

    } catch (error) {
        console.log('Error in authUser middleware:', error);
        return res.status(401).json({success:false, message: error.message || 'Token verification failed, authorization denied'});
    }
}
export default authUser;