import { secretKey } from "../config/config.js";
import { HttpStatus } from "../config/httpStatusCodes.js";
import { verifyToken } from "../utils/tokenController.js";


export const isAuthorize = async (req, res, next) => {
        const token = req.headers.authorization;
    
        if (!token) {
            return res.status(HttpStatus.UNAUTHORIZED_401).json({ error: 'Unauthorized' });
        }
    
        try {
            const decoded = await verifyToken(token, secretKey);
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(HttpStatus.UNAUTHORIZED_401).json({ error: 'Invalid token' });
        }
    };
    