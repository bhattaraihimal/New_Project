import jwt from "jsonwebtoken";
import { expireIn, secretKey } from "../config/config.js";
import { userService } from "../services/index.js";
import { HttpStatus } from "../config/httpStatusCodes.js";

export const generateToken = async (objData) => {
  try {
    let expiresInfo = {
      expiresIn: expireIn,
    };
    let authToken = jwt.sign(objData, secretKey, expiresInfo);
    return authToken;
  } catch (err) {
    let error = new Error(err.message);
    error.statusCode = 400;
    throw error;
  }
};

// export const verifyToken = async (token) => {
//   try {
//     let verifyTokenResponse = await jwt.verify(token, secretKey);
//     console.log("verifyTokenResponse : ", verifyTokenResponse);
//     let user = await userService.getUserByIdAndEmailService(verifyTokenResponse.user_id, verifyTokenResponse.email);
//     if (user) {
//       let latestTracker = user.passwordTracker;
//       // check if the token is expired due to change in password
//       if (latestTracker !== verifyTokenResponse.tracker) {
//         return "NS101";
//       } else {
//         return verifyTokenResponse;
//       }
//     } else {
//       return HttpStatus.NOTFOUND_404;
//     }
//   } catch (err) {
//     return 400;
//   }
// };

// export const verifyToken = async (token, attributes) => {
//   try {
//     let verifyTokenResponse = await jwt.verify(token, secretKey);
//     console.log("verifyTokenResponse : ", verifyTokenResponse);
    
//     // Construct the query based on the provided attributes
//     let user = await userService.getUserByAttributes(attributes);

//     if (user) {
//       let latestTracker = user.passwordTracker;
//       // check if the token is expired due to change in password
//       if (latestTracker !== verifyTokenResponse.tracker) {
//         return "NS101";
//       } else {
//         return verifyTokenResponse;
//       }
//     } else {
//       return HttpStatus.NOTFOUND_404;
//     }
//   } catch (err) {
//     return 400;
//   }
// };

// export const verifyToken = async (token) => {
//     try {
//       let verifyTokenResponse = await jwt.verify(token, secretKey);
//       console.log("verifyTokenResponse : ", verifyTokenResponse);
//       let user = await userService.getUserByIdService(verifyTokenResponse.user_id);
//       if (user) {
//           return verifyTokenResponse;
//         }
//        else {
//         return HttpStatus.NOTFOUND_404;
//       }
//     } catch (err) {
//       return 400;
//     }
//   };
  
export const verifyToken = async (token) => {
  try {
    const verifyTokenResponse = jwt.verify(token, secretKey);
    console.log("verifyTokenResponse:", verifyTokenResponse);
    
    const user = await userService.getUserByIdService(verifyTokenResponse.user_id);
    if (user) {
      return verifyTokenResponse;
    } else {
      return { error: 'User not found', statusCode: HttpStatus.NOTFOUND_404 };
    }
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return { error: 'Invalid token', statusCode: HttpStatus.UNAUTHORIZED_401 };
    } else {
      console.error('Error verifying token:', err);
      return { error: 'Internal server error', statusCode: HttpStatus.INTERNAL_SERVER_ERROR_500 };
    }
  }
};