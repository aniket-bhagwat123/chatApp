import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../modules/user/user.model';

export const tokenMiddleware = async (req: any, res: any, next: any) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: "Authorization header missing or malformed" });
    };
    
    try {
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        const userValid = await User.findById(decodedToken.userId);

        if (!userValid) {
            return res.status(401).json({ error: "User not found or has been deleted" });
        };

        req.user = userValid; // Attach user info to request object
        next();
    } catch (error: unknown) {
        res.status(403).json({ error: (error as { message?: string }).message || 'Invalid token' });
    }
};