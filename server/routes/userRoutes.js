import { Router } from "express";
import { loginUser, registerUser, updateProfile, updateProfilePicture, userProfile } from "../controllers/userControllers.js";
import { authGuard } from "../middleware/authMiddleware.js";

const userRoutes = new Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser)
userRoutes.get("/profile", authGuard, userProfile)
userRoutes.put("/updateProfile", authGuard, updateProfile)
userRoutes.put("/updateProfilePicture" , authGuard, updateProfilePicture)



export default userRoutes;
