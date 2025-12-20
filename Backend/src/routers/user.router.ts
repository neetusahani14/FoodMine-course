import { Router } from "express";
import { sample_users } from "../data";
import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import { User, UserModel } from "../models/user.model";
import bcrypt from "bcryptjs";
import { HTTP_STATUS } from "../constants/http_status";

const router = Router();
// Seed route
router.get("/seed", expressAsyncHandler(async (req, res) => {
    const usersCount = await UserModel.countDocuments();
    if (usersCount > 0) {
        res.send("Seed is already done!");
        return;
    }
    await UserModel.create(sample_users);
    res.send("Seed is done!");
}));

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    const user = sample_users.find(user => user.email == email && user.password == password);
    if (user) {
        res.send(generateTokenResponse(user));
    } else {
        res.status(400).send({ message: 'Invalid email or password' });
    }
});

// router.post("/login", expressAsyncHandler(async (req, res) => {
//     const { email, password } = req.body;
//     console.log(req.body);
    
//     const user = await UserModel.findOne({email});
//     console.log(user);
    
    
//     if (user && (await bcrypt.compare(password, user.password))) {
//       res.send(generateTokenResponse(user)); 
//     } else {
//       const BAD_REQUEST = 400;
//         res.status(BAD_REQUEST).send({ message: 'Invalid email or password' });
       
//     }
    
// }));

router.post("/register", expressAsyncHandler(async (req, res) => {
    const { name, email, password, address} = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
        res.status(HTTP_STATUS.BAD_REQUEST).send({ message: 'User already exists, please login!' });
        return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser:User = new UserModel({
        id:'',  
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        address,
        isAdmin: false,
    });
    const createdUser = await UserModel.create(newUser);
    res.send(generateTokenResponse(createdUser));
}
))

const generateTokenResponse = (user: any) => {
    const token = jwt.sign({
        email: user.email,
        isAdmin: user.isAdmin
    }, "SomeRandomText", { expiresIn: '30d' });

    user.token = token;
    return user;
}

export default router;



// import { Router } from "express";
// import { sample_users } from "../data";
// import jwt from "jsonwebtoken";
// import expressAsyncHandler from "express-async-handler";
// import { UserModel } from "../models/user.model";
// import bcrypt from "bcryptjs";

// const router = Router();

// // Seed route
// router.get("/seed", expressAsyncHandler(async (req, res) => {
//   const usersCount = await UserModel.countDocuments();
//   if (usersCount > 0) {
//     res.send("Seed is already done!");
//     return;
//   }
  

//   // Hash passwords before seeding
//   const usersWithHashedPasswords = await Promise.all(
//     sample_users.map(async (user) => ({
//       ...user,
//       password: await bcrypt.hash(user.password, 10),
//     }))
//   );

//   await UserModel.create(usersWithHashedPasswords);
//   res.send("Seed is done!");
// }));

// // Login route
// router.post("/login", expressAsyncHandler(async (req, res) => {
//   const { email, password } = req.body;
//   console.log("Login request:", req.body);

//   const user = await UserModel.findOne({ email });
//   console.log("Found user:", user);

//   if (user && (await bcrypt.compare(password, user.password))) {
//     res.send(generateTokenResponse(user));
//   } else {
//     res.status(400).send({ message: "Invalid email or password" });
//   }
// }));

// router.post("/login", expressAsyncHandler(async (req, res) => {
//   const { email, password } = req.body;

//   const user = await UserModel.findOne({ email });
//   if (user && await bcrypt.compare(password, user.password)) {
//     res.send(generateTokenResponse(user));
//   } else {
//     res.status(400).send({ message: "Invalid email or password" });
//   }
// }));

// // Token generator
// const generateTokenResponse = (user: any) => {
//   const token = jwt.sign(
//     {
//       id: user._id,
//       email: user.email,
//       isAdmin: user.isAdmin,
//     },
//     process.env.JWT_SECRET || "SomeRandomText",
//     { expiresIn: "30d" }
//   );

//   return {
//     _id: user._id,
//     email: user.email,
//     isAdmin: user.isAdmin,
//     token,
//   };
// };

// export default router;