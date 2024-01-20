import { Router } from "express";
import { loginUser, registerUser, updateProfile, updateProfilePicture, userProfile } from "../controllers/userControllers.js";
import { authGuard } from "../middleware/authMiddleware.js";
import { uploadPicture } from "../middleware/uploadPictureMiddleware.js";

const userRoutes = new Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser)
userRoutes.get("/profile", authGuard, userProfile)
userRoutes.put("/updateProfile", authGuard, updateProfile)
userRoutes.put("/updateProfilePicture", uploadPicture, updateProfilePicture)



export default userRoutes;
