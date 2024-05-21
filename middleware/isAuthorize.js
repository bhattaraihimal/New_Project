import { secretKey } from "../config/config.js";
import { HttpStatus } from "../config/httpStatusCodes.js";
import { verifyToken } from "../utils/tokenController.js";


// export const isAuthorize = async (req, res, next) => {
//         const token = req.headers.authorization;
    
//         if (!token) {
//             return res.status(HttpStatus.UNAUTHORIZED_401).json({ error: 'Unauthorized' });
//         }
    
//         try {
//             const decoded = await verifyToken(token);
//             req.user = decoded;
//             next();
//         } catch (error) {
//             return res.status(HttpStatus.UNAUTHORIZED_401).json({ error: 'Invalid token' });
//         }
//     };

export const isAuthorize = async (req, res, next) => {
    try {
      let { at } = req.headers;
      if (at) {
        let response = await verifyToken(at);
        if (response === 400) {
          res
            .status(HttpStatus.UNAUTHORIZED_401)
            .json({ message: "Not allowed" });
        } else if (response === "NS101") {
          res
            .status(HttpStatus.UNAUTHORIZED_401)
            .json({ message: "Please login again" });
        } else {
          res.locals.email = response.email;
          res.locals.fullName = response.fullName;
          res.locals.contactNo = response.contactNo;
          res.locals.active = response.active;
          res.locals.sauthenticated = response.email ? true : false;
          next();
        }
      } else {
        res.status(HttpStatus.UNAUTHORIZED_401).json({ message: "Not allowed" });
      }
    } catch (err) {
      console.log("err [middleware] : ", err);
      res.status(HttpStatus.BAD_REQUEST_400).json(err);
    }
  };
  
    