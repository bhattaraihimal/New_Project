import { secretKey } from "../config/config.js";
import { HttpStatus } from "../config/httpStatusCodes.js";

import { userService } from "../services/index.js";

import { comparePassword, hashPassword } from "../utils/hashFunction.js";
import { generateToken, verifyToken } from "../utils/tokenController.js";


export const verifyUserToken = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(HttpStatus.UNAUTHORIZED_401).json({ error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verifyToken(token, secretKey);
        req.client = decoded;
        next();
    } catch (error) {
        return res.status(HttpStatus.UNAUTHORIZED_401).json({ error: 'Invalid token' });
    }
};

export const registerUser = async (req, res, next) => {
    const { email, fullName, password, contactNo, post, role_id } = req.body;

    try {
        console.log('body data : ', req.body)
        
        // Check if required fields are provided
        if (!email || !fullName || !password || !contactNo || !post || !role_id ) {
            return res.status(400).json({ error: 'Please provide all the required information' });
        }

        // Check if user with the provided email already exists
        const existingUser = await userService.getUserByEmailService(email);
          if (existingUser) {
            return res.status(HttpStatus.CONFLICT_409).json({ error: 'User with this email already exists' });
        }
           console.log('Iam Here')

        // Hash the password
           const hashedPassword = await hashPassword(req.body.password);


       
           // Create new user with hased password
        await userService.createUserService({ email, fullName, password: hashedPassword, contactNo, post, role_id });
        res.json({ message: 'User registered successfully' });
    }
     catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });
    };
};

export const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await userService.getUserByEmailService(email);
        if (!user) {
            return res.status(HttpStatus.UNAUTHORIZED_401).json({ error: 'Invalid email or password' });
        }

        // Compare hashed password
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(HttpStatus.UNAUTHORIZED_401).json({ error: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = await generateToken({ email: user.email }, secretKey);
        res.json({ token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
    }
};

export const updateUserPassword = async (req, res,next) => {
    const { email } = req.body;

    try {
        // Check if user with the provided email exists
        const user = await userService.getUserByEmailService(email);
        if (!user) {
            return res.status(HttpStatus.NOTFOUND_404).json({ error: 'Invalid email' });
        }

        // Generate a token containing user phone
        const token = await generateToken({ email }, secretKey, { expiresIn: '2h' });

        // Provide the user with a URL to reset their password
        const resetUrl = `http://localhost:3001/user/reset-password/${token}`;

        // Send the reset URL as a response
        res.json({ message: 'Password reset URL generated', resetUrl });
    } catch (error) {
        console.error('Error generating password reset URL:', error);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
    }
};

export const updateUserPasswordValidation = async (req, res,next) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        // Verify the token's authenticity
        const decodedToken = await verifyToken(token, secretKey);

        // Extract the user's phone number from the token
        const { email } = decodedToken;

        // Find user by phone number
        const user = await userService.getUserByEmailService(email);
        if (!user) {
            return res.status(HttpStatus.NOTFOUND_404).json({ error: 'Invalid token' });
        }

        // Hash the new password
        const hashedPassword = await hashPassword(newPassword, 10);

        // Update user's password
        user.password = hashedPassword;
        await user.save();

        // Send a success message
        res.json({ message: 'Password reset successful' });
    } catch (error) {
        console.error('Error resetting password:', error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(HttpStatus.BAD_REQUEST_400).json({ error: 'Invalid token' });
        }
        res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
    }
};



