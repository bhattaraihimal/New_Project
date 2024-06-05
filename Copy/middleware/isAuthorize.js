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
      let { auth } = req.headers;
      console.log('Auth : ', req.headers);

      if (auth) {
        let response = await verifyToken(auth);
        if (response.statusCode) {
           // Token verification failed
        res.status(response.statusCode).json({ message: response.error });
      } else {

                // Token verification succeeded

          res.locals.role_id = response.role_id;
          res.locals.user_id = response.user_id;
          console.log('response.role_id : ', response.role_id)
          console.log('res.locals.role_id: ', res.locals.role_id)
          // res.locals.fullName = response.fullName;
          // res.locals.contactNo = response.contactNo;
          // res.locals.active = response.active;
          // res.locals.sauthenticated = response.email ? true : false;
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
  
