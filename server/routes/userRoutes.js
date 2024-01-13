import { Router } from "express";
import { loginUser, registerUser } from "../controllers/userControllers.js";

const userRoutes = new Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser)

export default userRoutes;
