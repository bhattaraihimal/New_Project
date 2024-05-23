import { secretKey } from "../config/config.js";
import { HttpStatus } from "../config/httpStatusCodes.js";

import { userService } from "../services/index.js";

import { comparePassword, hashPassword } from "../utils/hashFunction.js";
import { generateToken, verifyToken } from "../utils/tokenController.js";


// export const verifyUserToken = async (req, res, next) => {
//     const token = req.headers.authorization;

//     if (!token) {
//         return res.status(HttpStatus.UNAUTHORIZED_401).json({ error: 'Unauthorized' });
//     }

//     try {
//         const decoded = jwt.verifyToken(token);
//         req.user = decoded;
//         next();
//     } catch (error) {
//         return res.status(HttpStatus.UNAUTHORIZED_401).json({ error: 'Invalid token' });
//     }
// };

export const verifyUserToken = async (req, res, next) => {
  try {
    let { at } = req.headers;
    if (at) {
      let response = await verifyToken(at);
      if (response === 400) {
        res
          .status(HttpStatus.UNAUTHORIZED_401)
          .json({ message: "Not allowed" });
      } else {
        res.locals.sauthenticated = response.email ? true : false;
        res.locals.email = response.email;
        res.locals.fullname = response.fullname;
        res.locals.contactNo = response.contactNo;
        res.locals.active = response.active;
        res.status(HttpStatus.SUCCESS_200).json({ token: response });
      }
    } else {
      res.status(HttpStatus.UNAUTHORIZED_401).json({ message: "Not allowed" });
    }
  } catch (err) {
    console.log("err : ", err);
    res.status(HttpStatus.BAD_REQUEST_400).json(err);
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
    const token = await generateToken({ email: user.email, user_id: user.id, fullName: user.fullName, contactNo: user.contactNo, post: user.post, active: user.active, role_id: user.role_id });

    // Set the token in the response header
   // res.setHeader('Auth', `Bearer ${token}`);

    // Send the response
    res.json({ message: 'Log in successful', token });

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
        const token = await generateToken({ email: user.email, user_id: user.id, fullName: user.fullName, contactNo: user.contactNo, post: user.post, active: user.active, role_id: user.role_id });

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
        const decodedToken = await verifyToken(token);

        // Extract the user's email and id from the token
        const { email, user_id } = decodedToken;


        // Find user by email and id both
        const user = await userService.getUserByIdAndEmailService(user_id, email);


        if (!user) {
            return res.status(HttpStatus.NOTFOUND_404).json({ error: 'Invalid token' });
        }

        // Hash the new password
        const hashedPassword = await hashPassword(newPassword);

        // Update user's password
        // user.password = hashedPassword;
        // await user.save();

        let dataToSend = { password: hashedPassword };
        let response = await userService.updateUserService(user.id, dataToSend);

        // Check response and send appropriate message
        if (response[0] > 0) { 
            res.status(HttpStatus.SUCCESS_200).json({ message: "Password update successful" });
        } else {
            res.status(HttpStatus.SUCCESS_200).json({ message: "[Update Password Inner] : Some error occurred" });
        }
    } catch (error) {
        console.error('Error resetting password:', error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(HttpStatus.BAD_REQUEST_400).json({ error: 'Invalid token' });
        }
        res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
    }
};


// export const updateUser = async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const { email, fullName, password, contactNo, post, active, role_id } = req.body;
  
//       // Find user by id
//       const user = await userService.getUserByIdService(id);
//       if (!user) {
//         return res.status(HttpStatus.NOTFOUND_404).json({ error: 'User not found' });
//       }
  
//       // Update User
//       user.email = email;
//       user.fullName = fullName;
//       user.password = password;
//       user.contactNo = contactNo;
//       user.post = post;
//       user.active = active;
//       user.role_id = role_id;
//       await user.save();
  
//       res.json({ message: 'User updated successfully'});
//     } catch (error) {
//       console.error('Error updating user:', error);
//       res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
//     }
//   };

export const updateUser = async (req, res, next) => {
  try {
      const { id } = req.params;
      const { email, fullName, password, contactNo, post, active, role_id } = req.body;

      // Find user by id
      const user = await userService.getUserByIdService(id);
      if (!user) {
          return res.status(HttpStatus.NOTFOUND_404).json({ error: 'User not found' });
      }

      // Prepare data to send for updating
      const dataToUpdate = { email, fullName, password, contactNo, post, active, role_id };

      // Update user using updateUserService
      let response = await userService.updateUserService(id, dataToUpdate);

      // Check response and send appropriate message
      if (response[0] > 0) { 
          res.status(HttpStatus.SUCCESS_200).json({ message: 'User updated successfully' });
      } else {
          res.status(HttpStatus.BAD_REQUEST_400).json({ message: 'Update failed. No changes made.' });
      }
  } catch (error) {
      console.error('Error updating user:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
  }
};

export const deleteUser = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      // Find user by id
      const user = await userService.getUserByIdService(id);
      if (!user) {
        return res.status(HttpStatus.NOTFOUND_404).json({ error: 'User not found' });
      }
  
      // Delete user //  Deactivate User
      await userService.deactivateUserByIdService(id);
  
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
    }
  };

  export const viewAllUsers = async (req, res, next) => {
    try {
      const users = await userService.getAllUserService();
      res.json({ users });
    } catch (error) {
      console.error('Error viewing users:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
    }
  };

  export const viewUser = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      // Find user by id
      const user = await userService.getUserByIdService(id);
      if (!user) {
        return res.status(HttpStatus.NOTFOUND_404).json({ error: 'User not found' });
      }
  
      res.json({ user });
    } catch (error) {
      console.error('Error viewing user:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({ error: 'Internal server error' });
    }
  };


  



