import { HttpStatus } from "../config/httpStatusCodes.js";
import { verifyToken } from "../utils/tokenController.js";




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
  
