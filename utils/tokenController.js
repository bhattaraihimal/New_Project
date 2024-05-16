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

export const verifyToken = async (token) => {
  try {
    let verifyTokenResponse = await jwt.verify(token, secretKey);
    console.log("verifyTokenResponse : ", verifyTokenResponse);
    let user = await userService.getUserByEmailService(verifyTokenResponse.email);
    if (user) {
      let latestTracker = user.passwordTracker;
      // check if the token is expired due to change in password
      if (latestTracker !== verifyTokenResponse.tracker) {
        return "NS101";
      } else {
        return verifyTokenResponse;
      }
    } else {
      return HttpStatus.NOTFOUND_404;
    }
  } catch (err) {
    return 400;
  }
};
