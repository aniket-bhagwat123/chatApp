import { JwtPayload } from 'jsonwebtoken';
import User from '../modules/user/user.model';
import { verifyJwtToken } from './generateJwtToken';

export const tokenMiddleware = async (req: any, res: any, next: any) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: "Authorization header missing or malformed" });
    };
    
    try {
        const decodedToken = verifyJwtToken(token) as JwtPayload;
        const userValid = await User.findById(decodedToken.userId);

        if (!userValid) {
            return res.status(401).json({ error: "User not found or has been deleted" });
        };

        req.user = userValid; // Attach user info to request object
        next();
    } catch (error: unknown) {
        res.status(403).json({ error: (error as { message?: string }).message || 'Invalid token or token expired' });
    }
};