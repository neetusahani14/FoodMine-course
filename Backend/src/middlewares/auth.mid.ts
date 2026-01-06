// import { verify } from "jsonwebtoken";
// import { HTTP_UNAUTHORIZED } from "../constants/http_status";


// export const auth = (req: any, res: any, next: any) => {
//     const token = req.headers.access_token as string;
//     if(!token) return res.status(HTTP_UNAUTHORIZED).send();

//     try {
//         const decodedUser = verify(token, process.env.JWT_SECRET!);
//         req.user = decodedUser;

//     } catch (error) {
//         res.status(HTTP_UNAUTHORIZED).send();
//     }

//     return next();
// }

import { verify } from "jsonwebtoken";
import { HTTP_STATUS } from "../constants/http_status";

export const auth = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "No token provided" });
  }

  // Expecting header format: "Bearer <token>"
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "Invalid token format" });
  }

  try {
    const decodedUser = verify(token, process.env.JWT_SECRET!);
    req.user = decodedUser;
    next();
  } catch (error) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "Invalid or expired token" });
  }

};