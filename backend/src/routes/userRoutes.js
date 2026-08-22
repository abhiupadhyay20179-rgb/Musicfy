import express from "express";
import { loginUser, registerUser,getUserProfile } from "../controllers/userControllers.js";
import authMiddlewares from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/profile',authMiddlewares,getUserProfile);

export default userRouter; 
