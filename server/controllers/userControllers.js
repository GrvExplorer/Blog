import { uploadPicture } from "../middleware/uploadPictureMiddleware.js";
import User from "../models/User.js";
import { fileRemover } from "../utils/fileRemover.js";

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      res.status(208);
      throw new Error("User already registered");
    }

    user = await User.create({
      name,
      email,
      password,
    });

    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        avatar: user.avatar,
        name: user.name,
        email: user.email,
        verified: user.verified,
        admin: user.admin,
        token: await user.generate_token(),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }
    if (user) {
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        res.status(406);
        throw new Error("Invalid credentials");
      }
      return res.status(200).json({
        message: "User logged in successfully",
        user: {
          id: user._id,
          avatar: user.avatar,
          name: user.name,
          email: user.email,
          verified: user.verified,
          admin: user.admin,
          token: await user.generate_token(),
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

export const userProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (user) {
      return res.status(200).json({
        message: "User profile fetched successfully",
        user: {
          id: user._id,
          avatar: user.avatar,
          name: user.name,
          email: user.email,
          verified: user.verified,
          admin: user.admin,
        },
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      throw new Error("User not found");
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password && req.body.password.length >= 6) {
      user.password = req.body.password;
    } else if (req.body.password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }
    const updatedUser = await user.save();
    return res.status(200).json({
      message: "User profile updated successfully",
      user: {
        id: updatedUser._id,
        avatar: updatedUser.avatar,
        name: updatedUser.name,
        email: updatedUser.email,
        verified: updatedUser.verified,
        admin: updatedUser.admin,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfilePicture = async (req, res, next) => {
  try {
    const upload = uploadPicture.single("avatar");
    upload(req, res, async (err) => {
      if (err) {
        throw new Error(err.message);
      } else {
        if (req.file) {
          const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            {
              avatar: req.file.filename,
            },
            { new: true }
          );
          if (!updatedUser) {
            throw new Error("User not found");
          } else {
            res.json({
              message: "Profile picture updated successfully",
              user: {
                id: updatedUser._id,
                avatar: updatedUser.avatar,
                name: updatedUser.name,
                email: updatedUser.email,
                verified: updatedUser.verified,
                admin: updatedUser.admin,
              },
            });
          }
        } else {
          let filename;
          let updateUser = await User.findById(req.user.id);
          filename = updateUser.avatar;
          updateUser.avatar = "";
          await updateUser.save();
          fileRemover(filename);
        }
      }
    });
  } catch (error) {
    next(error);
  }
};
