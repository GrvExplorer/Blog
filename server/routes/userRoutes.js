import { Router } from "express";
import { registerUser } from "../controllers/userControllers.js";

const userRoutes = new Router();

userRoutes.get("/register", registerUser);

export default userRoutes;
